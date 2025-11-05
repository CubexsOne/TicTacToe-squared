import { Socket } from 'socket.io'
import { logger } from '../utilities'
import { Game } from '../game/manager'

export const LOSE_GAME = 'lose_game'

export const handleLoseGame = (socket: Socket, game: Game) => {
	socket.broadcast.to(game.id).emit(LOSE_GAME, game)
	logger.info({ gameId: game.id }, `Event emitted: ${LOSE_GAME}`)
}
