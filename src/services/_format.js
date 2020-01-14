/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE } = require("../config/constant.js");
/**
 * 用户默认头像
 *
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE;
  }
}

function formatUser(list) {
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

module.exports = {
  formatUser
};
