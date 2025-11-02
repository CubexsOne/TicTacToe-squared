import { Socket } from 'socket.io'
import { GameManager } from '../game/manager'
import { logger } from '../utilities'

export const CREATE_GAME = 'create_game'
export const GAME_CREATED = 'game_created'

export const handleCreateGame = (socket: Socket, playername: string) => {
	logger.info(`Event received: ${CREATE_GAME}`)
	const newGame = GameManager.Instance.create(socket.id, playername)
	socket.emit(GAME_CREATED, newGame)
	logger.info({ game: newGame }, `Event emitted: ${GAME_CREATED}`)
}
