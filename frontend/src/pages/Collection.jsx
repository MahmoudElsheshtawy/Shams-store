
// import React, { useContext, useState, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/frontend_assets/assets";
// import ProductItem from "../components/ProductItem";
// import { motion, AnimatePresence } from "framer-motion";

// const Collection = () => {
//   const { products = [], searsh, showSearsh } = useContext(ShopContext); // ⬅️ حماية products
//   const [showFilter, setShowFilter] = useState(true);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relavent");

//   // ---------- الفلتر ----------
//   const togglecategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };
//   const categoriesList = [
//   { label: "رجالي", value: "Men" },
//   { label: "حريمي", value: "Women" },
//   { label: "أطفال", value: "Kids" },
//   { label: "أحذية", value: "shoes" },
//   { label: "جوانتي", value: "gloves" },
// ];

//   const togglesubcategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     if (!Array.isArray(products)) return; // 🛡️ حماية

//     let productsCopy = [...products];

//     // بحث
//     if (showSearsh && searsh) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(searsh.toLowerCase())
//       );
//     }

//     // فلتر الكاتيجوري
//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     // فلتر الساب كاتيجوري
//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     setFilterProducts(productsCopy);
//   };

//   // ---------- الفرز ----------
//   const sortProducts = () => {
//     let fpCopy = [...filterProducts];
//     switch (sortType) {
//       case "low-high":
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;
//       case "high-low":
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   // ---------- useEffects ----------
//   useEffect(() => {
//     if (Array.isArray(products)) setFilterProducts(products);
//   }, [products]);

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, searsh, showSearsh, products]);

//   useEffect(() => {
//     sortProducts();
//   }, [sortType]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t bg-white text-gray-800">
//       {/* 🧩 FILTER SIDEBAR */}
//       <div className="w-full sm:w-60 px-3 sm:px-0">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-3 text-xl flex items-center justify-between sm:justify-start cursor-pointer gap-2 font-semibold"
//         >
//           الفلاتر
//           <img
//             className={`h-4 sm:hidden transition-transform duration-300 ${
//               showFilter ? "rotate-90" : ""
//             }`}
//             src={assets.dropdown_icon}
//             alt=""
//           />
//         </p>

//         <AnimatePresence>
//           {(showFilter || window.innerWidth >= 640) && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="border border-gray-200 rounded-lg p-5 mt-4 bg-white shadow-sm"
//             >
//               <p className="mb-3 text-lg font-semibold text-gray-700">التصنيفات</p>
//            <div className="flex flex-col gap-3 text-sm text-gray-700">
//   {categoriesList.map((cat) => (
//     <label
//       key={cat.value}
//       className="flex items-center gap-2 cursor-pointer txt hover:text-gray-900"
//     >
//       <input
//         type="checkbox"
//         value={cat.value}   // 👈 ده اللي بيتفلتر
//         onChange={togglecategory}
//         className="accent-black"
//       />
//       {cat.label}         {/* 👈 ده اللي المستخدم يشوفه */}
//     </label>
//   ))}
// </div>

//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* 🛍️ PRODUCTS SECTION */}
//       <div className="flex-1 px-3 sm:px-0">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
//           <div className="text-xl sm:text-2xl font-semibold">
//             <p>
//               جميع____<span className="text-gray-600 font-medium">المنتجات</span>
//             </p>
//           </div>

//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border-2 border-gray-300 rounded-md text-sm px-3 py-1 bg-white cursor-pointer hover:border-gray-400 transition"
//           >
//             <option value="relavent">ترتيب حسب</option>
//             <option value="low-high">السعر: من الأقل إلى الأعلى</option>
//             <option value="high-low">السعر: من الأعلى إلى الأقل</option>
//           </select>
//         </div>

//         <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
//           {filterProducts.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.05 }}
//               className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-lg bg-white"
//             >
//               {/* ProductItem يدعم الآن عرض الصور الأربعة */}
//               <ProductItem
//                 id={item._id}
//                 image={item.image} // ⬅️ يمكن أن تكون مصفوفة 4 صور
//                 name={item.name}
//                 price={item.price}
//               />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Collection;


