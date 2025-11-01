import { playerSymbols } from './player-symbols'

export function checkForWin(
	board: string[][],
	row: number,
	col: number,
	currentRound: number
): boolean {
	const symbolToCheck = playerSymbols[currentRound % 2]

	// Check Rows
	if (board[row].every((content) => content === symbolToCheck)) {
		return true
	}

	// Check Cols
	if (board.every((row) => row[col] === symbolToCheck)) {
		return true
	}

	// Check main diagonal
	if (row === col) {
		const boardSize = board.length
		let matchCount = 0
		for (let i = 0; i < boardSize; i++) {
			if (board[i][i] === symbolToCheck) {
				matchCount++
			}
		}

		if (matchCount === boardSize) {
			return true
		}
	}

	// Check anti-diagonal
	if (row + col === board.length - 1) {
		const boardSize = board.length
		let matchCount = 0
		for (let i = 0; i < boardSize; i++) {
			if (board[i][boardSize - 1 - i] === symbolToCheck) {
				matchCount++
			}
		}

		if (matchCount === boardSize) {
			return true
		}
	}

	return false
}
