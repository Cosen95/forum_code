/**
 * @description json schema校验
 */
const Ajv = require("ajv");
const ajv = new Ajv({});

/**
 *
 *
 * @param {Object} schema json schema规则
 * @param {Object} [data={}] 待校验的数据
 * @returns
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
}

module.exports = validate;
