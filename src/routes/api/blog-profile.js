const router = require("koa-router")();
const { loginCheck } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog-profile");
const { follow, unFollow } = require("../../controller/user-relation");
const { getBlogListStr } = require("../../utils/blog");

router.prefix("/api/profile");

// 加载更多
router.get("/loadMore/:userName/:pageIndex", loginCheck, async ctx => {
  let { userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getProfileBlogList(userName, pageIndex);

  // 渲染为html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList);

  ctx.body = result;
});

// 关注
router.post("/follow", loginCheck, async ctx => {
  const { id: myUserId } = ctx.session.userInfo;
  const { userId: curUserId } = ctx.request.body;
  ctx.body = await follow(myUserId, curUserId);
});

// 取消关注
router.post("/unFollow", loginCheck, async ctx => {
  const { id: myUserId } = ctx.session.userInfo;
  const { userId: curUserId } = ctx.request.body;
  ctx.body = await unFollow(myUserId, curUserId);
});

module.exports = router;
