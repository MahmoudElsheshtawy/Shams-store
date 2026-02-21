import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState,setCurrentState] =useState("login");
  const { navigate,backendUrl,token,setToken}= useContext(ShopContext) 

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')



  const onSubmithandeler =async(event)=>{
    event.preventDefault();
    try {
        if (currentState ==='Singn UP') {
         
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        
          //  console.log(response.data);
           
           
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          // console.log(response.data);
             
        }else{
          toast.error(response.data.message)
        }
        
        }else{ 
          const response =await axios.post(backendUrl + '/api/user/login',{email,password})
        
            if (response.data.success) {
              setToken(response.data.token)
              localStorage.setItem('token',response.data.token)
            }
            else{
              toast.error("يرجي اشاء حساب ")
              // response.data.message +
            }
        }
    } catch (error) {
           console.log(error);
           toast.error(error.message)
    
    }
  }
  useEffect(()=>{
     if (token) {
      navigate('/')
     }
  },[token])
  return (
      <form onSubmit={onSubmithandeler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
       {currentState === 'login'? '' : <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          onChange={(e)=>setName(e.target.value)}
          
        /> 
        } 
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
          onChange={(e)=>setEmail(e.target.value)}
          
        />
          <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          onChange={(e)=>setPassword(e.target.value)}
        
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className=" cursor-pointer">Forgot your password?</p>
          {currentState === 'login'
          ?<p onClick={()=>{setCurrentState("Singn UP")}} className=" cursor-pointer">انشاء حساب</p>
          :<p onClick={()=>{setCurrentState("login")}} className=" cursor-pointer">تسجيل الدخول</p>
        }
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
         {currentState === 'login' ? 'Sign In' :'Sign Up'}
        </button>
      </form>

  );
};

export default Login;
// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Mail, Lock, User, LogIn, UserPlus, 
//   Loader2, Eye, EyeOff, ArrowRight, CheckCircle 
// } from "lucide-react";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("login");
//   const { navigate, backendUrl, token, setToken } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // التحقق من صحة البريد الإلكتروني
//   const isValidEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   // التحقق من قوة كلمة المرور
//   const isStrongPassword = (password) => {
//     return password.length >= 8;
//   };

//   const onSubmithandeler = async (event) => {
//     event.preventDefault();
    
//     // التحقق من المدخلات
//     if (!email || !password) {
//       return toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
//     }

//     if (!isValidEmail(email)) {
//       return toast.error("يرجى إدخال بريد إلكتروني صحيح");
//     }

//     if (currentState === 'Singn UP') {
//       if (!name) {
//         return toast.error("يرجى إدخال الاسم");
//       }
//       if (!isStrongPassword(password)) {
//         return toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
//       }
//     }

//     setLoading(true);
    
//     try {
//       let response;
      
//       if (currentState === 'Singn UP') {
//         response = await axios.post(backendUrl + '/api/user/register', { 
//           name, 
//           email, 
//           password 
//         });
//       } else {
//         response = await axios.post(backendUrl + '/api/user/login', { 
//           email, 
//           password 
//         });
//       }

//       if (response.data.success) {
//         setSuccess(true);
//         setToken(response.data.token);
//         localStorage.setItem('token', response.data.token);
        
//         // حفظ البريد للتذكر إذا اختار المستخدم
//         if (rememberMe) {
//           localStorage.setItem('rememberedEmail', email);
//         } else {
//           localStorage.removeItem('rememberedEmail');
//         }
        
//         toast.success(currentState === 'Singn UP' ? "تم إنشاء الحساب بنجاح!" : "تم تسجيل الدخول بنجاح!");
        
//         // تأخير بسيط قبل التوجيه لإظهار رسالة النجاح
//         setTimeout(() => {
//           navigate('/');
//         }, 1500);
//       } else {
//         toast.error(response.data.message);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "حدث خطأ. حاول مرة أخرى");
//       setLoading(false);
//     }
//   };

//   // استرجاع البريد الإلكتروني المحفوظ
//   useEffect(() => {
//     const rememberedEmail = localStorage.getItem('rememberedEmail');
//     if (rememberedEmail) {
//       setEmail(rememberedEmail);
//       setRememberMe(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token]);

//   // تبديل بين تسجيل الدخول وإنشاء حساب
//   const toggleState = () => {
//     setCurrentState(prev => prev === 'login' ? 'Singn UP' : 'login');
//     setShowPassword(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100/30 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         {/* بطاقة تسجيل الدخول */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
          
