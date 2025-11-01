import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { IconButton, Tooltip, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SettingsIcon from '@mui/icons-material/Settings'
import { gameRoutes } from '../../routes'
import { useTranslation } from 'react-i18next'

export const Navbar: FC = () => {
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const isCreateGame = pathname === `/${gameRoutes.createGame.path}`

	const navigate = useNavigate()

	return (
		<nav className="w-full bg-sky-950">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
				<Tooltip
					title={t(gameRoutes.createGame.tooltip)}
					sx={{ visibility: isCreateGame ? 'hidden' : 'visible' }}
				>
					<IconButton
						onClick={() => navigate(gameRoutes.createGame.path)}
						size="large"
						aria-label={t(gameRoutes.createGame.tooltip)}
					>
						<ArrowBackIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
				<Typography variant="h4">
					Tic Tac Toe<sup>2</sup>
				</Typography>
				<IconButton onClick={() => alert('Settings!')} size="large">
					<SettingsIcon fontSize="inherit" />
				</IconButton>
			</div>
		</nav>
	)
}
