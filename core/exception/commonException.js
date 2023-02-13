/**
 * 基础异常和常用异常类
 * code:业务或http状态码
 * httpCode:http状态码
 */
const Base = { msg: "服务器异常", code: 500, httpCode: 500 };
const Business = { msg: "业务异常", code: 10000, httpCode: 200 };
const BadRequest = { msg: "Bad Request", code: 400, httpCode: 400 };
const Unauthorized = { msg: "Unauthorized", code: 401, httpCode: 401 };
const Forbidden = { msg: "Forbidden", code: 403, httpCode: 403 };
const Unknow = { msg: "Unknow Error", code: -1, httpCode: 500 };
/**
 * 常用异常类型
 */
export const ExceptionType = {
  Base,
  Business,
  BadRequest,
  Unauthorized,
  Forbidden,
  Unknow,
};
/**
 * 基础异常
 */
export class CommonException extends Error {
  constructor(msg = Base.msg, code = Base.code, httpCode = Base.httpCode) {
    super();
    this.msg = msg;
    this.code = code;
    this.httpCode = httpCode;
  }
}
/**
 * 业务异常
 */
export class BusinessException extends CommonException {
  constructor(
    msg = Business.msg,
    code = Business.code,
    httpCode = Business.httpCode
  ) {
    super(msg, code, httpCode);
  }
}
/**
 * 400
 */
export class BadRequestException extends CommonException {
  constructor(
    msg = BadRequest.msg,
    code = BadRequest.code,
    httpCode = BadRequest.httpCode
  ) {
    super(msg, code, httpCode);
  }
}
/**
 * 401
 */
export class UnauthorizedException extends CommonException {
  constructor(
    msg = Unauthorized.msg,
    code = Unauthorized.code,
    httpCode = Unauthorized.httpCode
  ) {
    super(msg, code, httpCode);
  }
}
/**
 * 403
 */
export class ForbiddenException extends CommonException {
  constructor(
    msg = Forbidden.msg,
    code = Forbidden.code,
    httpCode = Forbidden.httpCode
  ) {
    super(msg, code, httpCode);
  }
}
