

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import RelatedProducts from "../components/RelatedProducts";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// const Product = () => {
//   const { products, currency, addToCart, token, backendUrl } =
//     useContext(ShopContext);
//   const { productId } = useParams();

//   const [productData, setProductData] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [size, setSize] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [showRatingDropdown, setShowRatingDropdown] = useState(false);

//   const [ratingsDistribution, setRatingsDistribution] = useState({
//     5: 0,
//     4: 0,
//     3: 0,
//     2: 0,
//     1: 0,
//   });

//   /* ================= Fetch Product ================= */
//   useEffect(() => {
//     if (!products?.length) return;

//     const product = products.find((p) => p._id === productId);
//     if (product) {
//       setProductData(product);
//       setMainImage(product.image?.[0] || "");

//       // fallback للتوزيع
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
//   const percentage = (count) =>
//     totalReviews ? Math.round((count / totalReviews) * 100) : 0;

//   /* ================= Add To Cart ================= */
//   const handleAddToCart = () => {
//     if (!token) return toast.error("سجل دخول الأول");

//     if (
//       productData.category !== "Electrical" &&
//       productData.sizes?.length &&
//       !size
//     ) {
//       return toast.error("اختار المقاس");
//     }

//     addToCart(productData._id, size || "no_size");
//     toast.success("تمت الإضافة للعربة 🛒");
//   };

//   /* ================= Rating ================= */
//   const handleRating = async (value) => {
//     if (!token) return toast.error("سجل دخول لتقييم المنتج");

//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/review`,
//         { productId, rating: value },
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         setUserRating(value);
//         setShowRatingDropdown(false);

//         setProductData((prev) => ({
//           ...prev,
//           numReviews: prev.numReviews + 1,
//           rating:
//             (prev.rating * prev.numReviews + value) /
//             (prev.numReviews + 1),
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

//   /* ================= UI ================= */
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="border-t pt-10"
//     >
//       <div className="flex flex-col md:flex-row gap-10">
//         {/* Images */}
//         <div className="flex-1 ">
//           <motion.img
//             key={mainImage}
//             src={mainImage}
//             className="w-full rounded-lg"
//             initial={{ opacity: 0.5 }}
//             animate={{ opacity: 1 }}
//           />

//           <div className="flex gap-2 mt-3 overflow-x-auto">
//             {productData.image?.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setMainImage(img)}
//                 className="w-20 cursor-pointer border rounded"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Details */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-semibold break-words">
//             {productData.name}
//           </h1>

//           {/* Rating */}
//           <div
//             className="flex items-center mt-2 cursor-pointer relative"
//             onClick={() => setShowRatingDropdown(!showRatingDropdown)}
//           >
//             {[1, 2, 3, 4, 5].map((s) => (
//               <span
//                 key={s}
//                 className={`text-2xl ${
//                   s <= userRating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//               >
//                 ★
//               </span>
//             ))}

//             <span className="ml-2 text-sm text-gray-500">
//               ({totalReviews})
//             </span>

//             <AnimatePresence>
//               {showRatingDropdown && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute top-10 bg-white shadow-xl p-4 rounded-lg z-20"
//                 >
//                   {[5, 4, 3, 2, 1].map((r) => (
//                     <button
//                       key={r}
//                       onClick={() => handleRating(r)}
//                       className="flex gap-1 w-full hover:bg-gray-100 p-2 rounded"
//                     >
//                       {[...Array(r)].map((_, i) => (
//                         <span key={i} className="text-yellow-400">
//                           ★
//                         </span>
//                       ))}
//                     </button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Price */}
//           <p className="text-3xl font-bold mt-4">
//             {productData.price} {currency}
//           </p>

//           {/* Description */}
//           <p className="mt-4 text-gray-600 text-sm sm:text-base break-words">
//             {productData.discription}
//           </p>

//           {/* Sizes */}
//           {productData.sizes?.length > 0 && (
//             <div className="flex gap-2 mt-4 flex-wrap">
//               {productData.sizes.map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setSize(s)}
//                   className={`px-3 py-1 border rounded ${
//                     size === s ? "border-black" : ""
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           )}

//           <button
//             onClick={handleAddToCart}
//             className="mt-6 bg-black text-white px-6 py-3 rounded hover:opacity-90"
//           >
//             إضافة للعربة
//           </button>
//         </div>
//       </div>

//       {/* Ratings Distribution */}
//       <div className="mt-16 bg-gray-50 p-6 rounded-xl">
//         {[5, 4, 3, 2, 1].map((s) => (
//           <div key={s} className="flex items-center mb-3">
//             <span className="w-10">{s}★</span>
//             <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden mx-3">
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: `${percentage(ratingsDistribution[s])}%` }}
//                 className="bg-yellow-400 h-3"
//               />
//             </div>
//             <span className="text-sm">
//               {ratingsDistribution[s]} ({percentage(ratingsDistribution[s])}%)
//             </span>
//           </div>
//         ))}
//       </div>

