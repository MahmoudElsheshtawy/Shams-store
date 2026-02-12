
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// // مكون المودال للتأكيد على الحذف
// const ConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="text-center">
//             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//               <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.948-.833-2.678 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">مولفقه الحذف</h3>
//             <p className="text-gray-600 mb-6">
//               هل انت متاكد من مسح المنتج <span className="font-semibold">"{productName}"</span>؟
//               <br />
//               هدا الاجراء لا يمكن التراجع عنه.
//             </p>
            
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//               >
//                 رفض
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
//               >
//                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 موافقه
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // صف منتج واحد مع حماية من undefined
// const ProductRow = ({ item, token, fetchList }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [newPrice, setNewPrice] = useState(item.price || 0);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const updatePrice = async () => {
//     if (!newPrice) return toast.error("Enter a valid price");
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/product/update-price`,
//         { id: item._id, price: Number(newPrice) },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success("Price updated successfully!");
//         fetchList();
//         setEditMode(false);
//       } else toast.error(res.data.message);
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     }
//   };

//   const handleRemoveProduct = async () => {
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id: item._id },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         fetchList();
//       } else toast.error(res.data.message);
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     } finally {
//       setShowDeleteModal(false);
//     }
//   };

//   return (
//     <>
//       <ConfirmationModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={handleRemoveProduct}
//         productName={item.name || "هذا المنتج"}
//       />
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3 py-3 px-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
//       >
//         <img
//           className="w-16 h-16 object-cover rounded-md mx-auto md:mx-0"
//           src={Array.isArray(item.image) && item.image[0] ? item.image[0] : "/assets/default-product.png"}
//           alt={item.name || "No Name"}
//         />
//         <p className="text-center md:text-left text-gray-700 font-medium">{item.name || "-"}</p>
//         <p className="text-center text-gray-500">{item.category || "-"}</p>

//         {editMode ? (
//           <input
//             type="number"
//             className="border border-gray-300 px-2 py-1 rounded-md w-24 mx-auto text-center"
//             value={newPrice}
//             onChange={(e) => setNewPrice(e.target.value)}
//           />
//         ) : (
//           <p className="text-center font-semibold text-gray-800">
//             {item.price || 0} {currency}
//           </p>
//         )}

//         <button
//           onClick={() => setShowDeleteModal(true)}
//           className="bg-red-500 text-white py-1 px-3 rounded-md hover:opacity-90 transition flex items-center justify-center"
//         >
//           <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//           مسح
//         </button>

//         {editMode ? (
//           <div className="flex justify-center gap-2">
//             <button
//               onClick={updatePrice}
//               className="bg-green-500 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
//             >
//               حفظ
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
//             >
//               إلغاء
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setEditMode(true)}
//             className="bg-blue-500 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
//           >
//             تعديل السعر
//           </button>
//         )}
//       </motion.div>
//     </>
//   );
// };

// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchList = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/api/product/list`);
//       if (res.data.success) setList(res.data.products || []);
//       else toast.error(res.data.message);
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <motion.div
//       className="p-4 rounded-lg md:p-8 bg-gray-50 min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
//         🛍️ Product Management
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500 mt-10">Loading products...</p>
//       ) : list.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">No products found</p>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {list.map((item, index) => (
//             <ProductRow key={item._id || index} item={item} token={token} fetchList={fetchList} />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default List;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Edit, X, Check, Package, 
  Search, Loader2, AlertTriangle, ImageOff 
} from "lucide-react";

// مكون المودال للتأكيد على الحذف - تصميم محسّن
const ConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

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
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف المنتج{" "}
              <span className="font-semibold text-gray-900">"{productName}"</span>؟
              <br />
              هذا الإجراء لا يمكن التراجع عنه.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                إلغاء
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                حذف المنتج
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// مكون صورة المنتج مع Fallback
const ProductImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <ImageOff className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-[10px] sm:text-xs mt-1">لا توجد صورة</span>
        </div>
      )}
    </div>
  );
};

