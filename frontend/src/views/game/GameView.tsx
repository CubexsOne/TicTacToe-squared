import { useEffect, useState, type FC } from 'react'
import { Grid, Stack } from '@mui/material'
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
import { Board, GameIdCopyField } from '../../components'
import { playerSymbols } from '../../utilities/game'

export const GameView: FC = () => {
	const { id } = useParams()
	const [game, setGame] = useState<Game>()
	const io = getSocket()

	useEffect(() => {
		console.log({ game })
		if (game === undefined) {
			io.emit(outgoingEvents.REQUEST_GAME, id)
			io.once(incomingEvents.RECEIVE_GAME, (game: Game) => setGame(game))
			io.on(incomingEvents.UPDATE_GAME_STATE, (game: Game) => setGame(game))
			return
		}
	}, [game, io, id])

	const handleClick = (currentBoardRow: number, currentBoardCol: number) => {
		return (fieldRow: number, fieldCol: number) => {
			if (game) {
				const currentField = game.gameMap[currentBoardRow][currentBoardCol]
				if (currentField.board[fieldRow][fieldCol] !== '') {
					return
				}
				io.emit(outgoingEvents.INTERACT_WITH_GAME, {
					gameId: game.id,
					currentBoard: { row: currentBoardRow, col: currentBoardCol },
					interactedField: { row: fieldRow, col: fieldCol }
				})
			}
		}
	}

	const nextPlayer = () => {
		if (!game) return false
		const playerIndex = game.player.findIndex((player) => player.socketId === io.id)
		if (playerIndex === -1) return false

		if (playerIndex === 0 && game.currentRound % 2 === 1) return false
		if (playerIndex === 1 && game.currentRound % 2 === 0) return false

		return true
	}

	console.log({
		playerId: io.id,
		currentRound: game?.currentRound,
		activePlayer: playerSymbols[game?.currentRound || 0 % 2]
	})

	return (
		<>
			<Grid className="h-1/10 px-8 py-4" container spacing={2}>
				{game && game.player.length < 2 && <GameIdCopyField gameId={id || ''} />}
			</Grid>
			<Stack alignItems="center" justifyContent="center" spacing={8} className="h-8/10">
				{game &&
					game?.gameMap.map((row, rowIndex) => (
						<Stack direction="row" spacing={4} key={rowIndex}>
							{row.map((col, colIndex) => (
								<Board
									active={col.active}
									key={colIndex}
									disabled={!col.active || !nextPlayer()}
									handleClick={handleClick(rowIndex, colIndex)}
									usedFieldsMap={col.board}
								/>
							))}
						</Stack>
					))}
			</Stack>
		</>
	)
}
