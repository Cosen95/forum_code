/**
 * @description blog view路由
 */
const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog-profile");
const { getSquareBlogList } = require("../../controller/blog-square");

const { isExist } = require("../../controller/user");

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
  // 已登录用户的信息
  const hasLoginUserInfo = ctx.session.userInfo;
  const hasLoginUserName = hasLoginUserInfo.userName;
  let curUserInfo = {};
  const { userName: curUserName } = ctx.params;
  const isMe = hasLoginUserName === curUserName;
  if (isMe) {
    // 是当前登录用户
    curUserInfo = hasLoginUserInfo;
  } else {
    // 不是当前登录用户
    const existRes = await isExist(curUserName);
    if (existRes.errno !== 0) {
      // 用户名不存在
      return;
    }
    // 用户名存在
    curUserInfo = existRes.data;
  }
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
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  });
});
// 广场
router.get("/square", loginRedirect, async ctx => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {};

  await ctx.render("square", {
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
