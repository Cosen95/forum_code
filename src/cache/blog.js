/**
 * @description 微博广场缓存层（cache）
 */
const { get, set } = require("./_redis");
const { getBlogListByUser } = require("../services/blog");

// redis key前缀
const KEY_PREFIX = "forum:square:";

async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

  // 尝试获取缓存
  const cacheRes = await get(key);
  if (cacheRes) {
    // 获取缓存成功
    return cacheRes;
  }
  // 没有读取到缓存则读取数据库
  const result = await getBlogListByUser({ pageIndex, pageSize });
  // 设置缓存，过期时间为 1min
  set(key, result, 60);
  return result;
}

module.exports = {
  getSquareCacheList
};
