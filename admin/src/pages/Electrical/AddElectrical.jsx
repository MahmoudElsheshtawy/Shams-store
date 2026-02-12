// import React, { useState } from "react";
// import axios from "axios";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";
// import { assets } from "../../assets/assets";

// const AddElectrical = ({ token }) => {
//   const [name, setName] = useState("");
//   const [discription, setDiscription] = useState("");
//   const [price, setPrice] = useState("");
//   const [images, setImages] = useState([null, null, null, null]);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e, index) => {
//     const newImages = [...images];
//     newImages[index] = e.target.files[0];
//     setImages(newImages);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("discription", discription);
//       formData.append("price", price);
//       formData.append("category", "shoes");

//       images.forEach((img, idx) => {
//         if (img) formData.append(`image${idx + 1}`, img);
//       });

//       const res = await axios.post(backendUrl + "/api/product/add", formData, {
//         headers: { token },
//       });

//       if (res.data.success) {
//         toast.success("shoes product added");
//         setName("");
//         setDiscription("");
//         setPrice("");
//         setImages([null, null, null, null]);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={submitHandler}
//       className="flex flex-col gap-4 border p-5 rounded-lg shadow-md bg-white"
//     >
//       <h2 className="text-xl font-bold">اضافه احذيه رياضيه</h2>

//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Product name"
//         className="border p-2 rounded"
//         required
//       />

//       <textarea
//         value={discription}
//         onChange={(e) => setDiscription(e.target.value)}
//         placeholder="Description"
//         className="border p-2 rounded"
//         required
//       />

//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         placeholder="Price"
//         className="border p-2 rounded"
//         required
//       />

//       <div className="grid grid-cols-2 gap-2">
//         {images.map((img, idx) => (
//           <label
//             key={idx}
//             className="relative cursor-pointer border rounded-lg overflow-hidden w-full h-24 flex justify-center items-center bg-gray-100"
//           >
//             <input
//               type="file"
//               className="hidden"
//               onChange={(e) => handleImageChange(e, idx)}
//             />
//             {img ? (
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt="preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <img src={assets.upload_area} alt="upload" className="w-12 h-12" />
//             )}
//           </label>
//         ))}
//       </div>

//       <button
//         disabled={loading}
//         className="bg-black text-white py-2 rounded mt-2"
//       >
//         {loading ? "Adding..." : "Add Product"}
//       </button>
//     </form>
//   );
// };

// export default AddElectrical;
import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { 
  Upload, X, Plus, Package, DollarSign, 
  Tag, Layers,  
} from "lucide-react";

const AddElectrical = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

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
      formData.append("discription", description); // keep backend spelling
      formData.append("price", price);
      formData.append("category", "shoes");

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("تم إضافة الحذاء الرياضي بنجاح");
        setName("");
        setDescription("");
        setPrice("");
        setImages([null, null, null, null]);
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 rounded-lg">
            {/* <Shoe className="w-6 h-6 text-emerald-600" /> */}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            إضافة <span className="text-emerald-600">حذاء رياضي</span>
          </h2>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Upload className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">صور المنتج</p>
              <span className="text-xs text-gray-500">(اختياري، حد أقصى 4 صور)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative group">
                  {images[index] ? (
                    <div className="relative rounded-xl border-2 border-gray-200 overflow-hidden aspect-square bg-gray-50">
                      <img
                        src={URL.createObjectURL(images[index])}
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

          {/* Product Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <Tag className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">اسم المنتج</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم الحذاء"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 rounded-lg">
                <Layers className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">وصف المنتج</p>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصفاً مفصلاً للحذاء (المقاسات المتوفرة، الخامة، اللون...)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-50 rounded-lg">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">السعر</p>
            </div>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                EGP
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 pl-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 
              text-white font-semibold rounded-xl shadow-lg 
              hover:from-emerald-600 hover:to-emerald-700 
              transition-all duration-300 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            `}
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