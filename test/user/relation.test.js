const server = require("../server");
const { getFans, getFollowers } = require("../../src/controller/user-relation");

const {
  curID,
  COOKIE,
  USER_NAME,
  otherId,
  OTHER_COOKIE,
  OTHER_USER_NAME
} = require("../baseTestInfo");

// 当前登录用户（森林）先取消关注另一个用户（之晨）
test("先取消关注", async () => {
  const res = await server
    .post("/api/profile/unFollow")
    .send({ userId: otherId })
    .set("cookie", COOKIE);
  expect(1).toBe(1);
});

test("森林关注之晨，应该可以成功", async () => {
  const res = await server
    .post("/api/profile/follow")
    .send({ userId: otherId })
    .set("cookie", COOKIE);
  expect(res.body.errno).toBe(0);
});

test("获取之晨的粉丝，应该有森林", async () => {
  const result = await getFans(otherId);
  const { count, fansList } = result.data;
  const hasFans = fansList.some(item => {
    return item.userName === USER_NAME;
  });

  expect(count > 0).toBe(true);
  expect(hasFans).toBe(true);
});

test("获取森林的关注人，应该有之晨", async () => {
  const result = await getFollowers(curID);
  const { count, followersList } = result.data;
  const hasFollowed = followersList.some(item => {
    return item.userName === OTHER_USER_NAME;
  });

  expect(count > 0).toBe(true);
  expect(hasFollowed).toBe(true);
});

test("获取森林的@列表，应该有之晨", async () => {
  const res = await server.get("/api/user/getAtList").set("cookie", COOKIE);
  const atList = res.body;
  const hasAt = atList.some(item => {
    return item.indexOf(`- ${OTHER_USER_NAME}`) > 0;
  });

  expect(hasAt).toBe(true);
});

test("森林取消关注之晨，应该可以成功", async () => {
  const res = await server
    .post("/api/profile/unFollow")
    .send({ userId: otherId })
    .set("cookie", COOKIE);
  expect(res.body.errno).toBe(0);
});
