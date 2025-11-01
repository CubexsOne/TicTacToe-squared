import { useState, type FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

interface Props {
	handleClose: () => void
}
export const ThemeToggle: FC<Props> = ({ handleClose }) => {
	const { t } = useTranslation()
	const [theme, setTheme] = useState<string>('dark')

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
		handleClose()
		// TODO: Implement theme-change (tailwind & MUI)
		setTheme(newValue)
	}
	return (
		<ToggleButtonGroup
			value={theme}
			exclusive
			onChange={handleChange}
			aria-label={t('settings_toggle_group_theme')}
		>
			<ToggleButton value="dark" aria-label={t('settings_toggle_group_option_dark_theme')}>
				<DarkModeIcon />
			</ToggleButton>
			<ToggleButton value="light" aria-label={t('settings_toggle_group_option_light_theme')}>
				<LightModeIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
