export type GameRoutes = {
	translationKey: string
	tooltip?: string
	path: string
}

export const gameRoutes = {
	createGame: {
		translationKey: 'navigation_create_game',
		tooltip: 'navigation_tooltip_create_game',
		path: 'game'
	}
}
