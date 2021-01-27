import User, { IUser } from "../models/User";
import * as T from "../types/IUserActions";
import AutoIncrement from "../helpers/autoIncrement";
import Password from "../helpers/password";
import { UserErrors, Nums } from "../types/Constants";
import Mailer from "../services/mailer";
import UserRepositoryBase from "./abstract/UserRepositoryBase";

class UserRepository extends UserRepositoryBase {

	public async Login(login: T.ILogin): Promise<IUser> {
		try {
			const query: IUser = await User.findOne({
				email: login.email,
			});
			if (!query) throw Error(UserErrors.emailNotFound);

			const hash: boolean = await Password.Compare(login.password, query.password);
			if (!hash) throw Error(UserErrors.wrongPassword);

			return query;
		} catch (e) {
			throw Error(e);
		}
	}

	public async Register(register: T.IRegister): Promise<IUser> {
		try {
			const exists: IUser = await User.findOne({
				email: register.email
			});
			if (exists) throw Error(UserErrors.emailTaken);
		} catch (e) {
			throw Error(e);
		}

		try {
			const hashedPass: string = await Password.Hash(register.password);

			const newUser: IUser = new User();
			newUser.id = await AutoIncrement("User");
			newUser.email = register.email;
			newUser.password = hashedPass;
			newUser.activated = false;
			newUser.created = new Date();
			newUser.lastUpdated = new Date();
			newUser.isNew = true;

			return await newUser.save();
		} catch (e) {
			throw Error(e);
		}
	}

	public async UpdateEmail(update: T.IUpdateEmail): Promise<IUser> {
		try {
			const exists: IUser = await User.findOne({
				id: update.id,
				email: update.email
			});
			if (!exists) throw Error(UserErrors.wrongCreds);

			const timestamp: number = +new Date(exists.lastUpdated);
			const now: number = +new Date();
			if ((now - timestamp) < Nums.oneDay) {
				throw Error(UserErrors.rateLimit);
			}

			const taken: IUser = await User.findOne({ email: update.newEmail });
			if (taken) throw Error(UserErrors.emailTaken);

			exists.email = update.newEmail;
			exists.lastUpdated = new Date();
			exists.isNew = false;

			return await exists.save();
		} catch (e) {
			throw Error(e);
		}
	}

	public async UpdatePassword(update: T.IUpdatePass): Promise<IUser> {
		try {
			const exists: IUser = await User.findOne({
				id: update.id,
				email: update.email
			});
			if (!exists) throw Error(UserErrors.wrongCreds);

			const timestamp: number = +new Date(exists.lastUpdated);
			const now: number = +new Date();
			if ((now - timestamp) < Nums.oneDay) {
				throw Error(UserErrors.rateLimit);
			}

			const hashedPass: string = await Password.Hash(update.newPassword);

			exists.password = hashedPass;
			exists.lastUpdated = new Date();
			exists.isNew = false;

			return await exists.save();
		} catch (e) {
			throw Error(e);
		}
	}

	public async DeleteUser(remove: T.IDeleteAccount): Promise<void> {
		try {
			const exists: IUser = await User.findOne({
				id: remove.id,
				email: remove.email
			});
			if (!exists) throw Error(UserErrors.wrongCreds);

			const hash: boolean = await Password.Compare(remove.password, exists.password);
			if (!hash) throw Error(UserErrors.wrongPassword);

			await User.deleteOne(exists);

		} catch (e) {
			throw Error(e);
		}
	}

	public async ForgotPassword(email: string): Promise<void> {
		try {
			const query: IUser = await User.findOne({
				email: email,
			});
			if (!query) throw Error(UserErrors.emailNotFound);

			await Mailer.SendMail({ to: query.email, subject: "Test", text: "This is just a test" });
		} catch (e) {
			throw Error(e);
		}
	}
}

export default new UserRepository();