import koa, { Next } from "koa";
import Router from "koa-router";
import * as T from "../types/IUserActions";
import { IResponse, IJwtPayload } from "../types/IAbstract";
import * as checks from "../helpers/businessLogic";
import { signUser } from "../helpers/jwt";
import jwt from "../middleware/jwt";
import user from "../repositories/UserRepository";

const router = new Router({ prefix: "/user" });

router.post("/login", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {

	const req = checks.checkLogin(ctx.request.body as T.ILogin);

	try {
		const query: IJwtPayload = await user.Login(req);
		ctx.body = { token: await signUser(query) };
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/register", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {

	const req = checks.checkRegister(ctx.request.body as T.IRegister);

	try {
		const query: IJwtPayload = await user.Register(req);
		ctx.body = { token: await signUser(query) };
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/validate", jwt, async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	try {
		ctx.body = ctx.state.jwt;
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/update/email", jwt, async (ctx: koa.Context, next: koa.Next): Promise<Next> => {

	const req = checks.checkUpdateEmail(ctx.request.body as T.IUpdateEmail);

	try {
		const query = await user.UpdateEmail({
			id: ctx.state.jwt.id,
			email: ctx.state.jwt.email,
			newEmail: req.newEmail
		});

		ctx.body = { token: await signUser(query) };
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/update/password", jwt, async (ctx: koa.Context, next: koa.Next): Promise<Next> => {

	const req = checks.checkUpdatePassword(ctx.request.body as T.IUpdatePass);

	try {
		const query = await user.UpdatePassword({
			id: ctx.state.jwt.id,
			email: ctx.state.jwt.email,
			newPassword: req.newPassword
		});

		ctx.body = { token: await signUser(query) };
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/delete", jwt, async (ctx: koa.Context, next: koa.Next): Promise<Next> => {

	const req = checks.checkDeleteAccount(ctx.request.body as T.IDeleteAccount);

	try {
		await user.DeleteUser({
			id: ctx.state.jwt.id,
			email: req.email,
			password: req.password
		});

		ctx.body = {
			ok: true,
			status: 200,
			data: "account deleted"
		} as IResponse;
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.post("/forgotpassword", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {

	const req = checks.checkForgotPassword(ctx.request.body);

	try {
		await user.ForgotPassword(req.email);
		ctx.body = {
			ok: true,
			status: 200,
			data: `email sent to ${req.email}`
		} as IResponse;
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

export default router;