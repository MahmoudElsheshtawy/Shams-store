// import React from "react";
// import Title from "../components/Title";
// import { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Orders = () => {
//   const { backendUrl,token, currency } = useContext(ShopContext);
//   const [orderData,setOrderData]= useState([])
//   const loadOrderData =async ()=>{
//     try {
//       if (!token) {
//         return null 
//       }
//       const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
//       // console.log(response.data);
    
//       if (response.data.success) {
//         let allOrdersItem = []
//         response.data.orders.map((order)=>{
//          order.items.map((item)=>{
//         item['status'] =order.status
//         item['payment'] =order.payment
//         item['paymentMethod'] =order.paymentMethod
//         item['date']=order.date
//       //  const sss= item['image']=order.items[0].image
//       //  console.log(sss);
       
//         allOrdersItem.push(item)
//          })
//         })
    
//         setOrderData(allOrdersItem.reverse());
        
        
//       }
      
//     } catch (error) {
//          console.log(error);
//         toast({ message:error.message})
//     }
//   }
//   useEffect(()=>{
// loadOrderData()
//   },[token])
//   return (
//     <div className="border-t pt-10 px-4 md:px-10 bg-gray-50 min-h-screen">
//   {/* Title */}
//   <div className="text-center mb-10">
//     <h2 className="text-3xl md:text-4xl font-semibold tracking-wide">
//       <span className="text-gray-800">MY</span>{" "}
//       <span className="text-blue-600">ORDERS</span>
//     </h2>
//     <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
//   </div>

//   {/* Orders List */}
//   <div className="space-y-6">
//     {orderData.map((items, index) => (
//       <div
//         key={index}
//         className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//       >
//         {/* Left Section: Image + Info */}
//         <div className="flex flex-col sm:flex-row sm:items-start gap-4 w-full md:w-3/5">
//           {/* <img
//             className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
//             src={items.image[0]}
//             // src={items.image && items.image.length > 0 ? items.image[0]:'/placeholder.png'}
//             alt={items.name}
//           /> */}
//           <img
//               className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
//               src={
//                 Array.isArray(items.image)
//                   ? items.image[0]
//                   : items.image || '/placeholder.png'
//               }
//               alt={items.name}
//           />
//           <div className="flex-1">
//             <p className="text-lg font-semibold text-gray-800">{items.name}</p>
//             <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
//               <p className="font-medium text-gray-900">
//                 {items.price}
//                 {currency}
//               </p>
//               <p className="text-sm">Qty: {items.quantity}</p>
//               <p className="text-sm">Size: {items.size}</p>
//             </div>
//             <div className="mt-3 space-y-1 text-sm text-gray-500">
//               <p>
//                 <span className="font-medium text-gray-700">Date:</span>{" "}
//                 {new Date(items.date).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">Payment:</span>{" "}
//                 {items.paymentMethod}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section: Status + Button */}
//         <div className="flex md:flex-col items-center justify-between gap-3 md:gap-2 w-full md:w-1/3">
//           <div className="flex items-center gap-2">
//             <span
//               className={`inline-block w-3 h-3 rounded-full ${
//                 items.status === "Delivered"
//                   ? "bg-green-500"
//                   : items.status === "Processing"
//                   ? "bg-yellow-500"
//                   : "bg-gray-400"
//               }`}
//             ></span>
//             <p className="text-sm font-medium text-gray-700">{items.status}</p>
//           </div>

//           <button
//             onClick={loadOrderData}
//             className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300"
//           >
//             Track Order
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//     // <div className="border-t pt-16">
//     //   {/* 1 */}
//     //   <div className="text-2xl">
//     //     <Title text1={"MY"} text2={"ORDERS"} />
//     //   </div>
//     //   {/* 2 */}
//     //   <div>
//     //     {orderData.map((item, index) => (
//     //       <div
//     //         key={index}
//     //         className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//     //       >
//     //         <div className="flex items-start gap-6 text-sm">
//     //          <img className="w-15 sm:w-20" src={item.image[0]} alt="" />
//     //          <div>
//     //           <p className="sm:text-base font-medium">{item.name}</p>
//     //           <div className=" flex items-center gap-3 mt-1 text-base text-gray-700">
//     //              <p>{item.price}{currency}</p>
//     //              <p>Quantity: {item.quantity}</p>
//     //              <p>Size: {item.size}</p>
//     //           </div>
//     //                <p className="mt-1">Date: <span className=" text-gray-400">{new Date(item.date).toUTCString()}</span></p>
//     //               <p className="mt-1">Payment: <span className=" text-gray-400">{item.paymentMethod}</span></p>
//     //          </div>
            
            


