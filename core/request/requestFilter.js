/**
 * 请求过滤器
 * @param {*} ctx
 * @param {*} next
 */
const RequestFilter = async (ctx, next) => {
  // console.log(ctx);
  await next();
};
export default RequestFilter;
