// import { useContext, useState, useEffect } from "react";
// import { assets } from "../assets/frontend_assets/assets";
// import { Link, NavLink } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

// const Navbar = () => {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const {
//     setShowSearsh,
//     getCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   const logout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//     setToken("");
//     setCartItems({});
//   };

//   // scroll behavior
//   const handleScroll = () => {
//     if (window.scrollY > lastScrollY) {
//       setShowNavbar(false); // scrolling down
//     } else {
//       setShowNavbar(true); // scrolling up
//     }
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className=" mb-24">
//       {/* Navbar */}
//       <div
//         className={` fixed top-0  left-0 w-full z-50 transition-transform duration-500 bg-white/90 backdrop-blur-md shadow-md ${
//           showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//         }`}
//       >
//         <div className=" flex items-center justify-between py-5 px-4 sm:px-[3%] font-medium">
//           {/* Logo */}
//           <Link to={"/"} className="flex items-center gap-2">
//             <img
//               className="w-7 sm:w-8 md:w-10 transition-transform hover:scale-105"
//               src={assets.logoo}
//               alt="Fashionesta Logo"
//             />
//             <h1 className="icons select-none text-sm sm:text-base md:text-lg">
//               Fashionesta
//             </h1>
//           </Link>

//           {/* Desktop Menu */}
//           <ul className="hidden sm:flex gap-5 text-sm md:text-base text-gray-700">
//             {["Home", "Collection", "About", "Contact_Us"].map((item, idx) => (
//               <NavLink
//                 key={idx}
//                 to={["/", "/collection", "/about", "/contact"][idx]}
//                 className="flex flex-col items-center gap-1 hover:text-gray-900 transition-colors"
//               >
//                 <p>{item}</p>
//                 <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
//               </NavLink>
//             ))}
//           </ul>

//           {/* Right Icons */}
//           <div className="flex items-center gap-4 sm:gap-5">
//             {/* Search */}
//             {/* <img
//               onClick={() => setShowSearsh(true)}
//               className="w-5 cursor-pointer sm:w-6"
//               src={assets.search_icon}
//               alt="Search"
//             /> */}
//             <NavLink to={"/collection"} className=" ">
//           <img
//                onClick={() => setShowSearsh(true)}
//                className=" w-5 cursor-pointer bg-white"            
//                src={assets.search_icon} 
//                alt=""
//           />
//          </NavLink>

//             {/* Profile */}
//             <div className="group relative">
//               <img
//                 onClick={() => (token ? null : navigate("/login"))}
//                 className="w-5 sm:w-6 cursor-pointer"
//                 src={assets.profile_icon}
//                 alt="Profile"
//               />
//               {token && (
//                 <div className="z-10 absolute right-0 pt-2 hidden group-hover:block">
//                   <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded shadow-md">
//                     <p className="cursor-pointer hover:text-black">My profile</p>
//                     <p
//                       onClick={() => navigate("/orders")}
//                       className="cursor-pointer hover:text-black"
//                     >
//                       Orders
//                     </p>
//                     <p
//                       onClick={logout}
//                       className="cursor-pointer hover:text-black"
//                     >
//                       Logout
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Cart */}
//             <Link className="w-5 sm:w-6 relative" to={"/cart"}>
//               <img src={assets.cart_icon} alt="Cart" />
//               <p className="absolute bg-red-700 text-center w-4 bottom-[-5px] right-[-5px] leading-4 text-white aspect-square rounded-full text-[13px]">
//                 {getCartCount()}
//               </p>
//             </Link>

//             {/* Mobile Menu Toggle */}
//             <img
//               onClick={() => setShowSidebar(true)}
//               className="w-5 sm:hidden cursor-pointer"
//               src={assets.menu_icon}
//               alt="Menu"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transition-all duration-500 ease-in-out transform ${
//           showSidebar ? "translate-x-0 opacity-100 w-full sm:w-80" : "translate-x-full opacity-0 w-0"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Close Button */}
//           <div
//             onClick={() => setShowSidebar(false)}
//             className="flex items-center justify-end p-4 cursor-pointer"
//           >
//             <img
//               className="h-6 rotate-180"
//               src={assets.dropdown_icon}
//               alt="Close"
//             />
//           </div>

