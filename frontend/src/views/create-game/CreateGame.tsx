import { useState, type ChangeEvent, type FC } from 'react'
import { useNavigate } from 'react-router'
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	IconButton,
	TextField,
	Tooltip
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import LoginIcon from '@mui/icons-material/Login'
import AddIcon from '@mui/icons-material/Add'

export const CreateGame: FC = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [playername, setPlayername] = useState<string>('')
	const [gameId, setGameId] = useState<string>('')

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
		// TODO: Change bg-color of card
		<Box className="flex h-7/10 w-full items-center justify-center">
			<Card elevation={4} className="px-4 py-2">
				<CardHeader title={t('view_create_game_game_create_title')} />
				<CardContent className="flex items-center justify-between gap-2">
					<TextField
						id="playername-input"
						label={t('view_create_game_playername_input_label')}
						variant="outlined"
						value={playername}
						onChange={handlePlayernameInput}
					/>
					<Tooltip title={t('view_create_game_game_create_button')}>
						<IconButton
							aria-label={t('view_create_game_game_create_button')}
							onClick={handleGameCreation}
						>
							<AddIcon fontSize="inherit" />
						</IconButton>
					</Tooltip>
				</CardContent>
				<Divider />
				<CardHeader title={t('view_create_game_game_join_title')} />
				<CardContent className="flex items-center justify-between gap-2">
					<TextField
						id="game-id-input"
						label={t('view_create_game_game_id_input_label')}
						variant="outlined"
						value={gameId}
						onChange={handleGameIdInput}
					/>
					<Tooltip title={t('view_create_game_game_join_button')}>
						<IconButton
							aria-label={t('view_create_game_game_join_button')}
							onClick={handleJoinExistingGame}
							size="medium"
						>
							<LoginIcon fontSize="inherit" />
						</IconButton>
					</Tooltip>
				</CardContent>
			</Card>
		</Box>
	)
}
