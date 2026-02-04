// import React, { useEffect, useState } from "react";
// import Title from "./Title";
// import ProductItem from "./ProductItem";
// import { productsss } from "../assets/frontend_assets/assets"; // استيراد المنتجات من الملف المحلي

// const LatestCollectioon = () => {
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // محاكاة تحميل البيانات مع تأخير بسيط
//     const timer = setTimeout(() => {
//       setLatestProducts(productsss.slice(0, 5)); // أول 10 منتجات
//       setIsLoading(false);
//     }, 500); // نصف ثانية للتجربة
//     return () => clearTimeout(timer);
//   }, []);

//   const skeletons = Array.from({ length: 10 });

//   return (
//     <div className="my-4 xl:my-12">
//       <div className="text-center py-6 text-3xl">
//         <Title text1={"LATEST"} text2={"COLLECTIONS"} />
//   <p
//   className="w-3/4  m-auto font-bold text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed"
//   dir="rtl"
// >
//   <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-yellow-500 block mb-2">
//     شمس استور
//   </span>
//   يقدم لك أحدث صيحات الملابس الرياضية والأحذية العصرية،  
//   مصممة بعناية لتجمع بين الراحة والأناقة  
//   وتتميز بأسلوبك الشخصي.
// </p>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//         {isLoading
//           ? skeletons.map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow p-2 flex flex-col gap-2 animate-pulse"
//               >
//                 <div className="bg-gray-200 w-full h-32 sm:h-40 rounded-md" />
//                 <div className="bg-gray-200 h-4 w-3/4 rounded" />
//                 <div className="bg-gray-200 h-4 w-1/2 rounded" />
//               </div>
//             ))
//           : latestProducts.map((item) => (
//               <ProductItem
//                 key={item._id}
//                 id={item._id}
//                 image={item.image}
//                 name={item.name}
//                 price={item.price}
//               />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default LatestCollectioon;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { assets } from "../assets/frontend_assets/assets"; // صورة placeholder

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext); // حماية من undefined
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   console.log(products);
    
  //   if (Array.isArray(products) && products.length > 0) {
  //     setLatestProducts(products.slice(0, 15)); // أول 10 منتجات
  //   }
  //   setIsLoading(false);
  // }, [products]);
  useEffect(() => {
  if (Array.isArray(products) && products.length > 0) {
    setLatestProducts(products.slice(0, 15));
    setIsLoading(false);
  } else {
    setIsLoading(true);
  }
}, [products]);

  const skeletons = Array.from({ length: 15 });

  return (
    <div className="my-1">
      {/* عنوان ووصف */}
      {/* <div className="text-center py-3 text-3xl">
        <Title text2={"COLLECTIONS"} />
      
      </div> */}
<div className="text-center py-3">
  <p className="icons select-none text-sm sm:text-base md:text-lg"> New_COLLECTIONS</p>
 
</div>


      {/* شبكة المنتجات */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {isLoading
          ? skeletons.map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-2 flex flex-col gap-2 animate-pulse"
              >
                <div className="bg-gray-200 w-full h-32 sm:h-40 rounded-md" />
                <div className="bg-gray-200 h-4 w-3/4 rounded" />
                <div className="bg-gray-200 h-4 w-1/2 rounded" />
                
              </div>
            ))
          : latestProducts.map((item) => {
              // تأكد من الصور
              const images =
                Array.isArray(item.image) && item.image.length > 0
                  ? item.image
                  : [assets.upload_area]; // لو ما فيش صور، استخدم placeholder

              return (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  image={images}
                  name={item.name || "No Name"}
                  price={item.price || 0}
                />
              );
            })}
      </div>
    </div>
  );
};

export default LatestCollection;
