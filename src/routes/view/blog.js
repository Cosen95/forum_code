/**
 * @description blog view路由
 */
const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog-profile");

// 首页
router.get("/", loginRedirect, async ctx => {
  await ctx.render("index", {});
});
// 个人主页
router.get("/profile", loginRedirect, async ctx => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});
router.get("/profile/:userName", loginRedirect, async ctx => {
  const { userName: curUserName } = ctx.params;
  const result = await getProfileBlogList(curUserName, 0);
  console.log("当前用户博客数据", result);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;
  console.log("博客列表", blogList);
  await ctx.render("profile", {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  });
});
module.exports = router;
