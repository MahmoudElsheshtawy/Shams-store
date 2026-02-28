// // import React from "react";
// // import { NavLink } from "react-router-dom";
// // import { assets } from "../assets/assets";
// // const Sidebar = () => {
// //   return (
// //     <div className=" w-[18%] min-h-screen border-r-2">
// //       <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
// //         <NavLink
// //           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
// //           to="/add"
// //         >
// //           <img className="w-5 h-5" src={assets.add_icon} alt="" />
// //           <p className="hidden md:block">Add Items</p>
// //         </NavLink>

// //         <NavLink
// //           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
// //           to="/list"
// //         >
// //           <img className="w-5 h-5" src={assets.order_icon} alt="" />
// //           <p className="hidden md:block"> List Item</p>
// //         </NavLink>

// //         <NavLink
// //           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
// //           to="/orders"
// //         >
// //           <img className="w-5 h-5" src={assets.order_icon} alt="" />
// //           <p className="hidden md:block">Orders</p>
// //         </NavLink>
// //         {/* <Link > Electrical Products</Link> */}
// //         <NavLink
// //           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
// //           to="/electrical/add"
// //         >
// //           <img className="w-5 h-5" src={assets.order_icon} alt="" />
// //           <p className="hidden md:block">Add Electrical </p>
// //         </NavLink>
// //         <NavLink
// //           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
// //           to="/electrical/list"
// //         >
// //           <img className="w-5 h-5" src={assets.order_icon} alt="" />
// //           <p className="hidden md:block"> Electrical List </p>
// //         </NavLink>
// //         <NavLink
// //           to="/ramadan/add"
// //           className="flex items-center gap-3 border px-3 py-2 rounded-l"
// //         >
// //           🌙 <p className="hidden md:block">Ramadan_Eid</p>
// //         </NavLink>

// //         <NavLink
// //           to="/ramadan/list"
// //           className="flex items-center gap-3 border px-3 py-2 rounded-l"
// //         >
// //            <p className="hidden md:block">Ramadan List</p>
// //         </NavLink>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   AiOutlinePlusCircle,
//   AiOutlineUnorderedList,
// } from "react-icons/ai";
// import { FaShoppingCart } from "react-icons/fa";
// import { GiElectric, GiMoon, GiLantern } from "react-icons/gi";
// import { MdElectricalServices } from "react-icons/md";

// const Sidebar = () => {
//   return (
//     <div className=" min-h-screen border-r-2 bg-white">
//       <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

//         <NavLink
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//           to="/add"
//         >
//           <AiOutlinePlusCircle className="text-xl" />
//           <p className="hidden md:block"> إضافة منتجات</p>
//         </NavLink>

//         <NavLink
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//           to="/list"
//         >
//           <AiOutlineUnorderedList className="text-xl" />
//           <p className="hidden md:block">جميع المنتجات</p>
//         </NavLink>

//         <NavLink
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//           to="/orders"
//         >
//           <FaShoppingCart className="text-xl" />
//           <p className="hidden md:block">الطلبات</p>
//         </NavLink>

//         <NavLink
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//           to="/electrical/add"
//         >
//           <GiElectric className="text-xl" />
//           <p className="hidden md:block"> اضافه حذاء</p>
//         </NavLink>

//         <NavLink
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//           to="/electrical/list"
//         >
//           <AiOutlineUnorderedList className="text-xl" />
//           <p className="hidden md:block">قائمه الاحذيه الرياضيه</p>
//         </NavLink>

//         {/* <NavLink
//           to="/ramadan/add"
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//         >
//           <GiMoon className="text-xl" />
//           <p className="hidden md:block">Add Ramadan</p>
//         </NavLink> */}

//         {/* <NavLink
//           to="/ramadan/list"
//           className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
//         >
//           <GiLantern className="text-xl" />
//           <p className="hidden md:block">Ramadan List</p>
//         </NavLink> */}

//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
// import { FaShoppingCart } from "react-icons/fa";
// import { GiElectric } from "react-icons/gi";
// import { LuPackage } from "react-icons/lu"; // أيقونة إضافية لقائمة رمضان

// const Sidebar = () => {
//   // دالة لتحديد كلاس الـ NavLink النشط
//   const navLinkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
//       isActive
//         ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-500 md:border-r-4 md:border-l-0"
//         : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//     }`;

