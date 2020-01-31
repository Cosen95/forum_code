/**
 * @description user-relation
 */
const { User, UserRelation } = require("../db/model/index");
const { formatUser } = require("./_format");

/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 *
 * @param {*} followerId 被关注人的用户id
 * @returns
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ["id", "userName", "nickName", "picture"],
    order: [["id", "desc"]],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  });

  // result.count 总数
  // result.rows 查询结果，数组

  let userList = result.rows.map(row => row.dataValues);
  userList = formatUser(userList);

  return {
    count: result.count,
    userList
  };
}

async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  });
  return result.dataValues;
}

module.exports = {
  getUsersByFollower,
  addFollower
};
