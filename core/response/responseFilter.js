import { ResponseDto } from "./responseDto";
/**
 * 响应过滤器
 * @param {*} ctx
 * @param {*} next
 */
const ResponseFilter = async (ctx, next) => {
  await next();
  if (ctx.body && !ctx.body?.code) {
    const responseDto = new ResponseDto();
    if (ctx.body instanceof Object) {
      responseDto.data = ctx.body;
    } else if (typeof ctx.body === "string" || typeof ctx.body === "number") {
      responseDto.msg = ctx.body;
    }
    ctx.body = responseDto;
  }
  // console.log(ctx.response);
};
export default ResponseFilter;