//   const mobileNavLinkClass = ({ isActive }) =>
//     `flex flex-col items-center justify-center min-w-[70px] py-2 px-1 rounded-lg transition-all duration-200 ${
//       isActive
//         ? "text-emerald-600 bg-emerald-50"
//         : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//     }`;

//   return (
//     <>
//       {/* ========== نسخة الموبايل (شاشات أصغر من md) ========== */}
//       <div className="md:hidden w-full bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
//         <div className="flex items-center justify-start overflow-x-auto px-1 py-1 gap-1 scrollbar-hide">
//           <NavLink to="/add" className={mobileNavLinkClass}>
//             <AiOutlinePlusCircle className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">إضافة</span>
//           </NavLink>

//           <NavLink to="/list" className={mobileNavLinkClass}>
//             <AiOutlineUnorderedList className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">المنتجات</span>
//           </NavLink>

//           <NavLink to="/orders" className={mobileNavLinkClass}>
//             <FaShoppingCart className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">الطلبات</span>
//           </NavLink>

//           <NavLink to="/electrical/add" className={mobileNavLinkClass}>
//             <GiElectric className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">أحذية</span>
//           </NavLink>

//           <NavLink to="/electrical/list" className={mobileNavLinkClass}>
//             <AiOutlineUnorderedList className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">قائمتهم</span>
//           </NavLink>

//           {/* ============================================== */}
//               <NavLink to="/gloves/add" className={mobileNavLinkClass}>
//             <GiElectric className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">جوانتي</span>
//           </NavLink>

//           <NavLink to="/gloves/list" className={mobileNavLinkClass}>
//             <AiOutlineUnorderedList className="text-2xl" />
//             <span className="text-[11px] mt-1 whitespace-nowrap">قايمه الجوانتي</span>
//           </NavLink>
//           {/* ============================================== */}

         
//         </div>
//       </div>

//       {/* ========== نسخة الديسكتوب (شاشات md فأكبر) ========== */}
//       <aside className="hidden md:flex md:flex-col w-64 bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto shadow-sm">
//         <div className="p-4 border-b border-gray-100">
//           <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//             <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
//             لوحة التحكم
//           </h2>
//         </div>

//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {/* مجموعة المنتجات الرئيسية */}
//           <div className="mb-4">
//             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
//               عام
//             </p>
//             <NavLink to="/add" className={navLinkClass}>
//               <AiOutlinePlusCircle className="text-xl" />
//               <span>إضافة منتج</span>
//             </NavLink>

//             <NavLink to="/list" className={navLinkClass}>
//               <AiOutlineUnorderedList className="text-xl" />
//               <span>جميع المنتجات</span>
//             </NavLink>

//             <NavLink to="/orders" className={navLinkClass}>
//               <FaShoppingCart className="text-xl" />
//               <span>الطلبات</span>
//             </NavLink>
//           </div>

//           {/* مجموعة الأحذية */}
//           <div className="mb-4">
//             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
//               الأحذية
//             </p>
//             <NavLink to="/electrical/add" className={navLinkClass}>
//               <GiElectric className="text-xl" />
//               <span>إضافة حذاء</span>
//             </NavLink>

//             <NavLink to="/electrical/list" className={navLinkClass}>
//               <AiOutlineUnorderedList className="text-xl" />
//               <span>قائمة الأحذية</span>
//             </NavLink>
//           </div>

//           {/* مجموعة رمضان */}
       
//         </nav>

//         <div className="p-4 border-t border-gray-100">
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
//             <span>جميع الحقوق محفوظة © 2025</span>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { GiElectric, GiGloves, GiRunningShoe } from "react-icons/gi"; // أضفنا GiGloves و GiRunningShoe
import { LuPackage } from "react-icons/lu";
import { MdOutlineSportsHandball } from "react-icons/md"; // أيقونة بديلة للقفازات
import { Gem, Layers, Users } from "lucide-react";

