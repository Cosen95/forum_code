/**
 * 用户关系（关注/被关注） controller
 */
const {
  getUsersByFollower,
  addFollower,
  deleteFollower
} = require("../services/user-relation");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo
} = require("../model/ErrorInfo");

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

/**
 * 取消关注
 *
 * @param {*} myUserId 当前登录的用户id
 * @param {*} curUserId 要被关注的用户id
 * @returns
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteFollowerFailInfo);
}

module.exports = {
  getFans,
  follow,
  unFollow
};
