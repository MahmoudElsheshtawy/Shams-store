import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* صورة المنتج */}
      <div className="overflow-hidden w-full aspect-[4/5] bg-gray-50">
        <img
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image?.[0] || '/placeholder.png'}
          alt={name}
          loading="lazy"
        />
      </div>

      {/* اسم وسعر المنتج */}
      <div className="p-3">
        <p className="text-sm sm:text-base font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors">
          {name}
        </p>
        <p className="text-sm font-bold text-gray-900 mt-1">
          {price} {currency}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, image, name, price, category, discription }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer flex flex-col">
//       {/* صورة واحدة أو شبكة 2x2 للـElectrical */}
//       <div className="overflow-hidden w-full aspect-[4/5] rounded-lg shadow-sm">
//         {category === "Electrical" ? (
//           <div className="grid grid-cols-2 gap-1 w-full h-full p-1">
//             {image.slice(0, 4).map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={name}
//                 className="w-full h-full object-cover rounded-sm"
//               />
//             ))}
//           </div>
//         ) : (
//           <img
//                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth",  })}

//             className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//             src={image[0]}
//             alt={name}
//           />
//         )}
//       </div>

//       <div className="pt-3 pb-1 flex flex-col gap-1">
//         <p className="text-sm sm:text-base font-medium truncate">{name}</p>
//         {category === "Electrical" && (
//           <p className="text-xs text-gray-500 truncate">{discription}</p>
//         )}
//         <p className="text-sm font-semibold text-gray-800">
//           {price} {currency}
//         </p>
       
//       </div>
    
//     </Link>
//   );
// };

// export default ProductItem;