// import React, { useContext, useState, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/frontend_assets/assets";
// import ProductItem from "../components/ProductItem";
// import { motion, AnimatePresence } from "framer-motion";

// // استيراد الأيقونات بشكل صحيح لـ Vite
// import { FaMale, FaFemale, FaChild } from "react-icons/fa";
// import { GiRunningShoe, GiGloves } from "react-icons/gi";
// import { FaTshirt } from "react-icons/fa";
// import { IoMdShirt } from "react-icons/io";
// import { MdOutlineSportsHandball } from "react-icons/md";
// import { FaFilter } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";

// const Collection = () => {
//   const { products = [], searsh, showSearsh } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(true);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relavent");
//   const [isFiltering, setIsFiltering] = useState(false); // حالة التحميل

//   // قائمة التصنيفات مع أيقونات
//   const categoriesList = [
//     { label: "رجالي", value: "Men", icon: <FaMale className="text-blue-500" /> },
//     { label: "حريمي", value: "Women", icon: <FaFemale className="text-pink-500" /> },
//     { label: "أطفال", value: "Kids", icon: <FaChild className="text-yellow-500" /> },
//     { label: "أحذية", value: "shoes", icon: <GiRunningShoe className="text-emerald-500" /> },
//     { label: "جوانتي", value: "gloves", icon: <GiGloves className="text-purple-500" /> },
//   ];

//   // قائمة التصنيفات الفرعية مع أيقونات
 

//   // Skeleton Loading Component
//   const ProductSkeleton = () => (
//     <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
//       <div className="aspect-square bg-gray-200"></div>
//       <div className="p-3 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       </div>
//     </div>
//   );

//   // ---------- الفلتر ----------
//   const togglecategory = (e) => {
//     const value = e.target.value;
//     setIsFiltering(true); // بداية التحميل
//     if (category.includes(value)) {
//       setCategory((prev) => prev.filter((item) => item !== value));
//     } else {
//       setCategory((prev) => [...prev, value]);
//     }
//   };

//   const togglesubcategory = (e) => {
//     const value = e.target.value;
//     setIsFiltering(true); // بداية التحميل
//     if (subCategory.includes(value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== value));
//     } else {
//       setSubCategory((prev) => [...prev, value]);
//     }
//   };

//   const applyFilter = () => {
//     if (!Array.isArray(products)) return;

//     let productsCopy = [...products];

//     // بحث
//     if (showSearsh && searsh) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name?.toLowerCase().includes(searsh.toLowerCase())
//       );
//     }

//     // فلتر الكاتيجوري
//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     // فلتر الساب كاتيجوري
//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     // محاكاة تأخير بسيط لإظهار skeleton
//     setTimeout(() => {
//       setFilterProducts(productsCopy);
//       setIsFiltering(false); // نهاية التحميل
//     }, 0); // جزء من الثانية
//   };

//   // ---------- الفرز ----------
//   const sortProducts = () => {
//     let fpCopy = [...filterProducts];
//     switch (sortType) {
//       case "low-high":
//         fpCopy.sort((a, b) => a.price - b.price);
//         setFilterProducts([...fpCopy]);
//         break;
//       case "high-low":
//         fpCopy.sort((a, b) => b.price - a.price);
//         setFilterProducts([...fpCopy]);
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   // ---------- useEffects ----------
//   useEffect(() => {
//     if (Array.isArray(products)) {
//       setIsFiltering(true);
//       setTimeout(() => {
//         setFilterProducts([...products]);
//         setIsFiltering(false);
//       }, 300);
//     }
//   }, [products]);

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, searsh, showSearsh]);

//   useEffect(() => {
//     sortProducts();
//   }, [sortType]);

//   // Check if window exists (for SSR compatibility)
//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

