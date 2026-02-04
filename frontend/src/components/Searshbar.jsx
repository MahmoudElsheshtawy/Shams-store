import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Searshbar = () => {
    const {searsh,setSearsh,showSearsh,setShowSearsh} =useContext(ShopContext);
    const [visible,setVisible]=useState(false)
    const location =useLocation();
    
    useEffect(()=>{
      if (location.pathname.includes('/collection')) {
        setVisible(true)
        
      }
      else{
        setVisible(false)
      }
    },[location])


  return showSearsh && visible ? (
    <div>

<AnimatePresence>
  {showSearsh && (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className=" fixed inset-x-0 top-0 z-50 border-t border-b bg-gray-50/80 backdrop-blur-md text-center shadow-md"
    >
      {/* Search Box */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="  inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white/80 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <input
          onChange={(e) => setSearsh(e.target.value)}
          className="  flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
          type="text"
          placeholder="Search..."
          value={searsh}
        />

        <motion.img
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.25 }}
          className="w-5 cursor-pointer "
          src={assets.search_icon}
          alt="search"
        />
      </motion.div>

      {/* Close Icon */}
      <motion.img
        onClick={() => setShowSearsh(false)}
        whileHover={{ rotate: 90, scale: 1.2 }}
        transition={{ duration: 0.3 }}
        className="inline  w-4 cursor-pointer mb-4 opacity-80 hover:opacity-100 transition-all"
        src={assets.cross_icon}
        alt="close"
      />
    </motion.div>
  )}
</AnimatePresence>

    {/* <div className=" z-50 border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
      <input onChange={(e)=>setSearsh(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search" value={searsh}/>
      <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearsh(false)} className=' inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div> */}

    </div>
  ):null
}

export default Searshbar