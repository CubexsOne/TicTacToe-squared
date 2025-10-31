interface Environments {
	NODE_ENV: string
	NODE_PORT: number
}

export const environments: Environments = {
	NODE_ENV: retrieveEnvironmentStringValue('NODE_ENV', 'local'),
	NODE_PORT: retrieveEnvironmentNumberValue('NODE_PORT', 3000)
}

function retrieveEnvironmentStringValue(key: string, fallback: string): string {
	const envValue = process.env[key]
	if (envValue === undefined) {
		console.error(`Environment ${key} not found`)
		return fallback
	}
	return envValue
}
function retrieveEnvironmentNumberValue(key: string, fallback: number): number {
	const envValue = process.env[key]
	if (envValue === undefined) {
		console.error(`Environment ${key} not found`)
		return fallback
	}

	const parsedValue = parseInt(envValue)
	if (isNaN(parsedValue)) {
		return fallback
	}

	return parsedValue
}

function retrieveEnvironmentStringArrayValue(key: string, fallback: string[]): string[] {
	const envValues = process.env[key]
	if (envValues === undefined) {
		console.error(`Environment ${key} not found`)
		return fallback
	}

	return envValues.split(',')
}