//     //         </div>
          
//     //           <div className="md:w-1/2 flex justify-between">
//     //               <div className="flex items-center gap-2">
//     //               <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//     //               <p className="text-sm md:text-base">{item.status}</p>
//     //               </div>
//     //                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
//     //               </div>

//     //         </div>
         
//     //     ))}
//     //   </div>


//     // </div>
//   );
// };

// export default Orders;
// ===============
// ===============
// ===============
// ===============
// ===============
// ===============
// ===============
// import React, { useContext, useState, useEffect } from "react";
// import Title from "../components/Title";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { 
//   Package, Calendar, CreditCard, Truck, 
//   CheckCircle, Clock, MapPin, Phone, 
//   ChevronRight, ShoppingBag, AlertCircle,
//   ArrowLeft
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const loadOrderData = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/userorders',
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             item['orderId'] = order._id;
//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message || "حدث خطأ في تحميل الطلبات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Delivered": return "bg-green-100 text-green-700 border-green-200";
//       case "Out for delivery": return "bg-orange-100 text-orange-700 border-orange-200";
//       case "Shipped": return "bg-purple-100 text-purple-700 border-purple-200";
//       case "Packing": return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       case "Order Placed": return "bg-blue-100 text-blue-700 border-blue-200";
//       default: return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Delivered": return <CheckCircle className="w-4 h-4" />;
//       case "Out for delivery": return <Truck className="w-4 h-4" />;
//       case "Shipped": return <Truck className="w-4 h-4" />;
//       case "Packing": return <Package className="w-4 h-4" />;
//       case "Order Placed": return <Clock className="w-4 h-4" />;
//       default: return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       day: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' }),
//       time: date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
//     };
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100
//       }
//     }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: -30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 15,
//         stiffness: 100,
//         delay: 0.2
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
//       >
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="w-16 h-16 mx-auto mb-4 relative"
//           >
//             <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
//             <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent"></div>
//           </motion.div>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-gray-600 font-medium"
//           >
//             جاري تحميل طلباتك...
//           </motion.p>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header with animation */}
//         <motion.div
//           variants={headerVariants}
//           initial="hidden"
//           animate="visible"
//           className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 sticky top-0 z-10"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg"
//               >
//                 <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </motion.div>
//               <div>
//                 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
//                   طلباتي
//                 </h1>
//                 <motion.p 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1"
//                 >
//                   لديك {orderData.length} {orderData.length === 1 ? 'طلب' : 'طلبات'}
//                 </motion.p>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ rotate: 180, scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={loadOrderData}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               title="تحديث"
//             >
//               <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Orders List with stagger animation */}
//         {orderData.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring", damping: 15 }}
//             className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center"
//           >
//             <motion.div
//               animate={{ 
//                 y: [0, -10, 0],
//                 rotate: [0, 5, -5, 0]
//               }}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//               className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
//             >
//               <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
//             </motion.div>
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">لا توجد طلبات</h3>
//             <p className="text-sm sm:text-base text-gray-500 mb-6">لم تقم بطلب أي منتجات بعد</p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base"
//             >
//               تسوق الآن
//             </motion.button>
//           </motion.div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-4 sm:space-y-6"
//           >
//             <AnimatePresence>
//               {orderData.map((item, index) => {
//                 const date = formatDate(item.date);
//                 const isExpanded = expandedOrder === `${item.orderId}-${item._id}`;
                
//                 return (
//                   <motion.div
//                     key={`${item.orderId}-${item._id}-${index}`}
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit={{ opacity: 0, y: -20 }}
//                     whileHover={{ y: -2 }}
//                     layout
//                     className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
//                   >
//                     {/* Mobile Optimized Layout */}
//                     <div className="md:hidden">
//                       {/* Order Header - Always Visible */}
//                       <div 
//                         onClick={() => setExpandedOrder(isExpanded ? null : `${item.orderId}-${item._id}`)}
//                         className="p-4 cursor-pointer active:bg-gray-50/50 transition-colors"
//                       >
//                         <div className="flex items-start gap-3">
//                           {/* Product Image with Animation */}
//                           <motion.div 
//                             whileHover={{ scale: 1.05 }}
//                             className="relative"
//                           >
//                             <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border border-gray-200 shadow-sm">
//                               <img
//                                 src={
//                                   Array.isArray(item.image)
//                                     ? item.image[0]
//                                     : item.image || '/placeholder.png'
//                                 }
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                               />
//                             </div>
//                             {item.size && (
//                               <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded-full shadow-md">
//                                 {item.size}
//                               </span>
//                             )}
//                           </motion.div>

