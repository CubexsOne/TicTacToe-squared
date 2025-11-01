import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'

import '@fontsource-variable/roboto'
import './index.css'

import './i18n/i18n'
import { theme } from './theme'
import { App } from './views/app'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</StrictMode>
)
