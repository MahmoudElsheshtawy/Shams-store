// // import React from "react";
// // import { Route, Routes } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Collection from "./pages/Collection";
// // import About from "./pages/About";
// // import Contect from "./pages/Contect";
// // import Product from "./pages/Product";
// // import Cart from "./pages/Cart";
// // // import Login from "./pages/login";
// // import PlaceOrder from "./pages/PlaceOrder";
// // import Orders from "./pages/Orders";
// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";
// // import Searshbar from "./components/Searshbar";
// //  import { ToastContainer, toast } from 'react-toastify';
// //   import 'react-toastify/dist/ReactToastify.css';
// // import Login from "./pages/Login";
// // const App = () => {
  
// //   return (
// //     <div>
// //       <div className=" px-1  sm:px-[vw] md:px-[7vw] lg:px-[9vw]  ">
// //          <ToastContainer/>
// //         <Navbar />
// //         <Searshbar/>
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/collection" element={<Collection />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/contact" element={<Contect />} />
// //           <Route path="/product/:productId" element={<Product />} />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/place-order" element={<PlaceOrder />} />
// //           <Route path="/orders" element={<Orders />} />
// //         </Routes>
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;
// import React, { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Collection from "./pages/Collection";
// import About from "./pages/About";
// import Contect from "./pages/Contect";
// import Product from "./pages/Product";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import PlaceOrder from "./pages/PlaceOrder";
// import Orders from "./pages/Orders";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Searshbar from "./components/Searshbar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const App = () => {
  
//   useEffect(() => {
//     const visited = localStorage.getItem("visited");

//     if (!visited) {
//       axios.post(`${backendUrl}/visit`)
//         .then(res => {
//           if (res.data.success) console.log("تم تسجيل الزيارة");
//         })
//         .catch(err => console.error(err));

//       localStorage.setItem("visited", "true");
//     }
//   }, []);


//   return (
//     <div>
//       <div className="px-1 sm:px-[vw] md:px-[7vw] lg:px-[9vw]">
//         <ToastContainer />
//         <Navbar />
//         <Searshbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/collection" element={<Collection />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contect />} />
//           <Route path="/product/:productId" element={<Product />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/place-order" element={<PlaceOrder />} />
//           <Route path="/orders" element={<Orders />} />
//         </Routes>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contect from "./pages/Contect";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searshbar from "./components/Searshbar";
import Loader from "./components/Loader";
import LoginModal from "./components/LoginModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { ShopContext } from "./context/ShopContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    showLoginModal,
    closeLoginModal,
    backendUrl,
    setToken,
    navigate,
  } = useContext(ShopContext);

  // =========================
  // Page Loader
  // =========================
  useEffect(() => {
    const minTime = new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    const pageLoad = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, {
          once: true,
        });
      }
    });

    Promise.all([minTime, pageLoad]).then(() => {
      setIsLoading(false);
    });
  }, []);

  // =========================
  // Register Visit
  // =========================
  useEffect(() => {
    const visited = localStorage.getItem("visited");

    if (!visited) {
      axios
        .post(`${backendUrl}/visit`)
        .then((res) => {
          if (res.data.success) {
            console.log("تم تسجيل الزيارة");
          }
        })
        .catch((err) => {
          console.error("Visit error:", err);
        });

      localStorage.setItem("visited", "true");
    }
  }, [backendUrl]);

  return (
    <div>
      {/* Loading Screen */}
      <Loader isLoading={isLoading} />

      {/* =========================
          Login Portal
      ========================= */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        backendUrl={backendUrl}
        setToken={setToken}
        navigate={navigate}
      />

      <div className="px-1 sm:px-[vw] md:px-[7vw] lg:px-[9vw]">
        {/* Toast */}
        <ToastContainer />

        {/* Navbar */}
        <Navbar />

        {/* Search */}
        <Searshbar />

        {/* =========================
            Routes
        ========================= */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/collection"
            element={<Collection />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contect />}
          />

          <Route
            path="/product/:productId"
            element={<Product />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* يمكن الاحتفاظ بصفحة Login القديمة */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/place-order"
            element={<PlaceOrder />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;