// مكون صف المنتج - تصميم محسّن
const ProductRow = ({ item, token, fetchList }) => {
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  // معالجة تحديث السعر
  const updatePrice = async () => {
    if (!newPrice || newPrice <= 0) {
      return toast.error("يرجى إدخال سعر صحيح");
    }
    setUpdating(true);
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-price`,
        { id: item._id, price: Number(newPrice) },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("تم تحديث السعر بنجاح");
        fetchList();
        setEditMode(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setUpdating(false);
    }
  };

  // معالجة حذف المنتج
  const handleRemoveProduct = async () => {
    setUpdating(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id: item._id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setUpdating(false);
      setShowDeleteModal(false);
    }
  };

  // الحصول على الصورة الرئيسية للمنتج
  const mainImage = Array.isArray(item.image) && item.image[0] 
    ? item.image[0] 
    : item.image || null;

  return (
    <>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveProduct}
        productName={item.name || "هذا المنتج"}
      />
      
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* نسخة الموبايل: تصميم عمودي */}
        <div className="md:hidden p-4">
          <div className="flex items-start gap-4">
            <ProductImage src={mainImage} alt={item.name} />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
                {item.name || "بدون اسم"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                  {item.category || "غير مصنف"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                {editMode ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.01"
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="السعر"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={updatePrice}
                        disabled={updating}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gray-900">
                        {item.price?.toFixed(2) || "0.00"}
                      </span>
                      <span className="text-xs text-gray-500">{currency}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditMode(true)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="تعديل السعر"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* نسخة الديسكتوب: تصميم أفقي */}
        <div className="hidden md:flex items-center gap-6 p-4">
          {/* صورة المنتج */}
          <div className="flex-shrink-0">
            <ProductImage src={mainImage} alt={item.name} />
          </div>

          {/* معلومات المنتج */}
          <div className="flex-1 grid grid-cols-12 items-center gap-4">
            {/* الاسم */}
            <div className="col-span-4">
              <p className="font-semibold text-gray-900 text-base truncate" title={item.name}>
                {item.name || "بدون اسم"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">ID: {item._id?.slice(-6)}</p>
            </div>

            {/* الفئة */}
            <div className="col-span-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                {item.category || "غير مصنف"}
              </span>
            </div>

            {/* السعر */}
            <div className="col-span-2">
              {editMode ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-gray-900">
                    {item.price?.toFixed(2) || "0.00"}
                  </span>
                  <span className="text-xs text-gray-500">{currency}</span>
                </div>
              )}
            </div>

            {/* أزرار الإجراءات */}
            <div className="col-span-4 flex justify-end gap-2">
              {editMode ? (
                <>
                  <button
                    onClick={updatePrice}
                    disabled={updating}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
                  >
                    {updating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    حفظ
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    إلغاء
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="تعديل السعر"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="حذف المنتج"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// مكون الهيكل العظمي (Skeleton) أثناء التحميل
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

// المكون الرئيسي
const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setList(res.data.products || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // فلترة المنتجات حسب البحث
  const filteredList = list.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* الهيدر */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Package className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            قائمة <span className="text-emerald-600">المنتجات</span>
          </h1>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {filteredList.length} {filteredList.length === 1 ? 'منتج' : 'منتجات'}
          </span>
        </div>

        {/* شريط البحث */}
        <div className="relative max-w-md w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* حالة التحميل */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        // حالة عدم وجود منتجات
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد منتجات'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm 
              ? 'لم نتمكن من العثور على منتج مطابق لبحثك. جرب كلمات أخرى.'
              : 'لم تقم بإضافة أي منتجات بعد. استخدم زر الإضافة لإنشاء منتج جديد.'}
          </p>
        </div>
      ) : (
        // قائمة المنتجات
        <div className="space-y-4">
          <AnimatePresence>
            {filteredList.map((item, index) => (
              <ProductRow 
                key={item._id || index} 
                item={item} 
                token={token} 
                fetchList={fetchList} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default List;