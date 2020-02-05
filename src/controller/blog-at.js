const { getAtRelationCount } = require("../services/at-relation");
const { SuccessModel } = require("../model/ResModel");

async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId);
  return new SuccessModel({
    count
  });
}

module.exports = {
  getAtMeCount
};
