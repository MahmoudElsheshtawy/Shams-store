// import React, { useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";
// import { assets } from "../../assets/assets";

// const Addgloves = ({ token }) => {
//   const [name, setName] = useState("");
//   const [discription, setDiscription] = useState("");
//   const [price, setPrice] = useState("");
//   const [images, setImages] = useState([null, null, null, null]);
//   const [gloveSizes, setGloveSizes] = useState([]); // 🧤 مقاسات القفازات
//   const [loading, setLoading] = useState(false);

//   // اختيار الصور
//   const handleImageChange = (e, index) => {
//     const newImages = [...images];
//     newImages[index] = e.target.files[0];
//     setImages(newImages);
//   };

//   // اختيار / إلغاء المقاس
//   const toggleSize = (size) => {
//     setGloveSizes((prev) =>
//       prev.includes(size)
//         ? prev.filter((s) => s !== size)
//         : [...prev, size]
//     );
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("discription", discription);
//       formData.append("price", price);
//       formData.append("category", "gloves");

//       // 🧤 إرسال المقاسات كمصفوفة JSON
//       formData.append("gloveSizes", JSON.stringify(gloveSizes));

//       // الصور
//       images.forEach((img, idx) => {
//         if (img) formData.append(`image${idx + 1}`, img);
//       });

//       const res = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         toast.success("تم إضافة منتج القفازات بنجاح 🧤");

//         // Reset
//         setName("");
//         setDiscription("");
//         setPrice("");
//         setImages([null, null, null, null]);
//         setGloveSizes([]);
//       } else {
//         toast.error(res.data.message || "حدث خطأ");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={submitHandler}
//       className="flex flex-col gap-4 bg-white p-5 rounded shadow"
//     >
//       <h2 className="text-xl font-bold">🧤 إضافة منتج قفازات</h2>

//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="اسم المنتج"
//         required
//         className="border p-2 rounded"
//       />

//       <textarea
//         value={discription}
//         onChange={(e) => setDiscription(e.target.value)}
//         placeholder="وصف المنتج"
//         required
//         rows="3"
//         className="border p-2 rounded"
//       />

//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         placeholder="السعر"
//         required
//         min="0"
//         step="0.01"
//         className="border p-2 rounded"
//       />

//       {/* 🧤 مقاسات القفازات */}
//       <div>
//         <p className="font-medium mb-2">مقاسات القفازات (5 - 11)</p>
//         <div className="flex flex-wrap gap-2">
//           {[5, 6, 7, 8, 9, 10, 11].map((size) => (
//             <button
//               type="button"
//               key={size}
//               onClick={() => toggleSize(size)}
//               className={`px-4 py-2 border rounded transition-all min-w-[45px] ${
//                 gloveSizes.includes(size)
//                   ? "bg-emerald-500 text-white border-emerald-500"
//                   : "bg-white hover:bg-gray-50 border-gray-300"
//               }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//         {gloveSizes.length === 0 && (
//           <p className="text-xs text-red-500 mt-1">* يجب اختيار مقاس واحد على الأقل</p>
//         )}
//       </div>

//       {/* الصور */}
//       <div>
//         <p className="font-medium mb-2">صور المنتج</p>
//         <div className="grid grid-cols-2 gap-2">
//           {images.map((img, idx) => (
//             <label
//               key={idx}
//               className="border h-24 flex items-center justify-center cursor-pointer overflow-hidden rounded hover:border-emerald-500 transition"
//             >
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={(e) => handleImageChange(e, idx)}
//               />
//               {img ? (
//                 <img
//                   src={URL.createObjectURL(img)}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <img src={assets.upload_area} alt="" className="w-10 opacity-50" />
//               )}
//             </label>
//           ))}
//         </div>
//         {images.every(img => img === null) && (
//           <p className="text-xs text-red-500 mt-1">* يجب إضافة صورة واحدة على الأقل</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={loading || gloveSizes.length === 0 || images.every(img => img === null)}
//         className={`py-2 rounded transition font-medium ${
//           loading || gloveSizes.length === 0 || images.every(img => img === null)
//             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//             : "bg-black text-white hover:bg-gray-800"
//         }`}
//       >
//         {loading ? "جاري الإضافة..." : "إضافة منتج القفازات 🧤"}
//       </button>
//     </form>
//   );
// };

