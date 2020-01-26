/**
 * @description 博客首页 controller
 *
 */
const { createBlog } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content,
      image
    });
    return new SuccessModel(blog);
  } catch (error) {
    console.log(error.message, error.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

module.exports = {
  create
};
