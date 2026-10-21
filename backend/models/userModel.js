// import mongoose from "mongoose";

// // const userSchema =new mongoose.Schema({
// //     name:{type :String ,require :true},
// //     email:{type :String ,require :true,unique :true},
// //     password:{type :String ,require :true},
// //     cartData:{type :Object ,default:{}},

// // },{minimize: false})
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     cartData: { type: Object, default: {} },
//     lastLogin: { type: Date, default: null }, // 👈 وقت آخر تسجيل دخول
//     loginCount: { type: Number, default: 0 }, // 👈 عدد مرات تسجيل الدخول (اختياري)
//     lastLoginIP: { type: String, default: null }, // 👈 IP آخر تسجيل (اختياري)
//     lastLoginDevice: { type: String, default: null }, // 👈 نوع الجهاز (اختياري)
//     createdAt: { type: Date, default: Date.now }, // 👈 وقت التسجيل (مهم)
//     updatedAt: { type: Date, default: Date.now } // 👈 وقت آخر تحديث
// }, { minimize: false, timestamps: true }); // ✅ timestamps: true بيضيف createdAt و updatedAt تلقائياً

// const userModel =mongoose.model.user ||mongoose.model('user',userSchema)


// export default userModel

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // اسم المستخدم
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // البريد الإلكتروني
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // كلمة المرور
    // أصبحت غير مطلوبة لأن مستخدم Google لا يمتلك password محلية
    password: {
      type: String,
      default: null,
    },

    // Google UID
    // googleId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    //   default: null,
    // },
    googleId: { type: String, unique: true, sparse: true, default: undefined },

    // طريقة تسجيل الدخول
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // صورة المستخدم من Google
    image: {
      type: String,
      default: null,
    },

    // بيانات السلة
    cartData: {
      type: Object,
      default: {},
    },

    // آخر تسجيل دخول
    lastLogin: {
      type: Date,
      default: null,
    },

    // عدد مرات تسجيل الدخول
    loginCount: {
      type: Number,
      default: 0,
    },

    // IP آخر تسجيل دخول
    lastLoginIP: {
      type: String,
      default: null,
    },

    // الجهاز المستخدم
    lastLoginDevice: {
      type: String,
      default: null,
    },

    // حالة المستخدم
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    minimize: false,
    timestamps: true,
  },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
