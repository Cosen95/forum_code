/**
 * 用户关系（关注/被关注） controller
 */
const { getUsersByFollower } = require("../services/user-relation");
const { SuccessModel } = require("../model/ResModel");

/**
 * 根据userid获取粉丝列表
 *
 * @param {*} userId 用户id
 * @returns
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId);
  return new SuccessModel({
    count,
    fansList: userList
  });
}

module.exports = {
  getFans
};
