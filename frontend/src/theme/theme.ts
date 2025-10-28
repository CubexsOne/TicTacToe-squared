import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	cssVariables: {
		colorSchemeSelector: 'class'
	},
	colorSchemes: {
		light: true,
		dark: true
	}
})
