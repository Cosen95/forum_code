/**
 * @description 博客数据模型
 */
const seq = require("../sequelize.js");
const { STRING, INTEGER, TEXT } = require("../types.js");

const Blog = seq.define("blog", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: "用户ID"
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: "微博内容"
  },
  image: {
    type: STRING,
    comment: "图片地址"
  }
});

module.exports = Blog;
