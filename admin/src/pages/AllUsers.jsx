import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, Mail, Calendar, Shield, 
  Trash2, AlertTriangle, X, Loader2, UserCheck,
  Phone, MapPin, ShoppingBag, Clock, Eye,
  ChevronDown, ChevronUp, ShoppingCart,
  Package, ImageOff
} from "lucide-react";

// مكون صورة المنتج مع Fallback
const ProductImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <ImageOff className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      )}
    </div>
  );
};

// مودال عرض تفاصيل المستخدم - محدث مع عرض السلة
const UserDetailsModal = ({ isOpen, onClose, user, products }) => {
  const [showCart, setShowCart] = useState(false);
  
  if (!isOpen || !user) return null;

  // حساب عدد العناصر في السلة
  const cartItemsCount = user.cartData ? Object.keys(user.cartData).length : 0;
  
  // الحصول على تفاصيل السلة مع بيانات المنتج
  const getCartDetails = () => {
    if (!user.cartData || Object.keys(user.cartData).length === 0) {
      return [];
    }
    
    const items = [];
    for (const productId in user.cartData) {
      // البحث عن المنتج في قائمة المنتجات
      const product = products?.find(p => p._id === productId);
      
      for (const size in user.cartData[productId]) {
        const quantity = user.cartData[productId][size];
        if (quantity > 0) {
          items.push({
            productId,
            size,
            quantity,
            productDetails: product || null
          });
        }
      }
    }
    return items;
  };

  const cartItems = getCartDetails();

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
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* الهيدر */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                تفاصيل المستخدم
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* المعلومات الأساسية - بدون حالة النشاط */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* الصورة الشخصية */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
                      {user.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-xl font-bold text-gray-900 truncate">{user.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1 sm:mt-2">
                    <span className="text-xs text-gray-500">
                      عضو منذ {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* المعلومات الشخصية - شبكة للموبايل */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {user.phone && (
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500">رقم الهاتف</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500">العنوان</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-500">تاريخ التسجيل</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
              </div>

              {user.lastLogin && (
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500">آخر تسجيل دخول</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      {new Date(user.lastLogin).toLocaleString('ar-EG')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* قسم السلة - محدث لعرض تفاصيل المنتج */}
            <div className="border-t border-gray-200 pt-3 sm:pt-4">
              <button
                onClick={() => setShowCart(!showCart)}
                className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">سلة التسوق</p>
                    <p className="text-xs text-gray-500">
                      {cartItemsCount} {cartItemsCount === 1 ? 'منتج' : 'منتجات'} في السلة
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 ${
                  showCart ? 'rotate-180' : ''
                }`} />
              </button>

              <AnimatePresence>
                {showCart && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {cartItems.length > 0 ? (
                      <div className="mt-3 space-y-3 max-h-96 overflow-y-auto">
                        {cartItems.map((item, idx) => (
                          <div
                            key={`${item.productId}-${item.size}`}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            {/* صورة المنتج */}
                            <ProductImage 
                              src={item.productDetails?.image?.[0]} 
                              alt={item.productDetails?.name || "منتج"} 
                            />
                            
                            {/* تفاصيل المنتج */}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate">
                                {item.productDetails?.name || `منتج: ${item.productId.slice(-6)}`}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-600">
                                  المقاس: {item.size}
                                </span>
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                  {item.quantity} {item.quantity === 1 ? 'قطعة' : 'قطع'}
                                </span>
                              </div>
                              {item.productDetails?.price && (
                                <p className="text-xs text-emerald-600 font-medium mt-1">
                                  {item.productDetails.price} جنيه
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 p-6 sm:p-8 bg-gray-50 rounded-lg text-center">
                        <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">السلة فارغة</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* زر إغلاق للموبايل */}
            <button
              onClick={onClose}
              className="w-full sm:hidden mt-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// مكون صف المستخدم - محدث (بدون حالة النشاط)
const UserRow = ({ user, onViewDetails }) => {
  const [expanded, setExpanded] = useState(false);

  // حساب عدد العناصر في السلة
  const cartItemsCount = user.cartData ? Object.keys(user.cartData).length : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* نسخة الموبايل المحسنة */}
      <div className="md:hidden">
        <div className="p-3">
          <div className="flex items-start gap-2">
            {/* الصورة */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center overflow-hidden border-2 border-white shadow flex-shrink-0">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-emerald-600">
                  {user.name?.charAt(0).toUpperCase() || '?'}
                </span>
              )}
            </div>

            {/* المعلومات */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
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
              
              {/* معلومات سريعة */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                </span>
              </div>

              {/* مؤشر السلة */}
              <div className="flex items-center gap-1 mt-1">
                <ShoppingCart className="w-3 h-3 text-emerald-600" />
                <span className="text-[10px] text-gray-600">
                  {cartItemsCount} {cartItemsCount === 1 ? 'منتج' : 'منتجات'} في السلة
                </span>
              </div>

              {/* زر عرض التفاصيل - دائم الظهور */}
              <button
                onClick={() => onViewDetails(user)}
                className="w-full mt-2 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-xs font-medium flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                عرض التفاصيل
              </button>

              {/* تفاصيل إضافية عند التوسيع */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 pt-2 border-t border-gray-100"
                  >
                    {user.phone && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Phone className="w-3 h-3" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.address && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{user.address}</span>
                      </div>
                    )}
                    {user.lastLogin && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>آخر دخول: {new Date(user.lastLogin).toLocaleDateString('ar-EG')}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* نسخة الديسكتوب - مبسطة */}
      <div className="hidden md:flex items-center p-4">
        {/* الصورة */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center overflow-hidden border-2 border-white shadow ml-4 flex-shrink-0">
          {user.profileImage ? (
            <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-emerald-600">
              {user.name?.charAt(0).toUpperCase() || '?'}
            </span>
          )}
        </div>

        {/* المعلومات */}
        <div className="flex-1 grid grid-cols-12 items-center gap-4">
          <div className="col-span-4">
            <p className="font-semibold text-gray-900 truncate" title={user.name}>{user.name}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate" title={user.email}>{user.email}</p>
          </div>

          <div className="col-span-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{new Date(user.createdAt).toLocaleDateString('ar-EG')}</span>
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              <span>{cartItemsCount} منتج</span>
            </div>
          </div>

          <div className="col-span-3 flex justify-end">
            <button
              onClick={() => onViewDetails(user)}
              className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// مكون الهيكل العظمي
const UserSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="flex gap-4">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

// المكون الرئيسي
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, newLastWeek: 0 });

  // جلب المستخدمين
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("غير مصرح به");
        return;
      }

      const res = await axios.get(`${backendUrl}/api/user/list`, {
        headers: { token }
      });
      
      if (res.data.success) {
        setUsers(res.data.users || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  // جلب المنتجات
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products || []);
      }
    } catch (err) {
      console.error("فشل تحميل المنتجات", err);
    }
  };

  // جلب الإحصائيات
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendUrl}/api/user/stats`, {
        headers: { token }
      });
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("فشل تحميل الإحصائيات", err);
    }
  };

  // عرض تفاصيل المستخدم
  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchStats();
  }, []);

  // فلترة المستخدمين حسب البحث
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حساب إجمالي المنتجات في السلة
  const totalCartItems = users.reduce((total, user) => {
    if (user.cartData) {
      return total + Object.keys(user.cartData).length;
    }
    return total;
  }, 0);

  return (
    <>
      <UserDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        user={selectedUser}
        products={products}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8"
      >
        {/* الهيدر - محسن للموبايل */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              جميع <span className="text-emerald-600">المستخدمين</span>
            </h1>
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
              {filteredUsers.length}
            </span>
          </div>

          {/* شريط البحث */}
          <div className="relative max-w-md w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-8 sm:pr-10 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* بطاقات الإحصائيات - شبكة متجاوبة */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">الإجمالي</p>
                  <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.total || users.length}</p>
                </div>
                <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">السلة</p>
                  <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">{totalCartItems}</p>
                </div>
                <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* حالة التحميل */}
        {loading ? (
          <div className="space-y-3 sm:space-y-4">
            {[...Array(5)].map((_, i) => (
              <UserSkeleton key={i} />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          // لا يوجد مستخدمين
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
              {searchTerm ? 'لا توجد نتائج للبحث' : 'لا يوجد مستخدمين'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto px-4">
              {searchTerm 
                ? 'لم نتمكن من العثور على مستخدم مطابق لبحثك. جرب كلمات أخرى.'
                : 'لم يسجل أي مستخدم بعد.'}
            </p>
          </div>
        ) : (
          // قائمة المستخدمين
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  onViewDetails={viewUserDetails}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AllUsers;