const path = require("path");
const {
  UPLOAD_PATH,
  DATA_BASE_URL: db_host,
  DATA_BASE_USER: db_user,
  DATA_BASE_PASS: db_pass,
  DATA_BASE_NAME: db_name,
} = process.env;
/**
 * 静态资源绝对路径
 */
export const resourcePath = path.join(__dirname, "../public");
/**
 * 上传文件路径
 */
export const uploadPath = UPLOAD_PATH;
/**
 * 数据库配置
 */
const db_uri = `mongodb://${db_host}:27017`;
export const DataBaseConfig = { db_uri, db_host, db_user, db_pass, db_name };
