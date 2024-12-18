import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Logo = mongoose.model("Logo", logoSchema);
export default Logo;
