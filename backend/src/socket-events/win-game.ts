import { Socket } from 'socket.io'
import { logger } from '../utilities'
import { Game } from '../game/manager'

export const WIN_GAME = 'win_game'

export const handleWinGame = (socket: Socket, game: Game) => {
	socket.broadcast.to(game.id).emit(WIN_GAME, game)
	logger.info({ gameId: game.id }, `Event emitted: ${WIN_GAME}`)
}
