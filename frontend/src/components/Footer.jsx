// import React from "react";
// // import { assets } from "../assets/frontend_assets/assets";

// const Footer = () => {
//   return (
//     <div className="bg-gray-900 text-gray-300 pt-16 pb-6 px-6 md:px-20 mt-32">
//   {/* Footer Grid */}
//   <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-3 gap-14 mb-10 text-sm">
//     {/* Logo + Description */}
//     <div>
//       <h1 className="text-3xl font-bold text-white mb-4 tracking-wide">
//         Fashionesta
//       </h1>
//       <p className="text-gray-400 leading-relaxed w-full md:w-4/5">
//         Fashionesta brings you the latest trends with timeless elegance.
//         Discover your style and express yourself with confidence.
//       </p>
//     </div>

//     {/* Company Links */}
//     <div>
//       <p className="text-lg font-semibold text-white mb-5">COMPANY</p>
//       <ul className="flex flex-col gap-2 text-gray-400">
//         <li className="hover:text-white cursor-pointer transition-colors">Home</li>
//         <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
//         <li className="hover:text-white cursor-pointer transition-colors">Delivery</li>
//         <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
//       </ul>
//     </div>

//     {/* Contact Info */}
//     <div>
//       <p className="text-lg font-semibold text-white mb-5">GET IN TOUCH</p>
//       <ul className="flex flex-col gap-2 text-gray-400">
//         <li>📞 01066531217</li>
    
//       </ul>
//     </div>
//   </div>

//   {/* Divider */}
//   <div className="border-t border-gray-700 my-6"></div>

//   {/* Bottom Text */}
//   <p className="text-center text-gray-500 text-sm tracking-wide">
//     Created by: Mahmoud_Elsheshtawy — 01093482958
//   </p>
// </div>


//   );
// };

// export default Footer;
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  // Animation عند mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // Delay صغير للfade-in
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-white  shadow-2xl rounded-t-xl pt-16 pb-6 px-6 md:px-20 mt-32 transition-all duration-700 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      {/* Footer Grid */}
      <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-3 gap-14 mb-10 text-sm">
        {/* Logo + Description */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-wide">
            Shams Store
          </h1>
          <p className="text-gray-600 leading-relaxed w-full md:w-4/5">
            Shams_Store brings you the latest trends with timeless elegance.
            Discover your style and express yourself with confidence.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-gray-900 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">Delivery</li>
            <li className="hover:text-gray-900 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>📞 01092997107</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Bottom Text */}
      <p className="text-center text-gray-500 text-sm tracking-wide">
        Created by: Mahmoud_Elsheshtawy — 01093482958
      </p>
    </div>
  );
};

export default Footer;
