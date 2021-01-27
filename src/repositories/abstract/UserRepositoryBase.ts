/* eslint-disable no-unused-vars */
import { IUser } from "../../models/User";
import * as T from "../../types/IUserActions";

export default abstract class UserRepositoryBase {
	public abstract Login(user: T.ILogin): Promise<IUser>;
	public abstract Register(register: T.IRegister): Promise<IUser>;
	public abstract UpdateEmail(update: T.IUpdateEmail): Promise<IUser>;
	public abstract UpdatePassword(update: T.IUpdatePass): Promise<IUser>;
	public abstract DeleteUser(remove: T.IDeleteAccount): Promise<void>;
	public abstract ForgotPassword(email: string): Promise<void>;
}