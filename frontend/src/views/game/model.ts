import type { GameMap } from '../../components'

export type Player = {
	socketId: string
	playername: string
	symbol: string
}

export type Game = {
	id: string
	currentRound: number
	player: Player[]
	board: GameMap[][]
}

export type Games = Game[]
