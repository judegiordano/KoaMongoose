import Router from "koa-router";
import User from "./UserController";

const router = new Router({ prefix: "/api" });

router.use(User.routes()).use(User.allowedMethods());

export default router;
