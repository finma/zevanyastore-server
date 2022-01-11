import mongoose from "mongoose";

let transactionSchema = mongoose.Schema(
  {
    historyProduct: {
      name: {
        type: String,
        require: true,
      },
      category: {
        type: String,
        require: true,
      },
      stock: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
        require: true,
      },
      image: { type: String },
    },
    historyPayment: {
      name: {
        type: String,
        require: true,
      },
      type: {
        type: String,
        require: true,
      },
      bankName: {
        type: String,
        require: true,
      },
      noRekening: {
        type: String,
        require: true,
      },
    },
    historyCustomer: {
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
      name: { type: String, require: true },
    },
    historyAddress: {
      address: {
        type: String,
        require: true,
      },
      city: {
        type: String,
        require: true,
      },
      postcode: {
        type: String,
        require: true,
      },
      province: {
        type: String,
        require: true,
      },
    },
    name: {
      type: String,
      require: true,
      maxlength: 255,
      minlength: 3,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalItem: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
