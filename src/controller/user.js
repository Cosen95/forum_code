/**
 * @description user controller
 */
const { getUserInfo, createUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerFailInfo
} = require("../model/ErrorInfo");
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

async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerFailInfo);
  }
  try {
    await createUser({
      userName,
      password,
      gender
    });
    return new SuccessModel();
  } catch (error) {
    return new ErrorModel(registerFailInfo);
  }
}

module.exports = {
  isExist,
  register
};
