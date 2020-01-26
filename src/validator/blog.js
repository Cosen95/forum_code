/**
 * @description blog数据格式校验
 */
const validate = require("./_validate");
const SCHEMA = {
  type: "object",
  properties: {
    content: {
      type: "string"
    },
    image: {
      type: "string",
      maxLength: 255
    }
  }
};

function blogValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = blogValidate;
