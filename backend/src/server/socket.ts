import type { FastifyInstance } from 'fastify'
import { Server as SocketIOServer } from 'socket.io'

import { isEnvLocal } from '../utilities/is-environment'
import { getFastifyInstance } from './fastify'

let socketServer: SocketIOServer | undefined
let hooksRegistered = false

export const createSocketServer = (fastify?: FastifyInstance): SocketIOServer => {
	const fastifyInstance = fastify ?? getFastifyInstance()

	if (socketServer) {
		return socketServer
	}

	socketServer = new SocketIOServer(
		fastifyInstance.server,
		isEnvLocal
			? {
					cors: {
						origin: '*'
					}
				}
			: undefined
	)

	if (!hooksRegistered) {
		fastifyInstance.addHook('onClose', (_, done) => {
			socketServer?.close()
			socketServer = undefined
			hooksRegistered = false
			done()
		})

		hooksRegistered = true
	}

	return socketServer
}

export const getSocketServer = (): SocketIOServer => {
	if (!socketServer) {
		throw new Error(
			'Socket.io server has not been initialised. Call createSocketServer during application boot.'
		)
	}

	return socketServer
}
