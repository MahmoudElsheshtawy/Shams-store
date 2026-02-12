// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/frontend_assets/assets";
// import CartTotal from "../components/CartTotal";
// // const { clearCart } = useContext(ShopContext);

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate, clearCart } = useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

// useEffect(() => {
//   if (!cartItems || Object.keys(cartItems).length === 0) {
//     setCartData([]);
//     return;
//   }

//   if (products.length > 0) {
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
//    console.log("Cart Data Updated:", tempData);

//   }
//    console.log(products);
// }, [cartItems, products]);

//   return (
//     <div>
//       <div className="border-t pt-14">
//         <div className="text-2xl mb-3">
//           <div className="inline-flex gap-2 items-center mb-3">
//             <p className="text-gray-500">
//               YOUR <span className="text-gray-700 font-medium">CART</span>
//             </p>
//             <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//           </div>
//         </div>

//         {/* Cart Items */}
//         <div>
//           {cartData.length === 0 ? (
//             <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
//           ) : (
//             cartData.map((item, index) => {
//               const productData = products.find(p => p._id === item._id);
//               if (!productData) return null; // حماية من undefined

//               const productImage =
//                 Array.isArray(productData.image) && productData.image[0]
//                   ? productData.image[0]
//                   : assets.default_product; // صورة افتراضية

//               return (
//                 <div
//                   key={index}
//                   className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//                 >
//                   {/* Product Info */}
//                   <div className="flex items-start gap-6">
//                     <img className="w-16 sm:w-20" src={productImage} alt={productData.name || "Product"} />
//                     <div>
//                       <p className="text-xs sm:text-lg font-medium">{productData.name || "-"}</p>
//                       <div className="flex items-center gap-5 mt-2">
//                         <p>{productData.price || 0}{currency}</p>
//                         {item.size && <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Quantity */}
//                   <input
//                     type="number"
//                     min={1}
//                     defaultValue={item.quantity}
//                     className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                     onChange={e => {
//                       const val = Number(e.target.value);
//                       if (val > 0) updateQuantity(item._id, item.size, val);
//                     }}
//                   />

//                   {/* Remove */}
//                   <img
//                     onClick={() => updateQuantity(item._id, item.size, 0)}
//                     className="w-4 mr-4 sm:w-5 cursor-pointer"
//                     src={assets.bin_icon}
//                     alt="Remove"
//                   />
//                 </div>
//               );
//             })
//           )}
//         </div>
// {/* ند الضغزر لمسح الكارت */}
// <div className="flex justify-end mt-6">
//   <button onClick={clearCart} className="bg-red-500 text-white  px-4 py-2 rounded">
//    مسح الكارت
// </button>
// </div>
//       </div>

