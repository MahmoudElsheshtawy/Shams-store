// // import userModel from "../models/userModel.js";
// // import validator from "validator"
// // import bcrypt from "bcrypt"
// // import jwt from "jsonwebtoken";



// // const createToken =(id)=>{
// //     return jwt.sign({id},process.env.JWT_SECRET)
// // }
// // // ______________route for user login____________________
// // const loginUser =async (req,res)=>{
// // try {
// //     const {email,password}= req.body;
// //     const user =await userModel.findOne({email});
// //     if (!user) {
// //          return res.json({success:false ,message:"User dosn't  exists"})
// //     }
// //     const isMatch =await bcrypt.compare(password,user.password);
// //     if (isMatch) {
// //         const token = createToken(user._id)
// //         res.json({success:true,token})
// //     }else{
// //         res.json({success:false,message:'Invalid credentials'})
// //     }

// // } catch (error) {
// //        console.log(error);
// //     res.json({success:false, message:error.message})
   
    
// // }
// // }


// // // _______________route for user registerUser________________
// // const registerUser =async (req,res)=>{
// // try {
// //     const {name, email,password}= req.body;

// //     // checking user already or not....
// //     const exists = await userModel.findOne({email});

// //     if (exists) {
// //         return res.json({success:false ,message:"User already exists"})
// //     }
// //     // validating email format & strong password
// //     if (!validator.isEmail(email)) {
// //         return res.json ({success :false,message:"Please enter a valid email"})
        
// //     }
// //      if (password.length < 8) {
// //         return res.json ({success :false,message:"Please enter a Strong password "})
        
// //     }
// //     // hashing user password

// //     const salt = await bcrypt.genSalt(10)
// //     const hashedPassword = await bcrypt.hash(password,salt)
    
// //     const newUser = new userModel({
// //         name,
// //         email,
// //         password:hashedPassword
// //     })
// //     const user = await newUser.save() 
// //     // console.log(user);
// //     // console.log("kkkkkkkkk");
    
    
// //     const token = createToken(user._id)
// //     res.json({success:true,token})

// // } catch (error) {
// //     console.log(error);
// //     res.json({success:false, message:error.message})
    
// // }    
// // }




// // //________________ route for user adminLogin __________________________________________
// // const adminLogin =async (req,res)=>{
// //      try {
// //         const {email,password} = req.body

// //         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
// //             const token = jwt.sign(email+password,process.env.JWT_SECRET);
// //             res.json({success:true,token})
// //         }else{
// //             res.json({success:false,message:"invalid credentials "})
// //         }
// //      } catch (error) {
// //          console.log(error);
// //          res.json({success:false,message:error.message})
   
// //      }


// // }


// // export {
// //     loginUser,
// //     registerUser,
// //     adminLogin
// // }

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

// // ================ التحكم في المستخدمين (جديد) ================

// // 📋 جلب جميع المستخدمين (للوحة التحكم)
// const getAllUsers = async (req, res) => {
//   try {
//     // جلب جميع المستخدمين مع إخفاء كلمة المرور
//     const users = await userModel.find({})
//       .select('-password') // منع إرجاع كلمة المرور
//       .sort({ createdAt: -1 }); // ترتيب من الأحدث للأقدم

//     res.json({ 
//       success: true, 
//       users,
//       count: users.length 
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 🔍 جلب مستخدم واحد بالـ ID
// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const user = await userModel.findById(id).select('-password');
    
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     res.json({ success: true, user });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 📊 إحصائيات المستخدمين
// const getUserStats = async (req, res) => {
//   try {
//     const totalUsers = await userModel.countDocuments();
    
//     // المستخدمين الجدد في آخر 7 أيام
//     const lastWeek = new Date();
//     lastWeek.setDate(lastWeek.getDate() - 7);
    
//     const newUsersLastWeek = await userModel.countDocuments({
//       createdAt: { $gte: lastWeek }
//     });

//     res.json({ 
//       success: true, 
//       stats: {
//         total: totalUsers,
//         newLastWeek: newUsersLastWeek
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 🗑️ حذف مستخدم (للمسؤول فقط)
// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // التحقق من وجود المستخدم
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     // منع حذف حساب المسؤول (اختياري)
//     if (user.email === process.env.ADMIN_EMAIL) {
//       return res.json({ success: false, message: "لا يمكن حذف حساب المسؤول" });
//     }

//     await userModel.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "تم حذف المستخدم بنجاح" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ✏️ تحديث بيانات المستخدم
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, phone, address } = req.body;

