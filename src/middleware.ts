/*
 * adonisjs-drhttp
 *
 * (c) AKAGO SAS <po@akago.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { DrHTTPConfig } from './define_config.js'

export default class DrHTTPMiddleware {
  excludedPaths = ['/health']

  public async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const drhttp = await app.container.make('drHttp')
    const config = app.config.get<DrHTTPConfig>('drhttp', {})

    const path = request.url()
    const excludePath = (config.excludedPaths ?? []).includes(path)
    const excludeRequest = config.excludedRequest ? await config.excludedRequest(request) : false

    if (drhttp && !excludePath && !excludeRequest) {
      return await drhttp(request.request, response.response, next)
    } else {
      return await next()
    }
  }
}