//                           {/* Quick Info */}
//                           <div className="flex-1">
//                             <div className="flex items-start justify-between">
//                               <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1 ml-2">
//                                 {item.name}
//                               </h3>
//                               <motion.div
//                                 animate={{ rotate: isExpanded ? 90 : 0 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                               </motion.div>
//                             </div>
                            
//                             <div className="flex items-center justify-between mt-2">
//                               <div className="flex items-baseline gap-1">
//                                 <span className="text-base font-bold text-emerald-600">
//                                   {item.price}
//                                 </span>
//                                 <span className="text-[10px] text-gray-500">{currency}</span>
//                               </div>
//                               <span className="text-xs text-gray-500">
//                                 × {item.quantity}
//                               </span>
//                             </div>

//                             <div className="flex items-center justify-between mt-2">
//                               <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${getStatusColor(item.status)}`}>
//                                 {getStatusIcon(item.status)}
//                                 {item.status === "Delivered" ? "تم التوصيل" :
//                                  item.status === "Out for delivery" ? "خرج للتوصيل" :
//                                  item.status === "Shipped" ? "تم الشحن" :
//                                  item.status === "Packing" ? "تجهيز" :
//                                  item.status === "Order Placed" ? "تم الطلب" : item.status}
//                               </span>
//                               <span className="text-[10px] text-gray-500">
//                                 {date.day}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Expanded Details with Animation */}
//                       <AnimatePresence>
//                         {isExpanded && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="border-t border-gray-100 bg-gray-50/50"
//                           >
//                             <div className="p-4 space-y-3">
//                               {/* Payment Details */}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <CreditCard className="w-4 h-4 text-gray-500" />
//                                   <span className="text-xs text-gray-600">طريقة الدفع:</span>
//                                 </div>
//                                 <span className="text-xs font-medium text-gray-800">
//                                   {item.paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
//                                    item.paymentMethod === 'cash' ? 'فودافون كاش' :
//                                    item.paymentMethod}
//                                 </span>
//                               </div>

//                               {/* Order ID */}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <Package className="w-4 h-4 text-gray-500" />
//                                   <span className="text-xs text-gray-600">رقم الطلب:</span>
//                                 </div>
//                                 <span className="text-xs font-mono text-gray-800">
//                                   #{item.orderId?.slice(-6).toUpperCase()}
//                                 </span>
//                               </div>

//                               {/* Time */}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <Clock className="w-4 h-4 text-gray-500" />
//                                   <span className="text-xs text-gray-600">وقت الطلب:</span>
//                                 </div>
//                                 <span className="text-xs text-gray-800">
//                                   {date.time}
//                                 </span>
//                               </div>

//                               {/* Track Button */}
//                               <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={loadOrderData}
//                                 className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-xs font-medium flex items-center justify-center gap-2 shadow-md"
//                               >
//                                 <span>تتبع الطلب</span>
//                                 <ArrowLeft className="w-3.5 h-3.5" />
//                               </motion.button>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* Desktop Layout (unchanged but with animations) */}
//                     <div className="hidden md:flex items-center p-6">
//                       <motion.div 
//                         whileHover={{ scale: 1.05 }}
//                         className="flex-shrink-0 ml-6"
//                       >
//                         <div className="relative">
//                           <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border border-gray-200 shadow-sm">
//                             <img
//                               src={
//                                 Array.isArray(item.image)
//                                   ? item.image[0]
//                                   : item.image || '/placeholder.png'
//                               }
//                               alt={item.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           {item.size && (
//                             <span className="absolute -top-2 -right-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-full shadow-md">
//                               {item.size}
//                             </span>
//                           )}
//                         </div>
//                       </motion.div>

//                       <div className="flex-1 grid grid-cols-4 gap-6">
//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">المنتج</p>
//                           <h3 className="font-semibold text-gray-900 text-base mb-2">
//                             {item.name}
//                           </h3>
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600">
//                               الكمية: {item.quantity}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">السعر</p>
//                           <div className="flex items-baseline gap-1">
//                             <span className="text-xl font-bold text-emerald-600">
//                               {item.price}
//                             </span>
//                             <span className="text-xs text-gray-500">{currency}</span>
//                           </div>
//                         </div>

