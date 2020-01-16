const router = require("koa-router")();
const {
  isExist,
  register,
  login,
  deleteCurrentUser
} = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");
const { loginCheck } = require("../../middlewares/loginChecks");

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

// 登录
router.post("/login", async ctx => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
});

router.post("/delete", loginCheck, async ctx => {
  const { userName } = ctx.session.userInfo;
  if (process.env.NODE_ENV !== "production") {
    // 用于测试、开发环境
    // 生产环境禁止删除数据
    ctx.body = await deleteCurrentUser(userName);
  }
});

module.exports = router;
