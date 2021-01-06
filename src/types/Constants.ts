/* eslint-disable no-unused-vars */
export const enum Environment {
	dev = "development",
	stg = "staging",
	prod = "production"
}

export const enum RequestErrors {
	missingBody = "missing body { email:<string>, password:<string> }",
	missingEmail = "missing new email field { newEmail:<string> }",
	missingPassword = "missing new password field { newPassword:<string> }"
}

export const enum JWTErrs {
	invalidToken = "Invalid token"
}

export const enum UserErrors {
	emailTaken = "email taken",
	emailNotFound = "email not found",
	wrongPassword = "incorrect password",
	wrongId = "no user found matching given id",
	wrongCreds = "no user found matching given id and email"
}

export const enum RateLimit {
	error = "Too Many Requests. Please Try Again later."
}

export const enum Database {
	connectionSucc = "successfully connected to database",
	connectionErr = "error connecting to database"
}

export const enum CacheNames {
	getById = "getOneUserById"
}