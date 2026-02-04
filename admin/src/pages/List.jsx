// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// // صف منتج واحد بتصميم عصري
// const ProductRow = ({ item, token, fetchList, removeProduct, updatePrice }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [newPrice, setNewPrice] = useState(item.price);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 items-center gap-3 py-3 px-1 border rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
//     >
//       <img
//         className="w-16 h-16 object-cover rounded-md mx-auto md:mx-0"
//         src={item.image[0]}
//         alt={item.name}
//       />

//       <p className="text-center md:text-left text-gray-700 font-medium">
//         {item.name}
//       </p>

//       <p className="text-center text-gray-500">{item.category}</p>

//       {editMode ? (
//         <input
//           type="number"
//           className="border border-gray-300 px-2 py-1 rounded-md w-24 mx-auto text-center focus:ring-2 focus:ring-blue-400 outline-none"
//           value={newPrice}
//           onChange={(e) => setNewPrice(e.target.value)}
//         />
//       ) : (
//         <p className="text-center font-semibold text-gray-800">
//           {item.price} {currency}
//         </p>
//       )}

//       <button
//         onClick={() => removeProduct(item._id)}
//         className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-1 px-3 rounded-md hover:opacity-90 transition"
//       >
//         Delete
//       </button>

//       {editMode ? (
//         <div className="flex justify-center gap-2">
//           <button
//             onClick={() => {
//               updatePrice(item._id, newPrice);
//               setEditMode(false);
//             }}
//             className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
//           >
//             Save
//           </button>
//           <button
//             onClick={() => setEditMode(false)}
//             className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => setEditMode(true)}
//           className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
//         >
//           Edit
//         </button>
//       )}
//     </motion.div>
//   );
// };

// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");
//       if (response.data.success) {
//         setList(response.data.prodacts);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const responsee = await axios.post(
//         backendUrl + "/api/product/remove",
//         { id },
//         { headers: { token } }
//       );

//       if (responsee.data.success) {
//         toast.success(responsee.data.message);
//         await fetchList();
//       } else {
//         toast.error(responsee.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const updatePrice = async (id, newPrice) => {
//     try {
//       const response = await axios.put(
//         `${backendUrl}/api/product/update-price`,
//         { id, price: newPrice },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success("Price updated successfully!");
//         fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <motion.div
//       className="p-0 md:p-8 bg-gray-50 min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
//         🛍️ Product Management
//       </h2>

//       {list.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">loding...</p>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {list.map((item, index) => (
//             <ProductRow
//               key={index}
//               item={item}
//               token={token}
//               fetchList={fetchList}
//               removeProduct={removeProduct}
//               updatePrice={updatePrice}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default List;








// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { backendUrl, currency } from "../App";
// // import { toast } from "react-toastify";

// // // مكوّن لصف المنتج الواحد
// // const ProductRow = ({ item, token, fetchList, removeProduct, updatePrice }) => {
// //   const [editMode, setEditMode] = useState(false);
// //   const [newPrice, setNewPrice] = useState(item.price);

// //   return (
// //     <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center mb-1 gap-2 py-1 px-2 border text-sm">
// //       <img className="w-12" src={item.image[0]} alt="" />
// //       <p>{item.name}</p>
// //       <p>{item.category}</p>

// //       {editMode ? (
// //         <input
// //           type="number"
// //           className="border px-2 py-1 w-20"
// //           value={newPrice}
// //           onChange={(e) => setNewPrice(e.target.value)}
// //         />
// //       ) : (
// //         <p>
// //           <span>{item.price}</span> {currency}
// //         </p>
// //       )}

// //       <p
// //         onClick={() => removeProduct(item._id)}
// //         className="cursor-pointer text-lg text-red-500 text-center"
// //       >
// //         X
// //       </p>

// //       {editMode ? (
// //         <div className="flex gap-2">
// //           <button
// //             onClick={() => {
// //               updatePrice(item._id, newPrice);
// //               setEditMode(false);
// //             }}
// //             className="bg-green-500 text-white px-2 py-1 rounded"
// //           >
// //             Save
// //           </button>
// //           <button
// //             onClick={() => setEditMode(false)}
// //             className="bg-gray-400 text-white px-2 py-1 rounded"
// //           >
// //             Cancel
// //           </button>
// //         </div>
// //       ) : (
// //         <button
// //           onClick={() => setEditMode(true)}
// //           className="bg-blue-500 text-white px-2 py-1 rounded"
// //         >
// //           Edit
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // const List = ({ token }) => {
// //   const [list, setList] = useState([]);

// //   const fetchList = async () => {
// //     try {
// //       const response = await axios.get(backendUrl + "/api/product/list");
// //       if (response.data.success) {
// //         setList(response.data.prodacts);
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };

// //   const removeProduct = async (id) => {
// //     try {
// //       const responsee = await axios.post(
// //         backendUrl + "/api/product/remove",
// //         { id },
// //         { headers: { token } }
// //       );

// //       if (responsee.data.success) {
// //         toast.success(responsee.data.message);
// //         await fetchList();
// //       } else {
// //         toast.error(responsee.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };

// //   const updatePrice = async (id, newPrice) => {
// //     try {
// //       const response = await axios.put(
// //         `${backendUrl}/api/product/update-price`,
// //         { id, price: newPrice },
// //         { headers: { token } }
// //       );

// //       if (response.data.success) {
// //         toast.success("Price updated successfully!");
// //         fetchList();
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchList();
// //   }, []);

// //   return (
// //     <>
// //       <p className="mb-2">All Products List</p>

// //       <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] bg-gray-300 items-center gap-2 py-1 px-2 border text-sm">
// //         <b>Image</b>
// //         <b>Name</b>
// //         <b>Category</b>
// //         <b>Price</b>
// //         <b>Delete</b>
// //         <b>Edit</b>
// //       </div>

// //       {list.map((item, index) => (
// //         <ProductRow
// //           key={index}
// //           item={item}
// //           token={token}
// //           fetchList={fetchList}
// //           removeProduct={removeProduct}
// //           updatePrice={updatePrice}
// //         />
// //       ))}
// //     </>
// //   );
// // };

// // export default List;





















// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { backendUrl, currency } from "../App";
// // import { toast } from "react-toastify";

// // const List = ({ token }) => {
// //   const [list, setList] = useState([]);


// //   const fetchList = async () => {

// //     try {
// //       const response = await axios.get(backendUrl + "/api/product/list");
// //       if (response.data.success) {
// //         setList(response.data.prodacts);
// //         // console.log(response.data.prodacts);
        
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };

// //   const removeProduct = async (id) => {
// //     try {
// //       const responsee = await axios.post(
// //         backendUrl +'/api/product/remove',
// //         { id },
// //         { headers: { token } }
// //       );

// //       if (responsee.data.success) {
// //         toast.success(responsee.data.message)
// //         // setList(responsee.data.prodacts);
// //         await fetchList();
// //       } else {
// //         toast.error(responsee.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message);
// //     }
// //   };
  
// //   useEffect(() => {
// //     fetchList();
// //   }, []);
// //   return (
// //     <>
// //       <p className="mb-2">All Products List</p>
// //       <div className=" flex flex-col gap-2">
// //         {/* -------list Table Title------------ */}
// //         <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-300 items-center gap-2 py-1 px-2 border text-sm">
// //           <b>Image</b>
// //           <b>Name</b>
// //           <b>Category</b>
// //           <b>Price</b>
// //           <b>Action</b>
// //         </div>
// //       </div>

// //       {/* {product list feching} */}
// //       {list.map((item, index) => (
// //         <div
// //           className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center mb-1 gap-2 py-1 px-2 border text-sm"
// //           key={index}
// //         >
// //           <img className=" w-12" src={item.image[0]} alt="" />
// //           <p>{item.name}</p>
// //           <p>{item.category}</p>
// //           <p>
// //             <span>{item.price}</span> {currency}
// //           </p>
// //           <p
// //             onClick={()=>removeProduct(item._id)}
// //             className="text-right md:text-center cursor-pointer text-lg"
// //           >
// //             X
// //           </p>
// //         </div>
// //       ))}
// //     </>
// //   );
// // };

// // export default List;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// صف منتج واحد مع حماية من undefined
const ProductRow = ({ item, token, fetchList }) => {
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price || 0);

  const updatePrice = async () => {
    if (!newPrice) return toast.error("Enter a valid price");
    try {
      const res = await axios.put(
        `${backendUrl}/api/products/update-price`,
        { id: item._id, price: Number(newPrice) },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Price updated successfully!");
        fetchList();
        setEditMode(false);
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const removeProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/products/remove`,
        { id: item._id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3 py-3 px-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
    >
      {/* <img
        className="w-16 h-16 object-cover rounded-md mx-auto md:mx-0"
        src={Array.isArray(item.image) && item.image[0] ? item.image[0] : ""}
        alt={item.name || "No Name"}
      /> */}
      <img
  className="w-16 h-16 object-cover rounded-md mx-auto md:mx-0"
  src={Array.isArray(item.image) && item.image[0] ? item.image[0] : "/assets/default-product.png"}
  alt={item.name || "No Name"}
/>
      <p className="text-center md:text-left text-gray-700 font-medium">{item.name || "-"}</p>
      <p className="text-center text-gray-500">{item.category || "-"}</p>

      {editMode ? (
        <input
          type="number"
          className="border border-gray-300 px-2 py-1 rounded-md w-24 mx-auto text-center"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      ) : (
        <p className="text-center font-semibold text-gray-800">
          {item.price || 0} {currency}
        </p>
      )}

      <button
        onClick={removeProduct}
        className="bg-red-500 text-white py-1 px-3 rounded-md hover:opacity-90 transition"
      >
        Delete
      </button>

      {editMode ? (
        <div className="flex justify-center gap-2">
          <button
            onClick={updatePrice}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
        >
          Edit
        </button>
      )}
    </motion.div>
  );
};

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setList(res.data.products || []);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <motion.div
      className="p-4 md:p-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
        🛍️ Product Management
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading products...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((item, index) => (
            <ProductRow key={item._id || index} item={item} token={token} fetchList={fetchList} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default List;
