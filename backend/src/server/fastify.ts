import Fastify, { type FastifyInstance } from 'fastify'

import { pinoLoggerConfig } from '../utilities'

let fastifyInstance: FastifyInstance | undefined

export const createFastifyInstance = (): FastifyInstance => {
	if (fastifyInstance) {
		return fastifyInstance
	}

	fastifyInstance = Fastify({
		logger: pinoLoggerConfig
	})

	return fastifyInstance
}

export const getFastifyInstance = (): FastifyInstance => {
	if (!fastifyInstance) {
		throw new Error(
			'Fastify instance has not been initialised. Call createFastifyInstance during application boot.'
		)
	}

	return fastifyInstance
}
