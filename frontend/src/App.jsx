import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contect from "./pages/Contect";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
// import Login from "./pages/login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searshbar from "./components/Searshbar";
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
const App = () => {
  return (
    <div>
      <div className=" px-1 sm:px-[4vw] md:px-[7vw] lg:px-[9vw]  ">
         <ToastContainer/>
        <Navbar />
        <Searshbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contect />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
