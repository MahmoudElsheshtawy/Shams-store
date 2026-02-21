// import { createContext, useEffect, useState } from "react";
// // import { products } from "../assets/frontend_assets/assets";
// import { toast } from "react-toastify";
// import axios from 'axios'


// import { useNavigate } from "react-router";// import useNavigate, { useNavigationType } from 'react-router-dom'
// export const ShopContext = createContext();
// const ShopContextProvider = (props) => {
//   const currency = " EGP";
//   const delivry_free = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL
 
//   const [searsh, setSearsh] = useState("");
//   const [showSearsh, setShowSearsh] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products ,setProducts] =useState([])
//   const [token,setToken] =useState('')
// let navigate = useNavigate();
  

//   const addToCart = async (itemId, size) => {
//     // if (!size) {
//     //   toast.error("select Product size");
//     //   return;
//     // }
//     if (!size || size === "") {
//   toast.error("select Product size");
//   return;
// }
 

//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }
//     setCartItems(cartData);
//     if (token) {
//       try {
//         await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})

//       } catch (error) {
//         console.log(error);
//         toast.error(error.message)
        
//       }
//     }
//   };
//   //   count to cart
//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalCount += cartItems[items][item];
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//     return totalCount;
//   };
//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItems(cartData);
//     if (token) {
      
//       try {
//         await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
        
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message)

       
//       }
//     }
//   };
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalAmount += itemInfo.price * cartItems[items][item];
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//     return totalAmount;
//   };
 
//   // get ptoduct from api
//    const getproductsdata = async ()=>{
//     try {
//       const response =await axios.get(backendUrl+'/api/product/list')
//     if(response.data.success){
//       setProducts(response.data.products)
//       console.log(response.data.products);
      
//     }else{
//       toast.error(response.data.message)
//     }
    
      
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)

      
//     }
//    }
// const getUserCart =async (token)=>{
// try {
//     const response =await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})

//     if (response.data.success) {
//       setCartItems(response.data.cartData)
      
//     }
// } catch (error) {
// console.log(error);
// toast.error(error.message)

  
// }
// }
// useEffect(()=>{
//   getproductsdata()
// },[])
// useEffect(()=>{
//   if (!token && localStorage.getItem('token')) {
//     setToken(localStorage.getItem('token'))
//     getUserCart(localStorage.getItem('token'))
//   }
// },[])



//   const value = {
//     products,
//     currency,
//     delivry_free,
//     searsh,
//     setSearsh,
//     showSearsh,
//     setShowSearsh,
//     addToCart,
//     cartItems,
//     setCartItems,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//   backendUrl,
//   token,setToken
//   };
//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };
// export default ShopContextProvider;
// =================================================
// =================================================
// =================================================
// =================================================
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios';
// import { useNavigate } from "react-router";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = " EGP";
//   const delivry_free = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   // console.log(backendUrl);

//   const [searsh, setSearsh] = useState("");
//   const [showSearsh, setShowSearsh] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState('');

//   let navigate = useNavigate();

//   // -------------------- CART --------------------
//   const addToCart = async (itemId, size) => {
//     if (!size || size === "") {
//       toast.error("select Product size");
//       return;
//     }

//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
//     localStorage.setItem('cart', JSON.stringify(cartData)); // حفظ الكارت في localStorage

//     if (token) {
//       try {
//         await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   };


//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) totalCount += cartItems[items][item];
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//     console.log(totalCount );
    
//     return totalCount;
//   };


//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItems(cartData);
//     localStorage.setItem('cart', JSON.stringify(cartData)); // تحديث الكارت في localStorage

//     if (token) {
//       try {
//         await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0 && itemInfo) {
//             totalAmount += itemInfo.price * cartItems[items][item];
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//     return totalAmount;
//   };

//   // -------------------- PRODUCTS --------------------
//   const getProductsData = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list');
//       if (response.data.success) {
//         setProducts(response.data.products);
//         // console.log(response.data.products);
//         // (response.data.products);
//         localStorage.setItem('products', JSON.stringify(response.data.products));
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // -------------------- USER CART --------------------
//   const getUserCart = async (token) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
//       if (response.data.success) {
//         setCartItems(response.data.cartData);
//         localStorage.setItem('cart', JSON.stringify(response.data.cartData));
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // -------------------- EFFECTS --------------------
// useEffect(() => {
//   // عرض المنتجات بسرعة من localStorage
//   const savedProducts = localStorage.getItem('products');
//   if (savedProducts) {
//     setProducts(JSON.parse(savedProducts));
//   }

