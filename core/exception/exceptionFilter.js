import { ExceptionType } from "./commonException";
import { ResponseDto } from "../response/responseDto";
/**
 * 全局异常过滤器
 * 目前仅处理了手动抛出的CommonException中的异常
 * 其他组件异常和代码异常都当做未知异常处理(可继续添加对某类异常的处理)
 * @param {*} ctx
 * @param {*} next
 */
const ExceptionFilter = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.httpCode) {
      ResponseDto.code = err.code;
      ResponseDto.msg = err.msg;
      ctx.status = err.httpCode;
    } else {
      ResponseDto.code = ExceptionType.Unknow.code;
      ResponseDto.msg = ExceptionType.Unknow.msg;
      ctx.status = ExceptionType.Unknow.httpCode;
      console.error(err);
    }
    ctx.body = ResponseDto;
  }
};
export default ExceptionFilter;
