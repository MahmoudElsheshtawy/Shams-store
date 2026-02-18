// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext)

//   return (
//     <Link
//       to={`/product/${id}`}
//       className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-lg transition-all duration-300 overflow-hidden"
//     >
//       {/* صورة المنتج */}
//       <div className="overflow-hidden w-full aspect-[4/5] bg-gray-50">
//         <img
//           onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           src={image?.[0] || '/placeholder.png'}
//           alt={name}
//           loading="lazy"
//         />
//       </div>
      

//       {/* اسم وسعر المنتج */}
//       <div className="p-3">
//         <p className="text-sm sm:text-base font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors">
//           {name}
//         </p>
//         <p className="text-sm font-bold text-gray-900 mt-1">
//           {price} {currency}
//         </p>
//       </div>
//     </Link>
//   )
// }

// export default ProductItem


// import React, { useContext, useMemo } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const ProductItem = ({ id, image, name, price, discountPercentage, finalPrice }) => {
//   const { currency } = useContext(ShopContext)
  
//   // حساب السعر النهائي الصحيح
//   const calculatedData = useMemo(() => {
//     const originalPrice = price || 0
//     const discount = discountPercentage || 0
    
//     // لو finalPrice موجود وأقل من السعر الأصلي، استخدمه
//     // لو مش موجود أو أكبر من السعر الأصلي، احسبه من نسبة الخصم
//     let final = finalPrice && finalPrice < originalPrice 
//       ? finalPrice 
//       : originalPrice
    
//     // لو في نسبة خصم ومفيش finalPrice صحيح، احسب السعر
//     if (discount > 0 && final >= originalPrice) {
//       final = originalPrice - (originalPrice * discount / 100)
//     }
    
//     // التحقق من وجود خصم حقيقي
//     const hasRealDiscount = discount > 0 && final < originalPrice
    
//     return {
//       originalPrice,
//       discount,
//       final,
//       hasDiscount: hasRealDiscount,
//       savingsPercent: hasRealDiscount 
//         ? Math.round(((originalPrice - final) / originalPrice) * 100)
//         : 0
//     }
//   }, [price, discountPercentage, finalPrice])
  
//   // للتصحيح - شوف القيم المحسوبة
//   console.log(`${name}:`, calculatedData);

//   return (
//     <Link
//       to={`/product/${id}`}
//       className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-lg transition-all duration-300 overflow-hidden relative"
//     >
//       {/* صورة المنتج */}
//       <div className="overflow-hidden w-full aspect-[4/5] bg-gray-50 relative">
//         {/* Badge الخصم مع حركة بسيطة */}
//         {calculatedData.hasDiscount && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg font-medium"
//           >
//             -{calculatedData.discount}%
//           </motion.div>
//         )}
        
//         <img
//           onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           src={image?.[0] || '/placeholder.png'}
//           alt={name}
//           loading="lazy"
//         />
//       </div>

//       {/* اسم وسعر المنتج */}
//       <div className="p-2 sm:p-3">
//         <p className="text-xs sm:text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors mb-1">
//           {name}
//         </p>
        
//         {calculatedData.hasDiscount ? (
//           <div className="flex flex-col">
//             {/* السعر بعد الخصم */}
//             <div className="flex items-baseline gap-1 flex-wrap">
//               <span className="text-sm sm:text-base font-bold text-emerald-600">
//                 {calculatedData.final}
//               </span>
//               <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
//               {calculatedData.savingsPercent > 0 && (
//                 <span className="text-[10px] sm:text-xs text-red-500 mr-1 whitespace-nowrap">
//                   (وفر {calculatedData.savingsPercent}%)
//                 </span>
//               )}
//             </div>
            
//             {/* السعر قبل الخصم مشطوب */}
//             <div className="flex items-baseline gap-1">
//               <span className="text-[10px] sm:text-xs text-gray-400 line-through">
//                 {calculatedData.originalPrice}
//               </span>
//               <span className="text-[10px] sm:text-xs text-gray-400">{currency}</span>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-baseline gap-1">
//             <span className="text-sm sm:text-base font-bold text-gray-900">
//               {calculatedData.originalPrice}
//             </span>
//             <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
//           </div>
//         )}
//       </div>
//     </Link>
//   )
// }

