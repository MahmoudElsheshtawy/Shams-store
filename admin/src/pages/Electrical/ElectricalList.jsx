
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../../App";
// import { toast } from "react-toastify";

// // ----- Price Editor -----
// const PriceEditor = ({ item, updatePrice }) => {
//   const [edit, setEdit] = useState(false);
//   const [price, setPrice] = useState(item.price);
//   const [updating, setUpdating] = useState(false); // animation for update

//   const handleSave = async () => {
//     setUpdating(true);
//     await updatePrice(item._id, Number(price));
//     setEdit(false);
//     setTimeout(() => setUpdating(false), 500); // remove animation after 0.5s
//   };

//   return edit ? (
//     <div className="flex gap-2 flex-wrap">
//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         className="border rounded-lg px-2 py-1 w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//       />
//       <button
//         onClick={handleSave}
//         className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
//       >
//         حفظ
//       </button>
//       <button
//         onClick={() => setEdit(false)}
//         className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
//       >
//         إلغاء
//       </button>
//     </div>
//   ) : (
//     <span
//       className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm cursor-pointer inline-block transform hover:scale-105 ${
//         updating ? "animate-pulse" : ""
//       }`}
//       onClick={() => setEdit(true)}
//     >
//       {updating ? "جاري تحديث السعر..." : "تعديل السعر"}
//     </span>
//   );
// };

// // ----- Electrical Product List (List view with animation) -----
// const ElectricalList = ({ token }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch products
//   const fetchElectrical = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/api/product/shoes`, {
//         headers: { token },
//       });
//       if (res.data.success) setProducts(res.data.products || []);
//       else toast.error(res.data.message);
//     } catch {
//       toast.error("Failed to load electrical products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove product
//   const removeProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         fetchElectrical();
//       } else toast.error(res.data.message);
//     } catch {
//       toast.error("Failed to remove product");
//     }
//   };

