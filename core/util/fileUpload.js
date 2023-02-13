import multer from "@koa/multer";
import { resourcePath, uploadPath } from "../context/sys_context";
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resourcePath + uploadPath);
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});
//文件上传限制
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024, //文件大小 单位 b
  files: 1, //文件数量
};
/**
 * 文件上传工具
 */
const UploadUtil = multer({ storage, limits });
export default UploadUtil;
