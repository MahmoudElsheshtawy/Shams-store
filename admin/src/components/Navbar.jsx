import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Menu } from "lucide-react";
const Navbar = ({ setToken }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // handle scroll behavior
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // scrolling down -> hide navbar
      setShow(false);
    } else {
      // scrolling up -> show navbar
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        show ? 'translate-y-0 opacity-100 shadow-md' : '-translate-y-full opacity-0'
      } backdrop-blur-lg bg-white/70 flex items-center justify-between py-2 px-[3%]`}
    >
       <h1 className="icons p-4 font-extrabold select-none text-sm sm:text-base md:text-lg">
              ShamsStore
            </h1>
      <button
        onClick={() => setToken('')}
        className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;























// import React from 'react'
// import  { assets } from '../assets/assets'
// const Navbar = ({setToken}) => {
//   return (
//     <div className="shadow-md  flex items-center py-2 px-[3%] justify-between">
//        <img className= " w-28" src={assets.admin} alt="" />
//        <button onClick={()=>setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
//     </div>
//   )
// }

// export default Navbar