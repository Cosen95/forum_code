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

module.exports = {
  createAtRelation
};
