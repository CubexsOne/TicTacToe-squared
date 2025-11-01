import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import deMessages from './languages/de.json'
import enMessages from './languages/en.json'

const resources = {
	de: deMessages,
	en: enMessages
}

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',

	interpolation: {
		escapeValue: false
	}
})

export default i18n
