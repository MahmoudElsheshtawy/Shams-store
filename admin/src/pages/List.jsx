
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Edit, X, Check, Package, 
  Search, Loader2, AlertTriangle, ImageOff,
  Percent, Calendar, Clock, Save, MoreVertical,
  Upload, Plus
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

// مودال تعديل الخصم
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

// مودال تعديل المنتج كاملاً
const EditProductModal = ({ isOpen, onClose, product, token, onUpdate }) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.discription || "");
  const [category, setCategory] = useState(product?.category || "");
  const [subCategory, setSubCategory] = useState(product?.subCategory || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [sizes, setSizes] = useState(product?.sizes || []);
  const [shoeSizes, setShoeSizes] = useState(product?.shoeSizes || { kids: [], youth: [], men: [] });
  const [gloveSizes, setGloveSizes] = useState(product?.gloveSizes || []);
  const [bestseller, setBestseller] = useState(product?.bestseller || false);
  const [images, setImages] = useState(product?.image || []);
  const [newImages, setNewImages] = useState([null, null, null, null]);
  const [updating, setUpdating] = useState(false);

  // خيارات المقاسات
  const sizeOptions = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];
  const shoeSizeRanges = {
    kids: [32, 35],
    youth: [36, 40],
    men: [41, 45],
  };
  const gloveSizeOptions = [5, 6, 7, 8, 9, 10, 11];

  const sectionArabic = {
    kids: "أطفال",
    youth: "شباب",
    men: "رجالي",
  };

  if (!isOpen || !product) return null;

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImagesCopy = [...newImages];
      newImagesCopy[index] = file;
      setNewImages(newImagesCopy);
    }
  };

  const removeImage = (index) => {
    if (index < images.length) {
      // إزالة صورة قديمة
      const newImagesCopy = [...images];
      newImagesCopy.splice(index, 1);
      setImages(newImagesCopy);
    } else {
      // إزالة صورة جديدة
      const newImagesCopy = [...newImages];
      newImagesCopy[index - images.length] = null;
      setNewImages(newImagesCopy);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price) {
      return toast.error("الاسم والسعر مطلوبان");
    }

    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("id", product._id);
      formData.append("name", name);
      formData.append("discription", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      
      // المقاسات حسب نوع المنتج
      if (category === "shoes") {
        formData.append("shoeSizes", JSON.stringify(shoeSizes));
      } else if (category === "gloves") {
        formData.append("gloveSizes", JSON.stringify(gloveSizes));
      } else {
        formData.append("sizes", JSON.stringify(sizes));
      }

      // إضافة الصور القديمة (كمصفوفة JSON)
      formData.append("existingImages", JSON.stringify(images));

      // إضافة الصور الجديدة
      newImages.forEach((img, idx) => {
        if (img) formData.append(`newImage${idx + 1}`, img);
      });

      const res = await axios.put(
        `${backendUrl}/api/product/update`,
        formData,
        { 
          headers: { 
            token,
            "Content-Type": "multipart/form-data"
          } 
        }
      );

      if (res.data.success) {
        toast.success("تم تحديث المنتج بنجاح");
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Edit className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                تعديل المنتج
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            {/* الصور */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صور المنتج
              </label>
              
              {/* الصور الحالية */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {images.map((img, idx) => (
                  <div key={`old-${idx}`} className="relative group">
                    <img
                      src={img}
                      alt={`product-${idx}`}
                      className="w-full h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* إضافة صور جديدة */}
              <div className="grid grid-cols-4 gap-2">
                {newImages.map((img, idx) => (
                  <label
                    key={`new-${idx}`}
                    className="relative border-2 border-dashed border-gray-300 rounded-lg h-20 flex items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors"
                  >
                    {img ? (
                      <>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`new-${idx}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(images.length + idx)}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, idx)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* الاسم */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المنتج
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
                placeholder="اسم المنتج"
              />
            </div>

            {/* الوصف */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وصف المنتج
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
                placeholder="وصف المنتج"
              />
            </div>

            {/* الفئة والسعر */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الفئة
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
                >
                  <option value="Men">رجالي</option>
                  <option value="Women">نسائي</option>
                  <option value="Kids">أطفال</option>
                  <option value="shoes">أحذية</option>
                  <option value="gloves">قفازات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الفئة الفرعية
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="الفئة الفرعية"
                />
              </div>
            </div>

            {/* السعر */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {currency}
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* المقاسات حسب نوع المنتج */}
            {category === "shoes" && (
              <div className="space-y-4">
                {Object.keys(shoeSizeRanges).map(section => (
                  <div key={section}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {sectionArabic[section] || section}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(
                        { length: shoeSizeRanges[section][1] - shoeSizeRanges[section][0] + 1 },
                        (_, i) => shoeSizeRanges[section][0] + i
                      ).map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => {
                            setShoeSizes(prev => ({
                              ...prev,
                              [section]: prev[section].includes(size)
                                ? prev[section].filter(s => s !== size)
                                : [...prev[section], size]
                            }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                            shoeSizes[section].includes(size)
                              ? "bg-emerald-500 text-white border-emerald-500"
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

            {category === "gloves" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقاسات القفازات
                </label>
                <div className="flex flex-wrap gap-2">
                  {gloveSizeOptions.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setGloveSizes(prev =>
                          prev.includes(size)
                            ? prev.filter(s => s !== size)
                            : [...prev, size]
                        );
                      }}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        gloveSizes.includes(size)
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {category !== "shoes" && category !== "gloves" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المقاسات المتاحة
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSizes(prev =>
                          prev.includes(size)
                            ? prev.filter(s => s !== size)
                            : [...prev, size]
                        );
                      }}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        sizes.includes(size)
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bestseller */}
            <div className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="bestseller" className="text-sm font-medium text-gray-700">
                إضافة إلى قائمة الأكثر مبيعاً
              </label>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-3 pt-6 mt-4 border-t border-gray-200">
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
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
            >
              إلغاء
            </button>
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
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
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

// مكون صف المنتج - تصميم محسّن للهاتف
const ProductRow = ({ item, token, fetchList }) => {
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveProduct}
        productName={item.name || "هذا المنتج"}
      />
      
      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        product={item}
        token={token}
        onUpdate={fetchList}
      />

      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={item}
        token={token}
        onUpdate={fetchList}
      />
      
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* نسخة الموبايل المحسنة: تصميم بطاقة */}
        <div className="md:hidden p-3">
          {/* الصف العلوي: صورة + اسم + Badge الخصم */}
          <div className="flex items-start gap-3 mb-2">
            <ProductImage src={mainImage} alt={item.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
                  {item.name || "بدون اسم"}
                </h3>
                {discountActive && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full whitespace-nowrap">
                    -{item.discountPercentage}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[10px] text-gray-600">
                  {item.category || "غير مصنف"}
                </span>
                <span className="text-[10px] text-gray-400">ID: {item._id?.slice(-4)}</span>
              </div>
            </div>
          </div>

          {/* السعر والأزرار */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            {editMode ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="number"
                  step="0.01"
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
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
                <div className="flex-1">
                  {discountActive ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold text-emerald-600">
                          {item.finalPrice?.toFixed(2) || item.price?.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-500">{currency}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] text-gray-400 line-through">
                          {item.price?.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-400">{currency}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-gray-900">
                        {item.price?.toFixed(2) || "0.00"}
                      </span>
                      <span className="text-[10px] text-gray-500">{currency}</span>
                    </div>
                  )}
                </div>

                {/* أزرار الإجراءات للهاتف - بشكل أفقي */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                    title="تعديل المنتج"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowDiscountModal(true)}
                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                    title="تعديل الخصم"
                  >
                    <Percent className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditMode(true)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="تعديل السعر"
                  >
                    <span className="text-sm font-bold">$</span>
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

          {/* عرض تاريخ انتهاء الخصم للهاتف */}
          {discountActive && item.discountEnd && (
            <div className="flex items-center gap-1 mt-2 pt-2 text-[10px] text-gray-500 border-t border-gray-100">
              <Clock className="w-3 h-3" />
              <span>ينتهي: {new Date(item.discountEnd).toLocaleDateString('ar-EG')}</span>
            </div>
          )}
        </div>

        {/* نسخة الديسكتوب */}
        <div className="hidden md:flex items-center gap-6 p-4">
          {/* صورة المنتج */}
          <div className="flex-shrink-0">
            <ProductImage src={mainImage} alt={item.name} />
          </div>

          {/* معلومات المنتج */}
          <div className="flex-1 grid grid-cols-12 items-center gap-4">
            {/* الاسم + Badge الخصم */}
            <div className="col-span-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 text-base truncate" title={item.name}>
                  {item.name || "بدون اسم"}
                </p>
                {discountActive && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full whitespace-nowrap">
                    -{item.discountPercentage}%
                  </span>
                )}
              </div>
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
                <div>
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
              )}
            </div>

            {/* أزرار الإجراءات */}
            <div className="col-span-5 flex justify-end gap-2">
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
                    onClick={() => setShowEditModal(true)}
                    className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    title="تعديل المنتج"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden lg:inline">تعديل</span>
                  </button>
                  <button
                    onClick={() => setShowDiscountModal(true)}
                    className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    title="تعديل الخصم"
                  >
                    <Percent className="w-4 h-4" />
                    <span className="hidden lg:inline">الخصم</span>
                  </button>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    title="تعديل السعر"
                  >
                    <span className="text-lg font-bold">$</span>
                    <span className="hidden lg:inline">السعر</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium"
                    title="حذف المنتج"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden lg:inline">حذف</span>
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
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
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