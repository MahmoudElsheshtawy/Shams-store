
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";
import { motion, AnimatePresence } from "framer-motion";

const Collection = () => {
  const { products = [], searsh, showSearsh } = useContext(ShopContext); // ⬅️ حماية products
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // ---------- الفلتر ----------
  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const categoriesList = [
  { label: "رجالي", value: "Men" },
  { label: "حريمي", value: "Women" },
  { label: "أطفال", value: "Kids" },
  { label: "أحذية", value: "shoes" },
];

  const togglesubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    if (!Array.isArray(products)) return; // 🛡️ حماية

    let productsCopy = [...products];

    // بحث
    if (showSearsh && searsh) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(searsh.toLowerCase())
      );
    }

    // فلتر الكاتيجوري
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // فلتر الساب كاتيجوري
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // ---------- الفرز ----------
  const sortProducts = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // ---------- useEffects ----------
  useEffect(() => {
    if (Array.isArray(products)) setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, searsh, showSearsh, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t bg-white text-gray-800">
      {/* 🧩 FILTER SIDEBAR */}
      <div className="w-full sm:w-60 px-3 sm:px-0">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-3 text-xl flex items-center justify-between sm:justify-start cursor-pointer gap-2 font-semibold"
        >
          الفلاتر
          <img
            className={`h-4 sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <AnimatePresence>
          {(showFilter || window.innerWidth >= 640) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-200 rounded-lg p-5 mt-4 bg-white shadow-sm"
            >
              <p className="mb-3 text-lg font-semibold text-gray-700">التصنيفات</p>
           <div className="flex flex-col gap-3 text-sm text-gray-700">
  {categoriesList.map((cat) => (
    <label
      key={cat.value}
      className="flex items-center gap-2 cursor-pointer txt hover:text-gray-900"
    >
      <input
        type="checkbox"
        value={cat.value}   // 👈 ده اللي بيتفلتر
        onChange={togglecategory}
        className="accent-black"
      />
      {cat.label}         {/* 👈 ده اللي المستخدم يشوفه */}
    </label>
  ))}
</div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🛍️ PRODUCTS SECTION */}
      <div className="flex-1 px-3 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="text-xl sm:text-2xl font-semibold">
            <p>
              جميع____<span className="text-gray-600 font-medium">المنتجات</span>
            </p>
          </div>

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 rounded-md text-sm px-3 py-1 bg-white cursor-pointer hover:border-gray-400 transition"
          >
            <option value="relavent">ترتيب حسب</option>
            <option value="low-high">السعر: من الأقل إلى الأعلى</option>
            <option value="high-low">السعر: من الأعلى إلى الأقل</option>
          </select>
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filterProducts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-lg bg-white"
            >
              {/* ProductItem يدعم الآن عرض الصور الأربعة */}
              <ProductItem
                id={item._id}
                image={item.image} // ⬅️ يمكن أن تكون مصفوفة 4 صور
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Collection;

// import React, { useEffect, useState, useContext } from "react";
// import { assets, productsss } from "../assets/frontend_assets/assets";
// import ProductItem from "../components/ProductItem";
// import { ShopContext } from "../context/ShopContext";
// import { motion, AnimatePresence } from "framer-motion";

// const Collection = () => {
//   const { searsh } = useContext(ShopContext);

//   const [showFilter, setShowFilter] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [sortType, setSortType] = useState("relevant");

//   /* ---------------- Filters ---------------- */
//   const toggleCategory = (value) => {
//     setCategories((prev) =>
//       prev.includes(value)
//         ? prev.filter((c) => c !== value)
//         : [...prev, value]
//     );
//   };

//   const toggleSubCategory = (value) => {
//     setSubCategories((prev) =>
//       prev.includes(value)
//         ? prev.filter((s) => s !== value)
//         : [...prev, value]
//     );
//   };

//   /* ---------------- Apply Filter ---------------- */
//   const applyFilters = () => {
//     let products = [...productsss];

//     // 🔍 Search
//     if (searsh.trim()) {
//       products = products.filter((item) =>
//         item.name.toLowerCase().includes(searsh.toLowerCase())
//       );
//     }

//     // 📂 Category
//     if (categories.length) {
//       products = products.filter((item) =>
//         categories.includes(item.category)
//       );
//     }

//     // 🧩 SubCategory
//     if (subCategories.length) {
//       products = products.filter((item) =>
//         subCategories.includes(item.subCategory)
//       );
//     }

//     // ↕ Sorting
//     if (sortType === "low-high") {
//       products.sort((a, b) => a.price - b.price);
//     }
//     if (sortType === "high-low") {
//       products.sort((a, b) => b.price - a.price);
//     }

//     setFilteredProducts(products);
//   };

//   /* ---------------- Effects ---------------- */
//   useEffect(() => {
//     applyFilters();
//   }, [categories, subCategories, sortType, searsh]);

//   /* ---------------- JSX ---------------- */
//   return (
//     <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t bg-white">
//       {/* FILTER SIDEBAR */}
//       <div className="w-full sm:w-64 px-4">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="text-xl font-semibold flex justify-between cursor-pointer"
//         >
//           FILTERS
//           <img
//             className={`h-4 sm:hidden transition-transform ${
//               showFilter ? "rotate-90" : ""
//             }`}
//             src={assets.dropdown_icon}
//             alt=""
//           />
//         </p>

//         <AnimatePresence>
//           {(showFilter || window.innerWidth >= 640) && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="mt-5 p-5 border rounded-lg shadow-sm"
//             >
//               <p className="mb-3 font-semibold text-sm">CATEGORIES</p>

//               {["Men", "Women", "Kids", "shoes"].map((cat) => (
//                 <label
//                   key={cat}
//                   className="flex items-center gap-2 text-sm cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     className="accent-black"
//                     onChange={() => toggleCategory(cat)}
//                   />
//                   {cat}
//                 </label>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* PRODUCTS */}
//       <div className="flex-1 px-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">
//             ALL <span className="text-gray-500">COLLECTIONS</span>
//           </h2>

//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border px-3 py-1 rounded text-sm"
//           >
//             <option value="relevant">Relevant</option>
//             <option value="low-high">Low to High</option>
//             <option value="high-low">High to Low</option>
//           </select>
//         </div>

//         <motion.div
//           layout
//           className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
//         >
//           {filteredProducts.length ? (
//             filteredProducts.map((item) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-white rounded-lg hover:shadow-lg transition"
//               >
//                 <ProductItem
//                   id={item._id}
//                   image={item.image}
//                   name={item.name}
//                   price={item.price}
//                 />
//               </motion.div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               لا توجد منتجات مطابقة للبحث
//             </p>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Collection;
