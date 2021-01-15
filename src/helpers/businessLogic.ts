import { IDeleteAccount, ILogin, IRegister, IUpdateEmail, IUpdatePass } from "../types/IUserActions";
import { RequestErrors } from "../types/Constants";

const passStrength = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "gm");
const isEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "gm");

export const checkRegister = (req: IRegister): IRegister => {
	if (!req.email || !req.password) throw Error(RequestErrors.missingBody);

	if (!isEmail.test(req.email)) {
		throw Error("please enter a valid email");
	}
	if (!passStrength.test(req.password)) {
		throw Error("password is too weak");
	}
	return req as IRegister;
};

export const checkLogin = (req: ILogin): ILogin => {
	if (!req.email || !req.password) throw Error(RequestErrors.missingBody);
	return req as ILogin;
};

export const checkUpdateEmail = (req: IUpdateEmail): IUpdateEmail => {
	if (!req.newEmail) throw Error(RequestErrors.missingNewEmail);
	return req as IUpdateEmail;
};

export const checkUpdatePassword = (req: IUpdatePass): IUpdatePass => {
	if (!req.newPassword) throw Error(RequestErrors.missingNewPassword);
	return req as IUpdatePass;
};

export const checkDeleteAccount = (req: IDeleteAccount): IDeleteAccount => {
	if (!req.password || !req.email) throw Error(RequestErrors.missingBody);
	return req as IDeleteAccount;
};

export const checkForgotPassword = (req: any): any => {
	if (!req.email) throw Error(RequestErrors.missingEmail);
	return req as any;
};