/**
 * @description 数据模型入口文件
 */
const User = require("./User");
const Blog = require("./Blog");
const UserRelation = require("./UserRelation");

Blog.belongsTo(User, {
  // 关联外键
  foreignKey: "userId"
});
UserRelation.belongsTo(User, {
  foreignKey: "followerId"
});
User.hasMany(UserRelation, {
  foreignKey: "userId"
});
Blog.belongsTo(UserRelation, {
  foreignKey: "userId",
  targetKey: "followerId"
});
module.exports = {
  User,
  Blog,
  UserRelation
};
