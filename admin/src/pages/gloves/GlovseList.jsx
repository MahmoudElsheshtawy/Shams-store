// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../../App";
// import { toast } from "react-toastify";

// // ----- Price Editor -----
// const PriceEditor = ({ item, updatePrice }) => {
//   const [edit, setEdit] = useState(false);
//   const [price, setPrice] = useState(item.price);
//   const [updating, setUpdating] = useState(false);

//   const handleSave = async () => {
//     if (!price || price <= 0) {
//       return toast.error("من فضلك أدخل سعر صحيح");
//     }
//     setUpdating(true);
//     await updatePrice(item._id, Number(price));
//     setEdit(false);
//     setTimeout(() => setUpdating(false), 500);
//   };

//   return edit ? (
//     <div className="flex gap-2 flex-wrap">
//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         className="border rounded-lg px-2 py-1 w-24 text-center focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
//         min="0"
//         step="0.01"
//         autoFocus
//       />
//       <button
//         onClick={handleSave}
//         className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600 transition transform hover:scale-105"
//       >
//         حفظ
//       </button>
//       <button
//         onClick={() => {
//           setEdit(false);
//           setPrice(item.price);
//         }}
//         className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
//       >
//         إلغاء
//       </button>
//     </div>
//   ) : (
//     <span
//       className={`bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition text-sm cursor-pointer inline-block transform hover:scale-105 ${
//         updating ? "animate-pulse" : ""
//       }`}
//       onClick={() => setEdit(true)}
//     >
//       {updating ? "تم التحديث!" : "تعديل السعر"}
//     </span>
//   );
// };

// // ----- Gloves Product List -----
// const GlovesList = ({ token }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch gloves products
//   const fetchGloves = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/api/product/gloves`, {
//         headers: { token }
//       });
      
//       console.log("API Response:", res.data);
      
//       if (res.data.success) {
//         setProducts(res.data.products || []);
//       } else {
//         toast.error(res.data.message || "فشل في جلب المنتجات");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       toast.error(err.response?.data?.message || "فشل في جلب المنتجات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove product
//   const removeProduct = async (id) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { token } }
//       );
      
//       if (res.data.success) {
//         toast.success("تم حذف المنتج بنجاح");
//         fetchGloves();
//       } else {
//         toast.error(res.data.message || "فشل في حذف المنتج");
//       }
//     } catch (err) {
//       console.error("Remove error:", err);
//       toast.error(err.response?.data?.message || "فشل في حذف المنتج");
//     }
//   };

