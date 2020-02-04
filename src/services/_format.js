/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require("../config/constant.js");
const { timeFormat } = require("../utils/dateTime");

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content;

  // 格式化 @
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`;
    }
  );

  return obj;
}

/**
 * 用户默认头像
 *
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

function formatUser(list) {
  // console.log("用户信息格式化", list);
  if (list == null) {
    return list;
  }

  if (list instanceof Array) {
    // 数组 用户列表
    return list.map(_formatUserPicture);
  }

  // 单个对象
  return _formatUserPicture(list);
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
  if (list == null) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent);
  }
  // 对象
  let result = list;
  result = _formatDBTime(result);
  result = _formatContent(result);
  return result;
}

module.exports = {
  formatUser,
  formatBlog
};