//   // بعدها دايمًا نجيب أحدث داتا من السيرفر
//   getProductsData();

//   // cart
//   const savedCart = localStorage.getItem('cart');
//   if (savedCart) setCartItems(JSON.parse(savedCart));
// }, []);
//   useEffect(() => {
//     // لو فيه توكن في localStorage وجوه state
//     const savedToken = localStorage.getItem('token');
//     if (!token && savedToken) {
//       setToken(savedToken);
//       getUserCart(savedToken);
//     }
//   }, []);

//   // -------------------- CONTEXT VALUE --------------------
//   const value = {
//     products,
//     currency,
//     delivry_free,
//     searsh,
//     setSearsh,
//     showSearsh,
//     setShowSearsh,
//     addToCart,
//     cartItems,
//     setCartItems,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     token,
//     setToken
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = " EGP";
//   const delivry_free = 50;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [searsh, setSearsh] = useState("");
//   const [showSearsh, setShowSearsh] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState("");

//   const navigate = useNavigate();

//   // ===================== ADD TO CART =====================
//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("select Product size");
//       return;
//     }

//     let cartData = structuredClone(cartItems);

//     if (!cartData[itemId]) cartData[itemId] = {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

//     setCartItems(cartData);
//     localStorage.setItem("cart", JSON.stringify(cartData));

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + "/api/cart/add",
//           { itemId, size },
//           { headers: { token } }
//         );
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   // ===================== CART COUNT =====================
//   const getCartCount = () => {
//     let total = 0;
//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         const qty = cartItems[productId][size];
//         if (typeof qty === "number" && qty > 0) total += qty;
//       }
//     }
//     return total;
//   };

//   // ===================== UPDATE QUANTITY =====================
//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);

//     if (quantity === 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
//     } else {
//       cartData[itemId][size] = quantity;
//     }

//     setCartItems(cartData);
//     localStorage.setItem("cart", JSON.stringify(cartData));

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + "/api/cart/update",
//           { itemId, size, quantity },
//           { headers: { token } }
//         );
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   // ===================== CART AMOUNT =====================
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const productId in cartItems) {
//       const product = products.find((p) => p._id === productId);
//       if (!product) continue;
//       for (const size in cartItems[productId]) {
//         const qty = cartItems[productId][size];
//         if (qty > 0) totalAmount += product.price * qty;
//       }
//     }
//     return totalAmount;
//   };

//   // ===================== PRODUCTS =====================
//   const getProductsData = async () => {
//     try {
//       const res = await axios.get(backendUrl + "/api/product/list");
//       if (res.data.success) {
//         setProducts(res.data.products);
//         localStorage.setItem("products", JSON.stringify(res.data.products));
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ===================== USER CART =====================
//   const getUserCart = async (token) => {
//     try {
//       const res = await axios.post(
//         backendUrl + "/api/cart/get",
//         {},
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         setCartItems(res.data.cartData || {});
//         localStorage.setItem("cart", JSON.stringify(res.data.cartData || {}));
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
// // ===================== CLEAR CART =====================
// const clearCart = () => {
//   setCartItems({}); // مسح الكارت من state
//   localStorage.removeItem("cart"); // مسح الكارت من localStorage
//   toast.success("تم مسح كل المنتجات من العربة 🛒");
// };
//   // ===================== EFFECTS =====================
//   useEffect(() => {
//     // load products from localStorage first
//     const savedProducts = localStorage.getItem("products");
//     if (savedProducts) setProducts(JSON.parse(savedProducts));

//     // then fetch latest from server
//     getProductsData();

//     // load cart from localStorage
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) setCartItems(JSON.parse(savedCart));

//     // check token
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//       getUserCart(savedToken);
//     }
//   }, []);

//   // ===================== CONTEXT VALUE =====================
//   const value = {
//     products,
//     currency,
//     delivry_free,
//     searsh,
//     setSearsh,
//     showSearsh,
//     setShowSearsh,
//     addToCart,
//     cartItems,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//     clearCart,setCartItems
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = " EGP";
//   const delivry_free = 50;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [searsh, setSearsh] = useState("");
//   const [showSearsh, setShowSearsh] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const [token, setToken] = useState("");

//   const navigate = useNavigate();

