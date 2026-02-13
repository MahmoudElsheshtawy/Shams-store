
//   import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },

//   discription: { type: String },

//   category: { type: String, required: true },

//   subCategory: { type: String },

//   price: { type: Number, required: true },

//   bestseller: { type: Boolean, default: false },

//   sizes: { type: [String], default: [] },

//   image: { type: [String], default: [] },

//   // ================== Rating System ==================
//   rating: { type: Number, default: 0 },       // متوسط التقييم
//   numReviews: { type: Number, default: 0 },   // عدد التقييمات

//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "user",
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
//   // ===================================================

//   date: { type: Date, default: Date.now },
// });

// const productModel =
//   mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;
// 555555555555555555555555555555555555555
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  discription: { type: String },

  category: { type: String, required: true },

  subCategory: { type: String },

  price: { type: Number, required: true },

  bestseller: { type: Boolean, default: false },

  // 👕 مقاسات الملابس (زي ما هي)
  sizes: { type: [String], default: [] },

  image: { type: [String], default: [] },

  // 👟 مقاسات الأحذية
  shoeSizes: {
    kids: { type: [Number], default: [] },
    youth: { type: [Number], default: [] },
    men: { type: [Number], default: [] },
  },

  // ================== Rating System ==================
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },

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

  date: { type: Date, default: Date.now },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
