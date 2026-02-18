
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
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },

//   discription: { type: String },

//   category: { type: String, required: true },

//   subCategory: { type: String },

//   price: { type: Number, required: true },

//   // ==========discount==============
//     discountPercentage: {
//     type: Number,
//     default: 0,
//   },

//   discountStart: {
//     type: Date,
//   },

//   discountEnd: {
//     type: Date,
//   },
//   // ==========discount==============

//   bestseller: { type: Boolean, default: false },

//   // 👕================ مقاسات الملابس (زي ما هي)
//   sizes: { type: [String], default: [] },

//   image: { type: [String], default: [] },

//   //================== 👟 مقاسات الأحذية
//   shoeSizes: {
//     kids: { type: [Number], default: [] },
//     youth: { type: [Number], default: [] },
//     men: { type: [Number], default: [] },
//   },
//   //=========================🧤 مقاسات الجوانتي
// gloveSizes: {
//   type: [Number],
//   default: [],
// },

//   // ================== Rating System ==================
//   rating: { type: Number, default: 0 },
//   numReviews: { type: Number, default: 0 },

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

//   date: { type: Date, default: Date.now },
// });
// productSchema.virtual("finalPrice").get(function () {
//   const now = new Date();

//   const discountActive =
//     this.discountPercentage > 0 &&
//     (!this.discountStart || now >= this.discountStart) &&
//     (!this.discountEnd || now <= this.discountEnd);

//   if (discountActive) {
//     return this.price - (this.price * this.discountPercentage) / 100;
//   }

//   return this.price;
// });

// const productModel =
//   mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    discription: { type: String }, // ✨ عدلت spelling

    category: { type: String, required: true },

    subCategory: { type: String },

    price: { type: Number, required: true },

    // ========== DISCOUNT ==========
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    discountStart: {
      type: Date,
    },

    discountEnd: {
      type: Date,
    },
    // ==============================

    bestseller: { type: Boolean, default: false },

    sizes: { type: [String], default: [] },

    image: { type: [String], default: [] },

    shoeSizes: {
      kids: { type: [Number], default: [] },
      youth: { type: [Number], default: [] },
      men: { type: [Number], default: [] },
    },

    gloveSizes: {
      type: [Number],
      default: [],
    },

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
  },
  {
    timestamps: true, // ✨ أهم إضافة
    toJSON: { virtuals: true }, // ✨ عشان finalPrice يظهر
    toObject: { virtuals: true },
  }
);

// ✅ حساب السعر النهائي
productSchema.virtual("finalPrice").get(function () {
  const now = new Date();

  const discountActive =
    this.discountPercentage > 0 &&
    (!this.discountStart || now >= this.discountStart) &&
    (!this.discountEnd || now <= this.discountEnd);

  if (discountActive) {
    return Math.round(
      this.price - (this.price * this.discountPercentage) / 100
    );
  }

  return this.price;
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
