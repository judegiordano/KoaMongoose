import User, { IUser } from "../models/User";
import UtilityRepositoryBase from "./abstract/UtilityRepositoryBase";
import { UtilityErrors as Err } from "../types/Constants";

class UtilityRepository extends UtilityRepositoryBase {

	public async FilterUser(email: string, id: number): Promise<IUser> {
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

export default new UtilityRepository();