//   // ===================== ADD TO CART =====================
//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("select Product size");
//       return;
//     }

//     let cartData = structuredClone(cartItems);

//     if (!cartData[itemId]) cartData[itemId] = {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

//     setCartItems(cartData);
//     localStorage.setItem("cart", JSON.stringify(cartData));

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + "/api/cart/add",
//           { itemId, size },
//           { headers: { token } }
//         );
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   // ===================== CART COUNT =====================
//   const getCartCount = () => {
//     let total = 0;
//     for (const productId in cartItems) {
//       for (const size in cartItems[productId]) {
//         const qty = cartItems[productId][size];
//         if (typeof qty === "number" && qty > 0) total += qty;
//       }
//     }
//     return total;
//   };

//   // ===================== UPDATE QUANTITY =====================
//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);

//     if (quantity === 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
//     } else {
//       cartData[itemId][size] = quantity;
//     }

//     setCartItems(cartData);
//     localStorage.setItem("cart", JSON.stringify(cartData));

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + "/api/cart/update",
//           { itemId, size, quantity },
//           { headers: { token } }
//         );
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   // ===================== CART AMOUNT =====================
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const productId in cartItems) {
//       const product = products.find((p) => p._id === productId);
//       if (!product) continue;
//       for (const size in cartItems[productId]) {
//         const qty = cartItems[productId][size];
//         if (qty > 0) totalAmount += product.price * qty;
//       }
//     }
//     return totalAmount;
//   };

//   // ===================== PRODUCTS =====================
//   const getProductsData = async () => {
//     try {
//       const res = await axios.get(backendUrl + "/api/product/list");
//       if (res.data.success) {
//         setProducts(res.data.products);
//         localStorage.setItem("products", JSON.stringify(res.data.products));
// console.log(res.data);

//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ===================== USER CART =====================
//   const getUserCart = async (token) => {
//     try {
//       const res = await axios.post(
//         backendUrl + "/api/cart/get",
//         {},
//         { headers: { token } }
//       );
//       if (res.data.success) {
//         setCartItems(res.data.cartData || {});
//         localStorage.setItem("cart", JSON.stringify(res.data.cartData || {}));
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ===================== CLEAR CART (معدل) =====================
//   const clearCart = async () => {
//     try {
//       // 1. مسح من الـ state أولاً
//       setCartItems({});
      
//       // 2. مسح من localStorage
//       localStorage.removeItem("cart");
      
//       // 3. إذا المستخدم مسجل دخول، امسح من الـ API
//       if (token) {
//         try {
//           await axios.post(
//             backendUrl + "/api/cart/clear", // تأكد أن هذا الـ endpoint موجود في الـ backend
//             {},
//             { headers: { token } }
//           );
//           toast.success("تم مسح كل المنتجات من العربة 🛒");
//         } catch (error) {
//           console.log("API clear error:", error);
//           // حتى لو فشل الـ API، العربة اتضحت محلياً
//           toast.success("تم مسح العربة محلياً");
//         }
//       } else {
//         toast.success("تم مسح كل المنتجات من العربة 🛒");
//       }
      
//     } catch (error) {
//       console.error("Clear cart error:", error);
//       toast.error("حدث خطأ أثناء مسح العربة");
//     }
//   };

//   // ===================== EFFECTS =====================
//   useEffect(() => {
//     // load products from localStorage first
//     const savedProducts = localStorage.getItem("products");
//     if (savedProducts) setProducts(JSON.parse(savedProducts));

//     // then fetch latest from server
//     getProductsData();

//     // load cart from localStorage
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) setCartItems(JSON.parse(savedCart));

//     // check token
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//       getUserCart(savedToken);
//     }
//   }, []);

