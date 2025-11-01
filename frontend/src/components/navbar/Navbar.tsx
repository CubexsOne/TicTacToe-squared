import type { FC } from 'react'
import { useLocation } from 'react-router'
import { IconButton, Typography } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'
import { gameRoutes } from '../../routes'
import { BackButton } from './BackButton'

export const Navbar: FC = () => {
	const { pathname } = useLocation()
	const isCreateGame = pathname === `/${gameRoutes.createGame.path}`

	return (
		<nav className="w-full bg-sky-950">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
				<BackButton visible={!isCreateGame} />
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
