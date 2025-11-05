import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Avatar, Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import type { FC } from 'react'
import type { Game } from '../../views/game/model'
import { useTranslation } from 'react-i18next'

interface Props {
	game: Game
}
export const PlayerView: FC<Props> = ({ game }) => {
	const { t } = useTranslation()

	const isPlayersTurn = (index: number) => {
		if (index === 0 && game.currentRound % 2 === 1) return false
		if (index === 1 && game.currentRound % 2 === 0) return false

		return true
	}

	const getInitials = (name: string) => {
		const letters = name
			.trim()
			.split(/\s+/)
			.map((part) => part.charAt(0)?.toUpperCase() ?? '')
			.filter(Boolean)
			.slice(0, 2)
			.join('')

		return letters || '?'
	}

	return (
		<Grid size={12}>
			<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
				{game.player.map((player, index) => {
					const active = isPlayersTurn(index)

					return (
						<Paper
							key={player.socketId}
							elevation={active ? 8 : 1}
							className={`flex-1 rounded-2xl border transition-all duration-200 ${
								active
									? 'border-amber-400 bg-amber-50 shadow-lg dark:border-amber-500 dark:bg-amber-900/20'
									: 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/40'
							}`}
						>
							<Stack direction="row" alignItems="center" spacing={2} className="p-4">
								<Avatar
									className={`text-base font-semibold ${
										active
											? 'bg-amber-400 text-slate-900 dark:bg-amber-500 dark:text-slate-950'
											: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white'
									}`}
								>
									{getInitials(player.playername)}
								</Avatar>
								<Stack className="flex-1">
									<Typography
										variant="overline"
										className="tracking-wide text-slate-500 dark:text-slate-400"
									>{`${t('view_game_player_view_player_label')} ${index + 1}`}</Typography>
									<Typography variant="h6" className="text-slate-900 dark:text-white">
										{player.playername}
									</Typography>
								</Stack>
								{active && (
									<Chip
										color="warning"
										variant="filled"
										icon={<PlayArrowRoundedIcon fontSize="small" />}
										label={t('view_game_player_view_your_turn_label')}
										className="font-semibold"
									/>
								)}
							</Stack>
						</Paper>
					)
				})}
			</Stack>
		</Grid>
	)
}
