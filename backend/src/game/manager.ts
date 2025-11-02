import { randomUUID, UUID } from 'node:crypto'
import { createNewGameMap, GameMap } from './map'

export type Player = {
	socketId: string
	playername: string
	symbol: string
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
			playername,
			symbol: 'X'
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

	public getGameById(id: Game['id']): Game | null {
		const game = this.games.find((item) => item.id === id)
		return game ?? null
	}
}
