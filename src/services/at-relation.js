/**
 * @description @关系 service
 */
const { AtRelation, Blog, User } = require("../db/model/index");
const { formatBlog, formatUser } = require("./_format");

/**
 * 创建@关系
 *
 * @param {*} blogId
 * @param {*} userId
 * @returns
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  });
  return result.dataValues;
}

/**
 * 获取@用户的微博数量（未读的）
 *
 * @param {*} userId
 * @returns
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  });
  return result.count;
}

/**
 * 获取@用户的微博列表
 *
 * @param {*} { userId, pageIndex, pageSize = 10 }
 * @returns
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      {
        model: AtRelation,
        attributes: ["userId", "blogId"],
        where: { userId }
      },
      {
        model: User,
        attributes: ["userName", "nickName", "picture"]
      }
    ]
  });

  // 格式化
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

/**
 * 更新@用户的微博列表的已读状态
 *
 * @param {*} { newIsRead }
 * @param {*} { userId, isRead }
 * @returns
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
  // 拼接更新内容
  const updateData = {};
  if (newIsRead) {
    updateData.isRead = newIsRead;
  }

  // 拼接查询条件
  const whereData = {};
  if (userId) {
    whereData.userId = userId;
  }
  if (isRead) {
    whereData.isRead = isRead;
  }

  // 更新操作
  const result = await AtRelation.update(updateData, {
    where: whereData
  });
  return result[0] > 0;
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
};
