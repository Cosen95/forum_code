/**
 * @description @关系 service
 */
const { AtRelation } = require("../db/model/index");

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

module.exports = {
  createAtRelation,
  getAtRelationCount
};
