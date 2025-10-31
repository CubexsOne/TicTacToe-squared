interface Environments {
	NODE_ENV: string
}

export const environments: Environments = {
	NODE_ENV: retrieveEnvironmentValue('NODE_ENV')
}

function retrieveEnvironmentValue(key: string): string {
	const envValue = process.env[key]
	if (envValue === undefined) {
		console.error(`Environment ${key} not found`)
		return ''
	}
	return envValue
}

function retrieveEnvironmentValueAsArray(key: string): string[] {
	const envValues = process.env[key]
	if (envValues === undefined) {
		console.error(`Environment ${key} not found`)
		return []
	}

	return envValues.split(',')
}
