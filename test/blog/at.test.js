const server = require("../server");
const { COOKIE, OTHER_COOKIE, OTHER_USER_NAME } = require("../baseTestInfo");

let BLOG_ID;

test("森林创建一条微博，@之晨，应该成功", async () => {
  const content = "单元测试自动创建的微博 @之晨 - " + OTHER_USER_NAME;
  const res = await server
    .post("/api/blog/create")
    .send({
      content
    })
    .set("cookie", COOKIE);
  expect(res.body.errno).toBe(0);

  // 记录微博 id
  BLOG_ID = res.body.data.id;
});

test("获取之晨的 @ 列表（第一页），应该有刚刚创建的微博", async () => {
  const res = await server
    .get("/api/atMe/loadMore/0")
    .set("cookie", OTHER_COOKIE);
  expect(res.body.errno).toBe(0);
  const data = res.body.data;
  const blogList = data.blogList;
  const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID);
  expect(isHaveCurBlog).toBe(true);
});
