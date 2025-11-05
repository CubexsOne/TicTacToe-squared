import { Socket } from 'socket.io'
import { GameManager } from '../game/manager'
import { logger } from '../utilities'

export const CREATE_GAME = 'create_game'
export const GAME_CREATED = 'game_created'

export const handleCreateGame = (socket: Socket, playername: string) => {
	logger.info(`Event received: ${CREATE_GAME}`)
	const gameId = GameManager.Instance.create(socket.id, playername)

	// Move player to game room
	socket.join(gameId)
	socket.leave(socket.id)

	socket.emit(GAME_CREATED, gameId)
	logger.info({ gameId }, `Event emitted: ${GAME_CREATED}`)
}
