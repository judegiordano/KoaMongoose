export interface IJwtPayload {
	_id: string,
	created: Date,
	activated: boolean,
	email: string
}
export interface IJWT {
	_id: string,
	created: Date,
	activated: boolean,
	email: string,
	iat: string,
	exp: string,
	issued: string,
	expires: string
}
