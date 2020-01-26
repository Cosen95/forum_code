/**
 * @description blog model test
 */
const { Blog } = require("../../src/db/model/index");

test("Blog 模型的各个属性符合预期", () => {
  const blog = Blog.build({
    userId: 1,
    content: "微博内容测试",
    image: "xxx.png"
  });
  // 验证属性是否符合预期
  expect(blog.userId).toBe(1);
  expect(blog.content).toBe("微博内容测试");
  expect(blog.image).toBe("xxx.png");
});
