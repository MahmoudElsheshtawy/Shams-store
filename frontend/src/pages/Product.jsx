
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import RelatedProducts from "../components/RelatedProducts";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingBag, Star, Ruler, Package, Check, ChevronDown } from "lucide-react";

// const Product = () => {
//   const { products, currency, addToCart, token, backendUrl } = useContext(ShopContext);
//   const { productId } = useParams();

//   const [productData, setProductData] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [size, setSize] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [showRatingDropdown, setShowRatingDropdown] = useState(false);
//   const [selectedSection, setSelectedSection] = useState("men");
//   const [ratingsDistribution, setRatingsDistribution] = useState({
//     5: 0, 4: 0, 3: 0, 2: 0, 1: 0,
//   });

//   // جلب المنتج
//   useEffect(() => {
//     if (!products?.length) return;

//     const product = products.find((p) => p._id === productId);
//     if (product) {
//       setProductData(product);
//       setMainImage(product.image?.[0] || "");

//       // تعيين أول قسم متوفر كمقس افتراضي
//       if (product.category === "shoes" && product.shoeSizes) {
//         const availableSections = ["men", "youth", "kids"].filter(
//           section => product.shoeSizes[section]?.length > 0
//         );
//         if (availableSections.length > 0) {
//           setSelectedSection(availableSections[0]);
//         }
//       }

//       if (product.numReviews > 0) {
//         const avg = Math.round(product.rating);
//         setRatingsDistribution({
//           5: avg === 5 ? product.numReviews : 0,
//           4: avg === 4 ? product.numReviews : 0,
//           3: avg === 3 ? product.numReviews : 0,
//           2: avg === 2 ? product.numReviews : 0,
//           1: avg === 1 ? product.numReviews : 0,
//         });
//       }
//     }
//   }, [products, productId]);

//   if (!productData) return null;

//   const totalReviews = productData.numReviews || 0;
//   const percentage = (count) => (totalReviews ? Math.round((count / totalReviews) * 100) : 0);

//   // إضافة للسلة
//   const handleAddToCart = () => {
//     if (!token) return toast.error("سجل دخول الأول");

//     if (productData.category === "shoes" && !size) {
//       return toast.error("اختار المقاس قبل الإضافة");
//     }

//     if (productData.category === "gloves" && !size) {
//       return toast.error("اختار المقاس قبل الإضافة");
//     }

//     addToCart(productData._id, size || "no_size");
//     toast.success("تمت الإضافة للعربة 🛒");
//   };

//   // التقييم
//   const handleRating = async (value) => {
//     if (!token) return toast.error("سجل دخول لتقييم المنتج");

//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/review`,
//         { productId, rating: value },
//         { headers: { token } }
//       );
// console.log(res.data);

//       if (res.data.success) {
//         setUserRating(value);
//         setShowRatingDropdown(false);

//         setProductData((prev) => ({
//           ...prev,
//           numReviews: prev.numReviews + 1,
//           rating: (prev.rating * prev.numReviews + value) / (prev.numReviews + 1),
//         }));

//         setRatingsDistribution((prev) => ({
//           ...prev,
//           [value]: prev[value] + 1,
//         }));

//         toast.success("تم التقييم بنجاح ⭐");
//       }
//     } catch {
//       toast.error("حصل خطأ أثناء التقييم");
//     }
//   };

//   const sectionArabic = {
//     kids: "أطفال",
//     youth: "شباب",
//     men: "رجالي",
//   };

//   const averageRating = productData.rating || 0;

//   // فلترة الأقسام المتاحة للأحذية
//   const availableShoeSections = productData.category === "shoes" && productData.shoeSizes
//     ? ["men", "youth", "kids"].filter(section => productData.shoeSizes[section]?.length > 0)
//     : [];

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }} 
//       animate={{ opacity: 1 }} 
//       className="bg-gray-50 min-h-screen py-4 sm:py-6 px-3 sm:px-4 lg:px-6"
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* مسار التنقل */}
//         <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto pb-1">
//           <span className="whitespace-nowrap hover:text-emerald-600">الرئيسية</span>
//           <ChevronDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
//           <span className="whitespace-nowrap hover:text-emerald-600">
//             {productData.category === "gloves" ? "قفازات" : productData.category}
//           </span>
//           <ChevronDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
//           <span className="text-gray-900 font-medium truncate">{productData.name}</span>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
//           {/* قسم الصور */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 sticky top-20">
//               {/* الصورة الرئيسية */}
//               <div className="relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
//                 <motion.img
//                   key={mainImage}
//                   src={mainImage}
//                   className="w-full h-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px] object-contain"
//                   initial={{ opacity: 0.5 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.2 }}
//                 />
//               </div>

