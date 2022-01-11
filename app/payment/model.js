import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    name: {
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
      unique: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
