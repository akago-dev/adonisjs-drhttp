/*
 * adonisjs-drhttp
 *
 * (c) AKAGO SAS <po@akago.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { ApplicationService } from '@adonisjs/core/types'
import moesif from 'moesif-nodejs'
import { DrHTTPConfig } from '../src/define_config.js'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    drHttp: any
  }
}

export default class DrHTTPProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    const config = this.app.config.get<DrHTTPConfig>('drhttp', {})

    if (!config.dsn) throw Error('DrHttpProvider : DRHTTP_DSN env variable must be set')
    const drhttpDsn = new URL(config.dsn)

    if (config.enabled !== false) {
      const moesifMiddleware = moesif({
        applicationId: drhttpDsn.username.padEnd(50, 'a'),
        baseUri: drhttpDsn.protocol + '//' + drhttpDsn.host + '/moesif',
      })
      this.app.container.bindValue('drHttp', moesifMiddleware)
    }
  }
}
