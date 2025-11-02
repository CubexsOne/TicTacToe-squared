import { useEffect, type FC } from 'react'
import { Navbar } from './components'
import { Navigate, Route, Routes } from 'react-router'
import { CreateGameView, GameView } from './views'
import { getSocket } from './utilities'

export const App: FC = () => {
	useEffect(() => {
		const io = getSocket()
		io.connect()
		return () => {
			io.disconnect()
		}
	}, [])

	return (
		<>
			<Navbar />
			<main className="z-1 mx-auto h-screen max-w-7xl pt-24">
				<Routes>
					<Route path="/" element={<Navigate to="/game" replace />} />
					<Route path="/game" element={<CreateGameView />} />
					<Route path="/game/:id" element={<GameView />} />
				</Routes>
			</main>
		</>
	)
}
