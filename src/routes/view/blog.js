/**
 * @description blog view路由
 */
const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");

// 首页
router.get("/", loginRedirect, async ctx => {
  await ctx.render("index", {});
});

module.exports = router;
