const router = require("koa-router")();
const { loginCheck } = require("../../middlewares/loginChecks");
const { getSquareBlogList } = require("../../controller/blog-square");
const { getBlogListStr } = require("../../utils/blog");

router.prefix("/api/square");

router.get("/loadMore/:pageIndex", loginCheck, async ctx => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getSquareBlogList(pageIndex);
  // 渲染为html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  console.log("blogListTpl测试111111111", result.data.blogListTpl);

  ctx.body = result;
});

module.exports = router;
