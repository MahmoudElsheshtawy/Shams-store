// import userModel from "../models/userModel.js"


// // add product to user cart
// const addToCart = async (req,res)=>{
//         try {
//             const {userId ,itemId,size}= req.body

//             const userData =await userModel.findById(userId)
//             let cartData =await userData.cartData;
//             if (cartData[itemId]) {
//                 if(cartData[itemId][size]){
//                     cartData[itemId][size] +=1
//                 }else{
//                     cartData[itemId][size] = 1
//                 }
//             }else{
//                 cartData[itemId]={}
//                 cartData[itemId][size]= 1
//             }

//             await userModel.findByIdAndUpdate(userId,{cartData})
//             res.json({success : true ,message: 'Added To Cart'})
//         } catch (error) {
//             console.log(error);
//             res.json({success : false ,message: error.message })

            
//         }



// }




// // update  to user cart
// const updateCart = async (req,res)=>{
//     try {
//         const {userId,itemId,size,quantity} =req.body

        
//             const userData =await userModel.findById(userId)
//             let cartData =await userData.cartData;

//             cartData[itemId][size] =quantity

            
//             await userModel.findByIdAndUpdate(userId,{cartData})
//             res.json({success : true ,message: 'Cart updated'})
//     } catch (error) {
//             console.log(error);
//             res.json({success : false ,message: error.message })

            
//     }
// }




// // get  user cart data
// const getUserCart = async (req,res)=>{
// try {
//     const {userId} =req.body

//             const userData =await userModel.findById(userId)
//             let cartData =await userData.cartData;

//             res.json({success:true, cartData})
// } catch (error) {
//         console.log(error);
//             res.json({success : false ,message: error.message })

            
// }
// }


// export{addToCart,updateCart,getUserCart}


import userModel from "../models/userModel.js";

// -------- Add product to user cart --------
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // التحقق من وجود المستخدم
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    // إنشاء cartData إذا مش موجودة
    let cartData = userData.cartData || {};

    // إضافة أو تحديث المنتج
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "تمت إضافة المنتج للعربة", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// -------- Update product quantity in cart --------
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    let cartData = userData.cartData || {};

    // إنشاء الهيكل إذا مش موجود
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "تم تحديث العربة", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// -------- Get user cart data --------
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
