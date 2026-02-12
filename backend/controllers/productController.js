// import { v2 as cloudinary} from "cloudinary";
// import productModel from "../models/productModel.js";

// //______________funCtion add product__________
//  const addProduct = async (req,res)=>{


//    try {
//         const {name , discription ,price ,category,subCategory,sizes,bestseller}= req.body;
//            const image1 = req.files.image1 && req.files.image1[0]
//            const image2 = req.files.image2 && req.files.image2[0]
//            const image3 = req.files.image3 && req.files.image3[0]
//            const image4 = req.files.image4 && req.files.image4[0]
       

//        const images =[image1,image2,image3,image4].filter((item)=>item!== undefined)
//        let imagesUrl =await Promise.all(
//          images.map(async(item)=>{
//           let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
//           return result.secure_url
//          })
//        )


           
//     console.log(name,discription,price,category,subCategory,sizes, bestseller)
//     console.log(imagesUrl)
//     const productData ={
//       name,discription,category,
//       price:Number(price),
//       subCategory,
//       bestseller:bestseller ==="true" ? "true" :false ,
//       sizes: JSON.parse(sizes),
//       image:imagesUrl,
//       date :Date.now()

//     }
//     console.log(productData);
//     const product =new productModel(productData);
//     await product.save()
//     res.json({success:true ,message:"prodact adeed"})
//     // res.json({})

//    } catch (error) {
//     console.log(error);
    
//     res.json({success:false,message:error.message})
//    }



//  }

// //______________funCtion list product__________
// const listProduct =async(req,res)=>{
//     try {
//        const prodacts =await productModel.find({})
//        res.json({success:true,prodacts})
//     } catch (error) {
//        console.log(error);
//        res.json({success:false,message:error.message})
//    }
    
//  }
// //______________funCtion removing product__________
// const removeProduct =async(req,res)=>{
//     try {
//       await productModel.findByIdAndDelete(req.body.id)
//       res.json({success:true,message :"Product removed"})
//     } catch (error) {
//        console.log(error);
    
//     res.json({success:false,message:error.message})
//    }
    

//  }
// //______________funCtion single product info__________
// const singleProduct =async(req,res)=>{
//     try {
//       const {prodactId} =req.body 
//       const product =await productModel.findById(prodactId)
//       res.json({success :true ,product})


//     } catch (error) {
//        console.log(error);
    
//     res.json({success:false,message:error.message})
   
//     }
//  }

// //  ---------------------------------------------------
// const updatePrice = async (req, res) => {
//   try {
//     const { id, price } = req.body;
//     if (!id || !price) {
//       return res.json({ success: false, message: "Missing fields" });
//     }

//     await productModel.findByIdAndUpdate(id, { price });
//     res.json({ success: true, message: "Price updated successfully" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
// // _____________ Electrical products only _____________
// const electricalProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({
//       category: "Electrical"
//     });

//     res.json({ success: true, products });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


//  export{
//      addProduct,
//     listProduct,
//     removeProduct,
//     singleProduct,
//     updatePrice,
//     electricalProducts
//  }
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
      sizes: sizes ? JSON.parse(sizes) : [],
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

//  const addProductReview = async (req, res) => {
//   try {
//     const { productId, rating } = req.body;
//     const userId = req.body.userId; // جاي من authUser

//     if (!productId || !rating) {
//       return res.json({ success: false, message: "بيانات ناقصة" });
//     }

//     if (rating < 1 || rating > 5) {
//       return res.json({ success: false, message: "التقييم من 1 لـ 5" });
//     }

//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.json({ success: false, message: "المنتج غير موجود" });
//     }

//     // تأكد إن reviews موجودة
//     if (!product.reviews) {
//       product.reviews = [];
//     }

//     // هل المستخدم قيّم قبل كده؟
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === userId.toString()
//     );

//     if (alreadyReviewed) {
//       return res.json({
//         success: false,
//         message: "قمت بتقييم هذا المنتج من قبل",
//       });
//     }

//     // إضافة التقييم
//     product.reviews.push({
//       user: userId,
//       rating: Number(rating),
//     });

//     // حساب متوسط التقييم
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((acc, item) => acc + item.rating, 0) /
//       product.reviews.length;

//     await product.save();

//     res.json({ success: true, message: "تم إضافة التقييم بنجاح" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const addProductReview = async (req, res) => {
//   try {
//     const { productId, rating } = req.body;
//     const userId = req.body.userId; // جاي من authUser middleware

//     if (!productId || !rating) {
//       return res.json({
//         success: false,
//         message: "بيانات غير مكتملة",
//       });
//     }

//     if (rating < 1 || rating > 5) {
//       return res.json({
//         success: false,
//         message: "التقييم يجب أن يكون من 1 إلى 5",
//       });
//     }

//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.json({
//         success: false,
//         message: "المنتج غير موجود",
//       });
//     }

//     // ❌ منع التقييم المكرر
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === userId.toString()
//     );

//     if (alreadyReviewed) {
//       return res.json({
//         success: false,
//         message: "قمت بتقييم هذا المنتج من قبل",
//       });
//     }

//     // ✅ إضافة الريفيو
//     const review = {
//       user: userId,
//       rating: Number(rating),
//     };

//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;

//     // ⭐ حساب متوسط التقييم
//     product.rating =
//       product.reviews.reduce((acc, item) => acc + item.rating, 0) /
//       product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "تم إضافة التقييم بنجاح",
//       rating: product.rating,
//       numReviews: product.numReviews,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// const addProductReview = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const { rating } = req.body;
//     const userId = req.user._id; // جاي من middleware auth

//     if (!rating || rating < 1 || rating > 5) {
//       return res.json({ success: false, message: "Rating must be 1 to 5" });
//     }

//     const product = await productModel.findById(productId);
//     if (!product) {
//       return res.json({ success: false, message: "Product not found" });
//     }

//     // ❌ منع التقييم المتكرر
//     const alreadyRated = product.reviews.find(
//       (r) => r.user.toString() === userId.toString()
//     );

//     if (alreadyRated) {
//       return res.json({
//         success: false,
//         message: "You already rated this product",
//       });
//     }

//     // ✅ إضافة التقييم
//     product.reviews.push({
//       user: userId,
//       rating: Number(rating),
//     });

//     product.ratingCount = product.reviews.length;
//     product.ratingAverage =
//       product.reviews.reduce((acc, item) => acc + item.rating, 0) /
//       product.ratingCount;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review added successfully",
//       ratingAverage: product.ratingAverage,
//       ratingCount: product.ratingCount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// ------------ rating ------------

export {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updatePrice,
  electricalProducts,
  addProductReview,
};
