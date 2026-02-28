
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
      gloveSizes,
      bestseller,
      discountPercentage,
      discountStart,
      discountEnd,
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
      // ========price and discount
      price: Number(price),
        discountPercentage: discountPercentage
          ? Number(discountPercentage)
          : 0,
        discountStart: discountStart || null,
        discountEnd: discountEnd || null,
      // ========
      // ========

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

        // 🧤 جوانتي (أرقام)
  gloveSizes: gloveSizes
    ? JSON.parse(gloveSizes || "[]")
    : [],
    
      image: imagesUrl,
      // date: Date.now(),
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



 const GlovesProducts = async (req, res) => {
  try {
    const products = await productModel.find({ category: "gloves" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const eidProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({ category: "eid" });
//     res.json({ success: true, products });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
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

// ------------ Update Discount ------------
const updateDiscount = async (req, res) => {
  try {
    const { id, discountPercentage, discountStart, discountEnd, finalPrice } = req.body;
    
    if (!id) {
      return res.json({ success: false, message: "معرف المنتج مطلوب" });
    }

    // التحقق من صحة نسبة الخصم
    if (discountPercentage < 0 || discountPercentage > 100) {
      return res.json({ success: false, message: "نسبة الخصم يجب أن تكون بين 0 و 100" });
    }

    // تحديث المنتج
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        discountPercentage: Number(discountPercentage),
        discountStart: discountStart || null,
        discountEnd: discountEnd || null,
        finalPrice: Number(finalPrice)
      },
      { new: true } // لإرجاع المنتج بعد التحديث
    );

    if (!updatedProduct) {
      return res.json({ success: false, message: "المنتج غير موجود" });
    }

    res.json({ 
      success: true, 
      message: discountPercentage > 0 ? "تم تحديث الخصم بنجاح" : "تم إزالة الخصم بنجاح",
      product: updatedProduct 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ====================
// تحديث المنتج كاملاً
// تحديث المنتج كاملاً
const updateProduct = async (req, res) => {
  try {
    const { id, name, discription, price, category, subCategory, sizes, shoeSizes, gloveSizes, bestseller, existingImages } = req.body;
    
    if (!id || !name || !price) {
      return res.json({ success: false, message: "البيانات المطلوبة ناقصة" });
    }

    // معالجة الصور الجديدة إن وجدت
    const newImages = [];
    if (req.files) {
      // تحديد الصور المرفوعة
      const imageFields = ['newImage1', 'newImage2', 'newImage3', 'newImage4'];
      
      for (const field of imageFields) {
        if (req.files[field] && req.files[field][0]) {
          try {
            // رفع الصورة إلى Cloudinary
            const result = await cloudinary.uploader.upload(req.files[field][0].path, {
              resource_type: "image",
            });
            newImages.push(result.secure_url);
          } catch (uploadError) {
            console.error(`خطأ في رفع الصورة ${field}:`, uploadError);
          }
        }
      }
    }

    // دمج الصور القديمة مع الجديدة
    let oldImages = [];
    try {
      oldImages = existingImages ? JSON.parse(existingImages) : [];
    } catch (e) {
      console.error("خطأ في تحليل existingImages:", e);
    }
    
    const finalImages = [...oldImages, ...newImages];
    
    // التأكد من وجود صور على الأقل
    if (finalImages.length === 0) {
      return res.json({ success: false, message: "يجب إضافة صورة واحدة على الأقل" });
    }

    // تجهيز بيانات التحديث
    const updateData = {
      name,
      discription: discription || "",
      price: Number(price),
      category: category || "",
      subCategory: subCategory || "",
      bestseller: bestseller === 'true' || bestseller === true,
      image: finalImages
    };
    
    // إضافة المقاسات حسب النوع مع التحقق من الصحة
    if (category === 'shoes') {
      try {
        updateData.shoeSizes = shoeSizes ? JSON.parse(shoeSizes) : { kids: [], youth: [], men: [] };
      } catch (e) {
        updateData.shoeSizes = { kids: [], youth: [], men: [] };
      }
    } else if (category === 'gloves') {
      try {
        updateData.gloveSizes = gloveSizes ? JSON.parse(gloveSizes) : [];
      } catch (e) {
        updateData.gloveSizes = [];
      }
    } else {
      try {
        updateData.sizes = sizes ? JSON.parse(sizes) : [];
      } catch (e) {
        updateData.sizes = [];
      }
    }
    
    // تحديث المنتج
    const updatedProduct = await productModel.findByIdAndUpdate(
      id, 
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.json({ success: false, message: "المنتج غير موجود" });
    }
    
    res.json({ 
      success: true, 
      message: "تم تحديث المنتج بنجاح",
      product: updatedProduct 
    });
    
  } catch (error) {
    console.error("خطأ في تحديث المنتج:", error);
    res.json({ success: false, message: error.message });
  }
};
export const Accessories = async (req, res) => {
  try {
    const products = await productModel.find({ category: "Accessories" });
    res.json({ success: true, products });
  } catch (error) {
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
  GlovesProducts,
  updateDiscount,
  updateProduct
};
