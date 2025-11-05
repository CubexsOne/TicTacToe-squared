import type { FC } from 'react'
import { Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface Props {
	gameId: string
}
export const GameLinkCopyField: FC<Props> = ({ gameId }) => {
	const { t } = useTranslation()

	const handleCopy = () => {
		if (navigator.clipboard?.writeText) {
			void navigator.clipboard.writeText(gameId).catch((error) => {
				console.error(t('component_game_link_copy_field_click_error'), error)
			})
			return
		}
	}

	return (
		<>
			<Grid size={7} offset={2} justifyContent="space-between" alignItems="center">
				<TextField
					className="w-full"
					variant="outlined"
					label={t('component_game_link_copy_field_label')}
					value={gameId}
					aria-readonly
				/>
			</Grid>
			<Grid size={1} justifyContent="space-between" alignItems="center">
				<Tooltip title={t('component_game_link_copy_button_tooltip')}>
					<IconButton size="large" onClick={handleCopy}>
						<ContentCopyIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
			</Grid>
		</>
	)
}
