import Router from "koa-router";
import User from "./UserController";
import Utility from "./UtilityController";

const router = new Router({ prefix: "/api" });

router.use(User.routes()).use(User.allowedMethods());
router.use(Utility.routes()).use(Utility.allowedMethods());

export default router;
