/**
 * @description sequelize同步数据库
 */
const seq = require("./sequelize.js");

seq
  .authenticate()
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("err");
  });

// 执行同步
seq.sync({ force: true }).then(() => {
  process.exit();
});
