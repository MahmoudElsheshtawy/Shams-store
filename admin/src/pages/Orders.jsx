import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const statusHandeler =async (event,orderId)=>{
      try {
        const response =await axios.post(backendUrl +'/api/order/status',{orderId,status:event.target.value},{headers:{token}})


        if (response.data.success) {
          await fetchAllOrders()
          
        }
      } catch (error) {
        console.log(error);
        // edit her 10شعبان
        toast.error(error.response?.data?.message || "Failed to update order status")
        
      }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  //
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // يبدأ الترانزيشن بعد تحميل الصفحة مباشرة
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">Order Page</h3>
      <div className=" transition-all duration-700 ease-out">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`
        grid grid-cols-1 sm:grid-cols-[0.4fr_2fr_1fr] lg:grid-cols-[0.4fr_2fr_1fr_1fr_1fr]
        gap-5 items-start bg-white border border-gray-200 rounded-2xl shadow-sm 
        p-5 md:p-7 my-4 text-gray-700 text-sm 
        transform transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
      `}
          >
            {/* الصورة */}
            <div className="flex justify-center items-start">
              {/* <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              /> */}
              {/* <img
  src={order.items[0]?.image}
  alt={order.items[0]?.name}
  className="w-14 h-14 object-cover rounded-lg"
/> */}
<img
  src={
    Array.isArray(order.items[0]?.image)
      ? order.items[0].image[0]   // إذا مصفوفة
      : order.items[0]?.image     // إذا رابط واحد
      || '/placeholder.png'       // إذا لا يوجد صورة
  }
  alt={order.items[0]?.name || 'Product'}
  className="w-14 h-14 object-cover rounded-lg"
/>
            </div>

            {/* بيانات العميل والمنتجات */}
            <div className="space-y-2">
              <div className="font-medium text-gray-900">
                {order.items.map((item, index) => (
                  <span key={index} className="inline-block mr-1">
                    {item.name} × {item.quantity}{" "}
                    <span className="text-gray-500">({item.size})</span>
                    {index !== order.items.length - 1 && ","}
                  </span>
                ))}
              </div>

              <div className="text-gray-600 leading-snug">
                <p className="font-semibold">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country}
                </p>
                <p className="text-xs text-gray-500">{order.address.phone}</p>
              </div>
            </div>

            {/* معلومات الطلب */}
            <div className="space-y-1 text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-medium text-gray-900">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium text-gray-900">Payment:</span>{" "}
                <span
                  className={`${
                    order.payment ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-900">Date:</span>{" "}
                {new Date(order.date).toLocaleString("en-us",{    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",})}
              </p>
            </div>

            {/* السعر */}
            <div className="flex flex-col justify-center items-center text-gray-900 font-bold text-lg">
              {order.amount} {currency}
            </div>

            {/* الحالة */}
            <div className="flex justify-center items-center">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={order.status}
                onChange={(event)=>statusHandeler(event,order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
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