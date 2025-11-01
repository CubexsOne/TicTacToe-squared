import { createEmptyBoard } from '../board'
import type { GameMap } from './model'

export const createNewGameMap = () => {
	const newGameMap: GameMap[][] = []
	for (let row = 0; row <= 2; row++) {
		const newRow: GameMap[] = []
		for (let col = 0; col <= 2; col++) {
			newRow.push({
				active: row === 1 && col === 1,
				board: createEmptyBoard()
			})
		}
		newGameMap.push(newRow)
	}

	return newGameMap
}

export const cloneGameMap = (map: GameMap[][]): GameMap[][] =>
	map.map((row) =>
		row.map((field) => ({
			...field,
			board: field.board.map((boardRow) => [...boardRow])
		}))
	)
