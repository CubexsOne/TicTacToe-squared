import type { Server as HttpServer } from 'node:http'
import { Server as SocketIOServer } from 'socket.io'

import { isEnvLocal } from '../utilities/is-environment'

let socketServer: SocketIOServer | undefined

export const createSocketServer = (httpServer: HttpServer): SocketIOServer => {
	if (socketServer) {
		return socketServer
	}

	socketServer = new SocketIOServer(httpServer, {
		path: '/socket.io/',
		cors: isEnvLocal
			? {
					origin: 'http://localhost:8080',
					credentials: true
				}
			: undefined
	})

	httpServer.on('close', () => {
		socketServer?.close()
		socketServer = undefined
	})

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
