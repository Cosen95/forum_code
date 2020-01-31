/**
 * 用户关系（关注/被关注） controller
 */
const {
  getUsersByFollower,
  addFollower
} = require("../services/user-relation");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { addFollowerFailInfo } = require("../model/ErrorInfo");

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

/**
 *
 * 关注
 * @param {*} myuserId 当前登录的用户id
 * @param {*} curUserId 要被关注的用户id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId);
    return new SuccessModel();
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo);
  }
}

module.exports = {
  getFans,
  follow
};
