export interface ILogin {
	email: string,
	password: string
}

export interface IRegister {
	email: string,
	password: string
}

export interface IUpdateEmail {
	id: number,
	email: string,
	newEmail: string
}

export interface IUpdatePass {
	id: number,
	email: string,
	newPassword: string
}

export interface IDeleteAccount {
	id: number,
	email: string,
	password: string
}