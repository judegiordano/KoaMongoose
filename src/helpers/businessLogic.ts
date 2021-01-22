import { IDeleteAccount, ILogin, IRegister, IUpdateEmail, IUpdatePass } from "../types/IUserActions";
import { RequestErrors } from "../types/Constants";

const passStrength = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "gm");
const isEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "gm");

export default class BusinessLogic {

	public static CheckRegister(req: IRegister): IRegister {
		if (!req.email || !req.password) throw Error(RequestErrors.missingBody);

		if (!isEmail.test(req.email)) {
			throw Error("please enter a valid email");
		}
		if (!passStrength.test(req.password)) {
			throw Error("password is too weak");
		}
		return req as IRegister;
	}

	public static CheckLogin(req: ILogin): ILogin {
		if (!req.email || !req.password) throw Error(RequestErrors.missingBody);
		return req as ILogin;
	}

	public static CheckUpdateEmail(req: IUpdateEmail): IUpdateEmail {
		if (!req.newEmail) throw Error(RequestErrors.missingNewEmail);
		return req as IUpdateEmail;
	}

	public static CheckUpdatePassword(req: IUpdatePass): IUpdatePass {
		if (!req.newPassword) throw Error(RequestErrors.missingNewPassword);
		return req as IUpdatePass;
	}

	public static CheckDeleteAccount(req: IDeleteAccount): IDeleteAccount {
		if (!req.password || !req.email) throw Error(RequestErrors.missingBody);
		return req as IDeleteAccount;
	}

	public static CheckForgotPassword(req: any): any {
		if (!req.email) throw Error(RequestErrors.missingEmail);
		return req as any;
	}
}