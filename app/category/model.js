import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Add Category!"],
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Category", categorySchema);
