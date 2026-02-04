import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discription: { type: String },        // الوصف
  category: { type: String, required: true }, // "Men", "Women", "Electrical", ...
  subCategory: { type: String },        // Optional, ممكن نخلي Electrical ما فيهاش subCategory
  price: { type: Number, required: true },
  bestseller: { type: Boolean, default: false },
  sizes: { type: [String], default: [] }, // للألبسة، للأجهزة الكهربائية ممكن يفضل فاضي
  image: { type: [String], default: [] }, // صور متعددة
  date: { type: Date, default: Date.now },

});

const productModel =mongoose.model.product || mongoose.model("product", productSchema);

export default productModel;




  // name: { type: String, require: true },
  // discription: { type: String, require: true },
  // price: { type: Number, require: true },
  // image: { type: Array, require: true },
  // category: { type: String, require: true },
  // subCategory: { type: String, require: true },
  // sizes: { type: Array, require: true },
  // bestseller: { type: Boolean },
  // data: { type: Number, require: true },