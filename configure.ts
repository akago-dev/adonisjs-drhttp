/*
 * adonisjs-drhttp
 *
 * (c) AKAGO SAS <po@akago.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type Configure from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

/**
 * Configures the package
 */
export async function configure(command: Configure) {
  const codemods = await command.createCodemods()

  /**
   * Publish config file
   */
  await codemods.makeUsingStub(stubsRoot, 'stubs/config/drhttp.stub', {})

  /**
   * Define environment variables
   */
  await codemods.defineEnvVariables({ DRHTTP_DSN: '<dsn_url_of_drhttp_server>' })

  /**
   * Define environment variables validations
   */
  await codemods.defineEnvValidations({
    variables: {
      DRHTTP_DSN: `Env.schema.string.optional({ format: 'url' })`,
    },
    leadingComment: 'Variables for configuring @akago/adonisjs-drhttp package',
  })

  /**
   * Register provider
   */
  await codemods.updateRcFile((rcFile: any) => {
    rcFile.addProvider('@akago/adonisjs-drhttp/provider')
  })

  /**
   * Register middleware
   */
  await codemods.registerMiddleware('router', [
    {
      path: '@akago/adonisjs-drhttp/middleware',
      position: 'before',
    },
  ])
}