// export default Addgloves;
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================
// import React, { useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";
// import { assets } from "../../assets/assets";
// import { Calendar, Percent } from "lucide-react";

// const Addgloves = ({ token }) => {
//   const [name, setName] = useState("");
//   const [discription, setDiscription] = useState("");
//   const [price, setPrice] = useState("");
//   const [images, setImages] = useState([null, null, null, null]);
//   const [gloveSizes, setGloveSizes] = useState([]); // 🧤 مقاسات القفازات
//   const [loading, setLoading] = useState(false);
  
//   // حقول الخصم
//   const [discountPercentage, setDiscountPercentage] = useState("");
//   const [discountStart, setDiscountStart] = useState("");
//   const [discountEnd, setDiscountEnd] = useState("");

//   // اختيار الصور
//   const handleImageChange = (e, index) => {
//     const newImages = [...images];
//     newImages[index] = e.target.files[0];
//     setImages(newImages);
//   };

//   // اختيار / إلغاء المقاس
//   const toggleSize = (size) => {
//     setGloveSizes((prev) =>
//       prev.includes(size)
//         ? prev.filter((s) => s !== size)
//         : [...prev, size]
//     );
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("discription", discription);
//       formData.append("price", price);
//       formData.append("category", "gloves");

//       // 🧤 إرسال المقاسات كمصفوفة JSON
//       formData.append("gloveSizes", JSON.stringify(gloveSizes));

//       // ✅ إضافة بيانات الخصم
//       if (discountPercentage && discountPercentage > 0) {
//         formData.append("discountPercentage", discountPercentage);
        
//         // حساب السعر بعد الخصم
//         const finalPrice = price - (price * discountPercentage / 100);
//         formData.append("finalPrice", finalPrice.toFixed(2));
        
//         // إضافة التواريخ إذا كانت موجودة
//         if (discountStart) {
//           formData.append("discountStart", discountStart);
//         }
//         if (discountEnd) {
//           formData.append("discountEnd", discountEnd);
//         }
//       }

//       // الصور
//       images.forEach((img, idx) => {
//         if (img) formData.append(`image${idx + 1}`, img);
//       });

//       const res = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         toast.success("تم إضافة منتج القفازات بنجاح 🧤");

//         // Reset
//         setName("");
//         setDiscription("");
//         setPrice("");
//         setImages([null, null, null, null]);
//         setGloveSizes([]);
//         setDiscountPercentage("");
//         setDiscountStart("");
//         setDiscountEnd("");
//       } else {
//         toast.error(res.data.message || "حدث خطأ");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={submitHandler}
//       className="flex flex-col gap-4 bg-white p-5 rounded shadow"
//     >
//       <h2 className="text-xl font-bold">🧤 إضافة منتج قفازات</h2>

//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="اسم المنتج"
//         required
//         className="border p-2 rounded"
//       />

//       <textarea
//         value={discription}
//         onChange={(e) => setDiscription(e.target.value)}
//         placeholder="وصف المنتج"
//         required
//         rows="3"
//         className="border p-2 rounded"
//       />

//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         placeholder="السعر"
//         required
//         min="0"
//         step="0.01"
//         className="border p-2 rounded"
//       />

//       {/* 🧤 مقاسات القفازات */}
//       <div>
//         <p className="font-medium mb-2">مقاسات القفازات (5 - 11)</p>
//         <div className="flex flex-wrap gap-2">
//           {[5, 6, 7, 8, 9, 10, 11].map((size) => (
//             <button
//               type="button"
//               key={size}
//               onClick={() => toggleSize(size)}
//               className={`px-4 py-2 border rounded transition-all min-w-[45px] ${
//                 gloveSizes.includes(size)
//                   ? "bg-emerald-500 text-white border-emerald-500"
//                   : "bg-white hover:bg-gray-50 border-gray-300"
//               }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//         {gloveSizes.length === 0 && (
//           <p className="text-xs text-red-500 mt-1">* يجب اختيار مقاس واحد على الأقل</p>
//         )}
//       </div>

