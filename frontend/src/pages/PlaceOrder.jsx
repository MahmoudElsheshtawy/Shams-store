
import React, { useContext } from "react";
import CartTotal from '../components/CartTotal'
// import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
   const [method,setMethod]=useState('cod')
   const [showVodafoneModal, setShowVodafoneModal] = useState(false);
   const [paid, setPaid] = useState(false);

   const vodafoneNumber = "201103436285"; // بدون صفر في الأول

  const {navigate,backendUrl,token,products,cartItems,delivry_free,setCartItems,getCartAmount} = useContext(ShopContext);

   const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''

   })
   const onchangeHandler = (event)=>{
  const name =event.target.name
  const value =event.target.value
  setFormData(data => ({...data, [name]:value}))
   }

  const onSubmithandeler =async(event)=>{
    event.preventDefault();
    try {
      let orderItem = []

      for(const items in cartItems){
         for(const item in cartItems[items]){
          if (cartItems[items][item] > 0) {
            const itemInfo =structuredClone(products.find(product => product._id === items))
            if(itemInfo){
                itemInfo.size =item
                itemInfo.quantity = cartItems[items][item]
                 itemInfo.image = itemInfo.image[0]; //add
                orderItem.push(itemInfo)
              //   orderItem.push({
              //     productId: itemInfo._id,
              //     name: itemInfo.name,
              //     quantity: itemInfo.quantity,
              //     size: itemInfo.size,
              //     price: itemInfo.price,
              //     image: itemInfo.image,  
              //  }
              //   )

            }
          }
         }
      }
       
//  console.log(orderItem);
 let orderData ={
  address:formData,
  items :orderItem,
  amount:getCartAmount()+delivry_free
 }
 switch (method) {
  case 'cod':
    const response =await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
    // console.log(response.data);
    
    if (response.data.success) {
      setCartItems({})
      
    // localStorage.setItem("cartItems", JSON.stringify({}))
    localStorage.removeItem("cart")
  // console.log(cartItems);
  
  
      navigate('/orders')
    }else{
      toast.error(response.data.message)
    }
    break;
    case 'cash':
    const responsee =await axios.post(backendUrl + '/api/order/cash',orderData,{headers:{token}})
    // console.log(responsee.data);
    
    if (responsee.data.success) {
      setCartItems({})
      
    // localStorage.setItem("cartItems", JSON.stringify({}))
    localStorage.removeItem("cart")
  // console.log(cartItems);
  
  
      navigate('/orders')
    }else{
      toast.error(responsee.data.message)
    }
    break;
 
  default:
    break;
 }
 


    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }
  return (
    // <div>
<>
{showVodafoneModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[90%] max-w-sm p-6">

      <h3 className="text-lg font-bold text-center mb-4">
        الدفع عبر فودافون كاش
      </h3>

      <p className="text-center text-gray-600 mb-3">
        برجاء التحويل المبلغ على الرقم:
      </p>

      <p className="text-center font-bold text-xl mb-4 text-emerald-600">
        01103436285
      </p>

      <div className="flex items-center gap-2 mb-5">
        <input
          type="checkbox"
          checked={paid}
          onChange={(e) => setPaid(e.target.checked)}
        />
        <span className="text-sm">تم الدفع</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowVodafoneModal(false)}
          className="flex-1 border rounded-lg py-2"
        >
          إلغاء
        </button>

        <button
          disabled={!paid}
          onClick={() => {
            setShowVodafoneModal(false);
            toast.success("تم تأكيد الدفع");
          }}
          className={`flex-1 rounded-lg py-2 text-white ${
            paid ? "bg-emerald-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          تأكيد
        </button>
      </div>

    </div>
  </div>
)}

<form onSubmit={onSubmithandeler} className="flex flex-col lg:flex-row justify-between gap-6 pt-6 min-h-[75vh] border-t border-gray-200">
  {/* Left Section - Delivery Information */}
  <div className="flex-1 lg:max-w-[550px]">
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800">
          <span className="text-emerald-600">معلومات</span> التوصيل
        </h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="space-y-5">
          {/* Name Fields - Close Together */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                الاسم الأول <span className="text-rose-500">*</span>
              </label>
              <input
                required
                name="firstName"
                className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                type="text"
                placeholder="الاسم الأول"
                onChange={onchangeHandler}
                value={formData.firstName}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                الاسم الأخير <span className="text-rose-500">*</span>
              </label>
              <input
                required
                name="lastName"
                className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                type="text"
                placeholder="الاسم الأخير"
                onChange={onchangeHandler}
                value={formData.lastName}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              البريد الإلكتروني <span className="text-rose-500">*</span>
            </label>
            <input
              required
              name="email"
              className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
              type="email"
              placeholder="example@email.com"
              onChange={onchangeHandler}
              value={formData.email}
            />
          </div>

          {/* Street Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              عنوان الشارع <span className="text-rose-500">*</span>
            </label>
            <input
              required
              name="street"
              className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
              type="text"
              placeholder="اسم الشارع والرقم"
              onChange={onchangeHandler}
              value={formData.street}
            />
          </div>

          {/* City and Phone - Close Together */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                المدينة <span className="text-rose-500">*</span>
              </label>
              <input
                required
                name="city"
                className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                type="text"
                placeholder="المدينة"
                onChange={onchangeHandler}
                value={formData.city}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                رقم الهاتف <span className="text-rose-500">*</span>
              </label>
              <input
                required
                name="phone"
                className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                type="tel"
                placeholder="01XXXXXXXX"
                onChange={onchangeHandler}
                value={formData.phone}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Right Section - Order Summary */}
  <div className="lg:w-[380px]">
    <div className="sticky top-6">
      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          ملخص الطلب
        </h3>
        <CartTotal />
      </div>

      {/* Payment Method - Compact Design */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
          <h3 className="font-bold text-gray-800">
            طريقة <span className="text-emerald-600">الدفع</span>
          </h3>
        </div>
        
        <div className="space-y-3">
          {/* COD Option - Compact */}
          <div 
            onClick={() => setMethod('cod')}
            className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all duration-150 ${
              method === 'cod' 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              method === 'cod' 
                ? 'border-emerald-500 bg-emerald-500' 
                : 'border-gray-300 bg-white'
            }`}>
              {method === 'cod' && (
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">الدفع عند الاستلام</p>
              <p className="text-xs text-gray-500 mt-0.5">ادفع عند استلام الطلب</p>
            </div>
          </div>

          {/* Vodafone Cash Option - Compact */}
          <div 
           onClick={() => {
  setMethod('cash');
  setShowVodafoneModal(true)
}}
            className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all duration-150 ${
              method === 'cash' 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              method === 'cash' 
                ? 'border-emerald-500 bg-emerald-500' 
                : 'border-gray-300 bg-white'
            }`}>
              {method === 'cash' && (
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">تحويل كاش</p>
              {/* <p className="text-xs text-gray-500 mt-0.5">تحويل مباشر عبر فودافون كاش</p> */}
            </div>
            <div className="px-2 py-1 bg-red-50 rounded">
              <span className="text-xs font-medium text-red-600">0 11 03436285</span>
            </div>
          </div>
 {method === "cash" && (
  <a
    href={`https://wa.me/${vodafoneNumber}?text=مرحبا، قمت بتحويل المبلغ لفودافون كاش وأرفق صورة التحويل`}
    target="_blank"
    rel="noopener noreferrer"
    className="
    flex items-center justify-center gap-4 bg-green-500 text-white py-3 rounded-full font-medium hover:bg-green-600 transition duration-300 shadow-md animate-bounce
    "
  >
    {/* دائرة متحركة خلف الزر */}
    <span className="absolute inset-0 rounded-xl bg-green-400 opacity-30 blur-md animate-ping"></span>

    <span className="relative flex items-center gap-2">
      📲 تواصل عبر واتساب بعد الدفع
    </span>
  </a>
)}


          {/* Credit Card Option - Compact (Optional) */}
          {/* <div 
            onClick={() => setMethod('card')}
            className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all duration-150 ${
              method === 'card' 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              method === 'card' 
                ? 'border-emerald-500 bg-emerald-500' 
                : 'border-gray-300 bg-white'
            }`}>
            
            </div>
          
          </div> */}
        </div>
      </div>

      {/* Submit Button - Compact */}
      <div className="bg-gradient-to-r from-emerald-50 to-gray-50 rounded-xl p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">سيتم تأكيد طلبك خلال 24 ساعة</span>
            <span className="text-emerald-600 font-medium">سريع</span>
          </div>
          
          <button
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth",  })}

            // type="submit"
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            تأكيد الطلب
          </button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500 mt-2">
              بالضغط على زر التأكيد، فإنك توافق على 
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium mx-1">
                الشروط والأحكام
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
</>

    
  );
};

export default PlaceOrder;
