import { type FC, useState } from 'react'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'

const SETTINGS_BUTTON = 'settings-button'
const SETTINGS_MENU = 'settings-menu'

export const SettingsButton: FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	return (
		<>
			<IconButton
				size="large"
				id={SETTINGS_BUTTON}
				aria-controls={open ? SETTINGS_MENU : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				color="inherit"
			>
				<SettingsIcon fontSize="inherit" />
			</IconButton>
			<Menu
				id={SETTINGS_MENU}
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}
				slotProps={{
					list: {
						'aria-labelledby': SETTINGS_BUTTON
					}
				}}
			>
				<MenuItem>
					<ThemeToggle />
				</MenuItem>
				<Divider />
				<MenuItem>
					<LanguageToggle />
				</MenuItem>
			</Menu>
		</>
	)
}
