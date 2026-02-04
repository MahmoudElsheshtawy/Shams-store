import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
   const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100); // delay صغير للtransition
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="mb- mt-24">
      <div className="relative aspect-[3/1]">
        <AnimatePresence>
          <motion.img
            src={assets.sportImg}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
      <div className="relative w-[90%] m-auto">
   <div className="relative w-[90%] m-auto">
      <div
        className={`
          bg-green-800/80 text-white
          px-3 py-5
          relative mt-[-30px] 
          rounded-lg shadow-lg
          md:text-xl md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:px-8 md:py-6

          transition-all duration-700 ease-out
          ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"}
        `}
      >
        {/* اسم البراند في النص بخط Young Serif */}
        <span className="font-young fv font-extrabold text-4xl md:text-2xl block text-center mb-2">
          Shams Store
        </span>

        {/* باقي النص بخط Roboto */}
        <span className="text-xl font-roboto block text-left">
          Your Ultimate Destination for Sportswear Footwear
        </span>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Hero;
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
