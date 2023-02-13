import { ResponseDto } from "./responseDto";

/**
 * 响应过滤器
 * @param {*} ctx
 * @param {*} next
 */
const ResponseFilter = async (ctx, next) => {
  await next();
  if (!ctx.body?.code) {
    if (ctx.body instanceof Object) {
      ResponseDto.data = ctx.body;
    } else if (typeof ctx.body === "string" || typeof ctx.body === "number") {
      ResponseDto.msg = ctx.body;
    }
    ctx.body = ResponseDto;
  }
  // console.log(ctx.response);
};
export default ResponseFilter;
