import { Schema } from "mongoose";
import _ from "loadsh";
/**
 * 基础Schema项
 * 默认添加逻辑删除字段is_del和时间戳字段
 * is_del:-1可以查询所有
 * options传递可以覆盖默认options
 * options.reversion = true 可以跳过plugin还原成Schema
 */
const BaseSchemaCols = {
  is_del: {
    type: Boolean,
    default: false,
  },
};
const BaseSchemaOpts = {
  timestamps: true,
};
const QueryMethods = [
  "count",
  "find",
  "findOne",
  "findById",
  "findOneAndUpdate",
  "findByIdAndUpdate",
  "update",
  "updateMany",
  "updateOne",
];
export default class BaseSchema extends Schema {
  constructor(cols = {}, opts = {}) {
    super(cols, opts);
    if (!opts.reversion) {
      this.plugin(BaseSchemaPlugin, opts);
    }
  }
}
function BaseSchemaPlugin(schema, opts) {
  schema.add(BaseSchemaCols);
  const options = {};
  if (opts) {
    _.assign(options, BaseSchemaOpts, opts);
  }
  Object.keys(options).forEach((opt) => {
    schema.set(opt, options[opt]);
  });
  /**
   * 逻辑删除
   */
  schema.statics.deleteById = async function (id = "", cb) {
    return this.updateOne({ _id: id }, { is_del: true }, cb);
  };
  schema.statics.deleteByIds = async function (ids = [], cb) {
    return this.updateMany({ _id: { $in: ids } }, { is_del: true }, cb);
  };
  schema.statics.delete = async function (query = {}, cb) {
    return this.updateMany(query, { is_del: true }, cb);
  };
  /**
   * 查询过滤，默认去掉逻辑删除的数据
   */
  QueryMethods.forEach((method) => {
    schema.pre(method, async function () {
      await ignoreDel.call(this);
    });
  });
}
async function ignoreDel() {
  if (typeof this._conditions.is_del === "undefined") {
    this._conditions.is_del = false;
  } else if (this._conditions.is_del === -1) {
    delete this._conditions.is_del;
  }
}
