export type GameMap = {
	active: boolean
	board: string[][]
}

export const createNewGameMap = () => {
	const newGameMap: GameMap[][] = []
	for (let row = 0; row <= 2; row++) {
		const newRow: GameMap[] = []
		for (let col = 0; col <= 2; col++) {
			newRow.push({
				active: row === 1 && col === 1,
				board: Array.from({ length: 3 }, () => Array(3).fill(''))
			})
		}
		newGameMap.push(newRow)
	}

	return newGameMap
}