//   // Update price
//   const updatePrice = async (id, newPrice) => {
//     if (!newPrice || newPrice <= 0) {
//       return toast.error("من فضلك أدخل سعر صحيح");
//     }
    
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/product/update-price`,
//         { id, price: Number(newPrice) },
//         { headers: { token } }
//       );
      
//       if (res.data.success) {
//         toast.success("تم تحديث السعر بنجاح");
//         fetchGloves();
//       } else {
//         toast.error(res.data.message || "فشل في تحديث السعر");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error(err.response?.data?.message || "فشل في تحديث السعر");
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchGloves();
//     }
//   }, [token]);

//   return (
//     <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen" dir="rtl">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         🧤 قائمة منتجات القفازات
//       </h2>

//       {loading ? (
//         <div className="flex justify-center items-center py-20">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
//         </div>
//       ) : products.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg">لا توجد منتجات قفازات</p>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {products.map((item, idx) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-2xl shadow hover:shadow-lg transition p-4 gap-4 transform opacity-0 animate-fadeIn"
//               style={{ 
//                 animationDelay: `${idx * 0.1}s`, 
//                 animationFillMode: "forwards",
//                 animationDuration: "0.5s"
//               }}
//             >
//               {/* Image */}
//               <img
//                 src={item.image?.[0] || "/placeholder.png"}
//                 alt={item.name || "بدون اسم"}
//                 className="w-full md:w-32 h-32 object-cover rounded-xl flex-shrink-0"
//                 onError={(e) => {
//                   e.target.src = "/placeholder.png";
//                 }}
//               />

//               {/* Info */}
//               <div className="flex-1 flex flex-col justify-between gap-2 w-full">
//                 <div>
//                   <h3 className="font-semibold text-lg">{item.name || "بدون اسم"}</h3>
//                   <p className="text-sm text-gray-500 line-clamp-2 mt-1">
//                     {item.discription || "لا يوجد وصف"}
//                   </p>
                  
//                   {/* عرض مقاسات القفازات */}
//                   {item.gloveSizes && item.gloveSizes.length > 0 && (
//                     <div className="mt-2 flex flex-wrap items-center gap-2">
//                       <span className="text-xs text-gray-500">المقاسات:</span>
//                       <div className="flex flex-wrap gap-1">
//                         {item.gloveSizes.map((size) => (
//                           <span
//                             key={size}
//                             className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs"
//                           >
//                             {size}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Price & Actions */}
//                 <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mt-2 md:mt-0">
//                   <span className="font-semibold text-gray-800 transition transform duration-300 hover:scale-105 text-lg">
//                     {item.price || 0} {currency}
//                   </span>
//                   <div className="flex gap-2 flex-wrap">
//                     <PriceEditor item={item} updatePrice={updatePrice} />
//                     <button
//                       onClick={() => removeProduct(item._id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition transform hover:scale-105"
//                     >
//                       حذف
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GlovesList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Percent, Calendar, Clock, Save, Trash2, X, Loader2, AlertTriangle 
} from "lucide-react";

// ----- مودال تعديل الخصم -----
const DiscountModal = ({ isOpen, onClose, product, token, onUpdate }) => {
  const [discountPercentage, setDiscountPercentage] = useState(product?.discountPercentage || 0);
  const [discountStart, setDiscountStart] = useState(product?.discountStart || "");
  const [discountEnd, setDiscountEnd] = useState(product?.discountEnd || "");
  const [updating, setUpdating] = useState(false);
  const [finalPrice, setFinalPrice] = useState(product?.price || 0);

  // حساب السعر بعد الخصم
  useEffect(() => {
    if (product?.price && discountPercentage > 0) {
      const calculated = product.price - (product.price * discountPercentage / 100);
      setFinalPrice(calculated.toFixed(2));
    } else {
      setFinalPrice(product?.price || 0);
    }
  }, [discountPercentage, product?.price]);

  if (!isOpen || !product) return null;

  const handleSubmit = async () => {
    if (discountPercentage < 0 || discountPercentage > 100) {
      return toast.error("نسبة الخصم يجب أن تكون بين 0 و 100");
    }

    setUpdating(true);
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-discount`,
        { 
          id: product._id, 
          discountPercentage: Number(discountPercentage),
          discountStart: discountStart || null,
          discountEnd: discountEnd || null,
          finalPrice: Number(finalPrice)
        },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("تم تحديث الخصم بنجاح");
        onUpdate();
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveDiscount = async () => {
    setUpdating(true);
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-discount`,
        { 
          id: product._id, 
          discountPercentage: 0,
          discountStart: null,
          discountEnd: null,
          finalPrice: product.price
        },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("تم إزالة الخصم بنجاح");
        onUpdate();
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Percent className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                تعديل الخصم
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            {/* معلومات المنتج */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <img
                src={product.image?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">السعر الأصلي: {product.price} {currency}</p>
              </div>
            </div>

            {/* نسبة الخصم */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نسبة الخصم (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
                placeholder="مثال: 15"
              />
            </div>

            {/* تاريخ البداية */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                تاريخ بداية الخصم (اختياري)
              </label>
              <input
                type="datetime-local"
                value={discountStart}
                onChange={(e) => setDiscountStart(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
              />
            </div>

            {/* تاريخ النهاية */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                تاريخ نهاية الخصم (اختياري)
              </label>
              <input
                type="datetime-local"
                value={discountEnd}
                onChange={(e) => setDiscountEnd(e.target.value)}
                min={discountStart}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
              />
            </div>

            {/* عرض السعر بعد الخصم */}
            {discountPercentage > 0 && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">السعر بعد الخصم:</span>
                  <span className="text-lg font-bold text-emerald-600">
                    {finalPrice} {currency}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">التوفير:</span>
                  <span className="text-xs text-red-500">
                    {(product.price - finalPrice).toFixed(2)} {currency} (وفر {discountPercentage}%)
                  </span>
                </div>
              </div>
            )}

            {/* أزرار الإجراءات */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={updating}
                className="flex-1 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {updating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                حفظ التغييرات
              </button>
              {product.discountPercentage > 0 && (
                <button
                  onClick={handleRemoveDiscount}
                  disabled={updating}
                  className="px-6 py-2.5 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  إزالة الخصم
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ----- Price Editor (معدل ليشمل الخصم) -----
const PriceEditor = ({ item, updatePrice }) => {
  const [edit, setEdit] = useState(false);
  const [price, setPrice] = useState(item.price);
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    if (!price || price <= 0) {
      return toast.error("من فضلك أدخل سعر صحيح");
    }
    setUpdating(true);
    await updatePrice(item._id, Number(price));
    setEdit(false);
    setTimeout(() => setUpdating(false), 500);
  };

  return edit ? (
    <div className="flex gap-2 flex-wrap">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded-lg px-2 py-1 w-24 text-center focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        min="0"
        step="0.01"
        autoFocus
      />
      <button
        onClick={handleSave}
        className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600 transition transform hover:scale-105"
      >
        حفظ
      </button>
      <button
        onClick={() => {
          setEdit(false);
          setPrice(item.price);
        }}
        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
      >
        إلغاء
      </button>
    </div>
  ) : (
    <span
      className={`bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition text-sm cursor-pointer inline-block transform hover:scale-105 ${
        updating ? "animate-pulse" : ""
      }`}
      onClick={() => setEdit(true)}
    >
      {updating ? "تم التحديث!" : "تعديل السعر"}
    </span>
  );
};

// ----- Gloves Product List -----
const GlovesList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch gloves products
  const fetchGloves = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/product/gloves`, {
        headers: { token }
      });
      
      // console.log("API Response:", res.data);
      
      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        toast.error(res.data.message || "فشل في جلب المنتجات");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.message || "فشل في جلب المنتجات");
    } finally {
      setLoading(false);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      
      if (res.data.success) {
        toast.success("تم حذف المنتج بنجاح");
        fetchGloves();
      } else {
        toast.error(res.data.message || "فشل في حذف المنتج");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error(err.response?.data?.message || "فشل في حذف المنتج");
    }
  };

  // Update price
  const updatePrice = async (id, newPrice) => {
    if (!newPrice || newPrice <= 0) {
      return toast.error("من فضلك أدخل سعر صحيح");
    }
    
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-price`,
        { id, price: Number(newPrice) },
        { headers: { token } }
      );
      
      if (res.data.success) {
        toast.success("تم تحديث السعر بنجاح");
        fetchGloves();
      } else {
        toast.error(res.data.message || "فشل في تحديث السعر");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "فشل في تحديث السعر");
    }
  };

  // فتح مودال تعديل الخصم
  const openDiscountModal = (product) => {
    setSelectedProduct(product);
    setShowDiscountModal(true);
  };

  // التحقق من وجود خصم ساري
  const isDiscountValid = (item) => {
    if (!item.discountPercentage || item.discountPercentage <= 0) return false;
    if (item.discountEnd) {
      const now = new Date().getTime();
      const endTime = new Date(item.discountEnd).getTime();
      return now <= endTime;
    }
    return true;
  };

  useEffect(() => {
    if (token) {
      fetchGloves();
    }
  }, [token]);

  return (
    <>
      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        product={selectedProduct}
        token={token}
        onUpdate={fetchGloves}
      />

      <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen" dir="rtl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🧤 قائمة منتجات القفازات
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">لا توجد منتجات قفازات</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {products.map((item, idx) => {
              const discountActive = isDiscountValid(item);
              
              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-2xl shadow hover:shadow-lg transition p-4 gap-4 transform opacity-0 animate-fadeIn"
                  style={{ 
                    animationDelay: `${idx * 0.1}s`, 
                    animationFillMode: "forwards",
                    animationDuration: "0.5s"
                  }}
                >
                  {/* Image */}
                  <img
                    src={item.image?.[0] || "/placeholder.png"}
                    alt={item.name || "بدون اسم"}
                    className="w-full md:w-32 h-32 object-cover rounded-xl flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between gap-2 w-full">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{item.name || "بدون اسم"}</h3>
                        {discountActive && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                            خصم {item.discountPercentage}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {item.discription || "لا يوجد وصف"}
                      </p>
                      
                      {/* عرض مقاسات القفازات */}
                      {item.gloveSizes && item.gloveSizes.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs text-gray-500">المقاسات:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.gloveSizes.map((size) => (
                              <span
                                key={size}
                                className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mt-2 md:mt-0">
                      {discountActive ? (
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-semibold text-emerald-600 transition transform duration-300 hover:scale-105 text-lg">
                              {item.finalPrice?.toFixed(2) || item.price?.toFixed(2)} {currency}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm text-gray-400 line-through">
                              {item.price?.toFixed(2)} {currency}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="font-semibold text-gray-800 transition transform duration-300 hover:scale-105 text-lg">
                          {item.price || 0} {currency}
                        </span>
                      )}
                      
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => openDiscountModal(item)}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition transform hover:scale-105 flex items-center gap-1"
                        >
                          <Percent className="w-4 h-4" />
                          خصم
                        </button>
                        <PriceEditor item={item} updatePrice={updatePrice} />
                        <button
                          onClick={() => removeProduct(item._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition transform hover:scale-105"
                        >
                          حذف
                        </button>
                      </div>
                    </div>

                    {/* عرض تاريخ انتهاء الخصم */}
                    {discountActive && item.discountEnd && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>ينتهي: {new Date(item.discountEnd).toLocaleDateString('ar-EG')}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default GlovesList;