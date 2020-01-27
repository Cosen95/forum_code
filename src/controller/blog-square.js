const { PAGE_SIZE } = require("../config/constant");
const { SuccessModel } = require("../model/ResModel");
const { getSquareCacheList } = require("../cache/blog");

async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE);
  const blogList = result.blogList;

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  });
}

module.exports = {
  getSquareBlogList
};
