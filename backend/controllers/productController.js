
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ------------ Add Product ------------
const addProduct = async (req, res) => {
  try {
    const {
      name,
      discription,
      price,
      category,
      subCategory,
      sizes,
      shoeSizes,
      bestseller,
    } = req.body;

    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files[key] && req.files[key][0])
      .filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      discription,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true",
      // sizes: sizes ? JSON.parse(sizes) : [],
      //  // 👟 أحذية
      //  shoeSizes: shoeSizes
      //      ? JSON.parse(shoeSizes)
      //    : { kids: [], youth: [], men: [] },
      sizes: sizes ? JSON.parse(sizes || "[]") : [],

      shoeSizes: shoeSizes
       ? JSON.parse(shoeSizes || '{"kids":[],"youth":[],"men":[]}')
       : { kids: [], youth: [], men: [] },

      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------ List All Products ------------
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ------------ Remove Product ------------
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ------------ Single Product ------------
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ------------ Update Price ------------
const updatePrice = async (req, res) => {
  try {
    const { id, price } = req.body;
    if (!id || !price) return res.json({ success: false, message: "Missing fields" });
    await productModel.findByIdAndUpdate(id, { price });
    res.json({ success: true, message: "Price updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ------------ Electrical Products Only ------------
const electricalProducts = async (req, res) => {
  try {
    const products = await productModel.find({ category: "shoes" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const ramadanProducts = async (req, res) => {
  try {
    const products = await productModel.find({ category: "Ramadan" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const eidProducts = async (req, res) => {
  try {
    const products = await productModel.find({ category: "eid" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// ------------ rating ------------
const addProductReview = async (req, res) => {
  try {
    const { productId, rating } = req.body;
    const userId = req.userId; // جاي من authUser

    
    if (!productId || !rating) {
      return res.json({ success: false, message: "بيانات ناقصة" });
    }

    if (!userId) {
      return res.json({ success: false, message: "يوزر غير موجود" });
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: "التقييم من 1 لـ 5" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "المنتج غير موجود" });
    }

    if (!product.reviews) product.reviews = [];

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res.json({
        success: false,
        message: "لقد قمت بتقييم هذا المنتج من قبل",
      });
    }

    product.reviews.push({
      user: userId,
      rating: Number(rating),
    });

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.json({ success: true, message: "تم إضافة التقييم بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updatePrice,
  electricalProducts,
  addProductReview,
};
