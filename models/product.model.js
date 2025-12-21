import mongoose from "mongoose"



const productSchema = new mongoose.Schema({
  sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: String,
  description: String,
  category: String,
  subcategory: String,
  name: String,
  highlights: [String],
  dimensions: {
    width:  Number,
    height: Number,
    length: Number,
    weight: Number,
    unit: String
  },
  variants: [
    {
      color: String,
      images: [String],
      price: Number,
      stock: Number,
      sizes: [
        {
          size: String,
          price: Number,
          stock: Number
        }
      ]
    }
  ],
  discount: {type: Number, default: 0},
  bestSeller: {type: Boolean, default: false},
  

},{timestamps: true});

 const Product = mongoose.model("Product", productSchema);

 export default Product