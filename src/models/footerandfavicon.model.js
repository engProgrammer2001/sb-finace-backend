import mongoose from "mongoose";

const footerandfaviconSchema = new mongoose.Schema(
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
const FooterAndFavicon = mongoose.model("FooterAndFavicon", footerandfaviconSchema);
export default FooterAndFavicon;
