/**
 * @description 错误信息
 */
module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: "用户名不存在"
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: "注册失败，请重试"
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    errno: 10009,
    message: "数据格式校验错误"
  },
  // 登录失败
  loginFailInfo: {
    errno: 10004,
    message: "登录失败，用户名或密码错误"
  },
  // 未登录
  loginCheckFailInfo: {
    errno: 10005,
    message: "您尚未登录"
  },
  // 删除用户失败
  deleteUserFailInfo: {
    errno: 10010,
    message: "删除用户失败"
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    errno: 10007,
    message: "上传文件尺寸过大"
  }
};