//           {/* الهيدر المزخرف */}
//           <div className="bg-gradient-to-l from-emerald-600 to-emerald-500 p-6 text-white text-center relative overflow-hidden">
//             <div className="absolute inset-0 bg-black/10"></div>
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="relative z-10"
//             >
//               {currentState === 'login' ? (
//                 <LogIn className="w-16 h-16 mx-auto mb-2" />
//               ) : (
//                 <UserPlus className="w-16 h-16 mx-auto mb-2" />
//               )}
//               <h2 className="text-2xl font-bold">
//                 {currentState === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
//               </h2>
//               <p className="text-emerald-100 text-sm mt-1">
//                 {currentState === 'login' 
//                   ? 'مرحباً بعودتك! سجل دخولك للمتابعة' 
//                   : 'انضم إلينا الآن واستمتع بالتسوق'}
//               </p>
//             </motion.div>
//           </div>

//           {/* رسالة النجاح */}
//           <AnimatePresence>
//             {success && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="bg-green-50 border-b border-green-200 p-4 text-center"
//               >
//                 <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
//                 <p className="text-green-700 font-medium">
//                   {currentState === 'Singn UP' 
//                     ? 'تم إنشاء الحساب بنجاح! جاري تحويلك...' 
//                     : 'تم تسجيل الدخول بنجاح! جاري تحويلك...'}
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* الفورم */}
//           <form onSubmit={onSubmithandeler} className="p-6 space-y-4">
            
//             {/* حقل الاسم - يظهر فقط في إنشاء حساب */}
//             <AnimatePresence>
//               {currentState === 'Singn UP' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   className="relative"
//                 >
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     الاسم الكامل
//                   </label>
//                   <div className="relative">
//                     <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
//                       placeholder="أدخل اسمك الكامل"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required={currentState === 'Singn UP'}
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* حقل البريد الإلكتروني */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 البريد الإلكتروني
//               </label>
//               <div className="relative">
//                 <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
//                   placeholder="example@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* حقل كلمة المرور */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 كلمة المرور
//               </label>
//               <div className="relative">
//                 <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full pr-10 pl-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
//                   placeholder="********"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
              
//               {/* مؤشر قوة كلمة المرور (فقط في إنشاء حساب) */}
//               {currentState === 'Singn UP' && password && (
//                 <div className="mt-2">
//                   <div className="flex items-center gap-2">
//                     <div className={`h-1 flex-1 rounded-full ${
//                       password.length >= 8 ? 'bg-green-500' : 'bg-gray-200'
//                     }`} />
//                     <div className={`h-1 flex-1 rounded-full ${
//                       password.length >= 10 ? 'bg-green-500' : 'bg-gray-200'
//                     }`} />
//                     <div className={`h-1 flex-1 rounded-full ${
//                       /[!@#$%^&*]/.test(password) ? 'bg-green-500' : 'bg-gray-200'
//                     }`} />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {password.length < 8 
//                       ? `كلمة المرور ضعيفة (${password.length}/8)` 
//                       : 'كلمة المرور قوية ✓'}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* خيارات إضافية */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
//                 />
//                 <span className="text-gray-600">تذكرني</span>
//               </label>
              
//               {currentState === 'login' && (
//                 <button
//                   type="button"
//                   onClick={() => toast.info("جاري تطوير هذه الميزة")}
//                   className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
//                 >
//                   نسيت كلمة المرور؟
//                 </button>
//               )}
//             </div>

//             {/* زر الإرسال مع لودنج */}
//             <button
//               type="submit"
//               disabled={loading || success}
//               className="w-full bg-gradient-to-l from-emerald-600 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   جاري المعالجة...
//                 </>
//               ) : (
//                 <>
//                   {currentState === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>

//             {/* رابط التبديل بين الحالتين */}
//             <div className="text-center text-sm text-gray-600">
//               {currentState === 'login' ? (
//                 <>
//                   ليس لديك حساب؟{' '}
//                   <button
//                     type="button"
//                     onClick={toggleState}
//                     className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
//                   >
//                     إنشاء حساب جديد
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   لديك حساب بالفعل؟{' '}
//                   <button
//                     type="button"
//                     onClick={toggleState}
//                     className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
//                   >
//                     تسجيل الدخول
//                   </button>
//                 </>
//               )}
//             </div>
//           </form>

//           {/* فوتر بسيط */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
//             <p className="text-xs text-gray-500">
//               بالتسجيل أنت توافق على {' '}
//               <a href="#" className="text-emerald-600 hover:underline">الشروط والأحكام</a>
//               {' '} و{' '}
//               <a href="#" className="text-emerald-600 hover:underline">سياسة الخصوصية</a>
//             </p>
//           </div>
//         </div>

//         {/* رسالة ترحيبية للزوار الجدد */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-center mt-6"
//         >
//           <p className="text-sm text-gray-600">
//             {currentState === 'login' 
//               ? 'مستخدم جديد؟ أنشئ حساب واستمتع بتجربة تسوق مميزة'
//               : 'انضم إلى آلاف المتسوقين واستمتع بأفضل العروض'}
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;