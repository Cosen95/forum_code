/**
 * @description 数据模型入口文件
 */
const User = require("./User");
const Blog = require("./Blog");

Blog.belongsTo(User, {
  // 关联外键
  foreignKey: "userId"
});
module.exports = {
  User,
  Blog
};
