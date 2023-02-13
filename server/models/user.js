import mongoose from "mongoose";
import BaseSchema from "../../core/schema/baseSchema";

const UserSchema = new BaseSchema({
  name: String,
  age: Number,
  email: String,
  phone: Number,
  hobby: {
    type: [String],
    default: undefined,
  },
  address: {
    province: String,
    city: String,
    detail: String,
  },
});
const User = mongoose.model("User", UserSchema);
export default User;