//               {/* الصور المصغرة */}
//               <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
//                 {productData.image?.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setMainImage(img)}
//                     className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden ${
//                       mainImage === img ? 'border-emerald-500' : 'border-gray-200'
//                     }`}
//                   >
//                     <img src={img} className="w-full h-full object-cover" />
//                   </button>
                  
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* قسم التفاصيل */}
//           <div className="lg:w-1/2">
//             <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6">
//               {/* اسم المنتج */}
//               <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
//                 {productData.name}
//               </h1>

//               {/* التقييم والمراجعات */}
//               <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-4">
//                 <div className="flex items-center gap-0.5">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                         star <= averageRating
//                           ? 'fill-yellow-400 text-yellow-400'
//                           : 'text-gray-300'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xs sm:text-sm text-gray-500">
//                   ({totalReviews})
//                 </span>
                
//                 {/* زر التقييم */}
//                 <div className="relative mr-auto">
//                   <button
//                     onClick={() => setShowRatingDropdown(!showRatingDropdown)}
//                     className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors flex items-center gap-1"
//                   >
//                     <Star className="w-3.5 h-3.5" />
//                     قيم
//                   </button>

//                   <AnimatePresence>
//                     {showRatingDropdown && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -5 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -5 }}
//                         className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-1 z-20 border border-gray-200 min-w-[120px]"
//                       >
//                         {[5, 4, 3, 2, 1].map((rating) => (
//                           <button
//                             key={rating}
//                             onClick={() => handleRating(rating)}
//                             className="flex items-center gap-1.5 w-full px-3 py-1.5 hover:bg-gray-50 rounded text-xs"
//                           >
//                             <div className="flex gap-0.5">
//                               {[...Array(rating)].map((_, i) => (
//                                 <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                               ))}
//                             </div>
//                             <span className="text-gray-600">{rating}</span>
//                           </button>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* السعر */}
//               <div className="mb-4">
//                 <p className="text-xs text-gray-500 mb-0.5">السعر</p>
//                 <div className="flex items-baseline gap-1">
//                   <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
//                     {productData.price}
//                   </span>
//                   <span className="text-xs text-gray-500">{currency}</span>
//                 </div>
//               </div>

//               {/* الوصف */}
//               <div className="mb-4 flex flex-col">
//                 <p className="text-xs text-gray-500 mb-1">الوصف</p>
//                 <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
//                   {productData.discription}
//                 </p>
//               </div>

//               {/* المقاسات - حسب نوع المنتج */}
//               {productData.category === "shoes" ? (
//                 /* مقاسات الأحذية */
//                 availableShoeSections.length > 0 && (
//                   <div className="mb-4">
//                     <div className="flex items-center gap-1.5 mb-2">
//                       <Ruler className="w-4 h-4 text-gray-500" />
//                       <p className="text-xs font-medium text-gray-900">اختر مقاس الحذاء</p>
//                     </div>
                    
//                     {/* أزرار الفئات - حتى لو قسم واحد، نظهر الـ label */}
//                     <div className="mb-2">
//                       <p className="text-xs text-gray-500 mb-1.5">الفئة:</p>
//                       <div className="flex gap-1.5">
//                         {availableShoeSections.map((section) => (
//                           <button
//                             key={section}
//                             onClick={() => setSelectedSection(section)}
//                             className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                               selectedSection === section
//                                 ? 'bg-emerald-500 text-white'
//                                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                           >
//                             {sectionArabic[section]}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* أزرار مقاسات الأحذية */}
//                     <div className="mt-3">
//                       <p className="text-xs text-gray-500 mb-1.5">المقاس:</p>
//                       <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
//                         {productData.shoeSizes?.[selectedSection]?.map((s) => (
//                           <button
//                             key={s}
//                             onClick={() => setSize(s)}
//                             className={`
//                               py-2 rounded-lg border text-xs font-medium transition-all
//                               ${size === s
//                                 ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
//                                 : 'border-gray-200 hover:border-gray-300 text-gray-700'
//                               }
//                             `}
//                           >
//                             {s}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )
//               ) : productData.category === "gloves" ? (
//                 /* مقاسات القفازات */
//                 productData.gloveSizes?.length > 0 && (
//                   <div className="mb-4">
//                     <div className="flex items-center gap-1.5 mb-2">
//                       <Ruler className="w-4 h-4 text-gray-500" />
//                       <p className="text-xs font-medium text-gray-900">اختر مقاس القفاز</p>
//                     </div>