//   return (
//     <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-8 border-t bg-white text-gray-800 min-h-screen" dir="rtl">
//       {/* قسم الفلتر */}
//       <div className="w-full sm:w-72 px-4 sm:px-0">
//         <button
//           onClick={() => setShowFilter(!showFilter)}
//           className="w-full flex items-center justify-between sm:justify-start gap-2 cursor-pointer py-3 px-4 bg-gradient-to-l from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4"
//           aria-expanded={showFilter}
//         >
//           <div className="flex items-center gap-2">
//             <FaFilter className="text-emerald-500 text-lg" />
//             <h2 className="text-lg font-semibold text-gray-800">الفلاتر</h2>
//           </div>
//           <FaChevronDown
//             className={`sm:hidden text-gray-500 transition-transform duration-200 ${
//               showFilter ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         <AnimatePresence initial={false}>
//           {(showFilter || !isMobile) && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="overflow-hidden"
//             >
//               <div className="space-y-6">
//                 {/* التصنيفات الرئيسية */}
//                 <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
//                   <h3 className="font-semibold text-gray-800 mb-4 text-base flex items-center gap-2 pb-2 border-b border-gray-100">
//                     <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
//                     التصنيفات
//                   </h3>
//                   <div className="space-y-3">
//                     {categoriesList.map((cat) => (
//                       <label
//                         key={cat.value}
//                         className="flex items-center justify-between group cursor-pointer"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-xl">{cat.icon}</span>
//                           <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                             {cat.label}
//                           </span>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             value={cat.value}
//                             checked={category.includes(cat.value)}
//                             onChange={togglecategory}
//                             className="sr-only"
//                           />
//                           <div
//                             className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
//                               category.includes(cat.value)
//                                 ? 'bg-emerald-500 border-emerald-500'
//                                 : 'border-gray-300 group-hover:border-emerald-400'
//                             }`}
//                           >
//                             {category.includes(cat.value) && (
//                               <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                               </svg>
//                             )}
//                           </div>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

           
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* قسم المنتجات */}
//       <div className="flex-1 px-4 sm:pl-6">
//         {/* شريط العلوي */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//             جميع <span className="text-gray-500">المنتجات</span>
//             <span className="text-sm font-normal text-gray-400 mr-2">
//               ({filterProducts.length})
//             </span>
//           </h2>

//           <div className="relative">
//             <select
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//               className="w-full sm:w-48 appearance-none bg-white border border-gray-200 rounded-xl text-sm 
//               px-4 py-2.5 cursor-pointer 
//               hover:border-emerald-400 hover:bg-emerald-50/20
//               focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10
//               text-gray-600 transition-all duration-200"
//             >
//               <option value="relavent" className="bg-white">ترتيب حسب</option>
//               <option value="low-high" className="bg-white">الأقل سعراً</option>
//               <option value="high-low" className="bg-white">الأعلى سعراً</option>
//             </select>
//           </div>
//         </div>

//         {/* شبكة المنتجات مع Skeleton */}
//         {isFiltering ? (
//           <motion.div 
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
//           >
//             {[...Array(8)].map((_, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: index * 0.03 }}
//               >
//                 <ProductSkeleton />
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : filterProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-400">لا توجد منتجات متاحة</p>
//           </div>
//         ) : (
//           <motion.div 
//             layout 
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
//           >
//             {filterProducts.map((item, index) => (
//               <motion.div
//                 key={item._id || index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.03 }}
//                 className="group"
//               >
//                 <ProductItem
//                   id={item._id}
//                   image={item.image}
//                   name={item.name}
//                   price={item.price}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;
// ========================
// ========================
// ========================
// ========================
// ========================
// ========================
// import React, { useContext, useState, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/frontend_assets/assets";
// import ProductItem from "../components/ProductItem";
// import { motion, AnimatePresence } from "framer-motion";

// // استيراد الأيقونات بشكل صحيح لـ Vite
// import { FaMale, FaFemale, FaChild } from "react-icons/fa";
// import { GiRunningShoe, GiGloves } from "react-icons/gi";
// import { FaTshirt } from "react-icons/fa";
// import { IoMdShirt } from "react-icons/io";
// import { MdOutlineSportsHandball } from "react-icons/md";
// import { FaFilter } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa";

// const Collection = () => {
//   const { products = [], searsh, showSearsh } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(true);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relavent");
//   const [isFiltering, setIsFiltering] = useState(false); // حالة التحميل

