import User, { IUser } from "../models/User";
import { UtilityErrors as Err } from "../types/Constants";

export default class UserRepository {

	public static async GetOneById(id: string): Promise<IUser> {
		try {
			const user = await User.findOne({ _id: id });
			if (!user) {
				throw Error(Err.wrongId);
			}
			return user;
		} catch (e) {
			throw Error(e);
		}
	}

	public static async GetOneByEmail(email: string): Promise<IUser> {
		try {
			const user = await User.findOne({ email: email });
			if (!user) {
				throw Error(Err.wrongEmail);
			}
			return user;
		} catch (e) {
			throw Error(e);
		}
	}
}