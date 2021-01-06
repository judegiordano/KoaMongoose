export interface ILogin {
	email: string,
	password: string
}

export interface IRegister {
	email: string,
	password: string
}

export interface IUpdateEmail {
	_id: string,
	email: string,
	newEmail: string
}

export interface IUpdatePass {
	_id: string,
	email: string,
	newPassword: string
}

export interface IDeleteAccount {
	_id: string,
	email: string,
	password: string
}