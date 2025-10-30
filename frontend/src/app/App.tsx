import { useState, type FC } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Board } from './board'
import { createNewGameMap, cloneGameMap } from './gameMap/map-utilities'
import type { GameMap } from './gameMap/model'
import { playerSymbols } from './gameMap/player-symbols'
import { checkForWin } from './gameMap/check-for-win'

const App: FC = () => {
	const [currentRound, setCurrentRound] = useState<number>(0)
	const [gameMap, setGameMap] = useState<GameMap[][]>(createNewGameMap())
	const [hasWon, setHasWon] = useState<boolean>(false)

	const handleClick = (gameRow: number, gameCol: number) => {
		return (fieldRow: number, fieldCol: number) => {
			const nextGameMap = cloneGameMap(gameMap)
			const currentField = nextGameMap[gameRow][gameCol]
			currentField.board[fieldRow][fieldCol] = playerSymbols[currentRound % 2]
			currentField.active = false

			console.log({ gameRow, gameCol, fieldRow, fieldCol, currentField })
			if (checkForWin(currentField.board, fieldRow, fieldCol, currentRound)) {
				setGameMap(nextGameMap)
				setHasWon(true)
				return
			}

			nextGameMap[fieldRow][fieldCol].active = true
			setGameMap(nextGameMap)
			setCurrentRound((prevRound) => prevRound + 1)
		}
	}

	const handleGameReset = () => {
		setCurrentRound(0)
		setGameMap(createNewGameMap())
		setHasWon(false)
	}

	return (
		<Stack alignItems="center" justifyContent="center" spacing={8} height="100vh">
			<Stack>
				<Typography variant="h1">
					Tic Tac Toe<sup>2</sup>
				</Typography>
				<Typography variant="h3" textAlign="center" height={64}>
					{!hasWon ? '' : `${playerSymbols[currentRound % 2]} has won the Game!`}
				</Typography>
			</Stack>
			{gameMap.map((row, rowIndex) => (
				<Stack direction="row" spacing={8} key={rowIndex}>
					{row.map((col, colIndex) => (
						<Board
							key={colIndex}
							disabled={!col.active}
							handleClick={handleClick(rowIndex, colIndex)}
							usedFieldsMap={col.board}
						/>
					))}
				</Stack>
			))}
			<Button variant="outlined" onClick={handleGameReset}>
				Reset Game
			</Button>
		</Stack>
	)
}

export default App