//                     {/* أزرار مقاسات القفازات */}
//                     <div className="mt-2">
//                       <p className="text-xs text-gray-500 mb-1.5">المقاس:</p>
//                       <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
//                         {productData.gloveSizes?.map((s) => (
//                           <button
//                             key={s}
//                             onClick={() => setSize(s)}
//                             className={`
//                               py-2 rounded-lg border text-xs font-medium transition-all
//                               ${size === s
//                                 ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
//                                 : 'border-gray-200 hover:border-gray-300 text-gray-700'
//                               }
//                             `}
//                           >
//                             {s}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )
//               ) : (
//                 /* مقاسات عامة للمنتجات الأخرى */
//                 productData.sizes?.length > 0 && (
//                   <div className="mb-4">
//                     <p className="text-xs font-medium text-gray-900 mb-2">المقاسات المتاحة</p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {productData.sizes.map((s) => (
//                         <button
//                           key={s}
//                           onClick={() => setSize(s)}
//                           className={`
//                             px-3 py-1.5 rounded-lg border text-xs font-medium transition-all min-w-[45px] text-center
//                             ${size === s
//                               ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
//                               : 'border-gray-200 hover:border-gray-300 text-gray-700'
//                             }
//                           `}
//                         >
//                           {s}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               )}

//               {/* إضافة للسلة - تظهر فقط إذا كان فيه مقاسات */}
//               {(productData.category === "shoes" && availableShoeSections.length > 0) ||
//                (productData.category === "gloves" && productData.gloveSizes?.length > 0) ||
//                (productData.category !== "shoes" && productData.category !== "gloves" && productData.sizes?.length > 0) ? (
//                 <button
//                   onClick={handleAddToCart}
//                   className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 sm:py-3.5 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
//                 >
//                   <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
//                   إضافة للعربة
//                 </button>
//               ) : (
//                 <div className="w-full bg-gray-200 text-gray-500 py-3 sm:py-3.5 rounded-lg font-medium text-center text-sm sm:text-base">
//                   غير متوفر
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* تقييمات المنتج */}
//         <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6">
//           <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">تقييمات المنتج</h2>
          
//           <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
//             {/* توزيع التقييمات */}
//             <div className="md:w-1/2">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-2xl sm:text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
//                 <div>
//                   <div className="flex gap-0.5 mb-0.5">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`w-4 h-4 ${
//                           star <= averageRating
//                             ? 'fill-yellow-400 text-yellow-400'
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-xs text-gray-500">{totalReviews} تقييم</p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <div key={star} className="flex items-center gap-2 text-xs">
//                     <span className="w-8">{star} ★</span>
//                     <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${percentage(ratingsDistribution[star])}%` }}
//                         className="h-full bg-yellow-400 rounded-full"
//                       />
//                     </div>
//                     <span className="text-gray-500 w-12">
//                       {ratingsDistribution[star]}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* إضافة تقييم */}
//             <div className="md:w-1/2 bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-medium text-gray-900 mb-3">أضف تقييمك</h3>
//               <div className="flex gap-1.5 mb-2">
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <button
//                     key={star}
//                     onClick={() => handleRating(star)}
//                     className="p-1 hover:bg-gray-200 rounded transition-colors"
//                   >
//                     <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//                   </button>
//                 ))}
//               </div>
//               <p className="text-xs text-gray-500">اضغط على النجوم للتقييم</p>
//             </div>
//           </div>
//         </div>

//         {/* منتجات مشابهة */}
//         <div className="mt-6 sm:mt-8">
//           <RelatedProducts 
//             category={productData.category} 
//             subCategory={productData.subCategory} 
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Product;

