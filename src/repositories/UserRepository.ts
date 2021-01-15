import User, { IUser } from "../models/User";
import { IDeleteAccount, ILogin, IRegister, IUpdateEmail, IUpdatePass } from "../types/IUserActions";
import AutoIncrement from "../helpers/autoIncrement";
import { compare, hash } from "../helpers/password";
import { UserErrors, Nums } from "../types/Constants";
import sendMail from "../services/mailer";

export default class UserRepository {

	public static async Login(login: ILogin): Promise<IUser> {
		try {
			const query = <IUser>await User.findOne({
				email: login.email,
			});
			if (!query) throw Error(UserErrors.emailNotFound);

			const hash = await compare(login.password, query.password);
			if (!hash) throw Error(UserErrors.wrongPassword);

			return query;
		} catch (e) {
			throw Error(e);
		}
	}

	public static async Register(register: IRegister): Promise<IUser> {
		try {
			const exists = <IUser>await User.findOne({
				email: register.email
			});
			if (exists) throw Error(UserErrors.emailTaken);
		} catch (e) {
			throw Error(e);
		}

		try {
			const hashedPass = await hash(register.password);

			const newUser = new User();
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

	public static async UpdateEmail(update: IUpdateEmail): Promise<IUser> {
		try {
			const exists = <IUser>await User.findOne({
				id: update.id,
				email: update.email
			});
			if (!exists) throw Error(UserErrors.wrongCreds);

			const timestamp = +new Date(exists.lastUpdated);
			const now = +new Date();
			if ((now - timestamp) < Nums.oneDay) {
				throw Error(UserErrors.rateLimit);
			}

			const taken = <IUser>await User.findOne({ email: update.newEmail });
			if (taken) throw Error(UserErrors.emailTaken);

			exists.email = update.newEmail;
			exists.lastUpdated = new Date();
			exists.isNew = false;

			return await exists.save();
		} catch (e) {
			throw Error(e);
		}
	}

	public static async UpdatePassword(update: IUpdatePass): Promise<IUser> {
		try {
			const exists = <IUser>await User.findOne({
				id: update.id,
				email: update.email
			});
			if (!exists) throw Error(UserErrors.wrongCreds);

			const timestamp = +new Date(exists.lastUpdated);
			const now = +new Date();
			if ((now - timestamp) < Nums.oneDay) {
				throw Error(UserErrors.rateLimit);
			}

			const hashedPass = await hash(update.newPassword);

			exists.password = hashedPass;
			exists.lastUpdated = new Date();
			exists.isNew = false;

			return await exists.save();
		} catch (e) {
			throw Error(e);
		}
	}

	public static async DeleteUser(remove: IDeleteAccount): Promise<void> {
		try {
			const exists = <IUser>await User.findOne({
				id: remove.id,
				email: remove.email
			});
			if (!exists) throw Error(UserErrors.wrongCreds);

			const hash = await compare(remove.password, exists.password);
			if (!hash) throw Error(UserErrors.wrongPassword);

			await User.deleteOne(exists);

		} catch (e) {
			throw Error(e);
		}
	}

	public static async ForgotPassword(email: string): Promise<void> {
		try {
			const query = <IUser>await User.findOne({
				email: email,
			});
			if (!query) throw Error(UserErrors.emailNotFound);

			await sendMail({ to: query.email, subject: "Test", text: "This is just a test" });
		} catch (e) {
			throw Error(e);
		}
	}
}