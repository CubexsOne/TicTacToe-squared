import { Button, Stack } from '@mui/material'
import { type FC } from 'react'

type Props = {
	disabled: boolean
	handleClick: (row: number, col: number) => void
	usedFieldsMap: string[][]
}

export const Board: FC<Props> = ({ disabled, handleClick, usedFieldsMap }) => {
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
							onClick={() => handleClick(rowIndex, colIndex)}
							children={content}
						/>
					))}
				</Stack>
			))}
		</Stack>
	)
}
