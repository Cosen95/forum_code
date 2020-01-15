const { ErrorModel } = require("../model/ResModel");
const { jsonSchemaFileInfo } = require("../model/ErrorInfo");

function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body;
    const error = validateFn(data);
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }
    // 验证成功，继续执行下面中间件
    await next();
  }
  // 返回中间件
  return validator;
}

module.exports = {
  genValidator
};
