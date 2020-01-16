const router = require("koa-router")();
const { loginRedirect } = require("../middlewares/loginChecks");

router.get("/", loginRedirect, async ctx => {
  await ctx.render("index", {
    title: "Hello Koa 2!"
  });
});

router.get("/string", async ctx => {
  ctx.body = "koa2 string";
});

router.get("/json", async ctx => {
  const session = ctx.session;
  if (session.viewNum === null) {
    session.viewNum = 0;
  }
  session.viewNum++;

  ctx.body = {
    title: "koa2 json",
    viewNum: session.viewNum
  };
});

module.exports = router;
