/**
 * @description 用户关系数据模型
 */
const seq = require("../sequelize.js");
const { INTEGER } = require("../types.js");

const UserRelation = seq.define("userRelation", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: "用户 id"
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: "被关注用户的 id"
  }
});

module.exports = UserRelation;
