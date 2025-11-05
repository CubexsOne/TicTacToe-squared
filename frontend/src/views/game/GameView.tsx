import { useEffect, useState, type FC } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Stack
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { getSocket, incomingEvents, outgoingEvents } from '../../utilities'
import type { Game } from './model'
import { Board, GameIdCopyField } from '../../components'
import { playerSymbols } from '../../utilities/game'
import { useTranslation } from 'react-i18next'

export const GameView: FC = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [game, setGame] = useState<Game>()
	const [showWinModal, setShowWinModal] = useState<boolean>(false)
	const io = getSocket()

	console.log('win', { 'win?': game?.win !== undefined, showWinModal })

	useEffect(() => {
		console.log({ game })
		if (game === undefined) {
			io.emit(outgoingEvents.REQUEST_GAME, id)
			io.once(incomingEvents.RECEIVE_GAME, (game: Game) => setGame(game))
			io.on(incomingEvents.UPDATE_GAME_STATE, (game: Game) => setGame(game))
			io.on(incomingEvents.WIN_GAME, (game: Game) => {
				setGame(game)
				setShowWinModal(true)
			})
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

	const handleCloseModal = () => {
		setShowWinModal(false)
		navigate('/game')
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
			<Dialog
				onClose={handleCloseModal}
				aria-labelledby="customized-dialog-title"
				open={showWinModal}
			>
				<DialogTitle sx={{ m: 0, p: 2 }}>{t('view_game_win_modal_title')}</DialogTitle>
				<DialogContent
					dividers
				>{`${game?.win?.player.playername} ${t('view_game_win_modal_content')}`}</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCloseModal}>
						{t('view_game_win_modal_action')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
