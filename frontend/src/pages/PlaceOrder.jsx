
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
      navigate('/orders')
    }else{
      toast.error(response.data.message)
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
      <form onSubmit={onSubmithandeler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
          
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          
          <div className="flex gap-3">
            <input
              required
              name="firstName"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
              onChange={onchangeHandler}
              value ={formData.firstName}
            />
            <input
              required
              name="lastName"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
              // value=""
                onChange={onchangeHandler}
                value ={formData.lastName}
            />
          </div>
          <input
            required
            name="email"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
            // value=""
              onChange={onchangeHandler}
              value ={formData.email}
          />
          <input
            required
            name="street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
            // value=""
              onChange={onchangeHandler}
              value ={formData.street}
          />
          <div className="flex gap-3">
            <input
              required
              name="city"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
              onChange={onchangeHandler}
              value ={formData.city}
              // value=""
            />
              {/* <input
              required
              name="state"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="state"
              // value=""
                onChange={onchangeHandler}
              value ={formData.state}
            /> */}
            
          </div>
{/*          
          <div className="flex gap-3">
            <input
              required
              name="zipcode"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="zipcode"
              // value=""
                onChange={onchangeHandler}
              value ={formData.zipcode}
            />
            <input
              required
              name="country"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
              // value=""
                onChange={onchangeHandler}
              value ={formData.country}
            />
       
          </div> */}
          <input
            required
            name="phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
              onChange={onchangeHandler}
              value ={formData.phone}
            
          />
        </div>

        <div className="mt-8">
          <div className="w-full sm:w-[450px]  ">
           <CartTotal/>
          </div>
          <div className="mt-12 ">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                PAYMENT <span className="text-gray-700 font-medium">METHOD</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          
              <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ?'bg-green-400':""}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                 الدفع عند الاستلام
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm"
                
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </form>
      // </div>
 
    
  );
};

export default PlaceOrder;
