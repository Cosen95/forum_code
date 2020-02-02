/**
 * @description blog service
 */
const { Blog, User, UserRelation } = require("../db/model/index");
const { formatUser, formatBlog } = require("./_format.js");

/**
 * 创建微博
 *
 * @param {*} { userId, content, image }
 * @returns
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  });
  return result.dataValues;
}

/**
 * 根据用户获取微博列表
 *
 * @param {*} { userName, pageIndex = 0, pageSize = 10 }
 * @returns
 */
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

/**
 * 获取关注者的微博列表
 *
 * @param {*} { userId, pageIndex = 0, pageSize = 10 }
 * @returns
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"]
      },
      {
        model: UserRelation,
        attributes: ["userId", "followerId"],
        where: { userId }
      }
    ]
  });

  // 格式化数据
  let blogList = result.rows.map(row => row.dataValues);
  blogList = formatBlog(blogList);
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return blogItem;
  });

  return {
    count: result.count,
    blogList
  };
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
};
