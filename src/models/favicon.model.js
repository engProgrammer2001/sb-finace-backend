import mongoose from "mongoose";

const faviconSchema = new mongoose.Schema(
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
const Favicon = mongoose.model("Favicon", faviconSchema);
export default Favicon;
