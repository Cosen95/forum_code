const router = require("koa-router")();
const { loginCheck } = require("../../middlewares/loginChecks");
const { getAtMeBlogList } = require("../../controller/blog-at");
const { getBlogListStr } = require("../../utils/blog");

router.prefix("/api/atMe");

router.get("/loadMore/:pageIndex", loginCheck, async ctx => {
  let { pageIndex } = ctx.params;

  pageIndex = parseInt(pageIndex); // 转换 number 类型
  const { id: userId } = ctx.session.userInfo;
  const result = await getAtMeBlogList(userId, pageIndex);
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
});

module.exports = router;
