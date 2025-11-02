import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Card, CardActions, CardContent, Tab, Tabs, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getSocket } from '../../utilities'
import { incomingEvents, outgoingEvents } from '../../utilities/socket-events'
import type { Game } from '../game/model'

const TABS = {
	CREATE_GAME: 0,
	JOIN_GAME: 1
}

export const CreateGameView: FC = () => {
	// Hooks
	const navigate = useNavigate()
	const { t } = useTranslation()

	// Navigation
	const [tab, setTab] = useState(0)

	// Settings
	const [playername, setPlayername] = useState<string>('')
	const [gameId, setGameId] = useState<string>('')

	const io = getSocket()
	io.on(incomingEvents.GAME_CREATED, (gameId: Game['id']) => {
		navigate(`/game/${gameId}`)
	})

	const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
		setTab(newTab)
	}

	const handlePlayernameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPlayername(event.currentTarget.value.trim())
	}

	const handleGameCreation = () => {
		io.emit(outgoingEvents.CREATE_GAME, playername)
	}

	const handleGameIdInput = (event: ChangeEvent<HTMLInputElement>) => {
		setGameId(event.currentTarget.value.trim())
	}
	const handleJoinExistingGame = () => {
		navigate(`/game/${gameId}`)
	}

	return (
		<Box className="flex h-7/10 w-full items-center justify-center">
			<Card elevation={4} className="px-4 py-2">
				<Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
					<Tab label={t('view_create_game_game_create_title')} />
					<Tab label={t('view_create_game_game_join_title')} />
				</Tabs>
				{tab === TABS.CREATE_GAME && (
					<>
						<CardContent>
							<TextField
								className="w-full"
								id="playername-input"
								label={t('view_create_game_playername_input_label')}
								onChange={handlePlayernameInput}
								value={playername}
								variant="outlined"
							/>
						</CardContent>
						<CardActions className="justify-center">
							<Button
								aria-label={t('view_create_game_game_create_button')}
								children={t('view_create_game_game_create_button')}
								disabled={playername.length === 0}
								onClick={handleGameCreation}
								variant="contained"
							/>
						</CardActions>
					</>
				)}
				{tab === TABS.JOIN_GAME && (
					<>
						<CardContent className="flex items-center justify-between gap-2">
							<TextField
								className="w-full"
								id="game-id-input"
								label={t('view_create_game_game_id_input_label')}
								onChange={handleGameIdInput}
								value={gameId}
								variant="outlined"
							/>
						</CardContent>
						<CardActions className="justify-center">
							<Button
								aria-label={t('view_create_game_game_join_button')}
								children={t('view_create_game_game_join_button')}
								disabled={gameId.length === 0}
								onClick={handleJoinExistingGame}
								variant="contained"
							/>
						</CardActions>
					</>
				)}
			</Card>
		</Box>
	)
}