//   // Update price
//   const updatePrice = async (id, newPrice) => {
//     if (!newPrice) return toast.error("Enter a valid price");
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/product/update-price`,
//         { id, price: Number(newPrice) },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success("تم تحديث السعر بنجاح");
//         fetchElectrical();
//       } else toast.error(res.data.message);
//     } catch (err) {
//       console.log(err);
      
//       toast.error("لم يتم تحديث السعر");
//     }
//   };

//   useEffect(() => {
//     fetchElectrical();
//   }, []);

//   return (
//     <div className="p-4 md:p-8 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         ⚡ قائمه الاحذيه الرياضيه
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500"> جاري التحميل...</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-gray-500">لا توجد منتجات</p>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {products.map((item, idx) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-2xl shadow hover:shadow-lg transition p-4 gap-4 transform opacity-0 animate-fadeIn"
//               style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "forwards" }}
//             >
//               {/* Image */}
//               <img
//                 src={item.image?.[0] || "/placeholder.png"}
//                 alt={item.name || "No Name"}
//                 className="w-full md:w-32 h-32 object-cover rounded-xl flex-shrink-0"
//               />

//               {/* Info */}
//               <div className="flex-1 flex flex-col justify-between gap-2 w-full">
//                 <div>
//                   <h3 className="font-semibold text-lg">{item.name || "-"}</h3>
//                   <p className="text-sm text-gray-500 line-clamp-2">
//                     {item.discription || "No description"}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">{item.subCategory || "-"}</p>
//                 </div>

//                 {/* Price & Actions */}
//                 <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mt-2 md:mt-0">
//                   <span className="font-semibold text-gray-800 transition transform duration-300 hover:scale-105">
//                     {item.price || 0} {currency}
//                   </span>
//                   <div className="flex gap-2 flex-wrap">
//                     <PriceEditor item={item} updatePrice={updatePrice} />
//                     <button
//                       onClick={() => removeProduct(item._id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition transform hover:scale-105"
//                     >
//                        حذف المنتج 
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

// export default ElectricalList;
// ======================
// ======================
// ======================
// ======================
// ======================
// ======================
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../../App";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//    Search, Trash2, Edit,  
//   Package, X, Check, Loader2, ImageOff, AlertTriangle 
// } from "lucide-react";

// // ----- مكون تأكيد الحذف -----
// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0, y: 20 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.9, opacity: 0, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="text-center">
//             <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
//               <AlertTriangle className="h-8 w-8 text-red-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
//             <p className="text-gray-600 mb-6">
//               هل أنت متأكد من حذف المنتج{" "}
//               <span className="font-semibold text-gray-900">"{productName}"</span>؟
//               <br />
//               هذا الإجراء لا يمكن التراجع عنه.
//             </p>
            
//             <div className="flex flex-col sm:flex-row justify-center gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
//               >
//                 <X className="w-4 h-4" />
//                 إلغاء
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 حذف
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// // ----- مكون صورة المنتج مع fallback -----
// const ProductImage = ({ src, alt }) => {
//   const [error, setError] = useState(false);

//   return (
//     <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
//       {!error && src ? (
//         <img
//           src={src}
//           alt={alt}
//           className="w-full h-full object-cover"
//           onError={() => setError(true)}
//         />
//       ) : (
//         <div className="flex flex-col items-center justify-center text-gray-400">
//           <ImageOff className="w-8 h-8 sm:w-10 sm:h-10" />
//           <span className="text-[10px] sm:text-xs mt-1">لا توجد صورة</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // ----- مكون تعديل السعر المحسّن -----
// const PriceEditor = ({ item, updatePrice }) => {
//   const [edit, setEdit] = useState(false);
//   const [newPrice, setNewPrice] = useState(item.price || 0);
//   const [updating, setUpdating] = useState(false);

//   const handleSave = async () => {
//     if (!newPrice || newPrice <= 0) {
//       return toast.error("يرجى إدخال سعر صحيح");
//     }
//     setUpdating(true);
//     await updatePrice(item._id, Number(newPrice));
//     setEdit(false);
//     setUpdating(false);
//   };

//   return edit ? (
//     <div className="flex items-center gap-2 flex-wrap">
//       <div className="relative">
//         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//           {currency}
//         </span>
//         <input
//           type="number"
//           step="0.01"
//           min="0"
//           value={newPrice}
//           onChange={(e) => setNewPrice(e.target.value)}
//           className="w-28 px-3 py-1.5 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
//           autoFocus
//         />
//       </div>
//       <button
//         onClick={handleSave}
//         disabled={updating}
//         className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
//         title="حفظ"
//       >
//         <Check className="w-4 h-4" />
//       </button>
//       <button
//         onClick={() => setEdit(false)}
//         className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//         title="إلغاء"
//       >
//         <X className="w-4 h-4" />
//       </button>
//     </div>
//   ) : (
//     <div className="flex items-center gap-2">
//       <div className="flex items-baseline gap-1">
//         <span className="text-lg font-bold text-gray-900">
//           {item.price?.toFixed(2) || ""}
//         </span>
//         <span className="text-xs text-gray-500">{currency}</span>
//       </div>
//       <button
//         onClick={() => setEdit(true)}
//         className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//         title="تعديل السعر"
//       >
//         <Edit className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// // ----- مكون صف المنتج مع تصميم متجاوب -----
// const ProductRow = ({ item, token, onDelete, onUpdatePrice }) => {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleDelete = async () => {
//     setDeleting(true);
//     await onDelete(item._id);
//     setDeleting(false);
//     setShowDeleteModal(false);
//   };

//   const mainImage = Array.isArray(item.image) && item.image[0] 
//     ? item.image[0] 
//     : item.image || null;

//   return (
//     <>
//       <DeleteConfirmationModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={handleDelete}
//         productName={item.name || "هذا المنتج"}
//       />

//       <motion.div
//         layout
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.2 }}
//         className="bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
//       >
//         {/* نسخة الموبايل */}
//         <div className="md:hidden  p-4">
//           <div className="flex items-start gap-4">
//             <ProductImage src={mainImage} alt={item.name} />
//             <div className="flex-1 min-w-0">
//               <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
//                 {item.name || "بدون اسم"}
//               </h3>
//               <p className="text-sm text-gray-500 line-clamp-2 mb-2">
//                 {/* {item.discription || "لا يوجد وصف"} */}
//               </p>
//               <div className="flex items-center justify-between">
//                 <PriceEditor item={item} updatePrice={onUpdatePrice} />
//                 <button
//                   onClick={() => setShowDeleteModal(true)}
//                   disabled={deleting}
//                   className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                   title="حذف المنتج"
//                 >
//                   {deleting ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Trash2 className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* نسخة الديسكتوب */}
//         <div className="hidden md:flex items-center gap-6 p-4">
//           <div className="flex-shrink-0">
//             <ProductImage src={mainImage} alt={item.name} />
//           </div>

//           <div className="flex-1 grid grid-cols-12 items-center gap-4">
//             {/* الاسم والوصف */}
//             <div className="col-span-5">
//               <h3 className="font-semibold text-gray-900 text-base truncate" title={item.name}>
//                 {item.name || "بدون اسم"}
//               </h3>
//               <p className="text-sm text-gray-500 line-clamp-2 mt-1" title={item.discription}>
//                 {item.discription || "لا يوجد وصف"}
//               </p>
//             </div>

//             {/* السعر والإجراءات */}
//             <div className="col-span-7 flex items-center justify-end gap-4">
//               <PriceEditor item={item} updatePrice={onUpdatePrice} />
//               <button
//                 onClick={() => setShowDeleteModal(true)}
//                 disabled={deleting}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
//               >
//                 {deleting ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Trash2 className="w-4 h-4" />
//                 )}
//                 حذف
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// // ----- مكون الهيكل العظمي (Skeleton) أثناء التحميل -----
// const ProductSkeleton = () => (
//   <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
//     <div className="flex flex-col md:flex-row md:items-center gap-4">
//       <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-xl"></div>
//       <div className="flex-1 space-y-3">
//         <div className="h-5 bg-gray-200 rounded w-3/4"></div>
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         <div className="flex justify-between items-center">
//           <div className="h-8 bg-gray-200 rounded w-24"></div>
//           <div className="h-8 bg-gray-200 rounded w-20"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // ----- المكون الرئيسي: قائمة الأحذية الرياضية -----
// const ElectricalList = ({ token }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // جلب المنتجات
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${backendUrl}/api/product/shoes`, {
//         headers: { token },
//       });
//       if (res.data.success) {
//         setProducts(res.data.products || []);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch {
//       toast.error("فشل تحميل المنتجات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // حذف المنتج
//   const removeProduct = async (id) => {
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         fetchProducts();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch {
//       toast.error("فشل حذف المنتج");
//     }
//   };

//   // تحديث السعر
//   const updatePrice = async (id, newPrice) => {
//     try {
//       const res = await axios.put(
//         `${backendUrl}/api/product/update-price`,
//         { id, price: Number(newPrice) },
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         toast.success("تم تحديث السعر بنجاح");
//         fetchProducts();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch {
//       toast.error("لم يتم تحديث السعر");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // فلترة المنتجات حسب البحث
//   const filteredProducts = products.filter(product =>
//     product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.discription?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="w-full rounded-lg bg-slate-200 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6">
//       {/* الهيدر */}
//       <div className="flex  flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-emerald-100 rounded-lg">
//             {/* <Shoe className="w-6 h-6 text-emerald-600" /> */}
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             الأحذية <span className="text-emerald-600">الرياضية</span>
//           </h1>
//           <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
//             {filteredProducts.length} {filteredProducts.length === 1 ? 'منتج' : 'منتجات'}
//           </span>
//         </div>

//         {/* شريط البحث */}
//         <div className="relative max-w-md w-full">
//           <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="ابحث عن منتج..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//           />
//         </div>
//       </div>

//       {/* حالة التحميل */}
//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <ProductSkeleton key={i} />
//           ))}
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
//           <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//             <Package className="w-10 h-10 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             {searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد منتجات'}
//           </h3>
//           <p className="text-gray-500 max-w-md mx-auto">
//             {searchTerm
//               ? 'لم نتمكن من العثور على منتج مطابق. جرب كلمات أخرى.'
//               : 'لم تقم بإضافة أي أحذية رياضية بعد.'}
//           </p>
//         </div>
//       ) : (
//         <AnimatePresence>
//           <div className="space-y-4">
//             {filteredProducts.map((item) => (
//               <ProductRow
//                 key={item._id}
//                 item={item}
//                 token={token}
//                 onDelete={removeProduct}
//                 onUpdatePrice={updatePrice}
//               />
//             ))}
//           </div>
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

// export default ElectricalList;
// ======================
// ======================
// ======================
// ======================
// ======================
// ======================
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Trash2, Edit, Package, X, Check, Loader2, ImageOff, AlertTriangle,
  Percent, Calendar, Clock, Save
} from "lucide-react";

// ----- مكون تأكيد الحذف -----
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName }) => {
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
                حذف
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

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
              <ProductImage src={product.image?.[0]} alt={product.name} />
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

// ----- مكون صورة المنتج مع fallback -----
const ProductImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <ImageOff className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-[10px] sm:text-xs mt-1">لا توجد صورة</span>
        </div>
      )}
    </div>
  );
};

