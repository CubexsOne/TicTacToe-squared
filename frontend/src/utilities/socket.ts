import { io, type Socket } from 'socket.io-client'

/**
 * Returns a singleton socket.io-client instance that can be shared
 * across the entire React application.
 */
class SocketSingleton {
	private static instance: Socket | null = null

	static getInstance(): Socket {
		if (this.instance) {
			return this.instance
		}

		const url = import.meta.env.VITE_SOCKET_URL ?? window.location.origin

		this.instance = io(url, {
			path: '/socket.io/',
			autoConnect: false,
			withCredentials: true
		})

		return this.instance
	}
}

export const getSocket = (): Socket => SocketSingleton.getInstance()
