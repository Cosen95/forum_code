/**
 * @description user controller
 */
const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require("../model/ErrorInfo");
const doCrypto = require("../utils/crypto");
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

/**
 * 注册
 *
 * @param {*} { userName, password, gender }
 * @returns
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerFailInfo);
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    });
    return new SuccessModel();
  } catch (error) {
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 *
 * @param {*} ctx
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @returns
 */
async function login(ctx, userName, password) {
  let cryPwd = doCrypto(password);
  const userInfo = await getUserInfo(userName, cryPwd);
  console.log("用户信息", userInfo);
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }

  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

/**
 * 删除当前用户
 *
 * @param {string} userName
 * @returns
 */
async function deleteCurrentUser(userName) {
  const result = await deleteUser(userName);
  if (result) {
    // boolean true表示删除成功
    return new SuccessModel();
  }
  // 删除失败
  return new ErrorModel(deleteUserFailInfo);
}

/**
 * 修改用户信息
 *
 * @param {*} ctx
 * @param {*} { nickName, city, picture }
 * @returns
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    // 昵称未填写，用用户名重写
    nickName = userName;
  }

  const result = await updateUser(
    { newNickName: nickName, newPicture: picture, newCity: city },
    { userName }
  );
  if (result) {
    // 更新成功需更新session中的用户信息
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    });
    return new SuccessModel();
  }

  // 更新失败
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改用户密码
 *
 * @param {*} userName
 * @param {*} password
 * @param {*} newPassword
 * @returns
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    },
    {
      userName,
      password: doCrypto(password)
    }
  );

  if (result) {
    // 修改密码成功
    return new SuccessModel();
  }

  // 修改密码失败
  return new ErrorModel(changePasswordFailInfo);
}

/**
 * 注销
 *
 * @param {*} ctx
 * @returns
 */
async function logout(ctx) {
  delete ctx.session.userInfo; // 清除session中用户信息
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo,
  changePassword,
  logout
};
