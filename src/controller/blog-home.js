/**
 * @description 博客首页 controller
 *
 */
const { createBlog, getFollowersBlogList } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const { PAGE_SIZE } = require("../config/constant");
const xss = require("xss");

/**
 * 创建微博
 *
 * @param {*} { userId, content, image }
 * @returns
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    });
    return new SuccessModel(blog);
  } catch (error) {
    console.log(error.message, error.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

/**
 * 获取首页微博列表
 *
 * @param {*} userId
 * @param {number} [pageIndex=0]
 * @returns
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  });
  const { count, blogList } = result;
  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  });
}

module.exports = {
  create,
  getHomeBlogList
};
