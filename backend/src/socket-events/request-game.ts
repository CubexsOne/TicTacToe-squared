import { Socket } from 'socket.io'
import { logger } from '../utilities'
import { Game, GameManager } from '../game/manager'

export const REQUEST_GAME = 'request_game'
export const RECEIVE_GAME = 'receive_game'

export const handleRequestGame = (socket: Socket, id: Game['id']) => {
	logger.info(`Event received: ${REQUEST_GAME}`)
	const game = GameManager.Instance.getGameById(id)
	socket.emit(RECEIVE_GAME, game)
	logger.info({ game }, `Event emitted: ${RECEIVE_GAME}`)
}
