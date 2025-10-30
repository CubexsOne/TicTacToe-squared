import { Button, Stack } from '@mui/material'
import { useState, type FC } from 'react'

const playerSymbols = ['X', 'O']
const createEmptyBoard = () => Array.from({ length: 3 }, () => Array(3).fill(''))

export const Board: FC = () => {
	const [currentRound, setCurrentRound] = useState<number>(0)
	const [usedFieldsMap, setUsedFieldsMap] = useState<string[][]>(createEmptyBoard())
	const [winner, setWinner] = useState<string>('')

	const handleButtonClick = (row: number, col: number) => {
		return () => {
			if (usedFieldsMap[row][col] === '' && winner === '') {
				usedFieldsMap[row][col] = playerSymbols[currentRound % 2]
				setUsedFieldsMap(usedFieldsMap)
				setWinner(checkForWin(usedFieldsMap, row, col, currentRound))

				setCurrentRound(currentRound + 1)
				return
			}
		}
	}

	return (
		<Stack spacing={2} alignItems="center" mt={4}>
			{usedFieldsMap.map((row, rowIndex) => (
				<Stack key={rowIndex} direction="row" spacing={2}>
					{row.map((content, colIndex) => (
						<Button
							disabled={winner !== ''}
							key={colIndex}
							variant="outlined"
							style={{ height: '48px' }}
							onClick={handleButtonClick(rowIndex, colIndex)}
							children={content}
						/>
					))}
				</Stack>
			))}
		</Stack>
	)
}

function checkForWin(board: string[][], row: number, col: number, currentRound: number): string {
	const symbolToCheck = playerSymbols[currentRound % 2]

	// Check Rows
	if (board[row].every((content) => content === symbolToCheck)) {
		return symbolToCheck
	}

	// Check Cols
	if (board.every((row) => row[col] === symbolToCheck)) {
		return symbolToCheck
	}

	// Check main diagonal
	const boardSize = board.length
	let matchCount = 0
	if (row === col) {
		for (let i = 0; i < boardSize; i++) {
			if (board[i][i] === symbolToCheck) {
				matchCount++
			}
		}

		if (matchCount === boardSize) {
			return symbolToCheck
		}
	}

	// Check anti-diagonal
	if (row + col === board.length - 1) {
		for (let i = 0; i < boardSize; i++) {
			if (board[i][boardSize - 1 - i] === symbolToCheck) {
				matchCount++
			}
		}

		if (matchCount === boardSize) {
			return symbolToCheck
		}
	}

	return ''
}
