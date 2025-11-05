import { randomUUID, UUID } from 'node:crypto'
import { createNewGameMap, GameMap } from './map'
import { logger } from '../utilities'
import { playerSymbols } from './player-symbols'
import { checkForWin } from './check-for-win'

export type Player = {
	socketId: string
	playername: string
}

export type Game = {
	id: UUID
	currentRound: number
	player: Player[]
	gameMap: GameMap[][]
	win?: Win
}

export type Win = {
	// TODO: Update for multiple rounds
	player: Player
}

export type Games = Game[]

export type InteractWithGame = {
	gameId: Game['id']
	currentPlayerId: Player['socketId']
	currentBoard: { row: number; col: number }
	interactedField: { row: number; col: number }
}

export type GameResponseMeta = {
	game: Game | null
	win: boolean
	error: string | null // TODO: Maybe enum?
	lose: boolean
}

export class GameManager {
	private static instance: GameManager | null = null

	public static getInstance(): GameManager {
		if (GameManager.instance === null) {
			GameManager.instance = new GameManager()
		}

		return GameManager.instance
	}

	public static get Instance(): GameManager {
		return GameManager.getInstance()
	}

	private games: Games = []

	private constructor() {}

	public create(socketId: string, playername: string): Game['id'] {
		const firstPlayer: Player = {
			socketId,
			playername
		}

		const game: Game = {
			id: randomUUID(),
			currentRound: 0,
			player: [firstPlayer],
			gameMap: createNewGameMap()
		}

		this.games.push(game)
		return game.id
	}

	public joinGame(socketId: string, playername: Player['playername'], id: Game['id']): Game | null {
		const game: Game | undefined = this.games.find((game) => {
			if (game.id === id) {
				if (game.player.length < 2) {
					const newPlayer: Player = {
						socketId,
						playername
					}
					game.player.push(newPlayer)
					return true
				}
			}
		})

		return game ?? null
	}

	public getGameById(id: Game['id']): Game | null {
		const game = this.games.find((item) => item.id === id)
		return game ?? null
	}

	public interactWithGame(gameMeta: InteractWithGame): GameResponseMeta {
		const { gameId, currentBoard, currentPlayerId, interactedField } = gameMeta
		const game = this.getGameById(gameId)
		if (game === null) return null

		const playerIndex = game.player.findIndex((player) => player.socketId === currentPlayerId)

		if (playerIndex === -1) {
			// TODO: Checkout what to do if invalid player is interacting
			return { game, win: false, error: 'Invalid Player', lose: false }
		}

		if (playerIndex === 0 && game.currentRound % 2 === 1) {
			return { game, win: false, error: null, lose: false }
		}
		if (playerIndex === 1 && game.currentRound % 2 === 0) {
			return { game, win: false, error: null, lose: false }
		}

		const interactedGameMap = game.gameMap[currentBoard.row][currentBoard.col]
		const currentField = interactedGameMap.board[interactedField.row][interactedField.col]

		if (currentField !== '')
			return { game, win: false, error: 'Field is not interactable', lose: false } // TODO: Maybe add error to handle interaction

		interactedGameMap.board[interactedField.row][interactedField.col] =
			playerSymbols[game.currentRound % 2]
		interactedGameMap.active = false
		if (
			checkForWin(
				interactedGameMap.board,
				interactedField.row,
				interactedField.col,
				game.currentRound
			)
		) {
			game.win = { player: game.player[playerIndex] }
			return { game, win: true, error: null, lose: false }
		}
		game.gameMap[interactedField.row][interactedField.col].active = true
		game.currentRound++
		logger.info({ round: game.currentRound })
		if (game.currentRound === 81) {
			return { game, win: false, error: null, lose: true }
		}

		return { game, win: false, error: null, lose: false }
	}
}
