import { randomUUID, UUID } from 'node:crypto'

type Player = {
	socketId: string
	playername: string
	symbol: string
}

type Game = {
	id: UUID
	player: Player[]
	board: object
}

type Games = Game[]

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
			player: [firstPlayer],
			board: {}
		}

		this.games.push(game)
		return game.id
	}
}
