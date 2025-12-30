import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Step 1: Basic Info
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  subcategory: { type: String },

  // Step 3: Attributes & Specifications
  attributes: {
    specs: [String], // array of specifications
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      dimUnit: { type: String, default: "cm" }, // unit for length/width/height
      weight: { type: Number },
      weightUnit: { type: String, default: "g" } // unit for weight
    }
  },

  // Step 2: Variants
  variants: [
    {
      color: { type: String },
      images: [String], // Cloudinary URLs
      price: { type: Number },
      stock: { type: Number },
      sizes: [
        {
          size: { type: String },
          price: { type: Number },
          stock: { type: Number }
        }
      ]
    }
  ],

  // Step 4: Meta Details
  brand: { type: String },
  model: { type: String },
  warranty: { type: String },
  discount: { type: Number, default: 0 },
  bestSeller: { type: Boolean, default: false },

  // Step 5: Delivery Details
  delivery: {
    COD: { type: Boolean, default: true },
    returnPolicy: { type: Number }, // days
    shippingTime: { type: Number }, // days
    deliveryAreas: [String] // array of pincodes
  }

}, { timestamps: true });


const Product =  mongoose.model("Product", productSchema);
export default Product