//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">التفاصيل</p>
//                           <div className="space-y-2">
//                             <div className="flex items-center gap-2 text-xs text-gray-600">
//                               <Calendar className="w-3.5 h-3.5" />
//                               <span>{date.day}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-xs text-gray-600">
//                               <CreditCard className="w-3.5 h-3.5" />
//                               <span>
//                                 {item.paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
//                                  item.paymentMethod === 'cash' ? 'فودافون كاش' :
//                                  item.paymentMethod}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">الحالة</p>
//                           <div className="flex flex-col items-end gap-3">
//                             <motion.span 
//                               whileHover={{ scale: 1.05 }}
//                               className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(item.status)}`}
//                             >
//                               {getStatusIcon(item.status)}
//                               {item.status === "Delivered" ? "تم التوصيل" :
//                                item.status === "Out for delivery" ? "خرج للتوصيل" :
//                                item.status === "Shipped" ? "تم الشحن" :
//                                item.status === "Packing" ? "جاري التجهيز" :
//                                item.status === "Order Placed" ? "تم الطلب" : item.status}
//                             </motion.span>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={loadOrderData}
//                               className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
//                             >
//                               <span>تتبع الطلب</span>
//                               <ChevronRight className="w-4 h-4" />
//                             </motion.button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Orders;
// ===============
// ===============
// ===============
// ===============
// import React, { useContext, useState, useEffect } from "react";
// import Title from "../components/Title";
// import { ShopContext } from "../context/ShopContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { 
//   Package, Calendar, CreditCard, Truck, 
//   CheckCircle, Clock, MapPin, Phone, 
//   ChevronRight, ShoppingBag, AlertCircle,
//   ArrowLeft
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const loadOrderData = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/userorders',
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             item['orderId'] = order._id;
//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message || "حدث خطأ في تحميل الطلبات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   // دالة مساعدة للحصول على السعر (مع مراعاة الخصم)
//   const getItemPrice = (item) => {
//     // إذا كان في السعر بعد الخصم في البيانات، استخدمه
//     if (item.finalPrice && item.finalPrice < item.price) {
//       return item.finalPrice;
//     }
//     return item.price;
//   };

//   // دالة للتحقق من وجود خصم
//   const hasDiscount = (item) => {
//     return item.discountPercentage > 0 && item.finalPrice && item.finalPrice < item.price;
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Delivered": return "bg-green-100 text-green-700 border-green-200";
//       case "Out for delivery": return "bg-orange-100 text-orange-700 border-orange-200";
//       case "Shipped": return "bg-purple-100 text-purple-700 border-purple-200";
//       case "Packing": return "bg-yellow-100 text-yellow-700 border-yellow-200";
//       case "Order Placed": return "bg-blue-100 text-blue-700 border-blue-200";
//       default: return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Delivered": return <CheckCircle className="w-4 h-4" />;
//       case "Out for delivery": return <Truck className="w-4 h-4" />;
//       case "Shipped": return <Truck className="w-4 h-4" />;
//       case "Packing": return <Package className="w-4 h-4" />;
//       case "Order Placed": return <Clock className="w-4 h-4" />;
//       default: return <AlertCircle className="w-4 h-4" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       day: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' }),
//       time: date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
//     };
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100
//       }
//     }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: -30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 15,
//         stiffness: 100,
//         delay: 0.2
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
//       >
//         <div className="text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="w-16 h-16 mx-auto mb-4 relative"
//           >
//             <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
//             <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent"></div>
//           </motion.div>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-gray-600 font-medium"
//           >
//             جاري تحميل طلباتك...
//           </motion.p>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header with animation */}
//         <motion.div
//           variants={headerVariants}
//           initial="hidden"
//           animate="visible"
//           className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 sticky top-0 z-10"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg"
//               >
//                 <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </motion.div>
//               <div>
//                 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
//                   طلباتي
//                 </h1>
//                 <motion.p 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1"
//                 >
//                   لديك {orderData.length} {orderData.length === 1 ? 'طلب' : 'طلبات'}
//                 </motion.p>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ rotate: 180, scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={loadOrderData}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               title="تحديث"
//             >
//               <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Orders List with stagger animation */}
//         {orderData.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring", damping: 15 }}
//             className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center"
//           >
//             <motion.div
//               animate={{ 
//                 y: [0, -10, 0],
//                 rotate: [0, 5, -5, 0]
//               }}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//               className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
//             >
//               <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
//             </motion.div>
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">لا توجد طلبات</h3>
//             <p className="text-sm sm:text-base text-gray-500 mb-6">لم تقم بطلب أي منتجات بعد</p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base"
//             >
//               تسوق الآن
//             </motion.button>
//           </motion.div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-4 sm:space-y-6"
//           >
//             <AnimatePresence>
//               {orderData.map((item, index) => {
//                 const date = formatDate(item.date);
//                 const isExpanded = expandedOrder === `${item.orderId}-${item._id}`;
//                 const itemFinalPrice = getItemPrice(item);
//                 const itemHasDiscount = hasDiscount(item);
                