//     // التحقق من وجود المستخدم
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     // التحقق من البريد الإلكتروني إذا تم تغييره
//     if (email && email !== user.email) {
//       const emailExists = await userModel.findOne({ email });
//       if (emailExists) {
//         return res.json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" });
//       }
      
//       if (!validator.isEmail(email)) {
//         return res.json({ success: false, message: "بريد إلكتروني غير صالح" });
//       }
//     }

//     // تحديث البيانات
//     const updatedUser = await userModel.findByIdAndUpdate(
//       id,
//       {
//         name: name || user.name,
//         email: email || user.email,
//         phone: phone || user.phone,
//         address: address || user.address
//       },
//       { new: true }
//     ).select('-password');

//     res.json({ 
//       success: true, 
//       message: "تم تحديث البيانات بنجاح",
//       user: updatedUser 
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 🔄 تغيير حالة المستخدم (نشط/غير نشط)
// const toggleUserStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     // منع تعطيل حساب المسؤول
//     if (user.email === process.env.ADMIN_EMAIL) {
//       return res.json({ success: false, message: "لا يمكن تعطيل حساب المسؤول" });
//     }

//     user.isActive = !user.isActive;
//     await user.save();

//     res.json({ 
//       success: true, 
//       message: user.isActive ? "تم تفعيل المستخدم" : "تم تعطيل المستخدم",
//       isActive: user.isActive
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 📝 جلب طلبات المستخدم (إذا كان عندك نموذج طلبات)
// const getUserOrders = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // إذا كان عندك نموذج طلبات، استخدم هذا الكود
//     // const orders = await orderModel.find({ userId: id }).sort({ createdAt: -1 });
    
//     res.json({ 
//       success: true, 
//       orders: [] // orders || [] 
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ✅ التصدير المعدل (أضف الدوال الجديدة)
// export {
//   loginUser,
//   registerUser,
//   adminLogin,
//   getAllUsers,        // ✅ جلب جميع المستخدمين
//   getUserById,        // ✅ جلب مستخدم واحد
//   getUserStats,       // ✅ إحصائيات المستخدمين
//   deleteUser,         // ✅ حذف مستخدم
//   updateUser,         // ✅ تحديث بيانات مستخدم
//   toggleUserStatus,   // ✅ تفعيل/تعطيل مستخدم
//   getUserOrders       // ✅ جلب طلبات المستخدم
// };

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

// // ================ التحكم في المستخدمين (جديد) ================

// // 📋 جلب جميع المستخدمين (للوحة التحكم)
// const getAllUsers = async (req, res) => {
//   try {
//     // جلب جميع المستخدمين مع إخفاء كلمة المرور
//     const users = await userModel.find({})
//       .select('-password') // منع إرجاع كلمة المرور
//       .sort({ createdAt: -1 }); // ترتيب من الأحدث للأقدم

//     res.json({ 
//       success: true, 
//       users,
//       count: users.length 
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 🔍 جلب مستخدم واحد بالـ ID
// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const user = await userModel.findById(id).select('-password');
    
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     res.json({ success: true, user });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 📊 إحصائيات المستخدمين
// const getUserStats = async (req, res) => {
//   try {
//     const totalUsers = await userModel.countDocuments();
    
//     // المستخدمين الجدد في آخر 7 أيام
//     const lastWeek = new Date();
//     lastWeek.setDate(lastWeek.getDate() - 7);
    
//     const newUsersLastWeek = await userModel.countDocuments({
//       createdAt: { $gte: lastWeek }
//     });

//     res.json({ 
//       success: true, 
//       stats: {
//         total: totalUsers,
//         newLastWeek: newUsersLastWeek
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 🗑️ حذف مستخدم (للمسؤول فقط)
// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // التحقق من وجود المستخدم
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     // منع حذف حساب المسؤول (اختياري)
//     if (user.email === process.env.ADMIN_EMAIL) {
//       return res.json({ success: false, message: "لا يمكن حذف حساب المسؤول" });
//     }

//     await userModel.findByIdAndDelete(id);
    
//     res.json({ success: true, message: "تم حذف المستخدم بنجاح" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ✏️ تحديث بيانات المستخدم
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, phone, address } = req.body;

//     // التحقق من وجود المستخدم
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     // التحقق من البريد الإلكتروني إذا تم تغييره
//     if (email && email !== user.email) {
//       const emailExists = await userModel.findOne({ email });
//       if (emailExists) {
//         return res.json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" });
//       }
      
//       if (!validator.isEmail(email)) {
//         return res.json({ success: false, message: "بريد إلكتروني غير صالح" });
//       }
//     }

