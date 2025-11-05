import { Socket } from 'socket.io'
import { logger } from '../utilities'
import { Game, GameManager, InteractWithGame } from '../game/manager'

export const INTERACT_WITH_GAME = 'interact_with_game'
export const UPDATE_GAME_STATE = 'update_game_state'

export const handleInteractWithGame = (socket: Socket, gameMeta: InteractWithGame) => {
	logger.info(`Event received: ${INTERACT_WITH_GAME}`)

	const game = GameManager.Instance.interactWithGame({ ...gameMeta, currentPlayerId: socket.id })

	if (game === null) {
		// TODO: Handle not existing game
		return
	}

	socket.broadcast.to(game.id).emit(UPDATE_GAME_STATE, game)
	logger.info({ gameId: game.id }, `Event emitted: ${UPDATE_GAME_STATE}`)
}
