
// import React, { useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";
// import { assets } from "../../assets/assets";
// import { 
//   Upload, X, Plus, Package, DollarSign, 
//   Tag, Layers,  
// } from "lucide-react";

// const AddElectrical = ({ token }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [images, setImages] = useState([null, null, null, null]);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newImages = [...images];
//       newImages[index] = file;
//       setImages(newImages);
//     }
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImages(newImages);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (!name || !description || !price) {
//       toast.error("يرجى ملء جميع الحقول المطلوبة");
//       return;
//     }
//     if (price <= 0) {
//       toast.error("يجب أن يكون السعر أكبر من صفر");
//       return;
//     }
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("discription", description); // keep backend spelling
//       formData.append("price", price);
//       formData.append("category", "shoes");
// // console.log(formData.getAll());

//       images.forEach((img, idx) => {
//         if (img) formData.append(`image${idx + 1}`, img);
//       });

//       const res = await axios.post(backendUrl + "/api/product/add", formData, {
//         headers: { token },
//       });
// console.log(res.data);


//       if (res.data.success) {
//         toast.success("تم إضافة الحذاء الرياضي بنجاح");
//         setName("");
//         setDescription("");
//         setPrice("");
//         setImages([null, null, null, null]);
//         console.log(res.data);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <div className="w-full max-w-4xl mx-auto px-1 py-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-2 bg-emerald-100 rounded-lg">
//             {/* <Shoe className="w-6 h-6 text-emerald-600" /> */}
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             إضافة <span className="text-emerald-600">حذاء رياضي</span>
//           </h2>
//         </div>

//         <form onSubmit={submitHandler} className="space-y-8">
//           {/* Image Upload Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-blue-50 rounded-lg">
//                 <Upload className="w-4 h-4 text-blue-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">صور المنتج</p>
//               <span className="text-xs text-gray-500">(اختياري، حد أقصى 4 صور)</span>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[0, 1, 2, 3].map((index) => (
//                 <div key={index} className="relative group">
//                   {images[index] ? (
//                     <div className="relative rounded-xl border-2 border-gray-200 overflow-hidden aspect-square bg-gray-50">
//                       <img
//                         src={URL.createObjectURL(images[index])}
//                         alt={`product-${index}`}
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
//                       >
//                         <X className="w-4 h-4 text-red-500" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label
//                       htmlFor={`image-${index}`}
//                       className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition-all cursor-pointer aspect-square p-4"
//                     >
//                       <Plus className="w-8 h-8 text-gray-400" />
//                       <span className="text-xs text-gray-500 mt-2">إضافة صورة</span>
//                     </label>
//                   )}
//                   <input
//                     type="file"
//                     id={`image-${index}`}
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, index)}
//                     className="hidden"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Name */}
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-purple-50 rounded-lg">
//                 <Tag className="w-4 h-4 text-purple-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">اسم المنتج</p>
//             </div>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="أدخل اسم الحذاء"
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-amber-50 rounded-lg">
//                 <Layers className="w-4 h-4 text-amber-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">وصف المنتج</p>
//             </div>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="أدخل وصفاً مفصلاً للحذاء (المقاسات المتوفرة، الخامة، اللون...)"
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
//               required
//             />
//           </div>

