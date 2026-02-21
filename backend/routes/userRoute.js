import express from 'express';
import {adminLogin,registerUser,loginUser, getAllUsers, getUserStats, getUserById, getUserOrders, toggleUserStatus, deleteUser, updateUser} from '../controllers/userControllers.js'
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
// =============================
userRouter.get('/list', adminAuth, getAllUsers);
userRouter.get('/stats', adminAuth, getUserStats);               // 📊 إحصائيات المستخدمين
userRouter.get('/:id', adminAuth, getUserById);                  // 🔍 جلب مستخدم واحد
userRouter.get('/:id/orders', adminAuth, getUserOrders);         // 📝 جلب طلبات المستخدم
userRouter.put('/:id', adminAuth, updateUser);                   // ✏️ تحديث مستخدم
userRouter.put('/:id/toggle-status', adminAuth, toggleUserStatus); // 🔄 تفعيل/تعطيل
userRouter.delete('/:id', adminAuth, deleteUser);  
export default userRouter;