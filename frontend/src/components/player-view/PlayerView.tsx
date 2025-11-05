import { Grid } from '@mui/material'
import type { FC } from 'react'
import type { Game } from '../../views/game/model'
import { useTranslation } from 'react-i18next'

interface Props {
	game: Game
}
export const PlayerView: FC<Props> = ({ game }) => {
	const { t } = useTranslation()

	const nextPlayer = (index: number) => {
		if (index === 0 && game.currentRound % 2 === 1) return false
		if (index === 1 && game.currentRound % 2 === 0) return false

		return true
	}

	return (
		<>
			{game.player.map((player, index) => (
				<>
					<Grid offset={4} size={2} textAlign="right">
						{`${t('Player')} ${index + 1}`}
					</Grid>
					<Grid size={2}>{player.playername}</Grid>
					<Grid size={1}>{nextPlayer(index) ? t('Your turn!') : ''}</Grid>
				</>
			))}
		</>
	)
}