//           {/* Price */}
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-emerald-50 rounded-lg">
//                 <DollarSign className="w-4 h-4 text-emerald-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">السعر</p>
//             </div>
//             <div className="relative max-w-xs">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
//                 EGP
//               </span>
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 placeholder="0.00"
//                 className="w-full px-4 py-3 pl-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`
//               w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 
//               text-white font-semibold rounded-xl shadow-lg 
//               hover:from-emerald-600 hover:to-emerald-700 
//               transition-all duration-300 active:scale-[0.98]
//               disabled:opacity-50 disabled:cursor-not-allowed
//               flex items-center justify-center gap-2
//             `}
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : (
//               <>
//                 <Plus className="w-5 h-5" />
//                 إضافة الحذاء
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddElectrical;
// =============================
// =============================
// =============================
// =============================
// =============================
// =============================
// import React, { useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";
// import { 
//   Upload, X, Plus, DollarSign, Tag, Layers
// } from "lucide-react";

// const AddElectrical = ({ token }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("shoes"); // افتراضياً أحذية
//   const [images, setImages] = useState([null, null, null, null]);
//   const [loading, setLoading] = useState(false);

//   // مقاسات حسب الأقسام
//   const [shoeSizes, setShoeSizes] = useState({
//     kids: [],
//     youth: [],
//     men: [],
//   });

//   // نطاق المقاسات
//   const sizeRanges = {
//     kids: [32, 35],
//     youth: [36, 40],
//     men: [41, 45],
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newImages = [...images];
//       newImages[index] = file;
//       setImages(newImages);
//     }
//   };
// const sectionArabic = {
//   kids: "أطفال",
//   youth: "شباب",
//   men: "رجالي",
// };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImages(newImages);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!name || !description || !price) {
//       toast.error("يرجى ملء جميع الحقول المطلوبة");
//       return;
//     }
//     if (price <= 0) {
//       toast.error("يجب أن يكون السعر أكبر من صفر");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("discription", description); // زي ما الباك مستني
//       formData.append("price", price);
//       formData.append("category", category);

//       // أرسل المقاسات لو المنتج حذاء
//       if (category === "shoes") {
//         formData.append("shoeSizes", JSON.stringify(shoeSizes));
//       }

//       // أضف الصور
//       images.forEach((img, idx) => {
//         if (img) formData.append(`image${idx + 1}`, img);
//       });

//       const res = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         {
//           headers: {
//             token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("تم إضافة الحذاء الرياضي بنجاح");
//         // إعادة تهيئة الحقول
//         setName("");
//         setDescription("");
//         setPrice("");
//         setImages([null, null, null, null]);
//         setShoeSizes({ kids: [], youth: [], men: [] });
//       }

//     } catch (err) {
//       toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto px-1 py-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-2 bg-emerald-100 rounded-lg" />
//           <h2 className="text-2xl font-bold text-gray-800">
//             إضافة <span className="text-emerald-600">حذاء رياضي</span>
//           </h2>
//         </div>

//         <form onSubmit={submitHandler} className="space-y-8">
          
//           {/* الصور */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-blue-50 rounded-lg">
//                 <Upload className="w-4 h-4 text-blue-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">صور المنتج</p>
//               <span className="text-xs text-gray-500">(حد أقصى 4 صور)</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {images.map((img, index) => (
//                 <div key={index} className="relative group">
//                   {img ? (
//                     <div className="relative rounded-xl border-2 border-gray-200 overflow-hidden aspect-square bg-gray-50">
//                       <img
//                         src={URL.createObjectURL(img)}
//                         alt={`product-${index}`}
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
//                       >
//                         <X className="w-4 h-4 text-red-500" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label
//                       htmlFor={`image-${index}`}
//                       className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition-all cursor-pointer aspect-square p-4"
//                     >
//                       <Plus className="w-8 h-8 text-gray-400" />
//                       <span className="text-xs text-gray-500 mt-2">إضافة صورة</span>
//                     </label>
//                   )}
//                   <input
//                     type="file"
//                     id={`image-${index}`}
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, index)}
//                     className="hidden"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* الاسم */}
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-gray-700">اسم الحذاء</p>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="أدخل اسم الحذاء"
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//               required
//             />
//           </div>

//           {/* الوصف */}
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-gray-700">وصف الحذاء</p>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="أدخل وصفاً مفصلاً للحذاء"
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
//               required
//             />
//           </div>

//           {/* السعر */}
//           <div className="space-y-2">
//             <p className="text-sm font-medium text-gray-700">السعر (EGP)</p>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="0.00"
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//               required
//             />
//           </div>

