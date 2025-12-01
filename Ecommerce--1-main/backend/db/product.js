import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      price: {
         type: Number,
         required: true,
         min: 0,
      },
      category: {
         type: String,
         required: true,
         trim: true,
      },
      company: {
         type: String,
         required: true,
         trim: true,
      },
      description: {
         type: String,
         default: "",
      },
      image: {
         type: String,
         default: "https://via.placeholder.com/300x300?text=Product",
      },
      inStock: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

export default mongoose.model("Product", productSchema);
