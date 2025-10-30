import { Button, Stack } from '@mui/material'
import { type FC } from 'react'

type Props = {
	disabled: boolean
	handleClick: (row: number, col: number) => void
	usedFieldsMap: string[][]
}

export const Board: FC<Props> = ({ disabled, handleClick, usedFieldsMap }) => {
	const handleButtonClick = (row: number, col: number) => {
		return () => {
			if (usedFieldsMap[row][col] === '') {
				handleClick(row, col)
				// usedFieldsMap[row][col] = playerSymbols[currentRound % 2]
				// setUsedFieldsMap(usedFieldsMap)
				// setWinner(checkForWin(usedFieldsMap, row, col, currentRound))

				// callback() // increase round number
				return
			}
		}
	}

	return (
		<Stack spacing={2} alignItems="center" mt={4}>
			{usedFieldsMap.map((row, rowIndex) => (
				<Stack key={rowIndex} direction="row" spacing={2}>
					{row.map((content, colIndex) => (
						<Button
							disabled={disabled}
							key={colIndex}
							variant="outlined"
							style={{ height: '48px' }}
							onClick={handleButtonClick(rowIndex, colIndex)}
							children={content}
						/>
					))}
				</Stack>
			))}
		</Stack>
	)
}
