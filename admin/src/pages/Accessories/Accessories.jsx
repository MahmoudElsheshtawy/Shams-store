import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { Upload, X, Package, Tag, FileText, DollarSign } from "lucide-react";

const Accessories = ({ token }) => {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("discription", discription);
      formData.append("price", price);
      formData.append("category", "Accessories"); // ⭐ المهم

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("تم إضافة منتج الاكسسوارات بنجاح!");
        setName("");
        setDiscription("");
        setPrice("");
        setImages([null, null, null, null]);
      } else {
        toast.error(res.data.message || "حدث خطأ");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الإضافة");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6">
        {/* الهيدر */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            إضافة <span className="text-emerald-600">منتج اكسسوارات</span>
          </h2>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* حقل الاسم */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Tag className="w-4 h-4 text-gray-500" />
              اسم المنتج
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم المنتج"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
            />
          </div>

          {/* حقل الوصف */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4 text-gray-500" />
              وصف المنتج
            </label>
            <textarea
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="أدخل وصفاً مفصلاً للمنتج"
              required
              rows="3"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
            />
          </div>

          {/* حقل السعر */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4 text-gray-500" />
              السعر
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                EGP
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 pl-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* قسم الصور */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Upload className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">صور المنتج</p>
              <span className="text-xs text-gray-500">(اختياري، حد أقصى 4)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative">
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
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor={`image-${index}`}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition-all cursor-pointer aspect-square p-2"
                    >
                      <img src={assets.upload_area} alt="upload" className="w-8 opacity-50" />
                      <span className="text-xs text-gray-500 mt-1">إضافة صورة</span>
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

          {/* زر الإضافة */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري الإضافة...
              </div>
            ) : (
              "إضافة منتج اكسسوارات"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Accessories;