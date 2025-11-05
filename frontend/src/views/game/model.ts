export type Player = {
	socketId: string
	playername: string
}

export type Game = {
	id: string
	currentRound: number
	player: Player[]
	gameMap: GameMap[][]
	win?: Win
	lose: boolean
}

export type Win = {
	// TODO: Update for multiple rounds
	player: Player
}

export type Games = Game[]

export type GameMap = {
	active: boolean
	board: string[][]
}
