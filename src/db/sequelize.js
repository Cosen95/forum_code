/**
 * @description sequelize实例
 */
const Sequelize = require("sequelize");
const { MYSQL_CONF } = require("../config/db.js");
const { host, user, password, port, database } = MYSQL_CONF;

const conf = {
  host,
  dialect: "mysql"
};

if (process.env.NODE_ENV === "jest") {
  // 单元测试不去打印sequelize日志
  conf.logging = () => {};
}

if (process.env.NODE_ENV === "production") {
  // 线上环境
  // 连接池
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000 // 如果一个连接池10s之内没有被使用，则释放
  };
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
