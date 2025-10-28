import { createBrowserRouter } from 'react-router'
import App from './app/App'

const router = createBrowserRouter([
	{
		path: '/',
		Component: App,
		children: []
	}
])

export default router
