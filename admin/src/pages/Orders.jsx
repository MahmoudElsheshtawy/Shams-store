import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import {
  Package, User, MapPin, Phone, Calendar,
  CreditCard, Truck, CheckCircle, Clock,
  AlertCircle, ChevronDown, ChevronUp, Image as ImageIcon,
  CalendarDays, Hourglass
} from "lucide-react";

/* ---------- أدوات التاريخ ---------- */
const startOfDay = (ts) => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

const getTodayKey = () => startOfDay(Date.now());

const getYesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return startOfDay(d);
};

const dayLabel = (key) => {
  if (key === getTodayKey()) return "طلبات اليوم";
  if (key === getYesterdayKey()) return "طلبات أمس";
  return new Date(key).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* ---------- حماية من البيانات التالفة (items نص بدل Array) ---------- */
const normalizeItems = (items) => {
  let list = items;
  if (typeof list === "string") {
    try { list = JSON.parse(list); } catch { list = []; }
  }
  if (!Array.isArray(list)) return [];
  return list.flatMap((it) => {
    if (typeof it === "string") {
      try {
        const p = JSON.parse(it);
        return Array.isArray(p) ? p : [p];
      } catch { return []; }
    }
    return it && typeof it === "object" ? [it] : [];
  });
};

const normalizeAddress = (address) => {
  if (typeof address === "string") {
    try { return JSON.parse(address) || {}; } catch { return {}; }
  }
  return address && typeof address === "object" ? address : {};
};

/* ---------- الحالات ---------- */
const STATUS_AR = {
  "Order Placed": "تم الطلب",
  "Packing": "تجهيز",
  "Shipped": "تم الشحن",
  "Out for delivery": "خرج للتوصيل",
  "Delivered": "تم التوصيل",
};

const getStatusColor = (status) => {
  switch (status) {
    case "Order Placed": return "bg-blue-50 text-blue-700 border-blue-200";
    case "Packing": return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Shipped": return "bg-purple-50 text-purple-700 border-purple-200";
    case "Out for delivery": return "bg-orange-50 text-orange-700 border-orange-200";
    case "Delivered": return "bg-green-50 text-green-700 border-green-200";
    default: return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status) => {
  const cls = "w-4 h-4";
  switch (status) {
    case "Order Placed": return <Clock className={cls} />;
    case "Packing": return <Package className={cls} />;
    case "Shipped": return <Truck className={cls} />;
    case "Out for delivery": return <Truck className={cls} />;
    case "Delivered": return <CheckCircle className={cls} />;
    default: return <AlertCircle className={cls} />;
  }
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("all"); // all | today | yesterday | pending

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const list = [...response.data.orders].sort((a, b) => b.date - a.date);
        setOrders(list);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("✅ تم تحديث حالة الطلب");
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "فشل تحديث حالة الطلب");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  /* ---------- الإحصائيات ---------- */
  const stats = useMemo(() => {
    const today = getTodayKey();
    const yesterday = getYesterdayKey();
    const sum = (arr) => arr.reduce((t, o) => t + (Number(o.amount) || 0), 0);

    const todayOrders = orders.filter((o) => startOfDay(o.date) === today);
    const yesterdayOrders = orders.filter((o) => startOfDay(o.date) === yesterday);
    const pendingOrders = orders.filter((o) => o.status === "Order Placed");

    return {
      today: { count: todayOrders.length, total: sum(todayOrders) },
      yesterday: { count: yesterdayOrders.length, total: sum(yesterdayOrders) },
      pending: { count: pendingOrders.length },
    };
  }, [orders]);

  /* ---------- الفلترة والتجميع حسب اليوم ---------- */
  const groups = useMemo(() => {
    const today = getTodayKey();
    const yesterday = getYesterdayKey();

    const filtered = orders.filter((o) => {
      const key = startOfDay(o.date);
      if (filter === "today") return key === today;
      if (filter === "yesterday") return key === yesterday;
      if (filter === "pending") return o.status === "Order Placed";
      return true;
    });

    const map = new Map();
    filtered.forEach((o) => {
      const key = startOfDay(o.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(o);
    });

    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [orders, filter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-2 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const FILTERS = [
    { id: "all", label: "الكل", count: orders.length },
    { id: "today", label: "اليوم", count: stats.today.count },
    { id: "yesterday", label: "أمس", count: stats.yesterday.count },
    { id: "pending", label: "لم تتحرك", count: stats.pending.count },
  ];

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">الطلبات</h1>
        </div>
        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
          {orders.length} {orders.length === 1 ? "طلب" : "طلبات"}
        </span>
      </div>

      {/* ملخص سريع */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-white border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-lg">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">طلبات اليوم</p>
            <p className="text-lg font-bold text-gray-900">
              {stats.today.count}
              <span className="text-xs font-medium text-gray-500 mr-2">
               _{stats.today.total}_{ currency}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">طلبات أمس</p>
            <p className="text-lg font-bold text-gray-900">
              {stats.yesterday.count}
              <span className="text-xs font-medium text-gray-500 mr-2">
                __{stats.yesterday.total}_{currency}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white border border-amber-100 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-lg">
            <Hourglass className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">لم يتم تحريكها بعد</p>
            <p className="text-lg font-bold text-gray-900">{stats.pending.count}</p>
          </div>
        </div>
      </div>

      {/* أزرار الفلترة */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
              filter === f.id
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.label}
            <span
              className={`mr-2 px-1.5 py-0.5 rounded-full text-xs ${
                filter === f.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* القائمة */}
      {groups.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">لا توجد طلبات</h3>
          <p className="text-sm text-gray-500 px-4">لا يوجد طلبات تطابق هذا الفلتر</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map(([dayKey, dayOrders]) => {
            const dayPending = dayOrders.filter((o) => o.status === "Order Placed").length;
            const isToday = dayKey === getTodayKey();
            return (
              <section key={dayKey}>
                {/* عنوان اليوم */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className={`w-1.5 h-6 rounded-full ${isToday ? "bg-emerald-500" : "bg-gray-300"}`}></div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">{dayLabel(dayKey)}</h2>
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {dayOrders.length} {dayOrders.length === 1 ? "طلب" : "طلبات"}
                  </span>
                  {dayPending > 0 ? (
                    <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">
                      {dayPending} لم تتحرك
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                      كلها اتحركت ✓
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {dayOrders.map((order) => {
                    const items = normalizeItems(order.items);
                    const address = normalizeAddress(order.address);
                    const isExpanded = expandedOrder === order._id;
                    const visibleItems = isExpanded ? items : items.slice(0, 1);
                    const moved = order.status !== "Order Placed";
                    const isCash = order.paymentMethod === "تم الدفع كاش";

                    return (
                      <div
                        key={order._id}
                        className={`bg-white rounded-2xl border shadow-sm overflow-hidden border-r-4 ${
                          moved ? "border-gray-200 border-r-emerald-500" : "border-gray-200 border-r-amber-400"
                        }`}
                      >
                        {/* رأس الطلب */}
                        <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/70">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-sm text-gray-600">طلب رقم</span>
                              <span className="text-sm font-mono font-semibold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200">
                                #{order._id.slice(-6).toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(order.date).toLocaleTimeString("ar-EG", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              {/* هل تم تحريك الأوردر؟ */}
                              {moved ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  تم تحريكه
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                                  <Hourglass className="w-3.5 h-3.5" />
                                  لم يتحرك بعد
                                </span>
                              )}

                              <div
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getStatusColor(order.status)}`}
                              >
                                {getStatusIcon(order.status)}
                                <span className="text-xs font-medium whitespace-nowrap">
                                  {STATUS_AR[order.status] || order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* المحتوى */}
                        <div className="p-3 sm:p-5">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                            {/* العميل والعنوان والهاتف */}
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                                  <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-500 mb-0.5">العميل</p>
                                  <p className="font-semibold text-gray-900 break-words text-sm sm:text-base">
                                    {address.firstName} {address.lastName}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg shrink-0">
                                  <MapPin className="w-5 h-5 text-amber-600" />
                                </div>
                                <div className="min-w-0 flex-1 rounded-lg bg-amber-50/60 border border-amber-100 p-2.5">
                                  <p className="text-xs text-gray-500 mb-0.5">عنوان التوصيل</p>
                                  <p className="text-gray-700 break-words text-sm leading-relaxed">
                                    {address.street}
                                    {address.city && `, ${address.city}`}
                                    {address.state && `, ${address.state}`}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                                  <Phone className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="min-w-0 flex-1 rounded-lg bg-emerald-50/60 border border-emerald-100 p-2.5">
                                  <p className="text-xs text-gray-500 mb-0.5">رقم الهاتف</p>
                                  <p className="text-gray-900 font-medium break-words text-sm" dir="ltr" style={{ textAlign: "right" }}>
                                    {address.phone}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* المنتجات */}
                            <div className="rounded-xl bg-purple-50/50 border border-purple-100 p-3 sm:p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 bg-purple-100 rounded-lg">
                                    <Package className="w-4 h-4 text-purple-600" />
                                  </div>
                                  <p className="text-sm text-gray-600">المنتجات ({items.length})</p>
                                </div>
                                {items.length > 1 && (
                                  <button
                                    onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                                    className="p-1.5 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
                                    aria-label={isExpanded ? "عرض أقل" : "عرض المزيد"}
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="w-4 h-4 text-purple-700" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-purple-700" />
                                    )}
                                  </button>
                                )}
                              </div>

                              <div className="space-y-2">
                                {visibleItems.length === 0 && (
                                  <p className="text-xs text-gray-400 py-2">لا توجد بيانات منتجات</p>
                                )}
                                {visibleItems.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-100">
                                    <div className="w-12 h-12 rounded-md border border-gray-200 overflow-hidden bg-white shrink-0">
                                      <img
                                        src={Array.isArray(item.image) ? item.image[0] : item.image || "/placeholder.png"}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                        {item.size && (
                                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                            {item.size}
                                          </span>
                                        )}
                                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                          {item.quantity} قطعة
                                        </span>
                                      </div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                      {item.price} {currency}
                                    </span>
                                  </div>
                                ))}

                                {!isExpanded && items.length > 1 && (
                                  <button
                                    onClick={() => setExpandedOrder(order._id)}
                                    className="w-full text-center text-xs text-purple-700 hover:text-purple-800 py-1"
                                  >
                                    + {items.length - 1} منتج آخر
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* الدفع والتاريخ */}
                            <div className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-3 sm:p-4 space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
                                  <CreditCard className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs text-gray-500 mb-1">الدفع</p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={`inline-flex items-center font-bold px-2.5 py-1 rounded-full text-xs ${
                                        isCash ? "bg-green-100 text-green-700" : "bg-red-50 text-red-700"
                                      }`}
                                    >
                                      {isCash ? "مدفوع" : "غير مدفوع"}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {order.paymentMethod === "COD"
                                        ? "الدفع عند الاستلام"
                                        : order.paymentMethod}
                                    </span>
                                  </div>
                                  <p className="text-lg font-bold text-gray-900 mt-2">
                                    {order.amount} {currency}
                                  </p>

                                  {/* صورة إثبات التحويل */}
                                  {order.paymentProof && (
                                    <a
                                      href={order.paymentProof}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-3 flex items-center gap-2 bg-white border border-indigo-100 rounded-lg p-2 hover:border-indigo-300 transition-colors"
                                    >
                                      <img
                                        src={order.paymentProof}
                                        alt="إثبات الدفع"
                                        className="w-14 h-14 object-cover rounded-md border border-gray-200"
                                      />
                                      <span className="flex items-center gap-1 text-xs text-indigo-700 font-medium">
                                        <ImageIcon className="w-4 h-4" />
                                        عرض صورة التحويل
                                      </span>
                                    </a>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                                  <Calendar className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs text-gray-500 mb-0.5">تاريخ الطلب</p>
                                  <p className="text-gray-900 text-sm font-medium">
                                    {new Date(order.date).toLocaleDateString("ar-EG", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* تحديث الحالة */}
                        <div className="px-3 sm:px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-sm bg-slate-200 text-gray-700 rounded-lg px-3 py-2 whitespace-nowrap w-fit">
                            تحديث الحالة:
                          </span>
                          <select
                            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2.5 sm:py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                            value={order.status}
                            onChange={(e) => statusHandler(e, order._id)}
                            style={{ fontSize: "16px" }} /* لمنع التكبير التلقائي في iOS */
                          >
                            <option value="Order Placed">تم الطلب</option>
                            <option value="Packing">تجهيز</option>
                            <option value="Shipped">تم الشحن</option>
                            <option value="Out for delivery">خرج للتوصيل</option>
                            <option value="Delivered">تم التوصيل</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;