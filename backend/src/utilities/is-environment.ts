import { environments } from './environment'

export const isEnvLocal = environments.NODE_ENV === 'local' || environments.NODE_ENV === ''
export const isEnvInt = environments.NODE_ENV === 'int'
export const isEnvProd = environments.NODE_ENV === 'prod'
