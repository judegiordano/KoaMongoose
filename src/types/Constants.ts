/* eslint-disable no-unused-vars */
export const enum Environment {
	dev = "development",
	stg = "staging",
	prod = "production"
}

export const enum RequestErrors {
	missingBody = "missing body { email:<string>, password:<string> }",
	missingEmail = "missing email field { email:<string> }",
	missingNewEmail = "missing new email field { newEmail:<string> }",
	missingNewPassword = "missing new password field { newPassword:<string> }"
}

export const enum JWTErrs {
	invalidToken = "Invalid token"
}

export const enum UserErrors {
	emailTaken = "email taken",
	emailNotFound = "email not found",
	wrongPassword = "incorrect password",
	wrongId = "no user found matching given id",
	wrongCreds = "no user found matching given id and email",
	rateLimit = "Value changed too recently. Try Again Later"
}

export const enum RateLimit {
	generic = "Too Many Requests. Please Try Again later.",
	oneDay = "Too Many Requests. Please Try Again Tomorrow."
}

export const enum Database {
	connectionSucc = "successfully connected to database",
	connectionErr = "error connecting to database"
}

export const enum CacheNames {
	getById = "getOneUserById"
}

export const enum Nums {
	oneDay = 86400000 // 24 * 60 * 60 * 1000
}