//           {/* Sidebar Links */}
//           <nav className="flex flex-col text-gray-900 px-6">
//             {["Home", "Collection", "About", "Contact"].map((item, idx) => (
//               <NavLink
//                 key={idx}
//                 onClick={() => setShowSidebar(false)}
//                 className="py-3 border-b border-gray-200 hover:text-gray-900 transition-colors"
//                 to={["/", "/collection", "/about", "/contact"][idx]}
//               >
//                 {item}
//               </NavLink>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import logoooo from "../assets/frontend_assets/logoooo.svg";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  const [cartAnim, setCartAnim] = useState(false);
  const [cartColor, setCartColor] = useState("grayscale-0"); // الافتراضي

  const {
    setShowSearsh,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

     if (getCartCount() >0) {
    // console.log("aha");
    // setScrollingDown(false);
    
     }
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  // Scroll behavior
  const handleScroll = () => {
    if (window.scrollY > lastScrollY + 5) {
      setScrollingDown(false); // scroll down
    } else if (window.scrollY < lastScrollY - 5) {
      setScrollingDown(false); // scroll up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Cart animation + color
  useEffect(() => {
    setCartAnim(true);
    setCartColor("text-red-500"); // لون عند التحديث
    const timer = setTimeout(() => {
      setCartAnim(false);
      setCartColor("text-gray-700"); // رجوع للون الافتراضي
    }, 300);
    return () => clearTimeout(timer);
  }, [getCartCount()]);

  return (
    <div className="mb-16">
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 bg-white/90 backdrop-blur-md shadow-md ${
          scrollingDown ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex items-center justify-between py-5 px-4 sm:px-[3%] font-medium">
          {/* Logo */}
          <Link 
                     onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth",  })}
          
          to={"/"} className="flex items-center gap-1">
            <img
               className="w-7  sm:w-8 md:w-10 transition-transform hover:scale-105"
              src={assets.logoooo}
              alt="Shams Logo"
            /> 
            
            <h1 className="icons  font-extrabold select-none text-sm sm:text-base md:text-lg">
              ShamsStore
            </h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-5 text-sm md:text-base text-gray-700">
         {[
  { name: "الرئيسية", path: "/" },
  { name: "المنتجات", path: "/collection" },
  { name: "من نحن", path: "/about" },
  { name: "تواصل معنا", path: "/contact" },
].map((item, idx) => (
  <NavLink
    key={idx}
    to={item.path}
    className="flex flex-col items-center gap-1 hover:text-gray-900 transition-colors"
  >
    <p>{item.name}</p>
    <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
  </NavLink>
))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search */}
            <NavLink onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth",  })} to={"/collection"}>
              <img
                onClick={() => setShowSearsh(true)}
                className="w-5 cursor-pointer bg-white"
                src={assets.search_icon}
                alt=""
              />
            </NavLink>

            {/* Profile */}
            <div className="group relative">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                className="w-5 sm:w-6 cursor-pointer"
                src={assets.profile_icon}
                alt="Profile"
              />
              {token && (
                <div className="z-10 absolute right-0 pt-2 hidden group-hover:block">
                  <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded shadow-md">
                    {/* <p className="cursor-pointer hover:text-black">الملف الشخصي</p> */}
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer hover:text-black"
                    >
                      طلباتي
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      تسجيل خروج
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
            // onClick={() => setScrollingDown(true)}
                     onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth",  })}
            
            className="w-5 sm:w-6 relative" to={"/cart"}>
              <img

                className={`transition-transform  duration-300 ${cartAnim ? "scale-125" : "scale-100"} ${cartColor}`}
                src={assets.cart_icon}
                alt="Cart"
              />
              <p className="absolute bg-red-700 text-center w-4 bottom-[-5px] right-[-5px] leading-4 text-white aspect-square rounded-full text-[13px]">
                {getCartCount()}
              </p>
            </Link>

            {/* Mobile Menu Toggle */}
            <img
              onClick={() => setShowSidebar(true)}
              className="w-5 sm:hidden cursor-pointer"
              src={assets.menu_icon}
              alt="Menu"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transition-all duration-500 ease-in-out transform ${
          showSidebar
            ? "translate-x-0 opacity-100 w-full sm:w-80"
            : "translate-x-full opacity-0 w-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div
            onClick={() => setShowSidebar(false)}
            className="flex items-center justify-end p-4 cursor-pointer"
          >
            <img
              className="h-6 rotate-180"
              src={assets.dropdown_icon}
              alt="Close"
            />
          </div>

          {/* Sidebar Links */}
          {/* <nav className="flex flex-col text-gray-900 px-6">
            {["Home", "Collection", "About", "Contact"].map((item, idx) => (
              <NavLink
                key={idx}
                onClick={() => setShowSidebar(false)}
                className="py-3 border-b border-gray-200 hover:text-gray-900 transition-colors"
                to={["/", "/collection", "/about", "/contact"][idx]}
              >
                {item}
              </NavLink>
            ))}
          </nav> */}
          <nav className="flex flex-col px-6 py-4 gap-2">
  {[
  { name: "الرئيسية", path: "/" },
  { name: "المنتجات", path: "/collection" },
  { name: "من نحن", path: "/about" },
  { name: "تواصل معنا", path: "/contact" },
].map((item, idx) => (
    <NavLink
      key={idx}
      to={item.path}
      onClick={() => setShowSidebar(false)}
      className={({ isActive }) =>
        `
        relative py-3 px-4 rounded-lg font-medium
        transition-all duration-300
        ${
          isActive
            ? "bg-gray-900 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }
        `
      }
    >
      {item.name}
    </NavLink>
  ))}
</nav>

        </div>
      </div>
    </div>
  );
};

export default  Navbar;


