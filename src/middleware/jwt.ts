import Koa, { Next } from "koa";
import { verify } from "../helpers/jwt";
import { JWTErrs } from "../types/Constants";

const authenticateToken = async (ctx: Koa.Context, next: Koa.Next): Promise<Next> => {
	const authHeader = ctx.header["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		ctx.state.jwt = null;
		throw Error(JWTErrs.invalidToken);
	}

	try {
		const payload = await verify(token);
		if (!payload) {
			ctx.state.jwt = null;
			throw Error(JWTErrs.invalidToken);
		}

		ctx.state.jwt = payload;
		return await next();
	} catch (e) {
		ctx.state.jwt = null;
		throw Error(e);
	}
};

export default authenticateToken;