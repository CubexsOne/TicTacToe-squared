import { Socket } from 'socket.io'
import { logger } from '../utilities'
import { Game, GameManager, Player } from '../game/manager'
import { UPDATE_GAME_STATE } from './interact-with-game'

export const JOINING_GAME = 'joining_game'
export const JOIN_GAME = 'join_game'

type JoinGame = { playername: Player['playername']; requestedGameId: Game['id'] }

export const handleJoiningGame = (socket: Socket, { playername, requestedGameId }: JoinGame) => {
	logger.info(`Event received: ${JOINING_GAME}`)
	const game = GameManager.Instance.joinGame(socket.id, playername, requestedGameId)

	if (game !== null) {
		// TODO: Handle if game is full
		socket.join(game.id)
		socket.leave(socket.id)

		socket.emit(JOIN_GAME, game.id)
		socket.broadcast.to(game.id).emit(UPDATE_GAME_STATE, game)
	}
	logger.info({ gameId: game.id }, `Event emitted: ${JOIN_GAME}`)
}
