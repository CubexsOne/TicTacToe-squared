import type { FC } from 'react'
import { useNavigate } from 'react-router'
import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { gameRoutes } from '../../routes'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface Props {
	visible: boolean
}

export const BackButton: FC<Props> = ({ visible }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	return (
		<Tooltip
			title={t(gameRoutes.createGame.tooltip)}
			sx={{ visibility: visible ? 'visible' : 'hidden' }}
		>
			<IconButton
				onClick={() => navigate(gameRoutes.createGame.path)}
				size="large"
				aria-label={t(gameRoutes.createGame.tooltip)}
			>
				<ArrowBackIcon fontSize="inherit" />
			</IconButton>
		</Tooltip>
	)
}
