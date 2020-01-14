/**
 * @description user service
 */

const { User } = require("../db/model/index.js");
const { formatUser } = require("./_format.js");
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
  if (!result) {
    return result;
  }
  // 数据格式化处理
  const formatRes = formatUser(result.dataValues);
  return formatRes;
}

module.exports = {
  getUserInfo
};
