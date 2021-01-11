export interface IResponse {
	ok: boolean,
	status: number,
	message: string
}

export interface IJwtPayload {
	_id: string,
	id: number,
	created: Date,
	activated: boolean,
	email: string
}

export interface IJWT {
	_id: string,
	id: number,
	created: Date,
	activated: boolean,
	email: string,
	iat: string,
	exp: string,
	issued: string,
	expires: string
}

export interface IMailOptions {
	to: string,
	from?: string,
	subject: string,
	text: string
}