//   // قائمة التصنيفات مع أيقونات
//   const categoriesList = [
//     { label: "رجالي", value: "Men", icon: <FaMale className="text-blue-500" /> },
//     { label: "حريمي", value: "Women", icon: <FaFemale className="text-pink-500" /> },
//     { label: "أطفال", value: "Kids", icon: <FaChild className="text-yellow-500" /> },
//     { label: "أحذية", value: "shoes", icon: <GiRunningShoe className="text-emerald-500" /> },
//     { label: "جوانتي", value: "gloves", icon: <GiGloves className="text-purple-500" /> },
//   ];

//   // Skeleton Loading Component
//   const ProductSkeleton = () => (
//     <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
//       <div className="aspect-square bg-gray-200"></div>
//       <div className="p-3 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       </div>
//     </div>
//   );

//   // ---------- الفلتر ----------
//   const togglecategory = (e) => {
//     const value = e.target.value;
//     setIsFiltering(true); // بداية التحميل
//     if (category.includes(value)) {
//       setCategory((prev) => prev.filter((item) => item !== value));
//     } else {
//       setCategory((prev) => [...prev, value]);
//     }
//   };

//   const togglesubcategory = (e) => {
//     const value = e.target.value;
//     setIsFiltering(true); // بداية التحميل
//     if (subCategory.includes(value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== value));
//     } else {
//       setSubCategory((prev) => [...prev, value]);
//     }
//   };

//   const applyFilter = () => {
//     if (!Array.isArray(products)) return;

//     let productsCopy = [...products];

//     // بحث
//     if (showSearsh && searsh) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name?.toLowerCase().includes(searsh.toLowerCase())
//       );
//     }

//     // فلتر الكاتيجوري
//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     // فلتر الساب كاتيجوري
//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     // محاكاة تأخير بسيط لإظهار skeleton
//     setTimeout(() => {
//       setFilterProducts(productsCopy);
//       setIsFiltering(false); // نهاية التحميل
//     }, 0); // جزء من الثانية
//   };

//   // ---------- الفرز ----------
//   const sortProducts = () => {
//     let fpCopy = [...filterProducts];
//     switch (sortType) {
//       case "low-high":
//         fpCopy.sort((a, b) => {
//           // استخدم finalPrice للفرز إذا كان موجود
//           const priceA = a.finalPrice && a.finalPrice < a.price ? a.finalPrice : a.price;
//           const priceB = b.finalPrice && b.finalPrice < b.price ? b.finalPrice : b.price;
//           return priceA - priceB;
//         });
//         setFilterProducts([...fpCopy]);
//         break;
//       case "high-low":
//         fpCopy.sort((a, b) => {
//           const priceA = a.finalPrice && a.finalPrice < a.price ? a.finalPrice : a.price;
//           const priceB = b.finalPrice && b.finalPrice < b.price ? b.finalPrice : b.price;
//           return priceB - priceA;
//         });
//         setFilterProducts([...fpCopy]);
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   // ---------- useEffects ----------
//   useEffect(() => {
//     if (Array.isArray(products)) {
//       setIsFiltering(true);
//       setTimeout(() => {
//         setFilterProducts([...products]);
//         setIsFiltering(false);
//       }, 300);
//     }
//   }, [products]);

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, searsh, showSearsh]);

//   useEffect(() => {
//     sortProducts();
//   }, [sortType]);

//   // Check if window exists (for SSR compatibility)
//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

