import 'dotenv/config'

import { createServer } from 'node:http'

import { createExpressApp, createSocketServer } from './server'
import { environments, logger } from './utilities'
import { CREATE_GAME, handleCreateGame, handleRequestGame, REQUEST_GAME } from './socket-events'
import { handleJoiningGame, JOINING_GAME } from './socket-events/joining-game'
import { handleInteractWithGame, INTERACT_WITH_GAME } from './socket-events/interact-with-game'

const app = createExpressApp()

const httpServer = createServer(app)
const io = createSocketServer(httpServer)

io.on('connection', (socket) => {
	logger.info({ playerId: socket.id }, `Event received: connection`)
	socket.on(CREATE_GAME, (playername) => handleCreateGame(socket, playername))
	socket.on(REQUEST_GAME, (id) => handleRequestGame(socket, id))
	socket.on(JOINING_GAME, ({ playername, gameId }) =>
		handleJoiningGame(socket, { playername, requestedGameId: gameId })
	)
	socket.on(INTERACT_WITH_GAME, (gameMeta) => handleInteractWithGame(socket, gameMeta))
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
