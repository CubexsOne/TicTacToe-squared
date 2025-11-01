import express, { type Express } from 'express'
import pinoHttp from 'pino-http'

import { logger } from '../utilities'

let expressApp: Express | undefined

export const createExpressApp = (): Express => {
	if (expressApp) {
		return expressApp
	}

	expressApp = express()

	expressApp.use(express.json())
	expressApp.use(
		pinoHttp({
			logger
		})
	)

	return expressApp
}

export const getExpressApp = (): Express => {
	if (!expressApp) {
		throw new Error('Express app has not been initialised. Call createExpressApp during boot.')
	}

	return expressApp
}
