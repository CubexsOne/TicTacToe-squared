import type { FC } from 'react'
import { useLocation } from 'react-router'
import { Typography } from '@mui/material'

import { gameRoutes } from '../../routes'
import { BackButton } from './BackButton'
import { SettingsButton } from './settings-button/SettingsButton'

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
				<SettingsButton />
			</div>
		</nav>
	)
}
