import koa, { Next } from "koa";
import Router from "koa-router";
import appRestriction from "../middleware/appRestriction";
import { Utility as Util } from "../repositories/UtilityRepository";
import { UtilityErrors as Err } from "../types/Constants";
import { IResponse } from "../types/IAbstract";

const router: Router = new Router({ prefix: "/utility" });
router.use(appRestriction);

router.get("/filter/user", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	const email: string = ctx.request.query.email;
	const id: number = ctx.request.query.id;
	if (!email && !id) {
		throw Error(Err.missingParams);
	}
	try {
		ctx.body = {
			ok: true,
			status: 200,
			data: await Util.FilterUser(email, id)
		} as IResponse;
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

export default router;