import 'dotenv/config'

import { createServer } from 'node:http'

import { createExpressApp, createSocketServer } from './server'
import { environments, logger } from './utilities'
import { CREATE_GAME, handleCreateGame, handleRequestGame, REQUEST_GAME } from './socket-events'

const app = createExpressApp()

const httpServer = createServer(app)
const io = createSocketServer(httpServer)

io.on('connection', (socket) => {
	logger.info({ playerId: socket.id }, `Event received: connection`)
	socket.on(CREATE_GAME, (playername) => handleCreateGame(socket, playername))
	socket.on(REQUEST_GAME, (id) => handleRequestGame(socket, id))
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
