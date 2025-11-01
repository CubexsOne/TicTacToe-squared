import { useState, type FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
	handleClose: () => void
}
export const ThemeToggle: FC<Props> = ({ handleClose }) => {
	const { t } = useTranslation()
	const [theme, setTheme] = useState<string>('dark')

	const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
		handleClose()
		// TODO: Implement theme-change (tailwind & MUI)
		setTheme(newValue)
	}
	return (
		<ToggleButtonGroup
			value={theme}
			exclusive
			onChange={handleChange}
			aria-label={t('select theme')}
		>
			<ToggleButton value="light" aria-label={t('light theme')}>
				{t('Light')}
			</ToggleButton>
			<ToggleButton value="dark" aria-label={t('dark theme')}>
				{t('Dark')}
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
