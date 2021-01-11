import koa, { Next } from "koa";
import Router from "koa-router";
import appRestriction from "../middleware/appRestriction";
import utility from "../repositories/UtilityRepository";

const router = new Router({ prefix: "/utility" });
router.use(appRestriction);

router.get("/user/id/:id", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	const req: number = ctx.params.id;
	try {
		ctx.body = await utility.GetOneById(req);
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

router.get("/user/email/:email", async (ctx: koa.Context, next: koa.Next): Promise<Next> => {
	const req: string = ctx.params.email;
	try {
		ctx.body = await utility.GetOneByEmail(req);
		return await next();
	} catch (e) {
		throw Error(e);
	}
});

export default router;