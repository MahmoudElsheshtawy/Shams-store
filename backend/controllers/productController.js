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
    const products = await productModel.find({ category: "Electrical" });
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
// productController.js


 const addProductReview = async (req, res) => {
  const { rating } = req.body;

  if (!req.user) return res.status(401).json({ message: "سجل دخول أولاً" });

  if (!rating) return res.status(400).json({ message: "اختر عدد النجوم أولًا" });

  const product = await productModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "المنتج غير موجود" });

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) return res.status(400).json({ message: "لقد قيمت هذا المنتج من قبل" });

  const review = {
    user: req.user._id,
    rating: Number(rating),
    date: new Date()
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numReviews;

  await product.save();
  res.status(201).json({ message: "تم إضافة التقييم", rating: product.rating });
};

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
