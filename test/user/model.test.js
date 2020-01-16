const { User } = require("../../src/db/model/index");

test("User 模型的各个属性符合预期", () => {
  const user = User.build({
    userName: "lilei",
    password: "lilei1996",
    nickName: "李雷",
    gender: 1,
    picture: "xxx.png",
    city: "上海"
  });
  // 验证属性是否符合预期
  expect(user.userName).toBe("lilei");
  expect(user.password).toBe("lilei1996");
  expect(user.nickName).toBe("李雷");
  expect(user.gender).toBe(1);
  expect(user.picture).toBe("xxx.png");
  expect(user.city).toBe("上海");
});
