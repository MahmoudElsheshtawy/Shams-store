import mongoose from "mongoose";

// const userSchema =new mongoose.Schema({
//     name:{type :String ,require :true},
//     email:{type :String ,require :true,unique :true},
//     password:{type :String ,require :true},
//     cartData:{type :Object ,default:{}},

// },{minimize: false})
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    lastLogin: { type: Date, default: null }, // 👈 وقت آخر تسجيل دخول
    loginCount: { type: Number, default: 0 }, // 👈 عدد مرات تسجيل الدخول (اختياري)
    lastLoginIP: { type: String, default: null }, // 👈 IP آخر تسجيل (اختياري)
    lastLoginDevice: { type: String, default: null }, // 👈 نوع الجهاز (اختياري)
    createdAt: { type: Date, default: Date.now }, // 👈 وقت التسجيل (مهم)
    updatedAt: { type: Date, default: Date.now } // 👈 وقت آخر تحديث
}, { minimize: false, timestamps: true }); // ✅ timestamps: true بيضيف createdAt و updatedAt تلقائياً

const userModel =mongoose.model.user ||mongoose.model('user',userSchema)


export default userModel