//   return (
//     <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-8 border-t bg-white text-gray-800 min-h-screen" dir="rtl">
//       {/* قسم الفلتر */}
//       <div className="w-full sm:w-72 px-4 sm:px-0">
//         <button
//           onClick={() => setShowFilter(!showFilter)}
//           className="w-full flex items-center justify-between sm:justify-start gap-2 cursor-pointer py-3 px-4 bg-gradient-to-l from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4"
//           aria-expanded={showFilter}
//         >
//           <div className="flex items-center gap-2">
//             <FaFilter className="text-emerald-500 text-lg" />
//             <h2 className="text-lg font-semibold text-gray-800">الفلاتر</h2>
//           </div>
//           <FaChevronDown
//             className={`sm:hidden text-gray-500 transition-transform duration-200 ${
//               showFilter ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         <AnimatePresence initial={false}>
//           {(showFilter || !isMobile) && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="overflow-hidden"
//             >
//               <div className="space-y-6">
//                 {/* التصنيفات الرئيسية */}
//                 <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
//                   <h3 className="font-semibold text-gray-800 mb-4 text-base flex items-center gap-2 pb-2 border-b border-gray-100">
//                     <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
//                     التصنيفات
//                   </h3>
//                   <div className="space-y-3">
//                     {categoriesList.map((cat) => (
//                       <label
//                         key={cat.value}
//                         className="flex items-center justify-between group cursor-pointer"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-xl">{cat.icon}</span>
//                           <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                             {cat.label}
//                           </span>
//                         </div>
//                         <div className="relative">
//                           <input
//                             type="checkbox"
//                             value={cat.value}
//                             checked={category.includes(cat.value)}
//                             onChange={togglecategory}
//                             className="sr-only"
//                           />
//                           <div
//                             className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
//                               category.includes(cat.value)
//                                 ? 'bg-emerald-500 border-emerald-500'
//                                 : 'border-gray-300 group-hover:border-emerald-400'
//                             }`}
//                           >
//                             {category.includes(cat.value) && (
//                               <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                               </svg>
//                             )}
//                           </div>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* قسم المنتجات */}
//       <div className="flex-1 px-4 sm:pl-6">
//         {/* شريط العلوي */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//             جميع <span className="text-gray-500">المنتجات</span>
//             <span className="text-sm font-normal text-gray-400 mr-2">
//               ({filterProducts.length})
//             </span>
//           </h2>

//           <div className="relative">
//             <select
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//               className="w-full sm:w-48 appearance-none bg-white border border-gray-200 rounded-xl text-sm 
//               px-4 py-2.5 cursor-pointer 
//               hover:border-emerald-400 hover:bg-emerald-50/20
//               focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10
//               text-gray-600 transition-all duration-200"
//             >
//               <option value="relavent" className="bg-white">ترتيب حسب</option>
//               <option value="low-high" className="bg-white">الأقل سعراً</option>
//               <option value="high-low" className="bg-white">الأعلى سعراً</option>
//             </select>
//           </div>
//         </div>

