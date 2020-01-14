/**
 * @description user controller
 */
const { getUserInfo } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { registerUserNameExistInfo } = require("../model/ErrorInfo");
/**
 * 用户名是否存在
 *
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户信息存在
    return new SuccessModel(userInfo);
  } else {
    // 用户信息不存在
    return new ErrorModel(registerUserNameExistInfo);
  }
}

module.exports = {
  isExist
};
