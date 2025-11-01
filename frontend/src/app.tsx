import { type FC } from 'react'
import { Navbar } from './components'
import { Navigate, Route, Routes } from 'react-router'
import { CreateGame, Game } from './views'

export const App: FC = () => {
	return (
		<>
			<Navbar />
			<main className="mx-auto h-screen max-w-7xl bg-amber-500">
				<Routes>
					<Route path="/" element={<Navigate to="/game" replace />} />
					<Route path="/game" element={<CreateGame />} />
					<Route path="/game/:id" element={<Game />} />
				</Routes>
			</main>
		</>
	)
}
