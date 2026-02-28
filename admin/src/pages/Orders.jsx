import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { 
  Package, User, MapPin, Phone, Calendar, 
  CreditCard, Truck, CheckCircle, Clock, 
  AlertCircle, ChevronDown, ChevronUp 
} from "lucide-react";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null); // للهاتف: عرض تفاصيل المنتجات عند النقر

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
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
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("✅ Order status updated");
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Packing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Out for delivery": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Delivered": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed": return <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Packing": return <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Shipped": return <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Out for delivery": return <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Delivered": return <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default: return <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-2 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }
  // console.log(orders);
  

  return (
    <div className=" sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto">
      {/* Header - متجاوب للهاتف */}
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">
            الطلبات
          </h1>
        </div>
        <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-l sm:text-sm font-medium">
          {orders.length} {orders.length === 1 ? 'طلب' : 'طلبات'}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl border border-gray-200">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">لا توجد طلبات</h3>
          <p className="text-xs sm:text-sm text-gray-500 px-4">عندما يضع العملاء طلبات، ستظهر هنا</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order._id;
            return (
              <div
                key={order._id}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* رأس الطلب - متجاوب للهاتف */}
                <div className="p-3  sm:p-5 border-b border-gray-100 bg-gray-50/80">
                  <div className="flex  flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-l sm:text-sm text-gray-900">طلب رقم</span>
                      <span className="text-xs sm:text-sm font-mono font-semibold text-gray-900 bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-gray-200">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-l font-medium whitespace-nowrap">
                        {order.status === "Order Placed" ? "تم الطلب" :
                         order.status === "Packing" ? "تجهيز" :
                         order.status === "Shipped" ? "تم الشحن" :
                         order.status === "Out for delivery" ? "خرج للتوصيل" :
                         order.status === "Delivered" ? "تم التوصيل" : order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* محتوى الطلب - تصميم عمودي متكامل للهاتف */}
                <div className="p-3 sm:p-5">
                  {/* صف سريع للهاتف: اسم العميل + المبلغ */}
                  <div className="flex items-center justify-between bg-blue-100 p-1 rounded-lg mb-3 sm:hidden">
                    <div className="flex items-center gap-2 ">
                      <div className="p-1.5 bg-blue-300 rounded-lg">
                        <User className="w-4 h-4 text-blue-600 " />
                      </div>
                      <span className="font-medium text-gray-700 text-sm">
                        {order.address.firstName} {order.address.lastName}
                      </span>
                    </div>
                    {/* <div className="font-bold text-gray-900">
                      {order.amount} {currency}
                    </div> */}
                  </div>

                  {/* شبكة المعلومات - عمودي في الهاتف، شبكي في الكمبيوتر */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* قسم العميل والعنوان */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* العميل - يظهر فقط في الشاشات المتوسطة فأكبر */}
                      <div className="hidden sm:flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg shrink-0 ">
                          <User className="w-5 h-5 text-blue-600 " />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-gray-500 mb-0.5">العميل</p>
                          <p className="font-semibold text-gray-900 break-words text-sm sm:text-base">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                        </div>
                      </div>
                      
                      {/* العنوان */}
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg shrink-0">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1 shadow-sm rounded-lg bg-amber-100 p-1 sm:p-3">
                          <p className="text-l sm:text-sm text-gray-500 mb-0.5">عنوان التوصيل</p>
                          <p className="text-gray-700 break-words text-xs sm:text-sm leading-relaxed">
                            {order.address.street}, {order.address.city}
                            {order.address.state && `, ${order.address.state}`}
                          </p>
                        </div>
                      </div>
                      
                      {/* الهاتف */}
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 sm:p-2 bg-emerald-50 rounded-lg shrink-0  bg-gradient-to-tr from-emerald-50 to-emerald-100">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 " />
                        </div>
                        <div className="min-w-0 flex-1 shadow-sm rounded-lg bg-emerald-100 p-1 sm:p-3">
                          <p className="text-l sm:text-sm text-gray-500 mb-0.5 ">رقم الهاتف</p>
                          <p className="text-gray-900 font-medium break-words text-xs sm:text-sm">
                            {order.address.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* قسم المنتجات - قابل للطي على الهاتف */}
                    <div className="lg:col-span-1 bg-purple-400/10 rounded-lg p-0.1 sm:p-5 ">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 sm:p-2 bg-purple-50 rounded-lg shrink-0 bg-gradient-to-tr from-purple-200 to-purple-200">
                          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-l sm:text-sm text-gray-500 mb-1 sm:mb-2">
                              المنتجات ({order.items.length})
                            </p>
                            {/* زر توسيع للهاتف */}
                            <button
                              onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                              className="lg:hidden p-1.5 bg-purple-300 rounded-lg active:bg-gray-100 transition-colors"
                              aria-label={isExpanded ? "عرض أقل" : "عرض المزيد"}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-600" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                              )}
                            </button>
                          </div>
                          
                          {/* عرض المنتجات - أول منتج فقط في الهاتف إذا كان مطويًا */}
                          <div className="space-y-2 bg-purple-200 rounded-lg p-1  sm:space-y-3">
                            {/* للهاتف: عرض منتج واحد فقط إذا كان مطويًا */}
                            {!isExpanded && (
                              <div className="lg:hidden flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                <div className="w-12 h-12 rounded-md border border-gray-200 overflow-hidden shrink-0">
                                  <img
                                    src={
                                      Array.isArray(order.items[0]?.image)
                                        ? order.items[0].image[0]
                                        : order.items[0]?.image || '/placeholder.png'
                                    }
                                    alt={order.items[0]?.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1    min-w-0">
                                  <p className=" text-gray-900 font-bold text-l truncate">
                                    {order.items[0]?.name}
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-2">
                                    {/* <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded"> */}
                                      {/* {order.items[0]?.size || 'N/A'} */}
                                    {/* </span> */}
                                    <span className="text-[12px] font-bold bg-gray-200 px-1.5 py-0.5 rounded">
                                      {order.items[0]?.quantity} _ قطعة
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs font-semibold text-gray-900">
                                  {order.items[0]?.price} {currency}
                                </span>
                              </div>
                            )}
                            
                            {/* عرض كل المنتجات (دائمًا على الشاشات الكبيرة، أو عند التوسيع على الهاتف) */}
                            {(isExpanded || window.innerWidth >= 1024) && (
                              <div className={`space-y-2 ${!isExpanded && 'hidden lg:block'}`}>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-2 sm:gap-3 bg-gray-50 p-2 sm:p-3 rounded-lg">
                                    <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-md border border-gray-200 overflow-hidden bg-white shrink-0">
                                      <img
                                        src={
                                          Array.isArray(item.image)
                                            ? item.image[0]
                                            : item.image || '/placeholder.png'
                                        }
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                        {item.name}
                                      </p>
                                      <div className="flex flex-wrap items-center gap-1 mt-0.5 sm:mt-1">
                                        <span className="text-[10px] sm:text-xs bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                          {item.size || 'N/A'}
                                        </span>
                                        <span className="text-[10px] sm:text-xs bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                          {item.quantity} قطعة
                                        </span>
                                      </div>
                                      <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">
                                        {item.price} {currency}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* رسالة إذا كان هناك أكثر من منتج ولم يتم التوسيع */}
                            {!isExpanded && order.items.length > 1 && (
                              <div className="lg:hidden text-center mt-2">
                                <span className="text-l  text-gray-500">
                                  + {order.items.length - 1} منتج آخر
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* قسم الدفع والتاريخ - يعاد ترتيبه للهاتف */}
                    <div className="space-y-3 bg-indigo-100  rounded-lg sm:space-y-4">
                      {/* الدفع */}
            {/* الدفع */}
<div className="flex items-start gap-3">
  <div className="p-1.5 sm:p-2 bg-indigo-50 rounded-lg shrink-0 bg-indigo-400/40">
    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
  </div>
  <div className="min-w-0 flex-1">
    <p className="text-l sm:text-sm text-gray-500 mb-0.5">الدفع</p>
    <div className="flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
        order.paymentMethod === 'تم الدفع كاش' 
          ? 'bg-green-100 text-green-700 text-[13px]  font-bold' 
          : 'bg-red-100 text-red-700'
      }`}>
        {order.paymentMethod === 'تم الدفع كاش' ? 'مدفوع' : 'غير مدفوع'}
      </span>
      <span className="text-l sm:text-sm text-gray-600">
        {order.paymentMethod === 'COD' ? 'الدفع عند الاستلام' : 
         order.paymentMethod === 'cash' ? 'تم الدفع كاش' : 
         order.paymentMethod}
      </span>
    </div>
    <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">
      {order.amount} {currency}
    </p>
  </div>
</div>
                      
                      {/* التاريخ */}
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 sm:p-2 bg-gray-300 rounded-lg shrink-0">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </div>
                        <div className="min-w-0 ">
                          <p className="text-l sm:text-sm text-gray-500 mb-0.5">تاريخ الطلب</p>
                          <p className="text-gray-900 bg-slate-50 p-2 rounded-lg text-xs sm:text-sm font-medium">
                            {new Date(order.date).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-gray-500 text-[20px] sm:text-xs">
                            {new Date(order.date).toLocaleTimeString('ar-EG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* تحديث الحالة - تصميم متجاوب للهاتف */}
                <div className="px-3 sm:px-5 py-3 sm:py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 w-full sm:w-auto">
                    <span className="text-l bg-slate-200 rounded-lg p-2 sm:text-sm text-gray-600 whitespace-nowrap">تحديث الحالة:</span>
                    <select
                      className="w-full xs:w-auto border border-gray-300 rounded-lg px-3 py-2.5 sm:py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white appearance-none"
                      value={order.status}
                      onChange={(e) => statusHandler(e, order._id)}
                      style={{ fontSize: '16px' }} /* لمنع التكبير التلقائي في iOS */
                    >
                      <option value="Order Placed">تم الطلب</option>
                      <option value="Packing">تجهيز</option>
                      <option value="Shipped">تم الشحن</option>
                      <option value="Out for delivery">خرج للتوصيل</option>
                      <option value="Delivered">تم التوصيل</option>
                    </select>
                  </div>
                  {/* <div className="text-[10px] sm:text-xs text-gray-400 truncate" dir="ltr"> */}
                    {/* ID: {order._id} */}
                  {/* </div> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;

            // <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
                    //  <img src={assets.parcel_icon} alt="" />
                    // <div>
                    //    <div>
                    //   {order.items.map((item,index)=>{
                    //     if (index === order.items.length -1) {
                    //       return <p key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                    //     }else{
                    //       return <p key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                       
                    //     }
                    //   })}
                    //  </div>
                    //  <p>{order.address.firstName + " " + order.address.lastName}</p>
                    //  <div>
                    //   <p>{order.address.street + "," }</p>
                    //   <p>{order.address.city + " , "  + order.address.state +" , " +order.address.country }</p>
                    //  </div>
                    //  <p>{order.address.phone}</p>
                    // </div>
                    // <div>
                    //   <p>Items : {order.items.length}</p>
                    //   <p>Method :{order.paymentMethod}</p>
                    //   <p>Payment :{order.payment ? 'Don': 'Pending'}</p>
                    //   <p>Date: {new Date(order.date).toUTCString()}</p>
                    //   <p></p>
                    // </div>
                    // <p className=" text-gray-900">({order.amount}) {currency}</p>
                    // <select className="">
                    //   <option value="Order Placed">Order Placed</option>
                    //   <option value="Packing">Packing</option>
                    //   <option value="Shipped">Shipped</option>
                    //   <option value="Out for delivry">Out for delivry</option>
                    //   <option value="Delivered">Delivered</option>
                    // </select>
                    // </div>