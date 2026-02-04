import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let poroductCopy = products.slice();
      poroductCopy = poroductCopy.filter((item) => category === item.category);
      poroductCopy = poroductCopy.filter(
        (item) => subCategory === item.subCategory
      );
      //   console.log(poroductCopy);
      setRelated(poroductCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div>
      <div className="my-24">
        <div className=" text-center text-3xl py-2">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              RELATED <span className="text-gray-700 font-medium">PRODUCTS</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {
            related.map((item,index)=>(
              <ProductItem onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}  key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
          }
          
      
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;

// import React, { useEffect, useState } from "react";
// import { productsss } from "../assets/frontend_assets/assets";
// import ProductItem from "./ProductItem";

// const RelatedProducts = ({ category, subCategory }) => {
//   const [related, setRelated] = useState([]);

//   useEffect(() => {
//     if (productsss.length > 0) {
//       let filtered = productsss.filter(
//         (item) =>
//           item.category === category &&
//           (subCategory ? item.subCategory === subCategory : true)
//       );
//       setRelated(filtered.slice(0, 5));
//     }
//   }, [category, subCategory]);

//   return (
//     <div className="my-24">
//       <div className="text-center text-3xl py-2">
//         <div className="inline-flex gap-2 items-center mb-3 justify-center">
//           <p className="text-gray-500">
//             RELATED <span className="text-gray-700 font-medium">PRODUCTS</span>
//           </p>
//           <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//         {related.map((item) => (
//           <ProductItem
//             key={item._id}
//             id={item._id}
//             name={item.name}
//             price={item.price}
//             image={item.image}
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;
