import type { FC } from 'react'
import { IconButton } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'

export const SettingsButton: FC = () => {
	return (
		<IconButton onClick={() => alert('Settings!')} size="large">
			<SettingsIcon fontSize="inherit" />
		</IconButton>
	)
}
