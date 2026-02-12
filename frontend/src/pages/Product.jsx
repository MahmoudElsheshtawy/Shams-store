

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
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const { products, currency, addToCart, token, backendUrl } =
    useContext(ShopContext);
  const { productId } = useParams();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  const [ratingsDistribution, setRatingsDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  /* ================= Fetch Product ================= */
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
  const percentage = (count) =>
    totalReviews ? Math.round((count / totalReviews) * 100) : 0;

  /* ================= Add To Cart ================= */
  const handleAddToCart = () => {
    if (!token) return toast.error("سجل دخول الأول");

    if (
      productData.category !== "shoes" &&
      productData.sizes?.length &&
      !size
    ) {
      return toast.error("اختار المقاس");
    }

    addToCart(productData._id, size || "no_size");
    toast.success("تمت الإضافة للعربة 🛒");
  };

  /* ================= Rating ================= */
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
          rating:
            (prev.rating * prev.numReviews + value) /
            (prev.numReviews + 1),
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

  /* ================= UI ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t pt-10"
    >
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-14 xl:gap-20">
          {/* Images */}
    {/* Images */}
<div className="flex-1 flex flex-col items-center lg:items-start">
  <motion.img
    key={mainImage}
    src={mainImage}
    className="
      w-full 
      max-h-[500px]
      lg:max-h-[450px]
      xl:max-h-[500px]
      object-contain
      rounded-lg
    "
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
  />

  <div className="flex gap-2 mt-3 overflow-x-auto w-full lg:w-auto justify-center lg:justify-start">
    {productData.image?.map((img, i) => (
      <img
        key={i}
        src={img}
        onClick={() => setMainImage(img)}
        className="
          w-20 h-20 
          object-cover 
          cursor-pointer 
          border rounded
          flex-shrink-0
        "
      />
    ))}
  </div>
</div>



          {/* Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold break-words max-w-[600px]">
              {productData.name}
            </h1>

            {/* Rating */}
            <div
              className="flex items-center mt-2 cursor-pointer relative"
              onClick={() => setShowRatingDropdown(!showRatingDropdown)}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`text-2xl ${
                    s <= userRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}

              <span className="ml-2 text-sm text-gray-500">
                ({totalReviews})
              </span>

              <AnimatePresence>
                {showRatingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-10 bg-white shadow-xl p-4 rounded-lg z-20"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRating(r)}
                        className="flex gap-1 w-full hover:bg-gray-100 p-2 rounded"
                      >
                        {[...Array(r)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold mt-4">
              {productData.price} {currency}
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-600 text-sm sm:text-base break-words max-w-[650px] leading-relaxed">
              {productData.discription}
            </p>

            {/* Sizes */}
            {productData.sizes?.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 border rounded ${
                      size === s ? "border-black" : ""
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="mt-6 bg-black text-white px-6 py-3 rounded hover:opacity-90"
            >
              إضافة للعربة
            </button>
          </div>
        </div>

        {/* Ratings Distribution */}
        <div className="mt-16 bg-gray-50 p-6 rounded-xl max-w-4xl">
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="flex items-center mb-3">
              <span className="w-10">{s}★</span>
              <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden mx-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${percentage(ratingsDistribution[s])}%`,
                  }}
                  className="bg-yellow-400 h-3"
                />
              </div>
              <span className="text-sm">
                {ratingsDistribution[s]} (
                {percentage(ratingsDistribution[s])}%)
              </span>
            </div>
          ))}
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto">
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
