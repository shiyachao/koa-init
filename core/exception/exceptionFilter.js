import {
  CommonException,
  ExceptionType,
  getExceptionByCode,
} from "./commonException";
import { ResponseDto } from "../response/responseDto";
const { Unknow } = ExceptionType;
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
    /**
     * koa没有对异常的处理，404等异常的响应也不会抛出异常
     * 这里主动检测响应状态码并抛出异常，才能在全局异常中统一处理
     * 目前只有200状态码可以直接通过响应，其他全部拦截，可以根据需要自行修改
     */
    const whiteListForHttpCode = [200];
    if (!whiteListForHttpCode.includes(ctx.status)) {
      const exception = getExceptionByCode(ctx.status);
      throw new CommonException(
        exception ? exception.msg : Unknow.msg,
        exception ? exception.code : Unknow.code,
        exception ? exception.httpCode : ctx.status
      );
    }
  } catch (err) {
    const responseDto = new ResponseDto();
    if (err.httpCode) {
      responseDto.code = err.code;
      responseDto.msg = err.msg;
      ctx.status = err.httpCode;
    } else {
      responseDto.code = Unknow.code;
      responseDto.msg = Unknow.msg;
      ctx.status = Unknow.httpCode;
      console.error(err);
    }
    ctx.body = responseDto;
  }
};
export default ExceptionFilter;