//     // تحديث البيانات
//     const updatedUser = await userModel.findByIdAndUpdate(
//       id,
//       {
//         name: name || user.name,
//         email: email || user.email,
//         phone: phone || user.phone,
//         address: address || user.address
//       },
//       { new: true }
//     ).select('-password');

//     res.json({ 
//       success: true, 
//       message: "تم تحديث البيانات بنجاح",
//       user: updatedUser 
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 🔄 تغيير حالة المستخدم (نشط/غير نشط)
// const toggleUserStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const user = await userModel.findById(id);
//     if (!user) {
//       return res.json({ success: false, message: "المستخدم غير موجود" });
//     }

//     // منع تعطيل حساب المسؤول
//     if (user.email === process.env.ADMIN_EMAIL) {
//       return res.json({ success: false, message: "لا يمكن تعطيل حساب المسؤول" });
//     }

//     user.isActive = !user.isActive;
//     await user.save();

//     res.json({ 
//       success: true, 
//       message: user.isActive ? "تم تفعيل المستخدم" : "تم تعطيل المستخدم",
//       isActive: user.isActive
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // 📝 جلب طلبات المستخدم (إذا كان عندك نموذج طلبات)
// const getUserOrders = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // إذا كان عندك نموذج طلبات، استخدم هذا الكود
//     // const orders = await orderModel.find({ userId: id }).sort({ createdAt: -1 });
    
//     res.json({ 
//       success: true, 
//       orders: [] // orders || [] 
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ✅ التصدير المعدل (أضف الدوال الجديدة)
// export {
//   loginUser,
//   registerUser,
//   adminLogin,
//   getAllUsers,        // ✅ جلب جميع المستخدمين
//   getUserById,        // ✅ جلب مستخدم واحد
//   getUserStats,       // ✅ إحصائيات المستخدمين
//   deleteUser,         // ✅ حذف مستخدم
//   updateUser,         // ✅ تحديث بيانات مستخدم
//   toggleUserStatus,   // ✅ تفعيل/تعطيل مستخدم
//   getUserOrders       // ✅ جلب طلبات المستخدم
// };

import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { firebaseAuth } from "../config/firebaseAdmin.js";
// import firebaseAuth from "../config/firebaseAdmin.js";
// ======================================================
// Create JWT
// ======================================================

const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// ======================================================
// Helper: Update Login Information
// ======================================================

const updateLoginInfo = async (user, req) => {
  user.lastLogin = new Date();

  user.loginCount = (user.loginCount || 0) + 1;

  user.lastLoginIP =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    null;

  user.lastLoginDevice =
    req.headers["user-agent"] || null;

  await user.save();
};