//       {/* ✅ قسم الخصم */}
//       <div className="border-t pt-4 mt-2">
//         <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
//           <Percent className="w-5 h-5 text-emerald-500" />
//           خصم على المنتج (اختياري)
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* نسبة الخصم */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               نسبة الخصم %
//             </label>
//             <input
//               type="number"
//               value={discountPercentage}
//               onChange={(e) => setDiscountPercentage(e.target.value)}
//               placeholder="مثال: 10"
//               min="0"
//               max="100"
//               step="1"
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           {/* تاريخ البداية */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               تاريخ بداية الخصم
//             </label>
//             <input
//               type="datetime-local"
//               value={discountStart}
//               onChange={(e) => setDiscountStart(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           {/* تاريخ النهاية */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               تاريخ نهاية الخصم
//             </label>
//             <input
//               type="datetime-local"
//               value={discountEnd}
//               onChange={(e) => setDiscountEnd(e.target.value)}
//               className="border p-2 rounded w-full"
//               min={discountStart} // منع اختيار تاريخ قبل البداية
//             />
//           </div>
//         </div>

//         {/* عرض السعر بعد الخصم */}
//         {discountPercentage > 0 && price > 0 && (
//           <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
//             <p className="text-sm text-gray-600">
//               السعر بعد الخصم:{" "}
//               <span className="font-bold text-emerald-600">
//                 {(price - (price * discountPercentage / 100)).toFixed(2)}
//               </span>
//             </p>
//           </div>
//         )}
//       </div>

//       {/* الصور */}
//       <div>
//         <p className="font-medium mb-2">صور المنتج</p>
//         <div className="grid grid-cols-2 gap-2">
//           {images.map((img, idx) => (
//             <label
//               key={idx}
//               className="border h-24 flex items-center justify-center cursor-pointer overflow-hidden rounded hover:border-emerald-500 transition"
//             >
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={(e) => handleImageChange(e, idx)}
//               />
//               {img ? (
//                 <img
//                   src={URL.createObjectURL(img)}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <img src={assets.upload_area} alt="" className="w-10 opacity-50" />
//               )}
//             </label>
//           ))}
//         </div>
//         {images.every(img => img === null) && (
//           <p className="text-xs text-red-500 mt-1">* يجب إضافة صورة واحدة على الأقل</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={loading || gloveSizes.length === 0 || images.every(img => img === null)}
//         className={`py-2 rounded transition font-medium ${
//           loading || gloveSizes.length === 0 || images.every(img => img === null)
//             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//             : "bg-black text-white hover:bg-gray-800"
//         }`}
//       >
//         {loading ? "جاري الإضافة..." : "إضافة منتج القفازات 🧤"}
//       </button>
//     </form>
//   );
// };

// export default Addgloves;
// ===========================
// ===========================
// ===========================
// ===========================
// ===========================

import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { Calendar, Percent, TrendingDown } from "lucide-react";

const Addgloves = ({ token }) => {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [gloveSizes, setGloveSizes] = useState([]); // 🧤 مقاسات القفازات
  const [loading, setLoading] = useState(false);
  
  // حقول الخصم
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountStart, setDiscountStart] = useState("");
  const [discountEnd, setDiscountEnd] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // حساب السعر بعد الخصم تلقائياً
  useEffect(() => {
    if (discountPercentage > 0 && price > 0) {
      const calculatedFinal = price - (price * discountPercentage / 100);
      setFinalPrice(calculatedFinal.toFixed(2));
    } else {
      setFinalPrice(price);
    }
  }, [discountPercentage, price]);

  // اختيار الصور
  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  // اختيار / إلغاء المقاس
  const toggleSize = (size) => {
    setGloveSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("discription", discription);
      formData.append("price", price);
      formData.append("category", "gloves");

      // 🧤 إرسال المقاسات كمصفوفة JSON
      formData.append("gloveSizes", JSON.stringify(gloveSizes));

      // ✅ إضافة بيانات الخصم
      if (discountPercentage && discountPercentage > 0) {
        formData.append("discountPercentage", discountPercentage);
        formData.append("finalPrice", finalPrice);
        
        if (discountStart) {
          formData.append("discountStart", discountStart);
        }
        if (discountEnd) {
          formData.append("discountEnd", discountEnd);
        }
      } else {
        formData.append("discountPercentage", 0);
        formData.append("finalPrice", price);
      }

      // الصور
      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("تم إضافة منتج القفازات بنجاح 🧤");

        // Reset
        setName("");
        setDiscription("");
        setPrice("");
        setImages([null, null, null, null]);
        setGloveSizes([]);
        setDiscountPercentage("");
        setDiscountStart("");
        setDiscountEnd("");
        setFinalPrice("");
      } else {
        toast.error(res.data.message || "حدث خطأ");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 bg-white p-5 rounded shadow"
    >
      <h2 className="text-xl font-bold">🧤 إضافة منتج قفازات</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم المنتج"
        required
        className="border p-2 rounded"
      />

      <textarea
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
        placeholder="وصف المنتج"
        required
        rows="3"
        className="border p-2 rounded"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="السعر"
        required
        min="0"
        step="0.01"
        className="border p-2 rounded"
      />

      {/* 🧤 مقاسات القفازات */}
      <div>
        <p className="font-medium mb-2">مقاسات القفازات (5 - 11)</p>
        <div className="flex flex-wrap gap-2">
          {[5, 6, 7, 8, 9, 10, 11].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 border rounded transition-all min-w-[45px] ${
                gloveSizes.includes(size)
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {gloveSizes.length === 0 && (
          <p className="text-xs text-red-500 mt-1">* يجب اختيار مقاس واحد على الأقل</p>
        )}
      </div>

      {/* ✅ قسم الخصم المحسن */}
      <div className="border-t pt-4 mt-2">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Percent className="w-5 h-5 text-emerald-500" />
          خصم على المنتج (اختياري)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* نسبة الخصم */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نسبة الخصم %
            </label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="مثال: 10"
              min="0"
              max="100"
              step="1"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* تاريخ البداية */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              تاريخ بداية الخصم
            </label>
            <input
              type="datetime-local"
              value={discountStart}
              onChange={(e) => setDiscountStart(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* تاريخ النهاية */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              تاريخ نهاية الخصم
            </label>
            <input
              type="datetime-local"
              value={discountEnd}
              onChange={(e) => setDiscountEnd(e.target.value)}
              className="border p-2 rounded w-full"
              min={discountStart}
            />
          </div>
        </div>

        {/* عرض السعر بعد الخصم بشكل محسن */}
        {discountPercentage > 0 && price > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">السعر بعد الخصم:</span>
              </div>
              <div className="text-left">
                <span className="text-lg font-bold text-emerald-600">
                  {finalPrice} جنيه
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-200">
              <span className="text-xs text-gray-500">السعر الأصلي:</span>
              <span className="text-xs text-gray-400 line-through">{price} جنيه</span>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">نسبة التوفير:</span>
              <span className="text-xs font-medium text-red-500">
                {Math.round((price - finalPrice) / price * 100)}% (وفر {Math.round(price - finalPrice)} جنيه)
              </span>
            </div>

            {discountStart && discountEnd && (
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                ساري من {new Date(discountStart).toLocaleDateString('ar-EG')} إلى {new Date(discountEnd).toLocaleDateString('ar-EG')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* الصور */}
      <div>
        <p className="font-medium mb-2">صور المنتج</p>
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, idx) => (
            <label
              key={idx}
              className="border h-24 flex items-center justify-center cursor-pointer overflow-hidden rounded hover:border-emerald-500 transition"
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, idx)}
              />
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={assets.upload_area} alt="" className="w-10 opacity-50" />
              )}
            </label>
          ))}
        </div>
        {images.every(img => img === null) && (
          <p className="text-xs text-red-500 mt-1">* يجب إضافة صورة واحدة على الأقل</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || gloveSizes.length === 0 || images.every(img => img === null)}
        className={`py-2 rounded transition font-medium ${
          loading || gloveSizes.length === 0 || images.every(img => img === null)
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {loading ? "جاري الإضافة..." : "إضافة منتج القفازات 🧤"}
      </button>
    </form>
  );
};

export default Addgloves;