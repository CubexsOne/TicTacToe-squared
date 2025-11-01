import pino from 'pino'

import { isEnvLocal } from './is-environment'

export const pinoLoggerConfig = {
	level: process.env.LOG_LEVEL || 'info',
	transport: isEnvLocal
		? {
				target: 'pino-pretty',
				options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname,reqId' }
			}
		: undefined
}

export const logger = pino(pinoLoggerConfig)
