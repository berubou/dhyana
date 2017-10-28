declare const __DEBUG__: any
declare const __CONFIG__: {
  version: string
}

import * as env from './environment'
import * as envProd from './environment.prod'

const staticEnv: any = __DEBUG__ ? env.environment : envProd.environment
const environment: any = Object.assign(staticEnv, __CONFIG__)

export {
  environment,
}
