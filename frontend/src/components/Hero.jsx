// import React, { useEffect, useState } from "react";
// import { assets } from "../assets/frontend_assets/assets";
// import { motion, AnimatePresence } from "framer-motion";

// const Hero = () => {
//    const [show, setShow] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShow(true), 100); // delay صغير للtransition
//     return () => clearTimeout(timer);
//   }, []);
//   return (
//     <div className="mb- mt-24">
//       <div className="relative aspect-[3/1]">
//         <AnimatePresence>
//           <motion.img
//             src={assets.sportImg}
//             alt="Hero"
//             className="absolute inset-0 w-full h-full object-cover rounded-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//           />
//         </AnimatePresence>
//       </div>
//       <div className="relative w-[90%] m-auto">
//    <div className="relative w-[90%] m-auto">
//       <div
//         className={`
//           bg-green-800/80 text-white
//           px-3 py-5
//           relative mt-[-30px] 
//           rounded-lg shadow-lg
//           md:text-xl md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:px-8 md:py-6

//           transition-all duration-700 ease-out
//           ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"}
//         `}
//       >
//         {/* اسم البراند في النص بخط Young Serif */}
//         <span className="font-young fv font-extrabold text-4xl md:text-2xl block text-center mb-2">
//           Shams Store
//         </span>

//         {/* باقي النص بخط Roboto */}
//         <span className="text-xl font-roboto block text-left">
//           Your Ultimate Destination for Sportswear Footwear
//         </span>
//       </div>
//     </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
// import React, { useEffect, useState } from "react";
// import { assets } from "../assets/frontend_assets/assets";

// const Hero = () => {
//   const images = [
//     assets.img_1,
//     assets.img_2,
//     assets.img_3,
//     assets.img_4,
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full h-[100px] md:h-[400px] lg:h-[400px] overflow-hidden rounded-xl relative">
//       {images.map((img, i) => (
//         <img
//           key={i}
//           src={img}
//           alt="hero"
//           className={`
//             w-full h-full object-contain absolute top-0 left-0
//             transition-opacity duration-1000
//             ${i === index ? "opacity-100" : "opacity-0"}
//           `}
//         />
//       ))}
//     </div>
//   );
// };

// export default Hero;
import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative mt-20 md:mt-28 px-1 md:px-8 lg:px-16">
      
      {/* الحاوية الرئيسية */}
      <div className="relative  max-w-7xl mx-auto">
        
        {/* الصورة الأولى - الخلفية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl md:rounded-4xl shadow-2xl"
        >
          <img
            src={assets.sportImg}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* الصورة الثانية - تظهر فقط في الشاشات الصغيرة والمتوسطة */}
       <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3, delay: 0.2 }}
  className="
  
   -translate-x-1/2 -translate-y-1/2 
    w-[85%] sm:w-[70%] md:w-[55%]
    z-20
   mx-6
    block md:hidden 
  "
>
  <div className="
    

    bg-gradient-to-br from-white/95 to-gray-100/95
    backdrop-blur-sm
    rounded-2xl
    p-1 sm:p-2
    shadow-2xl
    border border-white/50
    transform transition-all duration-300
    hover:shadow-3xl hover:-translate-y-1
  ">
    <img
      src={assets.ShamsStoreHome2}
      alt="Overlay content"
      className="
        w-full
        h-auto
        rounded-xl
        object-contain
        shadow-inner
      "
    />
    
    {/* Decorative elements */}
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full" />
    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-500 rounded-full" />
  </div>
</motion.div>

        {/* محتوى إضافي للشاشات الكبيرة */}
        <div className="
          hidden
          lg:flex
          absolute
          inset-0
          items-center
          justify-center
          pointer-events-none
        ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="
              bg-gradient-to-r from-blue-600/20 to-purple-600/20
              backdrop-blur-sm
              rounded-2xl
              p-8
              max-w-2xl
              mx-8
              border border-white/20
              shadow-2xl
            "
          >
            <h1 className="
              text-4xl md:text-5xl lg:text-6xl
              font-bold
              text-lime-500
              text-center
              mb-4
              drop-shadow-lg
              icons
            ">
          Shams Store
            </h1>
            <p className="
              text-lg
              text-gray-200
              text-center
              drop-shadow-md
            ">
        It offers you the latest trends in sportswear and fashionable shoes.    </p>
          </motion.div>
        </div>

        {/* مؤشر للتمرير */}
        <div className="
          hidden
          lg:flex
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          animate-bounce
        ">
          <span className="text-white/80 text-sm">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2" />
          </div>
        </div>

      </div>

      {/* Spacer للتأكد من عدم تداخل المحتوى */}
      {/* <div className="h-32 md:h-40 lg:h-20" /> */}

    </div>
  );
};

export default Hero;