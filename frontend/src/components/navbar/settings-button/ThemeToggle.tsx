import { useEffect, useState, type FC } from 'react'
import { ToggleButton, ToggleButtonGroup, useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

interface Props {
	handleClose: () => void
}

type ColorSchemes = 'light' | 'dark' | 'system' | undefined
export const ThemeToggle: FC<Props> = ({ handleClose }) => {
	const { mode, setMode, systemMode } = useColorScheme()
	const { t } = useTranslation()
	const [theme, setTheme] = useState<ColorSchemes>(mode)

	useEffect(() => {
		if (mode && mode === 'system') {
			if (systemMode) {
				setMode(systemMode)
				setTheme(systemMode)
				return
			}
			return
		}

		setMode('dark')
		setTheme('dark')
	}, [mode, setMode, systemMode])

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: 'dark' | 'light') => {
		handleClose()
		setMode(newValue)
		setTheme(newValue)
	}
	return (
		<ToggleButtonGroup
			value={theme}
			exclusive
			onChange={handleChange}
			aria-label={t('navigation_settings_menu_toggle_group_theme')}
			fullWidth
		>
			<ToggleButton
				value="dark"
				aria-label={t('navigation_settings_menu_toggle_group_option_dark_theme')}
			>
				<DarkModeIcon />
			</ToggleButton>
			<ToggleButton
				value="light"
				aria-label={t('navigation_settings_menu_toggle_group_option_light_theme')}
			>
				<LightModeIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