const Sidebar = () => {
  // دالة لتحديد كلاس الـ NavLink النشط
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-500 md:border-r-4 md:border-l-0"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center min-w-[70px] py-2 px-1 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-emerald-600 bg-emerald-50"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* ========== نسخة الموبايل (شاشات أصغر من md) ========== */}
      <div className="md:hidden w-full bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-start overflow-x-auto px-1 py-1 gap-1 scrollbar-hide">
          <NavLink to="/add" className={mobileNavLinkClass}>
            <AiOutlinePlusCircle className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">إضافة</span>
          </NavLink>

          <NavLink to="/list" className={mobileNavLinkClass}>
            <AiOutlineUnorderedList className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">المنتجات</span>
          </NavLink>

          <NavLink to="/orders" className={mobileNavLinkClass}>
            <FaShoppingCart className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">الطلبات</span>
          </NavLink>

          {/* قسم الأحذية في الموبايل */}
          <NavLink to="/electrical/add" className={mobileNavLinkClass}>
            <GiRunningShoe className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">إضافة حذاء</span>
          </NavLink>

          <NavLink to="/electrical/list" className={mobileNavLinkClass}>
            <AiOutlineUnorderedList className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">قائمة أحذية</span>
          </NavLink>

          {/* قسم القفازات في الموبايل */}
          <NavLink to="/gloves/add" className={mobileNavLinkClass}>
            <GiGloves className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">إضافة قفاز</span>
          </NavLink>

          <NavLink to="/gloves/list" className={mobileNavLinkClass}>
            <AiOutlineUnorderedList className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">قائمة قفازات</span>
          </NavLink>
             {/* <NavLink to="/users" className={navLinkClass}>
              <Users className="text-[11px] mt-1 whitespace-nowrap" />
              <span>جميع المستخدمين</span>
            </NavLink> */}
            <NavLink to="/users" className={mobileNavLinkClass}>
              <Users className="text-2xl" />
              <span className="text-[11px] mt-1 whitespace-nowrap">المستخدمين</span>
            </NavLink>

         <NavLink to="/Accessories/add" className={mobileNavLinkClass}>
  <Gem className="text-2xl text-emerald-500" />
  <span className="text-[11px] mt-1 whitespace-nowrap">الإكسسوارات</span>
</NavLink>

<NavLink to="/Accessories/list" className={mobileNavLinkClass}>
  <Layers className="text-2xl text-emerald-500" />
  <span className="text-[11px] mt-1 whitespace-nowrap">قائمة الإكسسوارات</span>
</NavLink>
        </div>
      </div>

      {/* ========== نسخة الديسكتوب (شاشات md فأكبر) ========== */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            لوحة التحكم
          </h2>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {/* مجموعة المنتجات الرئيسية */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              عام
            </p>
            <NavLink to="/add" className={navLinkClass}>
              <AiOutlinePlusCircle className="text-xl" />
              <span>إضافة منتج</span>
            </NavLink>

            <NavLink to="/list" className={navLinkClass}>
              <AiOutlineUnorderedList className="text-xl" />
              <span>جميع المنتجات</span>
            </NavLink>

            <NavLink to="/orders" className={navLinkClass}>
              <FaShoppingCart className="text-xl" />
              <span>الطلبات</span>
            </NavLink>
          </div>

          {/* مجموعة الأحذية */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              الأحذية
            </p>
            <NavLink to="/electrical/add" className={navLinkClass}>
              <GiRunningShoe className="text-xl" />
              <span>إضافة حذاء</span>
            </NavLink>

            <NavLink to="/electrical/list" className={navLinkClass}>
              <AiOutlineUnorderedList className="text-xl" />
              <span>قائمة الأحذية</span>
            </NavLink>
          </div>

          {/* مجموعة القفازات */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              القفازات
            </p>
            <NavLink to="/gloves/add" className={navLinkClass}>
              <GiGloves className="text-xl" />
              <span>إضافة قفاز</span>
            </NavLink>

            <NavLink to="/gloves/list" className={navLinkClass}>
              <AiOutlineUnorderedList className="text-xl" />
              <span>قائمة القفازات</span>
            </NavLink>
         
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          الإكسسوارات            </p>
              <NavLink to="/Accessories/add" className={navLinkClass}>
              <Gem className="text-xl" />
              <span>إضافة إكسسوارات</span>
            </NavLink>
              <NavLink to="/Accessories/list" className={navLinkClass}>
              <Layers className="text-xl" />
              <span>قائمة الإكسسوارات</span>
            </NavLink>
  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              {/* القفازات */}
                المستخدمين
            </p>
                   <NavLink to="/users" className={navLinkClass}>
              <Users className="text-xl" />
              <span>جميع المستخدمين</span>
            </NavLink>
                 
          </div>
        </nav>

        
      </aside>
    </>
  );
};

export default Sidebar;