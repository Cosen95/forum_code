/**
 * @description user service
 */

const { User } = require("../db/model/index.js");
const { formatUser } = require("./_format.js");
/**
 * 获取用户信息
 *
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @returns
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }

  // 查询
  const result = await User.findOne({
    attributes: ["id", "userName", "nickName", "picture", "city"],
    where: whereOpt
  });
  console.log("查询用户信息res", result);
  if (!result) {
    return result;
  }
  // 数据格式化处理
  const formatRes = formatUser(result.dataValues);
  return formatRes;
}

/**
 * 创建用户
 *
 * @param {*} { userName, password, gender = 3, nickName }
 * @returns
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName || "",
    gender
  });

  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser
};