//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </motion.div>
//   );
// };

// export default Product;
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import RelatedProducts from "../components/RelatedProducts";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// const Product = () => {
//   const { products, currency, addToCart, token, backendUrl } = useContext(ShopContext);
//   const { productId } = useParams();

//   const [productData, setProductData] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [size, setSize] = useState("");
//   const [userRating, setUserRating] = useState(0);
//   const [showRatingDropdown, setShowRatingDropdown] = useState(false);

//   const [ratingsDistribution, setRatingsDistribution] = useState({
//     5: 0,
//     4: 0,
//     3: 0,
//     2: 0,
//     1: 0,
//   });

//   /* ================= Fetch Product ================= */
//   useEffect(() => {
//     if (!products?.length) return;

//     const product = products.find((p) => p._id === productId);
//     if (product) {
//       setProductData(product);
//       setMainImage(product.image?.[0] || "");

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

//   /* ================= Add To Cart ================= */
//   const handleAddToCart = () => {
//     if (!token) return toast.error("سجل دخول الأول");

//     // لازم مقاس لو المنتج حذاء
//     if (productData.category === "shoes" && !size) {
//       return toast.error("اختار المقاس قبل الإضافة للعربة");
//     }

//     addToCart(productData._id, size || "no_size");
//     toast.success("تمت الإضافة للعربة 🛒");
//   };

//   /* ================= Rating ================= */
//   const handleRating = async (value) => {
//     if (!token) return toast.error("سجل دخول لتقييم المنتج");

//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/review`,
//         { productId, rating: value },
//         { headers: { token } }
//       );

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
//  const sectionArabic = {
//   kids: "أطفال",
//   youth: "شباب",
//   men: "رجالي",
// };

//   /* ================= UI ================= */
//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-t pt-10">
//       <div className="max-w-4xl mx-auto px-4 lg:px-8">
//         <div className="flex flex-col md:flex-row gap-10 lg:gap-14 xl:gap-20">

//           {/* Images */}
//           <div className="flex-1 flex flex-col items-center lg:items-start">
//             <motion.img
//               key={mainImage}
//               src={mainImage}
//               className="w-full max-h-[500px] lg:max-h-[450px] xl:max-h-[500px] object-contain rounded-lg"
//               initial={{ opacity: 0.5 }}
//               animate={{ opacity: 1 }}
//             />

//             <div className="flex gap-2 mt-3 overflow-x-auto w-full lg:w-auto justify-center lg:justify-start">
//               {productData.image?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   onClick={() => setMainImage(img)}
//                   className="w-20 h-20 object-cover cursor-pointer border rounded flex-shrink-0"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <h1 className="text-2xl font-semibold break-words max-w-[600px]">{productData.name}</h1>

//             {/* Rating */}
//             <div className="flex items-center mt-2 cursor-pointer relative" onClick={() => setShowRatingDropdown(!showRatingDropdown)}>
//               {[1, 2, 3, 4, 5].map((s) => (
//                 <span key={s} className={`text-2xl ${s <= userRating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
//               ))}
//               <span className="ml-2 text-sm text-gray-500">({totalReviews})</span>

//               <AnimatePresence>
//                 {showRatingDropdown && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="absolute top-10 bg-white shadow-xl p-4 rounded-lg z-20"
//                   >
//                     {[5, 4, 3, 2, 1].map((r) => (
//                       <button
//                         key={r}
//                         onClick={() => handleRating(r)}
//                         className="flex gap-1 w-full hover:bg-gray-100 p-2 rounded"
//                       >
//                         {[...Array(r)].map((_, i) => (<span key={i} className="text-yellow-400">★</span>))}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Price */}
//             <p className="text-3xl font-bold mt-4">{productData.price} {currency}</p>

//             {/* Description */}
//             <p className="mt-4 text-gray-600 text-sm sm:text-base break-words max-w-[650px] leading-relaxed">{productData.discription}</p>

//             {/* Sizes */}
//             {productData.category === "shoes" ? (
//               <div className="mt-4">
//                 {["kids", "youth", "men"].map((section) => (
//                   <div key={section} className="mb-3">
//                     <p className="font-medium capitalize">{sectionArabic[section]}</p>
//                     <div className="flex gap-2 flex-wrap mt-1">
//                       {productData.shoeSizes[section]?.map((s) => (
//                         <button
//                           key={s}
//                           type="button"
//                           onClick={() => setSize(s)}
//                           className={`px-3 py-1 border rounded ${
//                             size === s ? "border-black bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {s}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex gap-2 mt-4 flex-wrap">
//                 {productData.sizes?.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSize(s)}
//                     className={`px-3 py-1 border rounded ${size === s ? "border-black" : ""}`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Add to Cart */}
//             <button onClick={handleAddToCart} className="mt-6 bg-black text-white px-6 py-3 rounded hover:opacity-90">
//               إضافة للعربة
//             </button>
//           </div>
//         </div>

