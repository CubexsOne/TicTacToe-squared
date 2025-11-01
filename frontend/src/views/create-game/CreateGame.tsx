import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Card, CardActions, CardContent, Tab, Tabs, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

const TABS = {
	CREATE_GAME: 0,
	JOIN_GAME: 1
}

export const CreateGame: FC = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [tab, setTab] = useState(0)
	const [playername, setPlayername] = useState<string>('')
	const [gameId, setGameId] = useState<string>('')

	const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
		setTab(newTab)
	}

	const handlePlayernameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPlayername(event.currentTarget.value.trim())
	}

	const handleGameCreation = () => {}

	const handleGameIdInput = (event: ChangeEvent<HTMLInputElement>) => {
		setGameId(event.currentTarget.value.trim())
	}
	const handleJoinExistingGame = () => {
		if (gameId === '') {
			// TODO: Replace alert with a error notification
			alert('Game id is empty!')
			return
		}
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
								id="playername-input"
								label={t('view_create_game_playername_input_label')}
								variant="outlined"
								value={playername}
								onChange={handlePlayernameInput}
								className="w-full"
							/>
						</CardContent>
						<CardActions className="justify-center">
							<Button
								aria-label={t('view_create_game_game_create_button')}
								children={t('view_create_game_game_create_button')}
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
								id="game-id-input"
								label={t('view_create_game_game_id_input_label')}
								variant="outlined"
								value={gameId}
								onChange={handleGameIdInput}
								className="w-full"
							/>
						</CardContent>
						<CardActions className="justify-center">
							<Button
								aria-label={t('view_create_game_game_join_button')}
								children={t('view_create_game_game_join_button')}
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
