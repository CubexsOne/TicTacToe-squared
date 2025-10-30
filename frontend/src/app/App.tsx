import { Stack } from '@mui/material'
import { Board } from './board/Board'

const App = () => {
	return (
		<Stack alignItems="center" justifyContent="center" spacing={8} height="100vhx">
			<Stack direction="row" spacing={8}>
				<Board />
				<Board />
				<Board />
			</Stack>
			<Stack direction="row" spacing={8}>
				<Board />
				<Board />
				<Board />
			</Stack>
			<Stack direction="row" spacing={8}>
				<Board />
				<Board />
				<Board />
			</Stack>
		</Stack>
	)
}

export default App
