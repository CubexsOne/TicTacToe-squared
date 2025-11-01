import 'dotenv/config'

import { createServer } from 'node:http'

import { createExpressApp, createSocketServer } from './server'
import { environments, logger } from './utilities'

const app = createExpressApp()

const httpServer = createServer(app)
const io = createSocketServer(httpServer)

io.on('connection', (socket) => {
	logger.info({ socketId: socket.id }, 'New connection established')
})

httpServer.on('error', (error) => {
	logger.error({ err: error }, 'HTTP server error')
	process.exit(1)
})

const port = environments.NODE_PORT

httpServer.listen(port, () => {
	logger.info(`Server listening at http://localhost:${port}`)
	logger.info('Socket.io is ready!')
})
