const router = require("koa-router")();
const { isExist, register } = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");
router.prefix("/api/user");

// 注册
router.post(
  "/register",
  // 入参格式校验
  genValidator(userValidate),
  async ctx => {
    const { userName, password, gender } = ctx.request.body;
    ctx.body = await register({
      userName,
      password,
      gender
    });
  }
);

// 用户名是否存在
router.post("/isExist", async ctx => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});

module.exports = router;
