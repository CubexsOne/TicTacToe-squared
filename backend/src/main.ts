import 'dotenv/config'

import Fastify from 'fastify'
import { Server as SocketIOServer } from 'socket.io'
import { pinoLoggerConfig } from './utilities'

declare module 'fastify' {
	interface FastifyInstance {
		io: SocketIOServer
	}
}

const fastify = Fastify({
	logger: pinoLoggerConfig
})

const isLocalEnv = process.env.NODE_ENV === 'local'

const io = new SocketIOServer(
	fastify.server,
	isLocalEnv
		? {
				cors: {
					origin: '*'
				}
			}
		: undefined
)

fastify.decorate('io', io)

fastify.addHook('onReady', async () => {
	fastify.log.info('Socket-io is ready!')
	fastify.io.on('connection', (socket) => {
		fastify.log.info({ id: socket.id }, 'socket connected')

		socket.on('ping', () => socket.emit('pong'))

		socket.on('disconnect', () => {
			fastify.log.info({ id: socket.id }, 'socket disconnected')
		})
	})
})

fastify.addHook('onClose', (instance, done) => {
	instance.io.close()
	done()
})

fastify.get('/', function (req, reply) {
	reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, function (err) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
