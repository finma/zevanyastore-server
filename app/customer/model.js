import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const HASH_ROUND = 10;

const customerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      maxlength: 255,
      minlength: 3,
    },
    // username: {
    //   type: String,
    //   require: true,
    //   maxlength: 255,
    //   minlength: 3,
    // },
    password: {
      type: String,
      require: true,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      require: true,
      maxlength: 13,
      minlength: 9,
    },
  },
  {
    timestamp: true,
  }
);

customerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Customer").countDocuments({
        email: value,
      });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} has registered`
);

customerSchema.pre("save", function (next) {
  this.password = bcryptjs.hashSync(this.password, HASH_ROUND);
  next();
});

export default mongoose.model("Customer", customerSchema);
