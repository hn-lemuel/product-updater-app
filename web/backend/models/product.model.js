import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    isHotItem: {
      default: false,
      type: Boolean,
    },
    product_id: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const ProductHighlight = mongoose.model("productHighlight", productSchema);

export default ProductHighlight;
