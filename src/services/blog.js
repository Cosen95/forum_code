/**
 * @description blog service
 */
const { Blog, User } = require("../db/model/index");
const { formatUser, formatBlog } = require("./_format.js");

async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  });
  return result.dataValues;
}

async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const whereOpts = {};
  if (userName) {
    whereOpts.userName = userName;
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      // 连表查询
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
        where: whereOpts
      }
    ]
  });
  // result.count 总数
  // result.rows  查询结果（数组）
  let blogList = result.rows.map(row => row.dataValues);
  // 格式化
  blogList = formatBlog(blogList);
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues;
    blogItem.user = formatUser(user);
    return blogItem;
  });

  return {
    count: result.count,
    blogList
  };
}

module.exports = {
  createBlog,
  getBlogListByUser
};
