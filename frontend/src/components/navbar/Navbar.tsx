import type { FC } from 'react'
import { useLocation } from 'react-router'
import { AppBar, Toolbar, Typography } from '@mui/material'

import { gameRoutes } from '../../routes'
import { BackButton } from './BackButton'
import { SettingsButton } from './settings-button/SettingsButton'

export const Navbar: FC = () => {
	const { pathname } = useLocation()
	const isCreateGame = pathname === `/${gameRoutes.createGame.path}`

	return (
		<AppBar position="fixed" sx={{ alignItems: 'stretch' }}>
			<Toolbar disableGutters sx={{ justifyContent: 'center' }}>
				<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2">
					<BackButton visible={!isCreateGame} />
					<Typography variant="h4">
						Tic Tac Toe<sup>2</sup>
					</Typography>
					<SettingsButton />
				</div>
			</Toolbar>
		</AppBar>
	)
}
