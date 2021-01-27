/* eslint-disable no-unused-vars */
import { IUser } from "../../models/User";

export default abstract class UtilityRepositoryBase {
	public abstract FilterUser(email: string, id: number): Promise<IUser>;
}