// export default ProductItem



// import React, { useContext, useMemo, useRef, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const ProductItem = ({ id, image, name, price, discountPercentage, finalPrice }) => {
//   const { currency } = useContext(ShopContext)
  
//   // استخدام useRef لتتبع ما إذا تم الطباعة مرة واحدة
//   const hasLogged = useRef(false);
  
//   // حساب السعر النهائي الصحيح - useMemo هيقلل إعادة الحساب
//   const calculatedData = useMemo(() => {
//     const originalPrice = price || 0
//     const discount = discountPercentage || 0
    
//     // استخدام getProductFinalPrice من الـ Context إذا كانت موجودة
//     // أو حسابها يدوياً
//     let final = finalPrice && finalPrice < originalPrice 
//       ? finalPrice 
//       : originalPrice
    
//     // لو في نسبة خصم ومفيش finalPrice صحيح، احسب السعر
//     if (discount > 0 && final >= originalPrice) {
//       final = originalPrice - (originalPrice * discount / 100)
//     }
    
//     // التحقق من وجود خصم حقيقي
//     const hasRealDiscount = discount > 0 && final < originalPrice
    
//     return {
//       originalPrice,
//       discount,
//       final,
//       hasDiscount: hasRealDiscount,
//       savingsPercent: hasRealDiscount 
//         ? Math.round(((originalPrice - final) / originalPrice) * 100)
//         : 0
//     }
//   }, [price, discountPercentage, finalPrice]) // ✅ useMemo هيشتغل فقط لما تتغير هذه القيم
  
//   // طباعة مرة واحدة فقط عند تحميل المكون
//   useEffect(() => {
//     if (!hasLogged.current) {
//       console.log(`ProductItem Mounted: ${name}`, calculatedData);
//       hasLogged.current = true;
//     }
//   }, []); // ✅ useEffect فاضي عشان يشتغل مرة واحدة فقط

//   return (
//     <Link
//       to={`/product/${id}`}
//       className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-lg transition-all duration-300 overflow-hidden relative"
//     >
//       {/* صورة المنتج */}
//       <div className="overflow-hidden w-full aspect-[4/5] bg-gray-50 relative">
//         {/* Badge الخصم مع حركة بسيطة */}
//         {calculatedData.hasDiscount && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg font-medium"
//           >
//             {calculatedData.discount}% خصم
//           </motion.div>
//         )}
        
//         <img
//           onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           src={image?.[0] || '/placeholder.png'}
//           alt={name}
//           loading="lazy"
//         />
//       </div>

//       {/* اسم وسعر المنتج */}
//       <div className="p-2 sm:p-3">
//         <p className="text-xs sm:text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors mb-1">
//           {name}
//         </p>
        
//         {calculatedData.hasDiscount ? (
//           <div className="flex flex-col">
//             {/* السعر بعد الخصم */}
//             <div className="flex items-baseline gap-1 flex-wrap">
//               <span className="text-sm sm:text-base font-bold text-emerald-600">
//                 {calculatedData.final}
//               </span>
//               <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
//               {calculatedData.savingsPercent > 0 && (
//                 <span className="text-[10px] sm:text-xs text-red-500 mr-1 whitespace-nowrap">
//                   (وفر {calculatedData.savingsPercent}%)
//                 </span>
//               )}
//             </div>
            
//             {/* السعر قبل الخصم مشطوب */}
//             <div className="flex items-baseline gap-1">
//               <span className="text-[10px] sm:text-xs text-gray-400 line-through">
//                 {calculatedData.originalPrice}
//               </span>
//               <span className="text-[10px] sm:text-xs text-gray-400">{currency}</span>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-baseline gap-1">
//             <span className="text-sm sm:text-base font-bold text-gray-900">
//               {calculatedData.originalPrice}
//             </span>
//             <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
//           </div>
//         )}
//       </div>
//     </Link>
//   )
// }

// export default ProductItem
// ==============================
// ==============================
// ==============================
// ==============================
// ==============================

