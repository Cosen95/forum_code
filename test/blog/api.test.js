const server = require("../server");
const { COOKIE, USER_NAME } = require("../baseTestInfo");

let BLOG_ID = "";

test("创建一条微博，应该可以成功", async () => {
  const content = "测试创建微博_" + Date.now();
  const image = "xxx.png";

  const res = await server
    .post("/api/blog/create")
    .send({ content, image })
    .set("cookie", COOKIE);
  console.log("创建微博单元测试", res);
  expect(res.body.errno).toBe(0);
  expect(res.body.data.content).toBe(content);
  expect(res.body.data.image).toBe(image);
  // 记录微博ID
  BLOG_ID = res.body.data.id;
});

test("个人主页加载第一页数据，应该可以成功", async () => {
  const res = await server
    .get(`/api/profile/loadMore/${USER_NAME}/0`)
    .set("cookie", COOKIE);
  expect(res.body.errno).toBe(0);

  const data = res.body.data;
  expect(data).toHaveProperty("isEmpty");
  expect(data).toHaveProperty("blogList");
  expect(data).toHaveProperty("pageSize");
  expect(data).toHaveProperty("pageIndex");
  expect(data).toHaveProperty("count");
});
