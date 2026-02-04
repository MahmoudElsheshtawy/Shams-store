import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems,updateQuantity ,navigate} = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length >0) {
       const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item]) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    
    setCartData(tempData);
    }
   
  }, [cartItems,products]);

  return (
    <div>
      <div className="border-t pt-14">
        <div className=" text-2xl mb-3">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              YOUR <span className="text-gray-700 font-medium">CART</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        <div>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {productData.price}
                        {currency}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img onClick={()=>updateQuantity(item._id,item.size,0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
              </div>
            );
          })}

         {/* 1 */}
         {/* 1 */}

         {/* 1 */}
       
        </div>

       
      </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal/>
                       <div className=" w-full text-end">
          <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">
            PROCEED TO CHECKOUT
          </button>
        </div>
            </div>

          </div>
    </div>
  );
};

export default Cart;
// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets, productsss } from "../assets/frontend_assets/assets";
// import CartTotal from "../components/CartTotal";

// const Cart = () => {
//   const { currency, cartItems, updateQuantity, navigate } =
//     useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     const tempData = [];

//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         const quantity = cartItems[productId][size];

//         if (quantity > 0) {
//           tempData.push({
//             _id: productId,
//             size,
//             quantity,
//           });
//         }
//       }
//     }

//     setCartData(tempData);
//   }, [cartItems]);

//   return (
//     <div>
//       {/* ===== Title ===== */}
//       <div className="border-t pt-14">
//         <div className="text-2xl mb-3">
//           <div className="inline-flex gap-2 items-center mb-3">
//             <p className="text-gray-500">
//               YOUR <span className="text-gray-700 font-medium">CART</span>
//             </p>
//             <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//           </div>
//         </div>

//         {/* ===== Cart Items ===== */}
//         <div>
//           {cartData.map((item, index) => {
//             const productData = productsss.find(
//               (product) => product._id === item._id
//             );

//             if (!productData) return null;

//             return (
//               <div
//                 key={index}
//                 className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//               >
//                 {/* Product Info */}
//                 <div className="flex items-start gap-6">
//                   <img
//                     className="w-16 sm:w-20"
//                     src={productData.image[0]}
//                     alt={productData.name}
//                   />

//                   <div>
//                     <p className="text-xs sm:text-lg font-medium">
//                       {productData.name}
//                     </p>

//                     <div className="flex items-center gap-5 mt-2">
//                       <p>
//                         {productData.price}
//                         {currency}
//                       </p>

//                       {item.size !== "no_size" && (
//                         <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
//                           {item.size}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quantity */}
//                 <input
//                   className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                   type="number"
//                   min={1}
//                   defaultValue={item.quantity}
//                   onChange={(e) =>
//                     e.target.value === "" || e.target.value === "0"
//                       ? null
//                       : updateQuantity(
//                           item._id,
//                           item.size,
//                           Number(e.target.value)
//                         )
//                   }
//                 />

//                 {/* Remove */}
//                 <img
//                   onClick={() =>
//                     updateQuantity(item._id, item.size, 0)
//                   }
//                   className="w-4 mr-4 sm:w-5 cursor-pointer"
//                   src={assets.bin_icon}
//                   alt="remove"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ===== Cart Total ===== */}
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />

//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate("/place-order")}
//               className="bg-black text-white text-sm my-8 px-8 py-3"
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
