import jwt from "jsonwebtoken";
import dateFormat from "dateformat";
import config from "./config";
import { IJWT, IJwtPayload } from "../types/IAbstract";

export default class Jwt {

	public static async Sign(payload: IJwtPayload): Promise<string> {
		try {
			return jwt.sign(payload, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (e) {
			throw Error(e);
		}
	}

	public static async Verify(token: string): Promise<IJWT> {
		try {
			const data = <IJWT>jwt.verify(token, config.JWT_SECRET);
			return {
				_id: data._id,
				id: data.id,
				created: data.created,
				activated: data.activated,
				email: data.email,
				iat: data.iat,
				exp: data.exp,
				issued: dateFormat(new Date(parseInt(data.iat) * 1000), "yyyy-mm-dd h:MM:ss"),
				expires: dateFormat(new Date(parseInt(data.exp) * 1000), "yyyy-mm-dd h:MM:ss")
			};
		} catch (e) {
			throw Error(e);
		}
	}

	public static async SignUser(user: IJwtPayload): Promise<string> {
		const token = await Jwt.Sign({
			_id: user._id,
			id: user.id,
			email: user.email,
			created: user.created,
			activated: user.activated
		} as IJwtPayload);
		return token;
	}
}