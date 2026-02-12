// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   discription: { type: String },        // الوصف
//   category: { type: String, required: true }, // "Men", "Women", "Electrical", ...
//   subCategory: { type: String },        // Optional, ممكن نخلي Electrical ما فيهاش subCategory
//   price: { type: Number, required: true },
//   bestseller: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] }, // للألبسة، للأجهزة الكهربائية ممكن يفضل فاضي
//   image: { type: [String], default: [] }, // صور متعددة
//   date: { type: Date, default: Date.now },

// });

// const productModel =mongoose.model.product || mongoose.model("product", productSchema);

// export default productModel;
// 2222222222222222222222222222222222222222222222
// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//   },
//   { timestamps: true }
// );

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   discription: { type: String },
//   category: { type: String, required: true },
//   subCategory: { type: String },
//   price: { type: Number, required: true },
//   bestseller: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },
//   image: { type: [String], default: [] },

//   // ⭐⭐⭐⭐ التقييم ⭐⭐⭐⭐
//   reviews: [reviewSchema],
//   ratingAverage: {
//     type: Number,
//     default: 0,
//   },
//   ratingCount: {
//     type: Number,
//     default: 0,
//   },

//   date: { type: Date, default: Date.now },
// });

// const productModel =
//   mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;


// 33333333333333333333333333333333333333333

  // name: { type: String, require: true },
  // discription: { type: String, require: true },
  // price: { type: Number, require: true },
  // image: { type: Array, require: true },
  // category: { type: String, require: true },
  // subCategory: { type: String, require: true },
  // sizes: { type: Array, require: true },
  // bestseller: { type: Boolean },
  // data: { type: Number, require: true },





  // 4444444444444444444444444444444444444444444
  import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  discription: { type: String },

  category: { type: String, required: true },

  subCategory: { type: String },

  price: { type: Number, required: true },

  bestseller: { type: Boolean, default: false },

  sizes: { type: [String], default: [] },

  image: { type: [String], default: [] },

  // ================== Rating System ==================
  rating: { type: Number, default: 0 },       // متوسط التقييم
  numReviews: { type: Number, default: 0 },   // عدد التقييمات

  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // ===================================================

  date: { type: Date, default: Date.now },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
// 555555555555555555555555555555555555555