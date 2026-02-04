// import React from "react";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
// const Sidebar = () => {
//   return (
//     <div className=" w-[18%] min-h-screen border-r-2">
//       <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
//         <NavLink
//           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
//           to="/add"
//         >
//           <img className="w-5 h-5" src={assets.add_icon} alt="" />
//           <p className="hidden md:block">Add Items</p>
//         </NavLink>

//         <NavLink
//           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
//           to="/list"
//         >
//           <img className="w-5 h-5" src={assets.order_icon} alt="" />
//           <p className="hidden md:block"> List Item</p>
//         </NavLink>

//         <NavLink
//           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
//           to="/orders"
//         >
//           <img className="w-5 h-5" src={assets.order_icon} alt="" />
//           <p className="hidden md:block">Orders</p>
//         </NavLink>
//         {/* <Link > Electrical Products</Link> */}
//         <NavLink
//           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
//           to="/electrical/add"
//         >
//           <img className="w-5 h-5" src={assets.order_icon} alt="" />
//           <p className="hidden md:block">Add Electrical </p>
//         </NavLink>
//         <NavLink
//           className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
//           to="/electrical/list"
//         >
//           <img className="w-5 h-5" src={assets.order_icon} alt="" />
//           <p className="hidden md:block"> Electrical List </p>
//         </NavLink>
//         <NavLink
//           to="/ramadan/add"
//           className="flex items-center gap-3 border px-3 py-2 rounded-l"
//         >
//           🌙 <p className="hidden md:block">Ramadan_Eid</p>
//         </NavLink>

//         <NavLink
//           to="/ramadan/list"
//           className="flex items-center gap-3 border px-3 py-2 rounded-l"
//         >
//            <p className="hidden md:block">Ramadan List</p>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { GiElectric, GiMoon, GiLantern } from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
          to="/add"
        >
          <AiOutlinePlusCircle className="text-xl" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
          to="/list"
        >
          <AiOutlineUnorderedList className="text-xl" />
          <p className="hidden md:block">All products</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
          to="/orders"
        >
          <FaShoppingCart className="text-xl" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
          to="/electrical/add"
        >
          <GiElectric className="text-xl" />
          <p className="hidden md:block">Add Electrical</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
          to="/electrical/list"
        >
          <MdElectricalServices className="text-xl" />
          <p className="hidden md:block">Electrical List</p>
        </NavLink>

        {/* <NavLink
          to="/ramadan/add"
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
        >
          <GiMoon className="text-xl" />
          <p className="hidden md:block">Add Ramadan</p>
        </NavLink> */}

        {/* <NavLink
          to="/ramadan/list"
          className="flex items-center gap-3 px-3 py-2 rounded-l hover:bg-gray-100 transition"
        >
          <GiLantern className="text-xl" />
          <p className="hidden md:block">Ramadan List</p>
        </NavLink> */}

      </div>
    </div>
  );
};

export default Sidebar;