//         {/* Ratings Distribution */}
//         <div className="mt-16 bg-gray-50 p-6 rounded-xl max-w-4xl">
//           {[5, 4, 3, 2, 1].map((s) => (
//             <div key={s} className="flex items-center mb-3">
//               <span className="w-10">{s}★</span>
//               <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden mx-3">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${percentage(ratingsDistribution[s])}%` }}
//                   className="bg-yellow-400 h-3"
//                 />
//               </div>
//               <span className="text-sm">{ratingsDistribution[s]} ({percentage(ratingsDistribution[s])}%)</span>
//             </div>
//           ))}
//         </div>

//         {/* Related Products */}
//         <div className="max-w-7xl mx-auto">
//           <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Product;
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Ruler, Package, Check, ChevronDown } from "lucide-react";

const Product = () => {
  const { products, currency, addToCart, token, backendUrl } = useContext(ShopContext);
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

  // جلب المنتج
  useEffect(() => {
    if (!products?.length) return;

    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setMainImage(product.image?.[0] || "");

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

  if (!productData) return null;

  const totalReviews = productData.numReviews || 0;
  const percentage = (count) => (totalReviews ? Math.round((count / totalReviews) * 100) : 0);

  // إضافة للسلة
  const handleAddToCart = () => {
    if (!token) return toast.error("سجل دخول الأول");

    if (productData.category === "shoes" && !size) {
      return toast.error("اختار المقاس قبل الإضافة");
    }

    addToCart(productData._id, size || "no_size");
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

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-gray-50 min-h-screen py-4 sm:py-6 px-3 sm:px-4 lg:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* مسار التنقل - أصغر في الموبايل */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto pb-1">
          <span className="whitespace-nowrap hover:text-emerald-600">الرئيسية</span>
          <ChevronDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
          <span className="whitespace-nowrap hover:text-emerald-600">{productData.category}</span>
          <ChevronDown className="w-3 h-3 rotate-[-90deg] flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{productData.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* قسم الصور */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 sticky top-20">
              {/* الصورة الرئيسية */}
              <div className="relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  className="w-full h-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px] object-contain"
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
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden ${
                      mainImage === img ? 'border-emerald-500' : 'border-gray-200'
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
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors flex items-center gap-1"
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

              {/* السعر */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-0.5">السعر</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    {productData.price}
                  </span>
                  <span className="text-xs text-gray-500">{currency}</span>
                </div>
              </div>

              {/* الوصف - خط أصغر في الموبايل */}
    <div className="mb-4 flex flex-col">
  <p className="text-xs text-gray-500 mb-1">الوصف</p>
  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words whitespace-normal">
    {productData.discription}
  </p>
</div>
              {/* المقاسات */}
              {productData.category === "shoes" ? (
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Ruler className="w-4 h-4 text-gray-500" />
                    <p className="text-xs font-medium text-gray-900">اختر المقاس</p>
                  </div>
                  
                  {/* أزرار الفئات - أصغر في الموبايل */}
                  <div className="flex gap-1.5 mb-3">
                    {["men", "youth", "kids"].map((section) => (
                      <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedSection === section
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sectionArabic[section]}
                      </button>
                    ))}
                  </div>

                  {/* أزرار المقاسات - شبكة متجاوبة */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                    {productData.shoeSizes?.[selectedSection]?.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`
                          py-2 rounded-lg border text-xs font-medium transition-all
                          ${size === s
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }
                        `}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                productData.sizes?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-900 mb-2">المقاسات المتاحة</p>
                    <div className="flex flex-wrap gap-1.5">
                      {productData.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`
                            px-3 py-1.5 rounded-lg border text-xs font-medium transition-all
                            ${size === s
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
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

              {/* إضافة للسلة */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 sm:py-3.5 rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                إضافة للعربة
              </button>

              {/* معلومات إضافية - شبكة 2 عمود في الموبايل */}
             
            </div>
          </div>
        </div>

        {/* تقييمات المنتج - متجاوبة */}
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

            {/* إضافة تقييم */}
            <div className="md:w-1/2 bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">أضف تقييمك</h3>
              <div className="flex gap-1.5 mb-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">اضغط على النجوم للتقييم</p>
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