import 'dotenv/config'

import type { Server as SocketIOServer } from 'socket.io'

import { createFastifyInstance, createSocketServer } from './server'
import { environments } from './utilities'

declare module 'fastify' {
	interface FastifyInstance {
		io: SocketIOServer
	}
}

const fastify = createFastifyInstance()
const io = createSocketServer(fastify)

fastify.decorate('io', io)

fastify.addHook('onReady', async () => {
	fastify.log.info('Socket.io is ready!')
})

fastify.get('/', function (_, reply) {
	reply.send({ hello: 'world' })
})

fastify.listen({ port: environments.NODE_PORT }, function (err) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
