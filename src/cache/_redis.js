/**
 * @description redis相关配置 get set
 */

// 解决方案
// 将web server和redis拆分为两个单独的服务
// 双方都是独立的，都是可扩展的（例如都扩展成集群）
// mysql也是一个单独的服务，也可扩展

// 为什么session适合用redis?
// session访问频繁，对性能要求极高
// session可不考虑断电数据丢失问题
// session数据量不会太大

// 为什么网站数据不适合用redis?
// 操作频率不是太高
// 断电断电不能丢失，必须保留
// 数据量太大，内存成本高
const redis = require("redis");
const { REDIS_CONF } = require("../config/db.js");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
  console.error("redis error", err);
});

/**
 *
 *
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} [timeout=60 * 60] 过期时间，单位s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 *
 *
 * @param {string} key
 * @returns
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};
