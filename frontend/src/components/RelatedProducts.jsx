// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import ProductItem from "./ProductItem";

// const RelatedProducts = ({ category, subCategory }) => {
//   const { products } = useContext(ShopContext);
//   const [related, setRelated] = useState([]);
//   useEffect(() => {
//     if (products.length > 0) {
//       let poroductCopy = products.slice();
//       poroductCopy = poroductCopy.filter((item) => category === item.category);
//       poroductCopy = poroductCopy.filter(
//         (item) => subCategory === item.subCategory
//       );
//       //   console.log(poroductCopy);
//       setRelated(poroductCopy.slice(0, 5));
//     }
//   }, [products]);
//   return (
//     <div>
//       <div className="my-24">
//         <div className=" text-center text-3xl py-2">
//           <div className="inline-flex gap-2 items-center mb-3">
//             <p className="text-gray-500">
//               RELATED <span className="text-gray-700 font-medium">PRODUCTS</span>
//             </p>
//             <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//           </div>
//         </div>
//         <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//           {
//             related.map((item,index)=>(
//               <ProductItem onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}  key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
//             ))
//           }
          
      
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;

// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import ProductItem from "./ProductItem";

// const RelatedProducts = ({ category, subCategory }) => {
//   const { products } = useContext(ShopContext);
//   const [related, setRelated] = useState([]);
  
//   useEffect(() => {
//     if (products.length > 0) {
//       let poroductCopy = products.slice();
//       poroductCopy = poroductCopy.filter((item) => category === item.category);
//       poroductCopy = poroductCopy.filter(
//         (item) => subCategory === item.subCategory
//       );
//       setRelated(poroductCopy.slice(0, 5));
//     }
//   }, [products, category, subCategory]); // ✅ أضفنا category و subCategory

//   return (
//     <div>
//       <div className="my-24">
//         <div className="text-center text-3xl py-2">
//           <div className="inline-flex gap-2 items-center mb-3">
//             <p className="text-gray-500">
//               RELATED <span className="text-gray-700 font-medium">PRODUCTS</span>
//             </p>
//             <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//           {related.map((item, index) => (
//             <ProductItem 
//               key={index} 
//               id={item._id} 
//               name={item.name} 
//               price={item.price} 
//               image={item.image}
//               discountPercentage={item.discountPercentage}
//               finalPrice={item.finalPrice}
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // دالة للتحقق من صلاحية الخصم (اختياري - لو عايز تتحقق من التاريخ)
  const isDiscountValid = useCallback((product) => {
    if (!product.discountPercentage || product.discountPercentage <= 0) return false;
    
    if (product.discountEnd) {
      const now = new Date().getTime();
      const endTime = new Date(product.discountEnd).getTime();
      return now <= endTime;
    }
    
    return product.finalPrice && product.finalPrice < product.price;
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );
      
      // فلترة المنتجات (اختياري - لو عايز تظهر المنتجات المخفضة بس)
      // const validProducts = productCopy.filter(item => isDiscountValid(item));
      // setRelated(validProducts.slice(0, 5));
      
      // أو عرض كل المنتجات (والـ ProductItem هو اللي بيتحكم في إظهار الخصم)
      setRelated(productCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  // تحديث كل دقيقة (اختياري - لو عايز تتحقق من انتهاء الخصم)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              RELATED <span className="text-gray-700 font-medium">PRODUCTS</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((item, index) => (
            <ProductItem 
              key={`${item._id}-${index}-${lastUpdate}`} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image}
              discountPercentage={item.discountPercentage}
              finalPrice={item.finalPrice}
              discountEnd={item.discountEnd} // ✅ أضفنا تاريخ انتهاء الخصم
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;