// import React, { useContext, useMemo } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const ProductItem = ({ id, image, name, price, discountPercentage, finalPrice }) => {
//   const { currency } = useContext(ShopContext)
  
//   // حساب السعر النهائي الصحيح
//   const calculatedData = useMemo(() => {
//     const originalPrice = price || 0
//     const discount = discountPercentage || 0
    
//     let final = finalPrice && finalPrice < originalPrice 
//       ? finalPrice 
//       : originalPrice
    
//     if (discount > 0 && final >= originalPrice) {
//       final = originalPrice - (originalPrice * discount / 100)
//     }
    
//     const hasRealDiscount = discount > 0 && final < originalPrice
    
//     return {
//       originalPrice,
//       discount,
//       final,
//       hasDiscount: hasRealDiscount,
//       savingsPercent: hasRealDiscount 
//         ? Math.round(((originalPrice - final) / originalPrice) * 100)
//         : 0
//     }
//   }, [price, discountPercentage, finalPrice])
  
//   return (
//     <Link
//       to={`/product/${id}`}
//       className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-lg transition-all duration-300 overflow-hidden relative"
//     >
//       {/* صورة المنتج */}
//       <div className="overflow-hidden w-full aspect-[4/5] bg-gray-50 relative">
//         {/* Badge الخصم مع حركة بسيطة */}
//         {calculatedData.hasDiscount && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//             className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg font-medium"
//           >
//             {calculatedData.discount}% خصم
//           </motion.div>
//         )}
        
//         <img
//           onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           src={image?.[0] || '/placeholder.png'}
//           alt={name}
//           loading="lazy"
//         />
//       </div>

//       {/* اسم وسعر المنتج */}
//       <div className="p-2 sm:p-3">
//         <p className="text-xs sm:text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors mb-1">
//           {name}
//         </p>
        
//         {calculatedData.hasDiscount ? (
//           <div className="flex flex-col">
//             {/* السعر بعد الخصم */}
//             <div className="flex items-baseline gap-1 flex-wrap">
//               <span className="text-sm sm:text-base font-bold text-emerald-600">
//                 {calculatedData.final}
//               </span>
//               <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
//               {calculatedData.savingsPercent > 0 && (
//                 <span className="text-[10px] sm:text-xs text-red-500 mr-1 whitespace-nowrap">
//                   ({calculatedData.savingsPercent}% وفر)
//                 </span>
//               )}
//             </div>
            
//             {/* السعر قبل الخصم مشطوب */}
//             <div className="flex items-baseline gap-1">
//               <span className="text-[10px] sm:text-xs text-gray-400 line-through">
//                 {calculatedData.originalPrice}
//               </span>
//               <span className="text-[10px] sm:text-xs text-gray-400">{currency}</span>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-baseline gap-1">
//             <span className="text-sm sm:text-base font-bold text-gray-900">
//               {calculatedData.originalPrice}
//             </span>
//             <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
//           </div>
//         )}
//       </div>
//     </Link>
//   )
// }

