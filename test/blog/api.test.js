const server = require("../server");
const { COOKIE } = require("../baseTestInfo");

let BLOG_ID = "";

test("创建一条微博，应该可以成功", async () => {
  const content = "测试创建微博_" + Date.now();
  const image = "xxx.png";

  const res = await server
    .post("/api/blog/create")
    .send({ content, image })
    .set("cookie", COOKIE);
  expect(res.body.errno).toBe(0);
  expect(res.body.data.content).toBe(content);
  expect(res.body.data.image).toBe(image);
  // 记录微博ID
  BLOG_ID = res.body.data.id;
});