//                 return (
//                   <motion.div
//                     key={`${item.orderId}-${item._id}-${index}`}
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit={{ opacity: 0, y: -20 }}
//                     whileHover={{ y: -2 }}
//                     layout
//                     className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
//                   >
//                     {/* Mobile Optimized Layout */}
//                     <div className="md:hidden">
//                       {/* Order Header - Always Visible */}
//                       <div 
//                         onClick={() => setExpandedOrder(isExpanded ? null : `${item.orderId}-${item._id}`)}
//                         className="p-4 cursor-pointer active:bg-gray-50/50 transition-colors"
//                       >
//                         <div className="flex items-start gap-3">
//                           {/* Product Image with Animation */}
//                           <motion.div 
//                             whileHover={{ scale: 1.05 }}
//                             className="relative"
//                           >
//                             <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border border-gray-200 shadow-sm">
//                               <img
//                                 src={
//                                   Array.isArray(item.image)
//                                     ? item.image[0]
//                                     : item.image || '/placeholder.png'
//                                 }
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                               />
//                             </div>
//                             {item.size && (
//                               <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded-full shadow-md">
//                                 {item.size}
//                               </span>
//                             )}
//                             {/* Badge خصم للهاتف */}
//                             {itemHasDiscount && (
//                               <span className="absolute -bottom-1 -left-1 px-1.5 py-0.5 bg-red-500 text-white text-[8px] rounded-full">
//                                 -{item.discountPercentage}%
//                               </span>
//                             )}
//                           </motion.div>

//                           {/* Quick Info */}
//                           <div className="flex-1">
//                             <div className="flex items-start justify-between">
//                               <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1 ml-2">
//                                 {item.name}
//                               </h3>
//                               <motion.div
//                                 animate={{ rotate: isExpanded ? 90 : 0 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                               </motion.div>
//                             </div>
                            
//                             <div className="flex items-center justify-between mt-2">
//                               <div className="flex items-baseline gap-1">
//                                 <span className="text-base font-bold text-emerald-600">
//                                   {itemFinalPrice}
//                                 </span>
//                                 <span className="text-[10px] text-gray-500">{currency}</span>
//                               </div>
//                               <span className="text-xs text-gray-500">
//                                 × {item.quantity}
//                               </span>
//                             </div>

//                             {/* عرض السعر الأصلي إذا كان في خصم */}
//                             {itemHasDiscount && (
//                               <div className="flex items-center gap-1 mt-1">
//                                 <span className="text-[10px] text-gray-400 line-through">
//                                   {item.price}
//                                 </span>
//                                 <span className="text-[10px] text-gray-400">{currency}</span>
//                                 <span className="text-[10px] text-red-500">
//                                   ( {item.discountPercentage}% وفر)
//                                 </span>
//                               </div>
//                             )}

//                             <div className="flex items-center justify-between mt-2">
//                               <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${getStatusColor(item.status)}`}>
//                                 {getStatusIcon(item.status)}
//                                 {item.status === "Delivered" ? "تم التوصيل" :
//                                  item.status === "Out for delivery" ? "خرج للتوصيل" :
//                                  item.status === "Shipped" ? "تم الشحن" :
//                                  item.status === "Packing" ? "تجهيز" :
//                                  item.status === "Order Placed" ? "تم الطلب" : item.status}
//                               </span>
//                               <span className="text-[10px] text-gray-500">
//                                 {date.day}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Expanded Details with Animation */}
//                       <AnimatePresence>
//                         {isExpanded && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="border-t border-gray-100 bg-gray-50/50"
//                           >
//                             <div className="p-4 space-y-3">
//                               {/* Payment Details */}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <CreditCard className="w-4 h-4 text-gray-500" />
//                                   <span className="text-xs text-gray-600">طريقة الدفع:</span>
//                                 </div>
//                                 <span className="text-xs font-medium text-gray-800">
//                                   {item.paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
//                                    item.paymentMethod === 'cash' ? 'فودافون كاش' :
//                                    item.paymentMethod}
//                                 </span>
//                               </div>