// ----- مكون تعديل السعر المحسّن -----
const PriceEditor = ({ item, updatePrice }) => {
  const [edit, setEdit] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price || 0);
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    if (!newPrice || newPrice <= 0) {
      return toast.error("يرجى إدخال سعر صحيح");
    }
    setUpdating(true);
    await updatePrice(item._id, Number(newPrice));
    setEdit(false);
    setUpdating(false);
  };

  return edit ? (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
          {currency}
        </span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-28 px-3 py-1.5 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
          autoFocus
        />
      </div>
      <button
        onClick={handleSave}
        disabled={updating}
        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
        title="حفظ"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={() => setEdit(false)}
        className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        title="إلغاء"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-gray-900">
          {item.price?.toFixed(2) || ""}
        </span>
        <span className="text-xs text-gray-500">{currency}</span>
      </div>
      <button
        onClick={() => setEdit(true)}
        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        title="تعديل السعر"
      >
        <Edit className="w-4 h-4" />
      </button>
    </div>
  );
};

// ----- مكون صف المنتج مع تصميم متجاوب -----
// ----- مكون صف المنتج مع تصميم متجاوب -----
const ProductRow = ({ item, token, onDelete, onUpdatePrice, onUpdate }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // ✅ إضافة هذه الأسطر
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price || 0);
  const [updating, setUpdating] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(item._id);
    setDeleting(false);
    setShowDeleteModal(false);
  };

  // ✅ إضافة دالة حفظ السعر
  const handleSavePrice = async () => {
    if (!newPrice || newPrice <= 0) {
      return toast.error("يرجى إدخال سعر صحيح");
    }
    setUpdating(true);
    await onUpdatePrice(item._id, Number(newPrice));
    setEditMode(false);
    setUpdating(false);
  };

  const mainImage = Array.isArray(item.image) && item.image[0] 
    ? item.image[0] 
    : item.image || null;

  // التحقق من وجود خصم ساري
  const hasDiscount = item.discountPercentage > 0;
  const isDiscountValid = () => {
    if (!item.discountEnd) return true;
    const now = new Date().getTime();
    const endTime = new Date(item.discountEnd).getTime();
    return now <= endTime;
  };
  const discountActive = hasDiscount && isDiscountValid();

  return (
    <>
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        productName={item.name || "هذا المنتج"}
      />

      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        product={item}
        token={token}
        onUpdate={onUpdate}
      />

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* نسخة الموبايل المحسنة */}
        <div className="md:hidden p-4">
          <div className="flex items-start gap-4">
            <ProductImage src={mainImage} alt={item.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2 flex-1">
                  {item.name || "بدون اسم"}
                </h3>
                {discountActive && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full whitespace-nowrap">
                    -{item.discountPercentage}%
                  </span>
                )}
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                {/* وضع التعديل أو العرض العادي */}
                {editMode ? (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        {currency}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-24 px-3 py-1.5 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleSavePrice}
                      disabled={updating}
                      className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                      title="حفظ"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setNewPrice(item.price || 0);
                      }}
                      className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      title="إلغاء"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    {discountActive ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-bold text-emerald-600">
                            {item.finalPrice?.toFixed(2) || item.price?.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-500">{currency}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-gray-400 line-through">
                            {item.price?.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400">{currency}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-gray-900">
                          {item.price?.toFixed(2) || "0.00"}
                        </span>
                        <span className="text-xs text-gray-500">{currency}</span>
                      </div>
                    )}
                  </>
                )}
                
                {/* أزرار الإجراءات - تظهر فقط إذا لم يكن في وضع التعديل */}
                {!editMode && (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setShowDiscountModal(true)}
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex-1 flex items-center justify-center gap-1"
                      title="تعديل الخصم"
                    >
                      <Percent className="w-4 h-4" />
                      <span className="text-xs">خصم</span>
                    </button>
                    <button
                      onClick={() => setEditMode(true)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="تعديل السعر"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      disabled={deleting}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="حذف المنتج"
                    >
                      {deleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* نسخة الديسكتوب (بدون تغيير) */}
        <div className="hidden md:flex items-center gap-6 p-4">
          <div className="flex-shrink-0">
            <ProductImage src={mainImage} alt={item.name} />
          </div>

          <div className="flex-1 grid grid-cols-12 items-center gap-4">
            {/* الاسم */}
            <div className="col-span-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-base truncate" title={item.name}>
                  {item.name || "بدون اسم"}
                </h3>
                {discountActive && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full whitespace-nowrap">
                    -{item.discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* السعر */}
            <div className="col-span-3">
              {discountActive ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-emerald-600">
                      {item.finalPrice?.toFixed(2) || item.price?.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">{currency}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-400 line-through">
                      {item.price?.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">{currency}</span>
                  </div>
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
            <div className="col-span-5 flex justify-end gap-2">
              <button
                onClick={() => setShowDiscountModal(true)}
                className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2 text-sm font-medium"
                title="تعديل الخصم"
              >
                <Percent className="w-4 h-4" />
                <span className="hidden lg:inline">الخصم</span>
              </button>
              <PriceEditor item={item} updatePrice={onUpdatePrice} />
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={deleting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                حذف
              </button>
            </div>
          </div>
        </div>

        {/* عرض تاريخ انتهاء الخصم للهاتف */}
        {discountActive && item.discountEnd && (
          <div className="md:hidden flex items-center gap-1 px-4 pb-3 text-xs text-gray-500 border-t border-gray-100 pt-2 mt-1">
            <Clock className="w-3 h-3" />
            <span>ينتهي: {new Date(item.discountEnd).toLocaleDateString('ar-EG')}</span>
          </div>
        )}
      </motion.div>
    </>
  );
};

// ----- مكون الهيكل العظمي (Skeleton) أثناء التحميل -----
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-xl"></div>
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ----- المكون الرئيسي: قائمة الأحذية الرياضية -----
const ElectricalList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // جلب المنتجات
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/product/shoes`, {
        headers: { token },
      });
      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("فشل تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  };

  // حذف المنتج
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("فشل حذف المنتج");
    }
  };

  // تحديث السعر
  const updatePrice = async (id, newPrice) => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-price`,
        { id, price: Number(newPrice) },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("تم تحديث السعر بنجاح");
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("لم يتم تحديث السعر");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // فلترة المنتجات حسب البحث
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.discription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full rounded-lg bg-slate-200 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6">
      {/* الهيدر */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            {/* <Shoe className="w-6 h-6 text-emerald-600" /> */}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            الأحذية <span className="text-emerald-600">الرياضية</span>
          </h1>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'منتج' : 'منتجات'}
          </span>
        </div>

        {/* شريط البحث */}
        <div className="relative max-w-md w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* حالة التحميل */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد منتجات'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm
              ? 'لم نتمكن من العثور على منتج مطابق. جرب كلمات أخرى.'
              : 'لم تقم بإضافة أي أحذية رياضية بعد.'}
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {filteredProducts.map((item) => (
              <ProductRow
                key={item._id}
                item={item}
                token={token}
                onDelete={removeProduct}
                onUpdatePrice={updatePrice}
                onUpdate={fetchProducts}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ElectricalList;