//       {/* Cart Total */}
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate("/place-order")}
//               className="bg-black text-white text-sm my-8 px-8 py-3"
//             >
//              تابع الي الدفع
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ChevronLeft,
  Plus,
  Minus,
  Heart,
} from "lucide-react";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, clearCart } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      setCartData([]);
      return;
    }

    if (products.length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity,
            });
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Get unique related products that are NOT in cart
  const relatedProducts = useMemo(() => {
    if (!products.length || !cartData.length) return products.slice(0, 4);

    const cartProductIds = new Set(cartData.map((item) => item._id));
    return products
      .filter((product) => !cartProductIds.has(product._id))
      .slice(0, 4);
  }, [products, cartData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100">
      {/* Header with soft shadow */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2.5 hover:bg-gray-100/80 active:bg-gray-200 rounded-full transition-all duration-200 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-emerald-600" />
                  {cartData.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {cartData.length}
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-semibold text-gray-800">
                  سلة التسوق
                </h1>
              </div>
            </div>

            {cartData.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 active:bg-rose-100 rounded-lg transition-all duration-200 active:scale-95"
              >
                <Trash2 className="w-4.5 h-4.5" />
                <span className="text-sm font-medium hidden sm:inline">
                  إفراغ السلة
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        {cartData.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
              <ShoppingBag className="w-14 h-14 text-gray-400" />
            </div>
            <h3 className="text-2xl font-light text-gray-700 mb-3">
              سلة التسوق فارغة
            </h3>
            <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
              لم تقم بإضافة أي منتجات بعد. تصفح مجموعتنا وأضف ما يعجبك
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 font-medium"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Cart Items */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {cartData.map((item, index) => {
                  const productData = products.find((p) => p._id === item._id);
                  if (!productData) return null;

                  const productImage =
                    Array.isArray(productData.image) && productData.image[0]
                      ? productData.image[0]
                      : assets.default_product;

                  return (
                    <div
                      key={`${item._id}-${item.size}-${index}`}
                      className="p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-5">
                        {/* Product Image */}
                        <div className="flex items-start gap-4 sm:block">
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent rounded-xl"></div>
                            <img
                              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300"
                              src={productImage}
                              alt={productData.name || "Product"}
                            />
                            {item.size && (
                              <span className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-medium rounded-full shadow-md">
                                {item.size}
                              </span>
                            )}
                          </div>

                          {/* Mobile Product Info */}
                          <div className="sm:hidden flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
                                  {productData.name || "-"}
                                </h3>
                                <p className="text-emerald-600 font-medium text-sm mt-1.5">
                                  {productData.price || 0}
                                  {currency}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.size, 0)
                                }
                                className="p-2 hover:bg-rose-50 active:bg-rose-100 text-rose-500 rounded-lg transition-all duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          {/* Desktop Product Info */}
                          <div className="hidden sm:flex justify-between items-start mb-4">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-gray-800 text-lg">
                                {productData.name || "-"}
                              </h3>
                              {/* <p className="text-gray-500 text-sm">{productData.category || "-"}</p> */}
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-emerald-600 font-semibold">
                                  {productData.price || 0}
                                  {currency}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-sm text-gray-500">
                                  للقطعة الواحدة
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* <button className="p-2 hover:bg-gray-100 active:bg-gray-200 text-gray-500 rounded-lg transition-all duration-200">
                                <Heart className="w-5 h-5" />
                              </button> */}
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.size, 0)
                                }
                                className="p-2 hover:bg-rose-50 active:bg-rose-100 text-rose-500 rounded-lg transition-all duration-200"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* Mobile Price Total */}
                          <div className="sm:hidden flex justify-between items-center mb-4">
                            <div className="text-lg font-bold text-gray-800">
                              {(
                                (productData.price || 0) * item.quantity
                              ).toFixed(2)}
                              {currency}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.quantity} قطعة
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Quantity Buttons */}
                              <div className="flex items-center bg-gray-100/80 rounded-xl p-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item._id,
                                      item.size,
                                      item.quantity - 1,
                                    )
                                  }
                                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 min-w-12 text-center font-semibold text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item._id,
                                      item.size,
                                      item.quantity + 1,
                                    )
                                  }
                                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Desktop Price per Item */}
                              <div className="hidden sm:block text-sm text-gray-600">
                                <span className="font-medium">
                                  {item.quantity} ×{" "}
                                </span>
                                <span>
                                  {productData.price || 0}
                                  {currency}
                                </span>
                              </div>
                            </div>

                            {/* Desktop Total */}
                            <div className="hidden sm:block">
                              <div className="text-lg font-bold text-gray-800">
                                {(
                                  (productData.price || 0) * item.quantity
                                ).toFixed(2)}
                                {currency}
                              </div>
                              <div className="text-xs text-gray-500 text-right mt-1">
                                الإجمالي
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Total Section - Now below all products */}
              <div className="mt-8 w-full">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                    ملخص الطلب
                  </h2>

                  <CartTotal />

                  <div className="space-y-3 mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => navigate("/place-order")}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 px-4 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 font-semibold flex items-center justify-center gap-2"
                    >
                      <span
                        onClick={() =>
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          })
                        }
                      >
                        استكمال الطلب
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate("/")}
                        className="w-full border-2 border-gray-300/80 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50/80 active:bg-gray-100 transition-all duration-200 font-medium"
                      >
                        استمر في التسوق
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full border-2 border-rose-300 text-rose-600 py-3 px-4 rounded-xl hover:bg-rose-50/80 active:bg-rose-100 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>إفراغ السلة</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      الشحن مجاني للطلبات فوق 200 ريال. الطلبات تخضع للشروط
                      والأحكام. الضرائب محسوبة عند الدفع.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    منتجات قد تعجبك
                  </h3>
                  <button
                    onClick={() => navigate("/")}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors duration-200"
                  >
                    عرض الكل
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {relatedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <div className="relative overflow-hidden rounded-xl mb-3">
                        <img
                          src={product.image?.[0] || assets.default_product}
                          alt={product.name}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-1 mb-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-emerald-600 font-semibold text-sm">
                          {product.price}
                          {currency}
                        </p>
                        <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200">
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