//                               {/* Order ID */}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <Package className="w-4 h-4 text-gray-500" />
//                                   <span className="text-xs text-gray-600">رقم الطلب:</span>
//                                 </div>
//                                 <span className="text-xs font-mono text-gray-800">
//                                   #{item.orderId?.slice(-6).toUpperCase()}
//                                 </span>
//                               </div>

//                               {/* Time */}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                   <Clock className="w-4 h-4 text-gray-500" />
//                                   <span className="text-xs text-gray-600">وقت الطلب:</span>
//                                 </div>
//                                 <span className="text-xs text-gray-800">
//                                   {date.time}
//                                 </span>
//                               </div>

//                               {/* Track Button */}
//                               <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={loadOrderData}
//                                 className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-xs font-medium flex items-center justify-center gap-2 shadow-md"
//                               >
//                                 <span>تتبع الطلب</span>
//                                 <ArrowLeft className="w-3.5 h-3.5" />
//                               </motion.button>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* Desktop Layout */}
//                     <div className="hidden md:flex items-center p-6">
//                       <motion.div 
//                         whileHover={{ scale: 1.05 }}
//                         className="flex-shrink-0 ml-6"
//                       >
//                         <div className="relative">
//                           <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border border-gray-200 shadow-sm">
//                             <img
//                               src={
//                                 Array.isArray(item.image)
//                                   ? item.image[0]
//                                   : item.image || '/placeholder.png'
//                               }
//                               alt={item.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           {item.size && (
//                             <span className="absolute -top-2 -right-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-full shadow-md">
//                               {item.size}
//                             </span>
//                           )}
//                           {/* Badge خصم للديسكتوب */}
//                           {itemHasDiscount && (
//                             <span className="absolute -bottom-2 -left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full shadow-md">
//                               خصم {item.discountPercentage}%
//                             </span>
//                           )}
//                         </div>
//                       </motion.div>

//                       <div className="flex-1 grid grid-cols-4 gap-6">
//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">المنتج</p>
//                           <h3 className="font-semibold text-gray-900 text-base mb-2">
//                             {item.name}
//                           </h3>
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600">
//                               الكمية: {item.quantity}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">السعر</p>
//                           {itemHasDiscount ? (
//                             <div>
//                               <div className="flex items-baseline gap-1">
//                                 <span className="text-xl font-bold text-emerald-600">
//                                   {itemFinalPrice}
//                                 </span>
//                                 <span className="text-xs text-gray-500">{currency}</span>
//                               </div>
//                               <div className="flex items-baseline gap-1 mt-1">
//                                 <span className="text-xs text-gray-400 line-through">
//                                   {item.price}
//                                 </span>
//                                 <span className="text-xs text-gray-400">{currency}</span>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="flex items-baseline gap-1">
//                               <span className="text-xl font-bold text-emerald-600">
//                                 {item.price}
//                               </span>
//                               <span className="text-xs text-gray-500">{currency}</span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">التفاصيل</p>
//                           <div className="space-y-2">
//                             <div className="flex items-center gap-2 text-xs text-gray-600">
//                               <Calendar className="w-3.5 h-3.5" />
//                               <span>{date.day}</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-xs text-gray-600">
//                               <CreditCard className="w-3.5 h-3.5" />
//                               <span>
//                                 {item.paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
//                                  item.paymentMethod === 'cash' ? 'فودافون كاش' :
//                                  item.paymentMethod}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-span-1">
//                           <p className="text-sm text-gray-500 mb-1">الحالة</p>
//                           <div className="flex flex-col items-end gap-3">
//                             <motion.span 
//                               whileHover={{ scale: 1.05 }}
//                               className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(item.status)}`}
//                             >
//                               {getStatusIcon(item.status)}
//                               {item.status === "Delivered" ? "تم التوصيل" :
//                                item.status === "Out for delivery" ? "خرج للتوصيل" :
//                                item.status === "Shipped" ? "تم الشحن" :
//                                item.status === "Packing" ? "جاري التجهيز" :
//                                item.status === "Order Placed" ? "تم الطلب" : item.status}
//                             </motion.span>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={loadOrderData}
//                               className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
//                             >
//                               <span>تتبع الطلب</span>
//                               <ChevronRight className="w-4 h-4" />
//                             </motion.button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Orders;

