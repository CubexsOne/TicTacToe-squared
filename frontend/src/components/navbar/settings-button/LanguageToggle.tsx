import { useState, type FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const LanguageToggle: FC = () => {
	const { t, i18n } = useTranslation()
	const [language, setLanguage] = useState<string>(i18n.language.split('-')[0])

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
		setLanguage(newValue)
		i18n.changeLanguage(newValue)
	}
	return (
		<ToggleButtonGroup
			value={language}
			exclusive
			onChange={handleChange}
			aria-label={t('navigation_settings_menu_toggle_group_language')}
			fullWidth
		>
			<ToggleButton
				value="en"
				aria-label={t('navigation_settings_menu_toggle_group_option_english_language')}
			>
				🇺🇸
			</ToggleButton>
			<ToggleButton
				value="de"
				aria-label={t('navigation_settings_menu_toggle_group_option_german_language')}
			>
				🇩🇪
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
