/**
 * @description 用户数据模型
 */
const seq = require("../sequelize.js");
const { STRING, DECIMAL } = require("../types.js");

const User = seq.define("user", {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: "用户名唯一"
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: "密码"
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: "昵称"
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: "性别（1 男性， 2 女性， 3 保密）"
  },
  picture: {
    type: STRING,
    comment: "图片头像地址"
  },
  city: {
    type: STRING,
    comment: "城市"
  }
});

module.exports = User;
