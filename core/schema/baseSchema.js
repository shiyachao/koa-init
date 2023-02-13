/**
 * 基础Schema项
 */
import mongoose from "mongoose";
import { BusinessException } from "../exception/commonException";
const Schema = mongoose.Schema;

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
const UpdateMethods = ["update", "updateMany", "updateOne"];
export default class BaseSchema extends Schema {
  constructor(cols, opt) {
    cols = {
      ...BaseSchemaCols,
      ...cols,
    };
    opt = {
      ...BaseSchemaOpts,
      ...opt,
    };
    super(cols, opt);
    /**
     * 逻辑删除
     */
    this.statics.deleteById = async function (id = "", cb) {
      return this.updateOne({ _id: id }, { is_del: true }, cb);
    };
    this.statics.deleteByIds = async function (ids = [], cb) {
      return this.updateMany({ _id: { $in: ids } }, { is_del: true }, cb);
    };
    this.statics.delete = async function (query = {}, cb) {
      return this.updateMany(query, { is_del: true }, cb);
    };
    /**
     * 查询过滤，默认去掉逻辑删除的数据
     */
    QueryMethods.forEach((method) => {
      this.pre(method, async function () {
        await ignoreDel.call(this);
      });
    });
  }
}
async function ignoreDel() {
  if (typeof this._conditions.is_del === "undefined") {
    this._conditions.is_del = false;
  } else if (this._conditions.is_del === -1) {
    delete this._conditions.is_del;
  }
}
