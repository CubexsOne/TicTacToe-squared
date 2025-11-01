import { useState, type FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
	handleClose: () => void
}
export const LanguageToggle: FC<Props> = ({ handleClose }) => {
	const { t, i18n } = useTranslation()
	const [language, setLanguage] = useState<string>(i18n.language)

	const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
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
			aria-label={t('select language')}
		>
			<ToggleButton value="de" aria-label={t('german')}>
				{t('german')}
			</ToggleButton>
			<ToggleButton value="en" aria-label={t('english')}>
				{t('english')}
			</ToggleButton>
		</ToggleButtonGroup>
	)
}
