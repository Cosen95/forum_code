/**
 * @description user service
 */

const { User } = require("../db/model/index.js");
const { formatUser } = require("./_format.js");
const { addFollower } = require("./user-relation");
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

  const data = result.dataValues;

  // 自己关注自己（为了方便首页获取数据）
  addFollower(data.id, data.id);
  return data;
}

/**
 * 删除用户
 *
 * @param {string} userName 用户名
 * @returns
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  });
  // result 删除的行数
  return result > 0;
}

/**
 * 更新用户信息
 *
 * @param {*} { newPassword, newNickName, newPicture, newCity }
 * @param {*} { userName, password }
 * @returns
 */
async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  const updateData = {}; //  更新内容
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }

  const whereData = {
    // 查询条件
    userName
  };
  if (password) {
    whereData.password = password;
  }

  // 修改逻辑
  const result = await User.update(updateData, {
    where: whereData
  });

  return result[0] > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
};
