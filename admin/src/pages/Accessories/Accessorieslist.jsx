import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Edit, X, Check, Percent, Calendar, Clock, Save,
  Loader2, ImageOff, AlertTriangle, Eye, ChevronDown, ChevronUp,
  Package, ShoppingBag, Tag, MoreVertical
} from "lucide-react";

// ----- مكون صورة المنتج مع Fallback -----
const ProductImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <ImageOff className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

// ----- مودال تأكيد الحذف -----
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
                حذف المنتج
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

// ----- Price Editor المحسّن للهاتف -----
const PriceEditor = ({ item, updatePrice }) => {
  const [edit, setEdit] = useState(false);
  const [price, setPrice] = useState(item.price);
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    if (!price || price <= 0) {
      return toast.error("يرجى إدخال سعر صحيح");
    }
    setUpdating(true);
    await updatePrice(item._id, Number(price));
    setEdit(false);
    setTimeout(() => setUpdating(false), 500);
  };

  return edit ? (
    <div className="flex items-center gap-1">
      <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
          {currency}
        </span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-20 px-2 py-1.5 pl-6 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
          autoFocus
        />
      </div>
      <button
        onClick={handleSave}
        disabled={updating}
        className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
        title="حفظ"
      >
        <Check className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setEdit(false)}
        className="p-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        title="إلغاء"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-1">
      {/* <div className="flex items-baseline gap-0.5"> */}
        {/* <span className="text-sm font-bold text-gray-900">
          {item.price?.toFixed(2) || ""}
        </span> */}
        {/* <span className="text-[8px] text-gray-500">{currency}</span> */}
      {/* </div> */}
      <button
        onClick={() => setEdit(true)}
        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        title="تعديل السعر"
      >
        <Edit className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// ----- مكون صف المنتج المحسّن للهاتف -----
const ProductRow = ({ item, token, onDelete, onUpdatePrice, onUpdate }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(item._id);
    setDeleting(false);
    setShowDeleteModal(false);
  };

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
        className="bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* تصميم موبايل محسّن */}
        <div className="md:hidden">
          {/* الصف الرئيسي */}
          <div className="p-3">
            <div className="flex items-start gap-2">
              <ProductImage src={item.image?.[0]} alt={item.name} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name || "بدون اسم"}</h3>
                    {/* <p className="text-xs text-gray-500 truncate">{item.subCategory || "غير مصنف"}</p> */}
                  </div>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* السعر مع الخصم */}
                <div className="mt-1">
                  {discountActive ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-emerald-600">
                          {item.finalPrice?.toFixed(2) || item.price?.toFixed(2)}
                        </span>
                        <span className="text-[8px] text-gray-500">{currency}</span>
                        <span className="px-1 py-0.5 bg-red-500 text-white text-[8px] rounded-full">
                          {item.discountPercentage}%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[8px] text-gray-400 line-through">
                          {item.price?.toFixed(2)}
                        </span>
                        <span className="text-[8px] text-gray-400">{currency}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-900">
                        {item.price?.toFixed(2) || "0.00"}
                      </span>
                      <span className="text-[8px] text-gray-500">{currency}</span>
                    </div>
                  )}
                </div>

                {/* أزرار الإجراءات الرئيسية */}
                <div className="flex items-center gap-1 mt-2">
                  <button
                    onClick={() => setShowDiscountModal(true)}
                    className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <Percent className="w-3.5 h-3.5" />
                    {/* خصم */}
                  </button>
                  <PriceEditor item={item} updatePrice={onUpdatePrice} />
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    disabled={deleting}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="حذف"
                  >
                    {deleting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* تفاصيل إضافية عند التوسيع */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-gray-100 bg-gray-50/50"
              >
                <div className="p-3 space-y-2">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.discription || "لا يوجد وصف للمنتج"}
                  </p>
                  
                  {discountActive && item.discountEnd && (
                    <div className="flex items-center gap-1 text-[10px] text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>ينتهي الخصم: {new Date(item.discountEnd).toLocaleDateString('ar-EG')}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* نسخة الديسكتوب (بدون تغيير) */}
        <div className="hidden md:flex items-center gap-6 p-4">
          <ProductImage src={item.image?.[0]} alt={item.name} />

          <div className="flex-1 grid grid-cols-12 items-center gap-4">
            {/* الاسم والفئة */}
            <div className="col-span-3">
              <p className="font-semibold text-gray-900 truncate" title={item.name}>
                {item.name || "بدون اسم"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {item.subCategory || "غير مصنف"}
              </p>
            </div>

            {/* السعر مع الخصم */}
            <div className="col-span-2">
              {discountActive ? (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-emerald-600">
                      {item.finalPrice?.toFixed(2) || item.price?.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">{currency}</span>
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      -{item.discountPercentage}%
                    </span>
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
            <div className="col-span-7 flex justify-end gap-2">
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
      </motion.div>
    </>
  );
};

// ----- مكون الهيكل العظمي للهاتف -----
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-3 animate-pulse">
    <div className="flex items-start gap-2">
      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-8 bg-gray-200 rounded flex-1"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// ----- المكون الرئيسي -----
const Accessorieslist = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/product/accessories`, {
        headers: { token },
      });
      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("فشل تحميل منتجات الاكسسوارات");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("تم حذف المنتج بنجاح");
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("فشل حذف المنتج");
      console.error(error);
    }
  };

  // Update price
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
    } catch (error) {
      toast.error("فشل تحديث السعر");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen" dir="rtl">
      {/* الهيدر المحسّن للهاتف */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            <span className="text-emerald-600">اكسسوارات</span>
          </h1>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {products.length}
          </span>
        </div>
      </div>

      {/* حالة التحميل */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">لا توجد منتجات</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto px-4">
            لم تقم بإضافة أي منتجات اكسسوارات بعد.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {products.map((item) => (
              <ProductRow
                key={item._id}
                item={item}
                token={token}
                onDelete={removeProduct}
                onUpdatePrice={updatePrice}
                onUpdate={fetchProducts}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Accessorieslist;