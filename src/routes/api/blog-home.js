const router = require("koa-router")();
const { loginCheck } = require("../../middlewares/loginChecks");
const { create } = require("../../controller/blog-home");

router.prefix("/api/blog");

// 创建微博
router.post("/create", loginCheck, async ctx => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  ctx.body = await create({ userId, content, image });
});

module.exports = router;
