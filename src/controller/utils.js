const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { uploadFileSizeFailInfo } = require("../model//ErrorInfo");
const fse = require("fs-extra");
const path = require("path");

// 文件目录
const DIST_FOLDER_PATH = path.join(__dirname, "..", "..", "uploadFiles");
// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024;

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

/**
 * 保存上传文件
 *
 * @param {*} { name, size, filePath }
 * @returns
 */
async function saveFile({ name, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath); // 文件大于限定值，删除改文件，避免不必要的内存占用
    return new ErrorModel(uploadFileSizeFailInfo);
  }

  // 移动文件
  const fileName = Date.now() + "." + name; // 文件名可能会重复，暂且用Date.now()做层处理
  const disFilePath = path.join(DIST_FOLDER_PATH, fileName); // 目标文件目录
  await fse.move(filePath, disFilePath);

  console.log("上传图片url", fileName);

  // 返回信息
  return new SuccessModel({
    url: "/" + fileName
  });
}

module.exports = {
  saveFile
};
