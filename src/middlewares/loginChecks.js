const { ErrorModel } = require("../model/ResModel");
const { loginCheckFailInfo } = require("../model/ErrorInfo");

/**
 * api登录验证
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next();
    return;
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo);
}

async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next();
    return;
  }
  // 未登录
  const currentUrl = ctx.url;
  ctx.redirect("/login?url=" + encodeURIComponent(currentUrl));
}

module.exports = {
  loginCheck,
  loginRedirect
};
