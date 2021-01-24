import User, { IUser } from "../models/User";
import { UtilityErrors as Err } from "../types/Constants";

export default class UserRepository {

	public static async FilterUser(email: string, id: number): Promise<IUser> {
		try {
			const user: IUser = await User.find({
				$or: [
					{ email: email },
					{ id: id }
				]
			}).lean();
			if (!user) {
				throw Error(Err.wrongCredentials);
			}
			return user;
		} catch (e) {
			throw Error(e);
		}
	}
}