import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'
const CartTotal = () => {
      const { currency ,getCartAmount,delivry_free} = useContext(ShopContext);

  return (
    <div className='w-full '>
         <div className='text-2xl'>
            {/* <Title text1={'المبلغ  '} text2={'اجمالي '} /> */}
         </div>



           <div className="flex flex-col gap-2 mt-2 text-sm mr-0">
            <div className="flex justify-between">
              <p>المجموع الفرعي</p>
              <p>{getCartAmount()}.00{currency}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p> مصاريف الشحن</p>
              <p>{delivry_free}.00{currency}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <b>الإجمالي</b>
              <b>{getCartAmount()===0 ?0 :getCartAmount()+delivry_free}.00 {currency} </b>
            </div>
          </div>

    </div>
  )
}

export default CartTotal
// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import { productsss } from "../assets/frontend_assets/assets";

// const CartTotal = () => {
//   const { currency, cartItems, products, delivry_free } =
//     useContext(ShopContext);

//   // حساب subtotal حسب الكميات والأسعار
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const productId in cartItems) {
//       const product = productsss.find((p) => p._id === productId);
//       if (!product) continue;

//       for (const size in cartItems[productId]) {
//         const quantity = cartItems[productId][size];
//         if (quantity > 0) {
//           totalAmount += product.price * quantity;
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const subtotal = getCartAmount();
//   const total = subtotal === 0 ? 0 : subtotal + delivry_free;

//   return (
//     <div className="w-full">
//       <div className="text-2xl">
//         <Title text1={"CART"} text2={"TOTALS"} />
//       </div>

//       <div className="flex flex-col gap-2 mt-2 text-sm mr-0">
//         <div className="flex justify-between">
//           <p>Subtotal</p>
//           <p>{subtotal.toLocaleString()}.00{currency}</p>
//         </div>
//         <hr />
//         <div className="flex justify-between">
//           <p>Shipping Fee</p>
//           <p>{subtotal === 0 ? 0 : delivry_free.toLocaleString()}.00{currency}</p>
//         </div>
//         <hr />
//         <div className="flex justify-between">
//           <b>Total</b>
//           <b>{total.toLocaleString()}.00 {currency}</b>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartTotal;