//   // ===================== CONTEXT VALUE =====================
//   const value = {
//     products,
//     currency,
//     delivry_free,
//     searsh,
//     setSearsh,
//     showSearsh,
//     setShowSearsh,
//     addToCart,
//     cartItems,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     token,
//     setToken,
//     clearCart, // ✅ نسخة واحدة فقط
//     setCartItems
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
// ==============
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = " EGP";
  const delivry_free = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searsh, setSearsh] = useState("");
  const [showSearsh, setShowSearsh] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // ===================== ADD TO CART =====================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("select Product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // ===================== CART COUNT =====================
  const getCartCount = () => {
    let total = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (typeof qty === "number" && qty > 0) total += qty;
      }
    }
    return total;
  };

  // ===================== UPDATE QUANTITY =====================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // ===================== CART AMOUNT =====================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          // استخدم finalPrice المحسوب
          const productPrice = getProductFinalPrice(product);
          totalAmount += productPrice * qty;
        }
      }
    }
    return totalAmount;
  };

  // ===================== دالة مساعدة لحساب السعر النهائي =====================
  const getProductFinalPrice = (product) => {
    // لو في نسبة خصم، احسب السعر الجديد
    if (product.discountPercentage > 0) {
      const calculatedPrice = product.price - (product.price * product.discountPercentage / 100);
      // لو في finalPrice من الـ API وأقل من السعر المحسوب، استخدمه
      if (product.finalPrice && product.finalPrice < calculatedPrice) {
        return product.finalPrice;
      }
      return calculatedPrice;
    }
    // لو مفيش خصم، استخدم السعر الأصلي
    return product.price;
  };

  // ===================== PRODUCTS =====================
  const getProductsData = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        // ✅ تعديل مهم: حساب finalPrice من نسبة الخصم
        const productsWithDiscount = res.data.products.map(product => {
          // حساب السعر بعد الخصم
          let finalPrice = product.price;
          
          if (product.discountPercentage > 0) {
            finalPrice = product.price - (product.price * product.discountPercentage / 100);
          }
          
          // استخدام finalPrice من الـ API فقط إذا كان أقل من السعر المحسوب
          if (product.finalPrice && product.finalPrice < finalPrice) {
            finalPrice = product.finalPrice;
          }
          
          return {
            ...product,
            discountPercentage: product.discountPercentage || 0,
            finalPrice: finalPrice
          };
        });
        
        setProducts(productsWithDiscount);
        localStorage.setItem("products", JSON.stringify(productsWithDiscount));
        // console.log("Products with discount:", productsWithDiscount);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ===================== USER CART =====================
  const getUserCart = async (token) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData || {});
        localStorage.setItem("cart", JSON.stringify(res.data.cartData || {}));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ===================== CLEAR CART =====================
  const clearCart = async () => {
    try {
      setCartItems({});
      localStorage.removeItem("cart");
      
      if (token) {
        try {
          await axios.post(
            backendUrl + "/api/cart/clear",
            {},
            { headers: { token } }
          );
          toast.success("تم مسح كل المنتجات من العربة 🛒");
        } catch (error) {
          console.log("API clear error:", error);
          toast.success("تم مسح العربة محلياً");
        }
      } else {
        toast.success("تم مسح كل المنتجات من العربة 🛒");
      }
      
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("حدث خطأ أثناء مسح العربة");
    }
  };

  // ✅ دالة لتحديث الخصم عند انتهاء التايمر
  const updateProductDiscount = (productId, newDiscount, newFinalPrice) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product._id === productId 
          ? { 
              ...product, 
              discountPercentage: newDiscount,
              finalPrice: newFinalPrice
            }
          : product
      )
    );
  };

  // ===================== EFFECTS =====================
  useEffect(() => {
    const initializeData = async () => {
      // load products from localStorage first
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        try {
          const parsedProducts = JSON.parse(savedProducts);
          // إعادة حساب الأسعار للمنتجات المحفوظة
          const productsWithDiscount = parsedProducts.map(product => {
            let finalPrice = product.price;
            
            if (product.discountPercentage > 0) {
              finalPrice = product.price - (product.price * product.discountPercentage / 100);
            }
            
            if (product.finalPrice && product.finalPrice < finalPrice) {
              finalPrice = product.finalPrice;
            }
            
            return {
              ...product,
              discountPercentage: product.discountPercentage || 0,
              finalPrice: finalPrice
            };
          });
          setProducts(productsWithDiscount);
        } catch (e) {
          console.error("Error parsing saved products:", e);
        }
      }

      // load cart from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing saved cart:", e);
        }
      }

      // check token
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await getUserCart(savedToken);
      }

      // then fetch latest from server
      await getProductsData();
    };

    initializeData();
  }, []);

  // ===================== CONTEXT VALUE =====================
  const value = {
    products,
    currency,
    delivry_free,
    searsh,
    setSearsh,
    showSearsh,
    setShowSearsh,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    clearCart,
    setCartItems,
    updateProductDiscount,
    getProductFinalPrice, // ✅ أضفنا الدالة المساعدة
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;