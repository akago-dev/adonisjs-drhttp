/*
 * adonisjs-drhttp
 *
 * (c) AKAGO SAS <po@akago.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Request } from '@adonisjs/core/http'

export type DrHTTPConfig = {
  dsn?: string
  /** defaults to true */
  enabled?: boolean
  excludedPaths?: string[]
  excludedRequest?: (req: Request) => Promise<boolean>
}

export function defineConfig<T extends DrHTTPConfig>(config: T): T {
  return config
}
