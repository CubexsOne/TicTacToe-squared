import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

import deMessages from './languages/de.json'
import enMessages from './languages/en.json'

const resources = {
	de: deMessages,
	en: enMessages
}

i18n
	.use(detector)
	.use(initReactI18next)
	.init({
		resources,
		debug: false,
		fallbackLng: 'en',

		interpolation: {
			escapeValue: false
		}
	})

export default i18n
