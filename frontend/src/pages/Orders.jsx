import React from "react";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setOrderData]= useState([])
  const loadOrderData =async ()=>{
    try {
      if (!token) {
        return null 
      }
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      console.log(response.data);
    
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
         order.items.map((item)=>{
        item['status'] =order.status
        item['payment'] =order.payment
        item['paymentMethod'] =order.paymentMethod
        item['date']=order.date
      //  const sss= item['image']=order.items[0].image
      //  console.log(sss);
       
        allOrdersItem.push(item)
         })
        })
    
        setOrderData(allOrdersItem.reverse());
        
        
      }
      
    } catch (error) {
         console.log(error);
        toast({ message:error.message})
    }
  }
  useEffect(()=>{
loadOrderData()
  },[token])
  return (
    <div className="border-t pt-10 px-4 md:px-10 bg-gray-50 min-h-screen">
  {/* Title */}
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-wide">
      <span className="text-gray-800">MY</span>{" "}
      <span className="text-blue-600">ORDERS</span>
    </h2>
    <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
  </div>

  {/* Orders List */}
  <div className="space-y-6">
    {orderData.map((items, index) => (
      <div
        key={index}
        className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        {/* Left Section: Image + Info */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 w-full md:w-3/5">
          {/* <img
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
            src={items.image[0]}
            // src={items.image && items.image.length > 0 ? items.image[0]:'/placeholder.png'}
            alt={items.name}
          /> */}
          <img
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
              src={
                Array.isArray(items.image)
                  ? items.image[0]
                  : items.image || '/placeholder.png'
              }
              alt={items.name}
          />
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">{items.name}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
              <p className="font-medium text-gray-900">
                {items.price}
                {currency}
              </p>
              <p className="text-sm">Qty: {items.quantity}</p>
              <p className="text-sm">Size: {items.size}</p>
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-700">Date:</span>{" "}
                {new Date(items.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-700">Payment:</span>{" "}
                {items.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Status + Button */}
        <div className="flex md:flex-col items-center justify-between gap-3 md:gap-2 w-full md:w-1/3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                items.status === "Delivered"
                  ? "bg-green-500"
                  : items.status === "Processing"
                  ? "bg-yellow-500"
                  : "bg-gray-400"
              }`}
            ></span>
            <p className="text-sm font-medium text-gray-700">{items.status}</p>
          </div>

          <button
            onClick={loadOrderData}
            className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            Track Order
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    // <div className="border-t pt-16">
    //   {/* 1 */}
    //   <div className="text-2xl">
    //     <Title text1={"MY"} text2={"ORDERS"} />
    //   </div>
    //   {/* 2 */}
    //   <div>
    //     {orderData.map((item, index) => (
    //       <div
    //         key={index}
    //         className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    //       >
    //         <div className="flex items-start gap-6 text-sm">
    //          <img className="w-15 sm:w-20" src={item.image[0]} alt="" />
    //          <div>
    //           <p className="sm:text-base font-medium">{item.name}</p>
    //           <div className=" flex items-center gap-3 mt-1 text-base text-gray-700">
    //              <p>{item.price}{currency}</p>
    //              <p>Quantity: {item.quantity}</p>
    //              <p>Size: {item.size}</p>
    //           </div>
    //                <p className="mt-1">Date: <span className=" text-gray-400">{new Date(item.date).toUTCString()}</span></p>
    //               <p className="mt-1">Payment: <span className=" text-gray-400">{item.paymentMethod}</span></p>
    //          </div>
            
            


    //         </div>
          
    //           <div className="md:w-1/2 flex justify-between">
    //               <div className="flex items-center gap-2">
    //               <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
    //               <p className="text-sm md:text-base">{item.status}</p>
    //               </div>
    //                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
    //               </div>

    //         </div>
         
    //     ))}
    //   </div>


    // </div>
  );
};

export default Orders;
