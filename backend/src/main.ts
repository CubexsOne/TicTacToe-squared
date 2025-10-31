import 'dotenv/config'

import Fastify from 'fastify'
import { pinoLoggerConfig } from './utilities'

const fastify = Fastify({
	logger: pinoLoggerConfig
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
