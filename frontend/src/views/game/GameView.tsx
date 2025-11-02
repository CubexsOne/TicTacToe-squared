import { useEffect, useState, type FC } from 'react'
import { Stack } from '@mui/material'
import { useParams } from 'react-router'
// import {
// 	Board,
// 	checkForWin,
// 	createNewGameMap,
// 	cloneGameMap,
// 	type GameMap,
// 	playerSymbols
// } from '../../components'
import { getSocket, incomingEvents, outgoingEvents } from '../../utilities'
import type { Game } from './model'
import { Board } from '../../components'

export const GameView: FC = () => {
	const { id } = useParams()
	const [game, setGame] = useState<Game>()
	const io = getSocket()

	useEffect(() => {
		console.log({ game })
		if (game === undefined) {
			io.emit(outgoingEvents.REQUEST_GAME, id)
			io.on(incomingEvents.RECEIVE_GAME, (game: Game) => setGame(game))
			return
		}
	}, [game, io, id])

	const handleClick = (gameRow: number, gameCol: number) => {
		return (fieldRow: number, fieldCol: number) => {
			// 		const nextGameMap = cloneGameMap(gameMap)
			// 		const currentField = nextGameMap[gameRow][gameCol]
			// 		if (currentField.board[fieldRow][fieldCol] !== '') {
			// 			return
			// 		}
			// 		currentField.board[fieldRow][fieldCol] = playerSymbols[currentRound % 2]
			// 		currentField.active = false
			console.log({ gameRow, gameCol, fieldRow, fieldCol })
			// 		if (checkForWin(currentField.board, fieldRow, fieldCol, currentRound)) {
			// 			setGameMap(nextGameMap)
			// 			return
			// 		}
			// 		nextGameMap[fieldRow][fieldCol].active = true
			// 		setGameMap(nextGameMap)
			// 		setCurrentRound((prevRound) => prevRound + 1)
		}
	}

	return (
		<Stack alignItems="center" justifyContent="center" spacing={8} className="h-full">
			{game &&
				game?.board.map((row, rowIndex) => (
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
		</Stack>
	)
}