// export default ProductItem
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
import React, { useContext, useMemo, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProductItem = ({ id, image, name, price, discountPercentage, finalPrice, discountEnd }) => {
  const { currency } = useContext(ShopContext)
  const [isDiscountValid, setIsDiscountValid] = useState(true)

  // التحقق من صلاحية الخصم بناءً على التاريخ
  useEffect(() => {
    const checkDiscountValidity = () => {
      // إذا كان فيه تاريخ انتهاء
      if (discountEnd) {
        const now = new Date().getTime()
        const endTime = new Date(discountEnd).getTime()
        
        // إذا انتهى الوقت، الخصم غير صالح
        if (now > endTime) {
          setIsDiscountValid(false)
          return false
        }
      }
      
      // إذا مفيش تاريخ انتهاء أو التاريخ لسه ساري
      setIsDiscountValid(true)
      return true
    }

    // تحقق فوري
    checkDiscountValidity()

    // setInterval للتحقق كل دقيقة (اختياري)
    const interval = setInterval(checkDiscountValidity, 60000) // كل دقيقة

    return () => clearInterval(interval)
  }, [discountEnd])

  // حساب السعر النهائي الصحيح مع مراعاة صلاحية الخصم
  const calculatedData = useMemo(() => {
    const originalPrice = price || 0
    const discount = discountPercentage || 0
    
    // إذا الخصم غير صالح (انتهى الوقت)، استخدم السعر الأصلي
    if (!isDiscountValid) {
      return {
        originalPrice,
        discount: 0,
        final: originalPrice,
        hasDiscount: false,
        savingsPercent: 0
      }
    }
    
    let final = finalPrice && finalPrice < originalPrice 
      ? finalPrice 
      : originalPrice
    
    if (discount > 0 && final >= originalPrice) {
      final = originalPrice - (originalPrice * discount / 100)
    }
    
    const hasRealDiscount = discount > 0 && final < originalPrice
    
    return {
      originalPrice,
      discount,
      final,
      hasDiscount: hasRealDiscount,
      savingsPercent: hasRealDiscount 
        ? Math.round(((originalPrice - final) / originalPrice) * 100)
        : 0
    }
  }, [price, discountPercentage, finalPrice, isDiscountValid])
  
  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-lg transition-all duration-300 overflow-hidden relative"
    >
      {/* صورة المنتج */}
      <div className="overflow-hidden w-full aspect-[4/5] bg-gray-50 relative">
        {/* Badge الخصم مع حركة بسيطة - يظهر فقط إذا الخصم ساري */}
        {calculatedData.hasDiscount && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg font-medium"
          >
            {calculatedData.discount}% خصم
          </motion.div>
        )}
        
        {/* Badge انتهاء الخصم (اختياري) */}
        {!calculatedData.hasDiscount && discountPercentage > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-gray-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg font-medium"
          >
            انتهى العرض
          </motion.div>
        )}
        
        <img
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image?.[0] || '/placeholder.png'}
          alt={name}
          loading="lazy"
        />
      </div>

      {/* اسم وسعر المنتج */}
      <div className="p-2 sm:p-3">
        <p className="text-xs sm:text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors mb-1">
          {name}
        </p>
        
        {calculatedData.hasDiscount ? (
          <div className="flex flex-col">
            {/* السعر بعد الخصم */}
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-emerald-600">
                {calculatedData.final}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
              {calculatedData.savingsPercent > 0 && (
                <span className="text-[10px] sm:text-xs text-red-500 mr-1 whitespace-nowrap">
                  ({calculatedData.savingsPercent}%وفر)
                </span>
              )}
            </div>
            
            {/* السعر قبل الخصم مشطوب */}
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                {calculatedData.originalPrice}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400">{currency}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {calculatedData.originalPrice}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500">{currency}</span>
            
            {/* عرض السعر القديم مع شرح (اختياري) */}
            {!calculatedData.hasDiscount && discountPercentage > 0 && (
              <span className="text-[10px] sm:text-xs text-gray-400 mr-1">
                {/* (انتهى العرض) */}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductItem























// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, image, name, price, category, discription }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer flex flex-col">
//       {/* صورة واحدة أو شبكة 2x2 للـElectrical */}
//       <div className="overflow-hidden w-full aspect-[4/5] rounded-lg shadow-sm">
//         {category === "Electrical" ? (
//           <div className="grid grid-cols-2 gap-1 w-full h-full p-1">
//             {image.slice(0, 4).map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={name}
//                 className="w-full h-full object-cover rounded-sm"
//               />
//             ))}
//           </div>
//         ) : (
//           <img
//                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth",  })}

//             className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//             src={image[0]}
//             alt={name}
//           />
//         )}
//       </div>

//       <div className="pt-3 pb-1 flex flex-col gap-1">
//         <p className="text-sm sm:text-base font-medium truncate">{name}</p>
//         {category === "Electrical" && (
//           <p className="text-xs text-gray-500 truncate">{discription}</p>
//         )}
//         <p className="text-sm font-semibold text-gray-800">
//           {price} {currency}
//         </p>
       
//       </div>
    
//     </Link>
//   );
// };

// export default ProductItem;