// =============================
// =============================
// =============================
// =============================
// =============================
// =============================
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import RelatedProducts from "../components/RelatedProducts";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingBag, Star, Ruler, ChevronDown } from "lucide-react";

// const Product = () => {
//   const { products, currency, addToCart, token, backendUrl } =
//     useContext(ShopContext);
//   const { productId } = useParams();

//   const [productData, setProductData] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [size, setSize] = useState("");
//   const [timeLeft, setTimeLeft] = useState(null);

//   /* ================== جلب المنتج ================== */
//   useEffect(() => {
//     if (!products?.length) return;

//     const product = products.find((p) => p._id === productId);
//     if (product) {
//       setProductData(product);
//       setMainImage(product.image?.[0] || "");
//     }
//   }, [products, productId]);

//   /* ================== Countdown ================== */
//   useEffect(() => {
//     if (!productData?.discountEnd) return;

//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const end = new Date(productData.discountEnd).getTime();
//       const diff = end - now;

//       if (diff <= 0) {
//         setTimeLeft(null);
//         clearInterval(interval);
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const minutes = Math.floor((diff / 1000 / 60) % 60);
//       const seconds = Math.floor((diff / 1000) % 60);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [productData]);

//   if (!productData) return null;

//   const hasDiscount =
//     productData.discountPercentage > 0 &&
//     productData.finalPrice < productData.price;

//   /* ================== إضافة للسلة ================== */
//   const handleAddToCart = () => {
//     if (!token) return toast.error("سجل دخول الأول");
//     addToCart(productData._id, size || "no_size");
//     toast.success("تمت الإضافة للعربة 🛒");
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//       className="bg-gray-50 min-h-screen py-6 px-4">

//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

//         {/* ================== الصور ================== */}
//         <div className="lg:w-1/2">
//           <div className="bg-white rounded-2xl border p-4 relative">

//             {/* Badge على الصورة */}
//             {hasDiscount && (
//               <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-pulse">
//                 خصم {productData.discountPercentage}%
//               </div>
//             )}

//             <img
//               src={mainImage}
//               className="w-full max-h-[450px] object-contain"
//             />

//             <div className="flex gap-2 mt-3">
//               {productData.image?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   onClick={() => setMainImage(img)}
//                   className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
//                     mainImage === img
//                       ? "border-emerald-500"
//                       : "border-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ================== التفاصيل ================== */}
//         <div className="lg:w-1/2 bg-white rounded-2xl border p-6">

//           <h1 className="text-2xl font-bold mb-3">
//             {productData.name}
//           </h1>

//           {/* ================== السعر ================== */}
//           <div className="mb-4">
//             <p className="text-sm text-gray-500 mb-1">السعر</p>

//             {hasDiscount ? (
//               <>
//                 <div className="flex items-center gap-3">
//                   <span className="text-3xl font-bold text-emerald-600">
//                     {productData.finalPrice}
//                   </span>
//                   <span className="text-gray-500 text-sm">
//                     {currency}
//                   </span>

//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                     -{productData.discountPercentage}%
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="line-through text-gray-400 text-sm">
//                     {productData.price}
//                   </span>
//                   <span className="text-gray-400 text-xs">
//                     {currency}
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <span className="text-3xl font-bold">
//                   {productData.price}
//                 </span>
//                 <span className="text-gray-500 text-sm">
//                   {currency}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* ================== Countdown ================== */}
//           {hasDiscount && timeLeft && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-4">
//               <p className="text-red-600 text-sm font-medium mb-3">
//                 ⏳ العرض ينتهي خلال
//               </p>

//               <div className="flex justify-center gap-3 text-red-700 font-bold">
//                 <div className="bg-white px-3 py-2 rounded shadow">
//                   {timeLeft.days}ي
//                 </div>
//                 <div className="bg-white px-3 py-2 rounded shadow">
//                   {timeLeft.hours}س
//                 </div>
//                 <div className="bg-white px-3 py-2 rounded shadow">
//                   {timeLeft.minutes}د
//                 </div>
//                 <div className="bg-white px-3 py-2 rounded shadow">
//                   {timeLeft.seconds}ث
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ================== الوصف ================== */}
//           <p className="text-gray-600 mb-6">
//             {productData.discription}
//           </p>