import React, { useContext, useState, useEffect, useCallback } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Package, Calendar, CreditCard, Truck, 
  CheckCircle, Clock, MapPin, Phone, 
  ChevronRight, ShoppingBag, AlertCircle,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // دالة للتحقق من صلاحية الخصم بناءً على التاريخ
  const isDiscountValid = useCallback((item) => {
    // إذا مفيش خصم أصلاً
    if (!item.discountPercentage || item.discountPercentage <= 0) return false;
    
    // إذا كان في تاريخ انتهاء
    if (item.discountEnd) {
      const now = new Date().getTime();
      const endTime = new Date(item.discountEnd).getTime();
      // الخصم صالح فقط إذا لم ينتهِ الوقت
      return now <= endTime;
    }
    
    // لو مفيش تاريخ انتهاء، الخصم صالح إذا كان السعر بعد الخصم أقل
    return item.finalPrice && item.finalPrice < item.price;
  }, []);

  // دالة مساعدة للحصول على السعر (مع مراعاة الخصم والتاريخ)
  const getItemPrice = useCallback((item) => {
    // تحقق من صلاحية الخصم
    if (isDiscountValid(item)) {
      return item.finalPrice;
    }
    // لو الخصم غير صالح، استخدم السعر الأصلي
    return item.price;
  }, [isDiscountValid]);

  // دالة للتحقق من وجود خصم ساري
  const hasDiscount = useCallback((item) => {
    return isDiscountValid(item);
  }, [isDiscountValid]);

  // تحديث كل دقيقة للتحقق من انتهاء الخصم
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 60000); // كل دقيقة

    return () => clearInterval(interval);
  }, []);

  const loadOrderData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id;
            // تأكد من وجود بيانات الخصم
            item['discountPercentage'] = item.discountPercentage || 0;
            item['finalPrice'] = item.finalPrice || item.price;
            item['discountEnd'] = item.discountEnd || null;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "حدث خطأ في تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Out for delivery": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Shipped": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Packing": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Order Placed": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      case "Out for delivery": return <Truck className="w-4 h-4" />;
      case "Shipped": return <Truck className="w-4 h-4" />;
      case "Packing": return <Package className="w-4 h-4" />;
      case "Order Placed": return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 relative"
          >
            <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent"></div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 font-medium"
          >
            جاري تحميل طلباتك...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with animation */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 sticky top-0 z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  طلباتي
                </h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1"
                >
                  لديك {orderData.length} {orderData.length === 1 ? 'طلب' : 'طلبات'}
                </motion.p>
              </div>
            </div>
            <motion.button
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={loadOrderData}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="تحديث"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Orders List with stagger animation */}
        {orderData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">لا توجد طلبات</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">لم تقم بطلب أي منتجات بعد</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm sm:text-base"
            >
              تسوق الآن
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6"
          >
            <AnimatePresence>
              {orderData.map((item, index) => {
                const date = formatDate(item.date);
                const isExpanded = expandedOrder === `${item.orderId}-${item._id}`;
                const itemFinalPrice = getItemPrice(item);
                const itemHasDiscount = hasDiscount(item);
                
                return (
                  <motion.div
                    key={`${item.orderId}-${item._id}-${index}-${lastUpdate}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -2 }}
                    layout
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Mobile Optimized Layout */}
                    <div className="md:hidden">
                      {/* Order Header - Always Visible */}
                      <div 
                        onClick={() => setExpandedOrder(isExpanded ? null : `${item.orderId}-${item._id}`)}
                        className="p-4 cursor-pointer active:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {/* Product Image with Animation */}
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="relative"
                          >
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border border-gray-200 shadow-sm">
                              <img
                                src={
                                  Array.isArray(item.image)
                                    ? item.image[0]
                                    : item.image || '/placeholder.png'
                                }
                                alt={item.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            {item.size && (
                              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gray-900 text-white text-[10px] rounded-full shadow-md">
                                {item.size}
                              </span>
                            )}
                            {/* Badge خصم للهاتف - يظهر فقط إذا الخصم ساري */}
                            {itemHasDiscount && (
                              <span className="absolute -bottom-1 -left-1 px-1.5 py-0.5 bg-red-500 text-white text-[8px] rounded-full">
                                -{item.discountPercentage}%
                              </span>
                            )}
                          </motion.div>

                          {/* Quick Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1 ml-2">
                                {item.name}
                              </h3>
                              <motion.div
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                              </motion.div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-emerald-600">
                                  {itemFinalPrice}
                                </span>
                                <span className="text-[10px] text-gray-500">{currency}</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                × {item.quantity}
                              </span>
                            </div>

                            {/* عرض السعر الأصلي إذا كان في خصم ساري */}
                            {itemHasDiscount && (
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-[10px] text-gray-400 line-through">
                                  {item.price}
                                </span>
                                <span className="text-[10px] text-gray-400">{currency}</span>
                                <span className="text-[10px] text-red-500">
                                  (وفر {item.discountPercentage}%)
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${getStatusColor(item.status)}`}>
                                {getStatusIcon(item.status)}
                                {item.status === "Delivered" ? "تم التوصيل" :
                                 item.status === "Out for delivery" ? "خرج للتوصيل" :
                                 item.status === "Shipped" ? "تم الشحن" :
                                 item.status === "Packing" ? "تجهيز" :
                                 item.status === "Order Placed" ? "تم الطلب" : item.status}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {date.day}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details with Animation */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-100 bg-gray-50/50"
                          >
                            <div className="p-4 space-y-3">
                              {/* Payment Details */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-4 h-4 text-gray-500" />
                                  <span className="text-xs text-gray-600">طريقة الدفع:</span>
                                </div>
                                <span className="text-xs font-medium text-gray-800">
                                  {item.paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
                                   item.paymentMethod === 'cash' ? 'فودافون كاش' :
                                   item.paymentMethod}
                                </span>
                              </div>

                              {/* Order ID */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Package className="w-4 h-4 text-gray-500" />
                                  <span className="text-xs text-gray-600">رقم الطلب:</span>
                                </div>
                                <span className="text-xs font-mono text-gray-800">
                                  #{item.orderId?.slice(-6).toUpperCase()}
                                </span>
                              </div>

                              {/* Time */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="text-xs text-gray-600">وقت الطلب:</span>
                                </div>
                                <span className="text-xs text-gray-800">
                                  {date.time}
                                </span>
                              </div>

                              {/* Track Button */}
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={loadOrderData}
                                className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-xs font-medium flex items-center justify-center gap-2 shadow-md"
                              >
                                <span>تتبع الطلب</span>
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center p-6">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 ml-6"
                      >
                        <div className="relative">
                          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border border-gray-200 shadow-sm">
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
                          {item.size && (
                            <span className="absolute -top-2 -right-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-full shadow-md">
                              {item.size}
                            </span>
                          )}
                          {/* Badge خصم للديسكتوب - يظهر فقط إذا الخصم ساري */}
                          {itemHasDiscount && (
                            <span className="absolute -bottom-2 -left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full shadow-md">
                              خصم {item.discountPercentage}%
                            </span>
                          )}
                        </div>
                      </motion.div>

                      <div className="flex-1 grid grid-cols-4 gap-6">
                        <div className="col-span-1">
                          <p className="text-sm text-gray-500 mb-1">المنتج</p>
                          <h3 className="font-semibold text-gray-900 text-base mb-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              الكمية: {item.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <p className="text-sm text-gray-500 mb-1">السعر</p>
                          {itemHasDiscount ? (
                            <div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-emerald-600">
                                  {itemFinalPrice}
                                </span>
                                <span className="text-xs text-gray-500">{currency}</span>
                              </div>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-xs text-gray-400 line-through">
                                  {item.price}
                                </span>
                                <span className="text-xs text-gray-400">{currency}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold text-emerald-600">
                                {item.price}
                              </span>
                              <span className="text-xs text-gray-500">{currency}</span>
                            </div>
                          )}
                        </div>

                        <div className="col-span-1">
                          <p className="text-sm text-gray-500 mb-1">التفاصيل</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{date.day}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>
                                {item.paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
                                 item.paymentMethod === 'cash' ? 'فودافون كاش' :
                                 item.paymentMethod}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <p className="text-sm text-gray-500 mb-1">الحالة</p>
                          <div className="flex flex-col items-end gap-3">
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(item.status)}`}
                            >
                              {getStatusIcon(item.status)}
                              {item.status === "Delivered" ? "تم التوصيل" :
                               item.status === "Out for delivery" ? "خرج للتوصيل" :
                               item.status === "Shipped" ? "تم الشحن" :
                               item.status === "Packing" ? "جاري التجهيز" :
                               item.status === "Order Placed" ? "تم الطلب" : item.status}
                            </motion.span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={loadOrderData}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <span>تتبع الطلب</span>
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Orders;