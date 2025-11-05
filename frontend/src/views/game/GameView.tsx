import { useEffect, useState, type FC } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	LinearProgress,
	Stack,
	Typography
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { getSocket, incomingEvents, outgoingEvents } from '../../utilities'
import type { Game } from './model'
import { Board, GameLinkCopyField } from '../../components'
import { useTranslation } from 'react-i18next'
import { PlayerView } from '../../components/player-view'

export const GameView: FC = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [game, setGame] = useState<Game>()
	const [showWinModal, setShowWinModal] = useState<boolean>(false)
	const [showLoseModal, setShowLoseModal] = useState<boolean>(false)
	const io = getSocket()

	useEffect(() => {
		if (game === undefined) {
			io.emit(outgoingEvents.REQUEST_GAME, id)
			io.once(incomingEvents.RECEIVE_GAME, (game: Game) => setGame(game))
			io.on(incomingEvents.UPDATE_GAME_STATE, (game: Game) => setGame(game))
			io.on(incomingEvents.WIN_GAME, (game: Game) => {
				setGame(game)
				setShowWinModal(true)
			})
			io.on(incomingEvents.LOSE_GAME, (game: Game) => {
				setGame(game)
				setShowLoseModal(true)
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

	return (
		<>
			<Grid className="min-h-1/10 px-8 py-4" container spacing={2}>
				{game && game.player.length < 2 && <GameLinkCopyField gameId={id || ''} />}
				{game && game.player.length === 2 && <PlayerView game={game} />}
			</Grid>
			<Stack alignItems="center" justifyContent="center" spacing={8} className="min-h-8/10">
				{game &&
					game.player.length === 2 &&
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
				{game && game.player.length < 2 && (
					<Stack justifyContent="center" alignItems="center" gap={4}>
						<Typography variant="h1" className="text-blue-500 dark:text-amber-400">
							{t('view_game_waiting_player_typography')}
						</Typography>
						<LinearProgress color="inherit" className="w-full text-blue-500 dark:text-amber-400" />
					</Stack>
				)}
			</Stack>
			<Dialog onClose={handleCloseModal} open={showWinModal}>
				<DialogTitle className="text-center">
					{'🎉 ' + t('view_game_win_modal_title') + ' 🎉'}
				</DialogTitle>
				<DialogContent
					dividers
				>{`${game?.win?.player.playername} ${t('view_game_win_modal_content')}`}</DialogContent>
				<DialogActions
					sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
				>
					<Button autoFocus onClick={handleCloseModal} variant="contained">
						{t('view_game_win_modal_action')}
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog onClose={handleCloseModal} open={showLoseModal}>
				<DialogTitle className="text-center">
					{'🎉 ' + t('view_game_lose_modal_title') + ' 🎉'}
				</DialogTitle>
				<DialogContent dividers>{t('view_game_lose_modal_content')}</DialogContent>
				<DialogActions
					sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}
				>
					<Button autoFocus onClick={handleCloseModal} variant="contained">
						{t('view_game_lose_modal_action')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
