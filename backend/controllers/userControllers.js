// import userModel from "../models/userModel.js";
// import validator from "validator"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken";



// const createToken =(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }
// // ______________route for user login____________________
// const loginUser =async (req,res)=>{
// try {
//     const {email,password}= req.body;
//     const user =await userModel.findOne({email});
//     if (!user) {
//          return res.json({success:false ,message:"User dosn't  exists"})
//     }
//     const isMatch =await bcrypt.compare(password,user.password);
//     if (isMatch) {
//         const token = createToken(user._id)
//         res.json({success:true,token})
//     }else{
//         res.json({success:false,message:'Invalid credentials'})
//     }

// } catch (error) {
//        console.log(error);
//     res.json({success:false, message:error.message})
   
    
// }
// }


// // _______________route for user registerUser________________
// const registerUser =async (req,res)=>{
// try {
//     const {name, email,password}= req.body;

//     // checking user already or not....
//     const exists = await userModel.findOne({email});

//     if (exists) {
//         return res.json({success:false ,message:"User already exists"})
//     }
//     // validating email format & strong password
//     if (!validator.isEmail(email)) {
//         return res.json ({success :false,message:"Please enter a valid email"})
        
//     }
//      if (password.length < 8) {
//         return res.json ({success :false,message:"Please enter a Strong password "})
        
//     }
//     // hashing user password

//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password,salt)
    
//     const newUser = new userModel({
//         name,
//         email,
//         password:hashedPassword
//     })
//     const user = await newUser.save() 
//     // console.log(user);
//     // console.log("kkkkkkkkk");
    
    
//     const token = createToken(user._id)
//     res.json({success:true,token})

// } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message})
    
// }    
// }




// //________________ route for user adminLogin __________________________________________
// const adminLogin =async (req,res)=>{
//      try {
//         const {email,password} = req.body

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email+password,process.env.JWT_SECRET);
//             res.json({success:true,token})
//         }else{
//             res.json({success:false,message:"invalid credentials "})
//         }
//      } catch (error) {
//          console.log(error);
//          res.json({success:false,message:error.message})
   
//      }


// }


// export {
//     loginUser,
//     registerUser,
//     adminLogin
// }

import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// ______________route for user login____________________
const loginUser =async (req,res)=>{
try {
    const {email,password}= req.body;
    const user =await userModel.findOne({email});
    if (!user) {
         return res.json({success:false ,message:"User dosn't  exists"})
    }
    const isMatch =await bcrypt.compare(password,user.password);
    if (isMatch) {
        const token = createToken(user._id)
        res.json({success:true,token})
    }else{
        res.json({success:false,message:'Invalid credentials'})
    }

} catch (error) {
       console.log(error);
    res.json({success:false, message:error.message})
   
    
}
}

// _______________route for user registerUser________________
const registerUser =async (req,res)=>{
try {
    const {name, email,password}= req.body;

    // checking user already or not....
    const exists = await userModel.findOne({email});

    if (exists) {
        return res.json({success:false ,message:"User already exists"})
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
        return res.json ({success :false,message:"Please enter a valid email"})
        
    }
     if (password.length < 8) {
        return res.json ({success :false,message:"Please enter a Strong password "})
        
    }
    // hashing user password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    })
    const user = await newUser.save() 
    // console.log(user);
    // console.log("kkkkkkkkk");
    
    
    const token = createToken(user._id)
    res.json({success:true,token})

} catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
}    
}

//________________ route for user adminLogin __________________________________________
const adminLogin =async (req,res)=>{
     try {
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credentials "})
        }
     } catch (error) {
         console.log(error);
         res.json({success:false,message:error.message})
   
     }
}

// ================ التحكم في المستخدمين (جديد) ================

// 📋 جلب جميع المستخدمين (للوحة التحكم)
const getAllUsers = async (req, res) => {
  try {
    // جلب جميع المستخدمين مع إخفاء كلمة المرور
    const users = await userModel.find({})
      .select('-password') // منع إرجاع كلمة المرور
      .sort({ createdAt: -1 }); // ترتيب من الأحدث للأقدم

    res.json({ 
      success: true, 
      users,
      count: users.length 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🔍 جلب مستخدم واحد بالـ ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await userModel.findById(id).select('-password');
    
    if (!user) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 📊 إحصائيات المستخدمين
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    
    // المستخدمين الجدد في آخر 7 أيام
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const newUsersLastWeek = await userModel.countDocuments({
      createdAt: { $gte: lastWeek }
    });

    res.json({ 
      success: true, 
      stats: {
        total: totalUsers,
        newLastWeek: newUsersLastWeek
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🗑️ حذف مستخدم (للمسؤول فقط)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // التحقق من وجود المستخدم
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    // منع حذف حساب المسؤول (اختياري)
    if (user.email === process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "لا يمكن حذف حساب المسؤول" });
    }

    await userModel.findByIdAndDelete(id);
    
    res.json({ success: true, message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✏️ تحديث بيانات المستخدم
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    // التحقق من وجود المستخدم
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    // التحقق من البريد الإلكتروني إذا تم تغييره
    if (email && email !== user.email) {
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res.json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" });
      }
      
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "بريد إلكتروني غير صالح" });
      }
    }

    // تحديث البيانات
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address
      },
      { new: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: "تم تحديث البيانات بنجاح",
      user: updatedUser 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🔄 تغيير حالة المستخدم (نشط/غير نشط)
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "المستخدم غير موجود" });
    }

    // منع تعطيل حساب المسؤول
    if (user.email === process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "لا يمكن تعطيل حساب المسؤول" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ 
      success: true, 
      message: user.isActive ? "تم تفعيل المستخدم" : "تم تعطيل المستخدم",
      isActive: user.isActive
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 📝 جلب طلبات المستخدم (إذا كان عندك نموذج طلبات)
const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    
    // إذا كان عندك نموذج طلبات، استخدم هذا الكود
    // const orders = await orderModel.find({ userId: id }).sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      orders: [] // orders || [] 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ التصدير المعدل (أضف الدوال الجديدة)
export {
  loginUser,
  registerUser,
  adminLogin,
  getAllUsers,        // ✅ جلب جميع المستخدمين
  getUserById,        // ✅ جلب مستخدم واحد
  getUserStats,       // ✅ إحصائيات المستخدمين
  deleteUser,         // ✅ حذف مستخدم
  updateUser,         // ✅ تحديث بيانات مستخدم
  toggleUserStatus,   // ✅ تفعيل/تعطيل مستخدم
  getUserOrders       // ✅ جلب طلبات المستخدم
};