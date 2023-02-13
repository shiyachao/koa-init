import { BusinessException } from "../../core/exception/commonException";
import User from "../models/user";

export const addUser = async (ctx) => {
  const user = new User({
    name: "syc",
    age: 30,
    email: "123@qq.com",
    phone: 1394498749,
    hobby: ["a", "c"],
    address: {
      province: "辽宁",
      city: "大连",
      detail: "123",
    },
  });
  await user.save();
  ctx.body = "添加成功！";
};

export const getUser = async (ctx) => {
  const result = await User.find();
  ctx.body = result;
};

export const editUser = async (ctx) => {
  const user = await User.findById(ctx.params.id);
  if (!user) {
    throw new BusinessException("不存在的用户");
  }
  await User.updateOne({ _id: ctx.params.id }, { $set: ctx.request.body });
  ctx.body = "修改成功!";
};

export const delUser = async (ctx) => {
  await User.deleteById(ctx.params.id);
  ctx.body = "删除成功";
};
