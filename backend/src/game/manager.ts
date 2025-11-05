import { randomUUID, UUID } from 'node:crypto'
import { createNewGameMap, GameMap } from './map'
import { logger } from '../utilities'

export type Player = {
	socketId: string
	playername: string
}

export type Game = {
	id: UUID
	currentRound: number
	player: Player[]
	board: GameMap[][]
}

export type Games = Game[]

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
			board: createNewGameMap()
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
}
