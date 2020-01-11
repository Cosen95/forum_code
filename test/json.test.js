const server = require("./server.js");

test("json 接口返回数据格式正确", async () => {
  const res = await server.get("/json");
  // expect(res.body).toEqual({
  //   title: "koa2 json"
  // });
  expect(res.body.title).toBe("koa2 json");
});
