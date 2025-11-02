export type Player = {
	socketId: string
	playername: string
	symbol: string
}

export type Game = {
	id: string
	player: Player[]
	board: object
}

export type Games = Game[]