//           {/* المقاسات فقط لو shoes */}
//           {category === "shoes" && (
//             <div className="space-y-4">
//               {Object.keys(sizeRanges).map(section => (
//                 <div key={section}>
//                   <p className="font-medium capitalize"> {sectionArabic[section] || section}</p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {Array.from({length: sizeRanges[section][1] - sizeRanges[section][0] + 1}, (_, i) => sizeRanges[section][0] + i).map(size => (
//                       <button
//                         key={size}
//                         type="button"
//                         onClick={() => {
//                           setShoeSizes(prev => {
//                             const current = prev[section];
//                             return {
//                               ...prev,
//                               [section]: current.includes(size)
//                                 ? current.filter(s => s !== size)
//                                 : [...current, size],
//                             };
//                           });
//                         }}
//                         className={`px-3 py-1 rounded-lg border text-sm ${
//                           shoeSizes[section].includes(size)
//                             ? "bg-emerald-500 text-white"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* زر الإضافة */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 
//               text-white font-semibold rounded-xl shadow-lg 
//               hover:from-emerald-600 hover:to-emerald-700 
//               transition-all duration-300 active:scale-[0.98]
//               disabled:opacity-50 disabled:cursor-not-allowed
//               flex items-center justify-center gap-2`}
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : (
//               <>
//                 <Plus className="w-5 h-5" />
//                 إضافة الحذاء
//               </>
//             )}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddElectrical;
// =============================
// =============================
// =============================
// =============================
// =============================
// =============================
import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { 
  Upload, X, Plus, DollarSign, Tag, Layers, Percent, Calendar
} from "lucide-react";

const AddElectrical = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("shoes");
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  // حقول الخصم
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountStart, setDiscountStart] = useState("");
  const [discountEnd, setDiscountEnd] = useState("");

  // مقاسات حسب الأقسام
  const [shoeSizes, setShoeSizes] = useState({
    kids: [],
    youth: [],
    men: [],
  });

  // نطاق المقاسات
  const sizeRanges = {
    kids: [32, 35],
    youth: [36, 40],
    men: [41, 45],
  };

  const sectionArabic = {
    kids: "أطفال",
    youth: "شباب",
    men: "رجالي",
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    if (price <= 0) {
      toast.error("يجب أن يكون السعر أكبر من صفر");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("discription", description);
      formData.append("price", price);
      formData.append("category", category);

      // ✅ إضافة بيانات الخصم
      if (discountPercentage && discountPercentage > 0) {
        formData.append("discountPercentage", discountPercentage);
        
        // حساب السعر بعد الخصم
        const finalPrice = price - (price * discountPercentage / 100);
        formData.append("finalPrice", finalPrice.toFixed(2));
        
        // إضافة التواريخ إذا كانت موجودة
        if (discountStart) {
          formData.append("discountStart", discountStart);
        }
        if (discountEnd) {
          formData.append("discountEnd", discountEnd);
        }
      }

      // أرسل المقاسات للمنتج
      if (category === "shoes") {
        formData.append("shoeSizes", JSON.stringify(shoeSizes));
      }

      // أضف الصور
      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("تم إضافة الحذاء الرياضي بنجاح");
        // إعادة تهيئة الحقول
        setName("");
        setDescription("");
        setPrice("");
        setImages([null, null, null, null]);
        setShoeSizes({ kids: [], youth: [], men: [] });
        setDiscountPercentage("");
        setDiscountStart("");
        setDiscountEnd("");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-1 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 rounded-lg" />
          <h2 className="text-2xl font-bold text-gray-800">
            إضافة <span className="text-emerald-600">حذاء رياضي</span>
          </h2>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          
          {/* الصور */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Upload className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">صور المنتج</p>
              <span className="text-xs text-gray-500">(حد أقصى 4 صور)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  {img ? (
                    <div className="relative rounded-xl border-2 border-gray-200 overflow-hidden aspect-square bg-gray-50">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`product-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor={`image-${index}`}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition-all cursor-pointer aspect-square p-4"
                    >
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-2">إضافة صورة</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id={`image-${index}`}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* الاسم */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">اسم الحذاء</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم الحذاء"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* الوصف */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">وصف الحذاء</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصفاً مفصلاً للحذاء"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
              required
            />
          </div>

          {/* السعر */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">السعر (EGP)</p>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* ✅ قسم الخصم */}
          <div className="border-t pt-6 mt-2">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
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
                  placeholder="مثال: 15"
                  min="0"
                  max="100"
                  step="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
                  min={discountStart} // منع اختيار تاريخ قبل البداية
                />
              </div>
            </div>

            {/* عرض السعر بعد الخصم */}
            {discountPercentage > 0 && price > 0 && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-gray-600">
                  السعر بعد الخصم:{" "}
                  <span className="font-bold text-emerald-600 text-lg">
                    {(price - (price * discountPercentage / 100)).toFixed(2)} EGP
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  سيوفر العميل {((price * discountPercentage / 100)).toFixed(2)} EGP
                </p>
              </div>
            )}
          </div>

          {/* المقاسات */}
          {category === "shoes" && (
            <div className="space-y-4">
              {Object.keys(sizeRanges).map(section => (
                <div key={section}>
                  <p className="font-medium capitalize"> {sectionArabic[section] || section}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.from({length: sizeRanges[section][1] - sizeRanges[section][0] + 1}, (_, i) => sizeRanges[section][0] + i).map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setShoeSizes(prev => {
                            const current = prev[section];
                            return {
                              ...prev,
                              [section]: current.includes(size)
                                ? current.filter(s => s !== size)
                                : [...current, size],
                            };
                          });
                        }}
                        className={`px-3 py-1 rounded-lg border text-sm transition-all ${
                          shoeSizes[section].includes(size)
                            ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* زر الإضافة */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 
              text-white font-semibold rounded-xl shadow-lg 
              hover:from-emerald-600 hover:to-emerald-700 
              transition-all duration-300 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                إضافة الحذاء
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddElectrical;