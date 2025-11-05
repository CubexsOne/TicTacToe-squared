export type Player = {
	socketId: string
	playername: string
	symbol: string
}

export type Game = {
	id: string
	currentRound: number
	player: Player[]
	gameMap: GameMap[][]
}

export type Games = Game[]

export type GameMap = {
	active: boolean
	board: string[][]
}
