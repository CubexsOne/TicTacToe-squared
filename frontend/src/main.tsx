import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { ThemeProvider } from '@mui/material/styles'

import '@fontsource-variable/roboto'
import './index.css'

import './assets/i18n/i18n'
import router from './router'
import { theme } from './theme'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>
)