// ======================================================
// Normal User Login
// POST /api/user/login
// ======================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // Check if account is disabled
    if (user.isActive === false) {
      return res.json({
        success: false,
        message: "Your account has been disabled",
      });
    }

    // Google account without password
    if (!user.password) {
      return res.json({
        success: false,
        message:
          "This account was created with Google. Please login with Google.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    await updateLoginInfo(user, req);

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("Login Error:", error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Register User
// POST /api/user/register
// ======================================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Required fields
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email
      .toLowerCase()
      .trim();

    // Validate email
    if (!validator.isEmail(normalizedEmail)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.json({
        success: false,
        message:
          "Please enter a strong password with at least 8 characters",
      });
    }

    // Check existing user
    const exists = await userModel.findOne({
      email: normalizedEmail,
    });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create user
    const newUser = new userModel({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      authProvider: "local",
    });

    const user = await newUser.save();

    // Login information
    await updateLoginInfo(user, req);

    // Create JWT
    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("Register Error:", error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Google Login
// POST /api/user/google-login
// ======================================================

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    // Verify Firebase token
  const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    const email = decodedToken.email;

    const name =
      decodedToken.name ||
      decodedToken.email?.split("@")[0] ||
      "Google User";

    const image =
      decodedToken.picture || null;

    // Google should have verified email
    if (!email) {
      return res.json({
        success: false,
        message:
          "Google account does not have a valid email",
      });
    }

    const normalizedEmail = email
      .toLowerCase()
      .trim();

    // ==================================================
    // Find by Google ID first
    // ==================================================

    let user = await userModel.findOne({
      googleId: firebaseUid,
    });

    // ==================================================
    // If not found, search by email
    // ==================================================

    if (!user) {
      user = await userModel.findOne({
        email: normalizedEmail,
      });
    }

    // ==================================================
    // Existing User
    // ==================================================

    if (user) {
      // Check account status
      if (user.isActive === false) {
        return res.json({
          success: false,
          message: "Your account has been disabled",
        });
      }

      // Link Google account to existing account
      user.googleId = firebaseUid;

      user.authProvider = "google";

      user.image = image || user.image;

      // Keep existing name if available
      if (!user.name) {
        user.name = name;
      }

      await updateLoginInfo(user, req);

      const token = createToken(user._id);

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    }

    // ==================================================
    // New Google User
    // ==================================================

    user = new userModel({
      name,
      email: normalizedEmail,
      password: null,
      googleId: firebaseUid,
      authProvider: "google",
      image,
    });

    await user.save();

    await updateLoginInfo(user, req);

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.log("Google Login Error:", error);

    return res.json({
      success: false,
      message:
        "Google authentication failed",
    });
  }
};

// ======================================================
// Admin Login
// POST /api/user/admin
// ======================================================

// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(
//         {
//           email,
//           role: "admin",
//         },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "30d",
//         }
//       );

//       return res.json({
//         success: true,
//         token,
//       });
//     }

//     return res.json({
//       success: false,
//       message: "Invalid credentials",
//     });
//   } catch (error) {
//     console.log("Admin Login Error:", error);

//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { role: "admin", email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// Get All Users
// GET /api/user/list
// ======================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      users,
      count: users.length,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Get User By ID
// GET /api/user/:id
// ======================================================

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel
      .findById(id)
      .select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// User Statistics
// GET /api/user/stats
// ======================================================

const getUserStats = async (req, res) => {
  try {
    const totalUsers =
      await userModel.countDocuments();

    const lastWeek = new Date();

    lastWeek.setDate(
      lastWeek.getDate() - 7
    );

    const newUsersLastWeek =
      await userModel.countDocuments({
        createdAt: {
          $gte: lastWeek,
        },
      });

    return res.json({
      success: true,
      stats: {
        total: totalUsers,
        newLastWeek: newUsersLastWeek,
      },
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Delete User
// DELETE /api/user/:id
// ======================================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user =
      await userModel.findById(id);

    if (!user) {
      return res.json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    // Prevent deleting admin
    if (
      user.email ===
      process.env.ADMIN_EMAIL
    ) {
      return res.json({
        success: false,
        message:
          "لا يمكن حذف حساب المسؤول",
      });
    }

    await userModel.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "تم حذف المستخدم بنجاح",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Update User
// PUT /api/user/:id
// ======================================================

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      address,
    } = req.body;

    const user =
      await userModel.findById(id);

    if (!user) {
      return res.json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    // Email validation
    if (
      email &&
      email !== user.email
    ) {
      const normalizedEmail =
        email.toLowerCase().trim();

      const emailExists =
        await userModel.findOne({
          email: normalizedEmail,
          _id: { $ne: id },
        });

      if (emailExists) {
        return res.json({
          success: false,
          message:
            "البريد الإلكتروني مستخدم بالفعل",
        });
      }

      if (
        !validator.isEmail(
          normalizedEmail
        )
      ) {
        return res.json({
          success: false,
          message:
            "بريد إلكتروني غير صالح",
        });
      }

      user.email = normalizedEmail;
    }

    if (name) {
      user.name = name;
    }

    if (phone) {
      user.phone = phone;
    }

    if (address) {
      user.address = address;
    }

    await user.save();

    const updatedUser =
      await userModel
        .findById(id)
        .select("-password");

    return res.json({
      success: true,
      message:
        "تم تحديث البيانات بنجاح",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Toggle User Status
// PUT /api/user/:id/toggle-status
// ======================================================

const toggleUserStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const user =
      await userModel.findById(id);

    if (!user) {
      return res.json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    if (
      user.email ===
      process.env.ADMIN_EMAIL
    ) {
      return res.json({
        success: false,
        message:
          "لا يمكن تعطيل حساب المسؤول",
      });
    }

    user.isActive =
      !user.isActive;

    await user.save();

    return res.json({
      success: true,
      message: user.isActive
        ? "تم تفعيل المستخدم"
        : "تم تعطيل المستخدم",
      isActive: user.isActive,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Get User Orders
// GET /api/user/:id/orders
// ======================================================

const getUserOrders = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    return res.json({
      success: true,
      orders: [],
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Export
// ======================================================

export {
  loginUser,
  registerUser,
  googleLogin,
  adminLogin,
  getAllUsers,
  getUserById,
  getUserStats,
  deleteUser,
  updateUser,
  toggleUserStatus,
  getUserOrders,
};