//         {/* شبكة المنتجات مع Skeleton */}
//         {isFiltering ? (
//           <motion.div 
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
//           >
//             {[...Array(8)].map((_, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: index * 0.03 }}
//               >
//                 <ProductSkeleton />
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : filterProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-400">لا توجد منتجات متاحة</p>
//           </div>
//         ) : (
//           <motion.div 
//             layout 
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
//           >
//             {filterProducts.map((item, index) => (
//               <motion.div
//                 key={item._id || index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.03 }}
//                 className="group"
//               >
//                 <ProductItem
//                   id={item._id}
//                   image={item.image}
//                   name={item.name}
//                   price={item.price}
//                   // ✅ أضفنا بيانات الخصم
//                   discountPercentage={item.discountPercentage}
//                   finalPrice={item.finalPrice}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;
import React, { useContext, useState, useEffect, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "framer-motion";

// استيراد الأيقونات بشكل صحيح لـ Vite
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import { GiRunningShoe, GiGloves } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { IoMdShirt } from "react-icons/io";
import { MdLayers, MdOutlineSportsHandball } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Collection = () => {
  const { products = [], searsh, showSearsh } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [isFiltering, setIsFiltering] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // قائمة التصنيفات مع أيقونات
  const categoriesList = [
    { label: "رجالي", value: "Men", icon: <FaMale className="text-blue-500" /> },
    { label: "حريمي", value: "Women", icon: <FaFemale className="text-pink-500" /> },
    { label: "أطفال", value: "Kids", icon: <FaChild className="text-yellow-500" /> },
    { label: "أحذية", value: "shoes", icon: <GiRunningShoe className="text-emerald-500" /> },
    { label: "جوانتي", value: "gloves", icon: <GiGloves className="text-purple-500" /> },
    { label: "إكسسوارات", value: "Accessories", icon: <MdLayers className="text-red-500" /> },
  ];

  // تحديث كل دقيقة للتحقق من انتهاء الخصم
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Skeleton Loading Component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  // ---------- الفلتر ----------
  const togglecategory = (e) => {
    const value = e.target.value;
    setIsFiltering(true);
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const togglesubcategory = (e) => {
    const value = e.target.value;
    setIsFiltering(true);
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    if (!Array.isArray(products)) return;

    let productsCopy = [...products];

    // بحث
    if (showSearsh && searsh) {
      productsCopy = productsCopy.filter((item) =>
        item.name?.toLowerCase().includes(searsh.toLowerCase())
      );
    }

    // فلتر الكاتيجوري
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // فلتر الساب كاتيجوري
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setTimeout(() => {
      setFilterProducts(productsCopy);
      setIsFiltering(false);
    }, 0);
  };

  // ---------- الفرز ----------
  const sortProducts = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => {
          const priceA = a.finalPrice && a.finalPrice < a.price ? a.finalPrice : a.price;
          const priceB = b.finalPrice && b.finalPrice < b.price ? b.finalPrice : b.price;
          return priceA - priceB;
        });
        setFilterProducts([...fpCopy]);
        break;
      case "high-low":
        fpCopy.sort((a, b) => {
          const priceA = a.finalPrice && a.finalPrice < a.price ? a.finalPrice : a.price;
          const priceB = b.finalPrice && b.finalPrice < b.price ? b.finalPrice : b.price;
          return priceB - priceA;
        });
        setFilterProducts([...fpCopy]);
        break;
      default:
        applyFilter();
        break;
    }
  };

  // ---------- useEffects ----------
  useEffect(() => {
    if (Array.isArray(products)) {
      setIsFiltering(true);
      setTimeout(() => {
        setFilterProducts([...products]);
        setIsFiltering(false);
      }, 300);
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, searsh, showSearsh]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-8 border-t bg-white text-gray-800 min-h-screen" dir="rtl">
      {/* قسم الفلتر */}
      <div className="w-full sm:w-72 px-4 sm:px-0">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="w-full flex items-center justify-between sm:justify-start gap-2 cursor-pointer py-3 px-4 bg-gradient-to-l from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4"
          aria-expanded={showFilter}
        >
          <div className="flex items-center gap-2">
            <FaFilter className="text-emerald-500 text-lg" />
            <h2 className="text-lg font-semibold text-gray-800">الفلاتر</h2>
          </div>
          <FaChevronDown
            className={`sm:hidden text-gray-500 transition-transform duration-200 ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {(showFilter || !isMobile) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-6">
                {/* التصنيفات الرئيسية */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4 text-base flex items-center gap-2 pb-2 border-b border-gray-100">
                    <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                    التصنيفات
                  </h3>
                  <div className="space-y-3">
                    {categoriesList.map((cat) => (
                      <label
                        key={cat.value}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {cat.label}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            value={cat.value}
                            checked={category.includes(cat.value)}
                            onChange={togglecategory}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              category.includes(cat.value)
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-gray-300 group-hover:border-emerald-400'
                            }`}
                          >
                            {category.includes(cat.value) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* قسم المنتجات */}
      <div className="flex-1 px-4 sm:pl-6">
        {/* شريط العلوي */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            جميع <span className="text-gray-500">المنتجات</span>
            <span className="text-sm font-normal text-gray-400 mr-2">
              ({filterProducts.length})
            </span>
          </h2>

          <div className="relative">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full sm:w-48 appearance-none bg-white border border-gray-200 rounded-xl text-sm 
              px-4 py-2.5 cursor-pointer 
              hover:border-emerald-400 hover:bg-emerald-50/20
              focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10
              text-gray-600 transition-all duration-200"
            >
              <option value="relavent" className="bg-white">ترتيب حسب</option>
              <option value="low-high" className="bg-white">الأقل سعراً</option>
              <option value="high-low" className="bg-white">الأعلى سعراً</option>
            </select>
          </div>
        </div>

        {/* شبكة المنتجات مع Skeleton */}
        {isFiltering ? (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <ProductSkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : filterProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">لا توجد منتجات متاحة</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {filterProducts.map((item, index) => (
              <motion.div
                key={`${item._id}-${index}-${lastUpdate}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group"
              >
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discountPercentage={item.discountPercentage}
                  finalPrice={item.finalPrice}
                  discountEnd={item.discountEnd} // ✅ أضفنا تاريخ الانتهاء
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Collection;