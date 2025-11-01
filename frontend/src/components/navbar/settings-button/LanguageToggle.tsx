import { useState, type FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
	handleClose: () => void
}
export const LanguageToggle: FC<Props> = ({ handleClose }) => {
	const { t, i18n } = useTranslation()
	const [language, setLanguage] = useState<string>(i18n.language)

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
		handleClose()
		// TODO: Implement language change (save settings in browser)
		setLanguage(newValue)
		i18n.changeLanguage(newValue)
	}
	return (
		<ToggleButtonGroup
			value={language}
			exclusive
			onChange={handleChange}
			aria-label={t('settings_toggle_group_language')}
		>
			<ToggleButton value="en" aria-label={t('settings_toggle_group_option_english_language')}>
				🇺🇸
			</ToggleButton>
			<ToggleButton value="de" aria-label={t('settings_toggle_group_option_german_language')}>
				🇩🇪
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
