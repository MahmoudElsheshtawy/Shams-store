// import Orders from "../../frontend/src/pages/Orders.jsx"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// placing orders using COD Method 
// const placeOrder =async (req,res)=>{

//     try {
//         const {userId,items,amount,address,image} =req.body
//         const orderData ={
//             userId,
//             items,
//             address,
//             amount,
           
//             paymentMethod:'COD',
//             payment :false,
//             date:Date.now()
//         }
//         const newOrder =new orderModel(orderData)
//         await newOrder.save()

//         await userModel.findByIdAndUpdate(userId,{cartData:{}})
//          res.json({success :true, message :" Order Placed"})


//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
        
//     }
// }
const placeOrder = async (req,res)=>{
  try {

    const userId = req.userId;   // من auth middleware
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod:'الدفع عند التوصيل',
      payment:false,
      date:Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId,{ cartData:{} });

    res.json({ success:true, message:"Order Placed" });

  } catch (error) {
    console.log(error);
    res.json({ success:false, message:error.message });
  }
};


// placing orders using stripe Method 
const Cash = async (req, res) => {
  try {
    const userId = req.userId;

    // مع FormData الحقول بتوصل كنص، لازم نحولها
    const items = typeof req.body.items === "string" ? JSON.parse(req.body.items) : req.body.items;
    const address = typeof req.body.address === "string" ? JSON.parse(req.body.address) : req.body.address;
    const amount = Number(req.body.amount);

    if (!req.file) {
      return res.json({ success: false, message: "صورة التحويل مطلوبة" });
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "payment-proofs",
    });
    fs.unlink(req.file.path, () => {});

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "تم الدفع كاش",
      payment: false,
      paymentProof: uploaded.secure_url,
      date: Date.now(),
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placing orders using Razorpay Method 
const placeOrderRazorpay =async (req,res)=>{



}
const placeOrderStripe =async (req,res)=>{



}



// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------





// All Orders data for admin Panel

const allOrders =async (req,res)=>{
  

    try {
        const orders = await orderModel.find({})
        res.json({success:true ,orders})
    } catch (error) {
            console.log(error);
        res.json({success:false, message:error.message})
    }
}

// user Order data for frontend
// const userOrders =async (req,res)=>{
// try {
//      const {userId} = req.body
//      const orders = await orderModel.find({userId})
//      res.json({success:true , orders})
// } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
// }
// }
const userOrders = async (req,res)=>{
  try {

    const userId = req.userId;   // من token

    const orders = await orderModel.find({ userId });

    res.json({ success:true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success:false, message:error.message });
  }
};

//update order Stats from admin panel
const updateStatus =async(req,res)=>{
try {
     const {orderId,status}=req.body
     await orderModel.findByIdAndUpdate(orderId,{status})
     res.json({success:true,message:"Status Updated"})
} catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
}
}
export{
   placeOrder,
   placeOrderStripe,
   placeOrderRazorpay,
   allOrders,
   userOrders,
   updateStatus,
   Cash
}