//           {/* ================== زر الشراء ================== */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition"
//           >
//             <ShoppingBag size={18} />
//             إضافة للعربة
//           </button>
//         </div>
//       </div>

//       <div className="mt-10">
//         <RelatedProducts
//           category={productData.category}
//           subCategory={productData.subCategory}
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default Product;
// =============================
// =============================
// =============================
// =============================
// =============================
// =============================
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Ruler, Package, Check, ChevronDown, Clock, AlertCircle } from "lucide-react";

const Product = () => {
  const { products, currency, addToCart, token, backendUrl, updateProductDiscount } = useContext(ShopContext);
  const { productId } = useParams();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [selectedSection, setSelectedSection] = useState("men");
  const [ratingsDistribution, setRatingsDistribution] = useState({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0,
  });
  const [timeLeft, setTimeLeft] = useState(null);
  const [discountEnded, setDiscountEnded] = useState(false);

  // حساب بيانات الخصم باستخدام useMemo
  const discountInfo = useMemo(() => {
    if (!productData) return { hasDiscount: false, finalPrice: 0, discountPercentage: 0 };
    
    const hasDiscount = productData.discountPercentage > 0 && 
                       productData.finalPrice < productData.price &&
                       !discountEnded;
    
    return {
      hasDiscount,
      finalPrice: productData.finalPrice || productData.price,
      originalPrice: productData.price,
      discountPercentage: productData.discountPercentage || 0
    };
  }, [productData, discountEnded]);

  // جلب المنتج
  useEffect(() => {
    if (!products?.length) return;

    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setMainImage(product.image?.[0] || "");

      // تعيين أول قسم متوفر كمقاس افتراضي للأحذية فقط
      if (product.category === "shoes" && product.shoeSizes) {
        const availableSections = ["men", "youth", "kids"].filter(
          section => product.shoeSizes[section]?.length > 0
        );
        if (availableSections.length > 0) {
          setSelectedSection(availableSections[0]);
        }
      }

      if (product.numReviews > 0) {
        const avg = Math.round(product.rating);
        setRatingsDistribution({
          5: avg === 5 ? product.numReviews : 0,
          4: avg === 4 ? product.numReviews : 0,
          3: avg === 3 ? product.numReviews : 0,
          2: avg === 2 ? product.numReviews : 0,
          1: avg === 1 ? product.numReviews : 0,
        });
      }
    }
  }, [products, productId]);

  /* ================== Countdown Timer ================== */
  useEffect(() => {
    if (!productData?.discountEnd) {
      setDiscountEnded(false);
      return;
    }

    const checkDiscountEnded = () => {
      const now = new Date().getTime();
      const end = new Date(productData.discountEnd).getTime();
      return now > end;
    };

    if (checkDiscountEnded()) {
      setDiscountEnded(true);
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(productData.discountEnd).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft(null);
        setDiscountEnded(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [productData]);

  if (!productData) return null;

  const totalReviews = productData.numReviews || 0;
  const percentage = (count) => (totalReviews ? Math.round((count / totalReviews) * 100) : 0);

  // ✅ التحقق مما إذا كان المنتج يحتاج إلى مقاس
  const requiresSize = () => {
    // الإكسسوارات لا تحتاج مقاس
    if (productData.category === "Accessories") {
      return false;
    }
    
    // الأحذية والقفازات تحتاج مقاس
    if (productData.category === "shoes" || productData.category === "gloves") {
      return true;
    }
    
    // المنتجات العادية تحتاج مقاس إذا كانت المصفوفة sizes موجودة وفيها عناصر
    return productData.sizes && productData.sizes.length > 0;
  };

  // ✅ التحقق من توفر المقاسات
  const hasAvailableSizes = () => {
    // الإكسسوارات لا تحتاج مقاس (متوفرة دائماً)
    if (productData.category === "Accessories") {
      return true;
    }
    
    if (productData.category === "shoes") {
      return availableShoeSections.length > 0;
    }
    if (productData.category === "gloves") {
      return productData.gloveSizes?.length > 0;
    }
    return productData.sizes?.length > 0;
  };

  // إضافة للسلة
  const handleAddToCart = () => {
    if (!token) return toast.error("سجل دخول الأول");

    // التحقق من اختيار المقاس فقط إذا كان المنتج يحتاج مقاس
    if (requiresSize() && !size) {
      if (productData.category === "shoes") {
        return toast.error("اختار مقاس الحذاء قبل الإضافة");
      } else if (productData.category === "gloves") {
        return toast.error("اختار مقاس القفاز قبل الإضافة");
      } else {
        return toast.error("اختار المقاس قبل الإضافة");
      }
    }

    const priceToUse = discountInfo.hasDiscount ? discountInfo.finalPrice : productData.price;
    
    // للإكسسوارات، نمرر "no_size" أو null
    const sizeToUse = requiresSize() ? size : "no_size";
    
    addToCart(productData._id, sizeToUse, priceToUse);
    toast.success("تمت الإضافة للعربة 🛒");
  };

  // التقييم
  const handleRating = async (value) => {
    if (!token) return toast.error("سجل دخول لتقييم المنتج");

    try {
      const res = await axios.post(
        `${backendUrl}/api/product/review`,
        { productId, rating: value },
        { headers: { token } }
      );

      if (res.data.success) {
        setUserRating(value);
        setShowRatingDropdown(false);

        setProductData((prev) => ({
          ...prev,
          numReviews: prev.numReviews + 1,
          rating: (prev.rating * prev.numReviews + value) / (prev.numReviews + 1),
        }));

        setRatingsDistribution((prev) => ({
          ...prev,
          [value]: prev[value] + 1,
        }));

        toast.success("تم التقييم بنجاح ⭐");
      }
    } catch {
      toast.error("حصل خطأ أثناء التقييم");
    }
  };

  const sectionArabic = {
    kids: "أطفال",
    youth: "شباب",
    men: "رجالي",
  };

  const averageRating = productData.rating || 0;

  // فلترة الأقسام المتاحة للأحذية
  const availableShoeSections = productData.category === "shoes" && productData.shoeSizes
    ? ["men", "youth", "kids"].filter(section => productData.shoeSizes[section]?.length > 0)
    : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-gray-50 min-h-screen py-3 sm:py-6 px-3 sm:px-4 lg:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* مسار التنقل */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-6 overflow-x-auto pb-1 scrollbar-hide">
          <span className="whitespace-nowrap hover:text-emerald-600">الرئيسية</span>
          <ChevronDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
          <span className="whitespace-nowrap hover:text-emerald-600">
            {productData.category === "gloves" ? "قفازات" : 
             productData.category === "Accessories" ? "إكسسوارات" : 
             productData.category}
          </span>
          <ChevronDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{productData.name}</span>
        </div>

        {/* رسالة انتهاء الخصم */}
        {discountEnded && productData.discountPercentage > 0 && (
          <div className="mb-4 bg-gray-100 border border-gray-300 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-700">انتهت فترة الخصم لهذا المنتج</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* قسم الصور */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 sticky top-20">
              {/* الصورة الرئيسية */}
              <div className="relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
                {/* Badge الخصم على الصورة */}
                {discountInfo.hasDiscount && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    خصم {discountInfo.discountPercentage}%
                  </div>
                )}
                
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[450px] object-contain"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* الصور المصغرة */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {productData.image?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      mainImage === img ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* قسم التفاصيل */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6">
              {/* اسم المنتج */}
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>

              {/* التقييم والمراجعات */}
              <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        star <= averageRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500">
                  ({totalReviews})
                </span>
                
                {/* زر التقييم */}
                <div className="relative mr-auto">
                  <button
                    onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors flex items-center gap-1"
                  >
                    <Star className="w-3.5 h-3.5" />
                    قيم
                  </button>

                  <AnimatePresence>
                    {showRatingDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-1 z-20 border border-gray-200 min-w-[120px]"
                      >
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRating(rating)}
                            className="flex items-center gap-1.5 w-full px-3 py-1.5 hover:bg-gray-50 rounded text-xs"
                          >
                            <div className="flex gap-0.5">
                              {[...Array(rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-gray-600">{rating}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* السعر مع الخصم */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-0.5">السعر</p>
                
                {discountInfo.hasDiscount ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">
                        {discountInfo.finalPrice}
                      </span>
                      <span className="text-xs text-gray-500">{currency}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 line-through">
                        {discountInfo.originalPrice}
                      </span>
                      <span className="text-xs text-gray-400">{currency}</span>
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
                        -{discountInfo.discountPercentage}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      {productData.price}
                    </span>
                    <span className="text-xs text-gray-500">{currency}</span>
                    
                    {/* عرض السعر القديم إذا كان هناك خصم منتهي */}
                    {discountEnded && productData.discountPercentage > 0 && (
                      <span className="mr-2 text-xs text-gray-400 line-through">
                        {productData.finalPrice}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* ================== Countdown Timer ================== */}
              {discountInfo.hasDiscount && timeLeft && (
                <div className="mb-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-center gap-1.5 mb-2 sm:mb-3">
                    <Clock className="w-4 h-4 text-red-500" />
                    <p className="text-red-600 text-xs sm:text-sm font-medium">
                      العرض ينتهي خلال
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {[
                      { label: 'يوم', value: timeLeft.days },
                      { label: 'ساعة', value: timeLeft.hours },
                      { label: 'دقيقة', value: timeLeft.minutes },
                      { label: 'ثانية', value: timeLeft.seconds }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-lg shadow-sm flex items-center justify-center mb-1">
                          <span className="text-lg sm:text-xl font-bold text-red-700">
                            {item.value}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-red-600">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* الوصف */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">الوصف</p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
                  {productData.discription}
                </p>
              </div>

              {/* المقاسات - تظهر فقط للمنتجات التي تحتاج مقاس */}
              {requiresSize() && (
                <>
                  {productData.category === "shoes" ? (
                    /* مقاسات الأحذية */
                    availableShoeSections.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Ruler className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-900">اختر مقاس الحذاء</p>
                        </div>
                        
                        {/* أزرار الفئات */}
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1.5">الفئة:</p>
                          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                            {availableShoeSections.map((section) => (
                              <button
                                key={section}
                                onClick={() => setSelectedSection(section)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                  selectedSection === section
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {sectionArabic[section]}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* أزرار مقاسات الأحذية */}
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1.5">المقاس:</p>
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                            {productData.shoeSizes?.[selectedSection]?.map((s) => (
                              <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`
                                  py-2 rounded-lg border text-xs font-medium transition-all
                                  ${size === s
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                  }
                                `}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  ) : productData.category === "gloves" ? (
                    /* مقاسات القفازات */
                    productData.gloveSizes?.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Ruler className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-900">اختر مقاس القفاز</p>
                        </div>

                        {/* أزرار مقاسات القفازات */}
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1.5">المقاس:</p>
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                            {productData.gloveSizes?.map((s) => (
                              <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`
                                  py-2 rounded-lg border text-xs font-medium transition-all
                                  ${size === s
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                  }
                                `}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    /* مقاسات عامة للمنتجات الأخرى */
                    productData.sizes?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-900 mb-2">المقاسات المتاحة</p>
                        <div className="flex flex-wrap gap-1.5">
                          {productData.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSize(s)}
                              className={`
                                px-3 py-1.5 rounded-lg border text-xs font-medium transition-all min-w-[45px] text-center
                                ${size === s
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                }
                              `}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </>
              )}

              {/* إضافة للسلة */}
              {hasAvailableSizes() ? (
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 sm:py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.98] transition-all duration-300 ${
                    discountInfo.hasDiscount
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {discountInfo.hasDiscount ? 'إضافة للعربة (خصم)' : 'إضافة للعربة'}
                </button>
              ) : (
                <div className="w-full bg-gray-200 text-gray-500 py-3 sm:py-3.5 rounded-lg font-medium text-center text-sm sm:text-base">
                  غير متوفر
                </div>
              )}

              {/* رسالة تنبيه للمقاس - تظهر فقط للمنتجات التي تحتاج مقاس */}
              {requiresSize() && !size && hasAvailableSizes() && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  يجب اختيار مقاس قبل الإضافة
                </p>
              )}
            </div>
          </div>
        </div>

        {/* تقييمات المنتج */}
        <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">تقييمات المنتج</h2>
          
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* توزيع التقييمات */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= averageRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{totalReviews} تقييم</p>
                </div>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-8">{star} ★</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage(ratingsDistribution[star])}%` }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <span className="text-gray-500 w-12">
                      {ratingsDistribution[star]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* منتجات مشابهة */}
        <div className="mt-6 sm:mt-8">
          <RelatedProducts 
            category={productData.category} 
            subCategory={productData.subCategory} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Product;