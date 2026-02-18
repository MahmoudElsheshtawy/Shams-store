// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const Add = ({token}) => {
//   const [loading, setLoading] = useState(false);
//     const [image1,setImage1]= useState(false)
//     const [image2,setImage2]= useState(false)
//     const [image3,setImage3]= useState(false)
//     const [image4,setImage4]= useState(false)
    
//     const [name,setName] =useState("")
//     const [discription,setDescription] =useState("")
//     const [category,setCategory] =useState("Men")
//     const [subcategory,setSubcategory] =useState("Topwear")
//     const [bestseller,setBestseller]= useState(false)
//     const [sizes,setSizes]= useState([])
//     const [price,setPrice]= useState("")


//  const onsubmitHandler =async (e)=>{
//         e.preventDefault();
//        setLoading(true)
//     try {
//       const formData =new FormData()



//       formData.append("name",name)
//       formData.append("discription",discription)
//       formData.append("price",price)
//       formData.append("category",category)
//       formData.append("subCategory",subcategory)
//       formData.append("bestseller",bestseller)
//       formData.append("sizes",JSON.stringify(sizes))


//       image1 && formData.append("image1",image1)
//       image2 && formData.append("image2",image2)
//       image3 && formData.append("image3",image3)
//       image4 && formData.append("image4",image4)
   
//     const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}})
//     // console.log(response.data);
//      if (response.data.success) {
//             // setToken(reaspose.data.token)

//             toast.success(response.data.message)
//             setName('')
//             setDescription('')
//             setImage1(false)
//             setImage2(false)
//             setImage3(false)
//             setImage4(false)
//             setPrice('')
//         }else{
//             toast.error(response?.data?.message || "Something went wrong!");
//         }
//     // setLoading(true)
        
//     } catch (error) {
//         console.log(error);
//             toast.error(error.response?.data?.message || "Failed to add product!");
        
//     }finally{
//       setLoading(false)
//     }
//     }

//   return (
//     <div>
   
//       <form onSubmit={onsubmitHandler} className="flex flex-col w-full items-start gap-3">
//         <div>
//           <p className="mb-2">Upload Image</p>
//           <div className="flex gap-2">
//             <label htmlFor="image1">
//               <img className="w-20" src={!image1 ?assets.upload_area : URL.createObjectURL(image1)} />

//               <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
//             </label>
//             <label htmlFor="image2">
//               <img className="w-20" src={!image2 ?assets.upload_area : URL.createObjectURL(image2)} alt="" />
//               <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
//             </label>
//             <label htmlFor="image3">
//               <img className="w-20" src={!image3 ?assets.upload_area : URL.createObjectURL(image3)} alt="" />
//               <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
//             </label>
//             <label htmlFor="image4">
//               <img className="w-20" src={!image4 ?assets.upload_area : URL.createObjectURL(image4)} alt="" />
//               <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
//             </label>
//           </div>
//         </div>
//         <div className="w-full">
//           <p className="mb-2">Product name</p>
//           <input
//           onChange={(e)=>setName(e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2"
//             type="text"
//             placeholder="Type here"
//             required
//             value={name}
//           />
//         </div>
//         <div className="w-full">
//           <p className="mb-2">Product description</p>
//           <textarea
//           onChange={(e)=>setDescription(e.target.value)}

//             className="w-full max-w-[500px] px-3 py-2"
//             type="text"
//             placeholder="Write content here"
//             required
//             value={discription}
//           ></textarea>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//           <div>
//             <p className="mb-2">Product category</p>
//             <select  onChange={(e)=>setCategory(e.target.value)} className="w-full px-3 py-2">
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//             </select>
//           </div>
//           <div>
//             <p className="mb-2">Sub category</p>
//             <select  onChange={(e)=>setSubcategory(e.target.value)} className="w-full px-3 py-2">
//               <option value="Topwear">Topwear</option>
//               <option value="Bottomwear">Bottomwear</option>
//               <option value="Winterwear">Winterwear</option>
//             </select>
//           </div>
//           <div>
//             <p className="mb-2">Product Price</p>
//             <input
//               onChange={(e)=>setPrice(e.target.value)}
//               value={price}
//               className="w-full px-3 py-2 sm:w-[120px]"
//               type="Number"
//               placeholder="00"
//             />
//           </div>
//         </div>
//         <div>
//           <p className="mb-2">Product Sizes</p>
//           <div className="flex gap-3">
//             <div onClick={()=>setSizes(prev =>prev.includes("S") ? prev.filter(item =>item !== "S"):[...prev,"S"])}>
//               <p className={`${sizes.includes("S")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>S</p>
//             </div>
//             <div onClick={()=>setSizes(prev =>prev.includes("M") ? prev.filter(item =>item !== "M"):[...prev,"M"])}>
//               <p className={`${sizes.includes("M")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>M</p>
//             </div>
//             <div onClick={()=>setSizes(prev =>prev.includes("L") ? prev.filter(item =>item !== "L"):[...prev,"L"])}>
//               <p className={`${sizes.includes("L")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>L</p>
//             </div>
//             <div onClick={()=>setSizes(prev =>prev.includes("XL") ? prev.filter(item =>item !== "XL"):[...prev,"XL"])}>
//               <p className={`${sizes.includes("XL")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>XL</p>
//             </div>
//             <div onClick={()=>setSizes(prev =>prev.includes("XXL") ? prev.filter(item =>item !== "XXL"):[...prev,"XXL"])}>
//               <p className={`${sizes.includes("XXL")?"bg-orange-300 ":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-2 mt-2">
//           <input onChange={()=>setBestseller(prev=>!prev) } checked={bestseller} type="checkbox" id="bestseller" />
//           <label className="cursor-pointer" htmlFor="bestseller">
//             Add to bestseller
//           </label>
//         </div>
//   <button
//   type="submit"
//   disabled={loading}
//   className="w-full sm:w-40 py-3 mt-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
// >
//   {loading ? (
//     <>
//       <svg
//         className="animate-spin w-5 h-5 text-white"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//         ></circle>
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//         ></path>
//       </svg>
//       <span>Adding...</span>
//     </>
//   ) : (
//     "Add Product"
//   )}
// </button>
//       </form>
 
//     </div>
//   );
// };

// export default Add;
// =============================
// =============================
// =============================
// =============================
// =============================
// =============================
// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";
// import { 
//   Upload, X, Plus, Package, DollarSign, 
//   Tag, CheckCircle, Grid, Layers 
// } from "lucide-react";

// const Add = ({ token }) => {
//   const [loading, setLoading] = useState(false);

//   const [images, setImages] = useState([null, null, null, null]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [price, setPrice] = useState("");
//   const [sizes, setSizes] = useState([]);
//   const [bestseller, setBestseller] = useState(false);
//   const [discountPercentage, setDiscountPercentage] = useState(""); // بالنسبة لنسبة الخصم
//   const [discountStart, setDiscountStart] = useState(""); // اختياري للتاريخ
//   const [discountEnd, setDiscountEnd] = useState(""); // اختياري للتاريخ

//   const handleImageChange = (index, file) => {
//     const newImages = [...images];
//     newImages[index] = file;
//     setImages(newImages);
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImages(newImages);
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("discription", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("bestseller", bestseller);
//       formData.append("sizes", JSON.stringify(sizes));
//      formData.append("discountPercentage", discountPercentage || 0);
//      if(discountStart) formData.append("discountStart", discountStart);
//      if(discountEnd) formData.append("discountEnd", discountEnd);

//       // Append only selected images
//       images.forEach((img, idx) => {
//         if (img) formData.append(`image${idx + 1}`, img);
//       });

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );
//      console.log(response.data);

//       if (response.data.success) {
//         toast.success(response.data.message);
//         // Reset form
//         setName("");
//         setDescription("");
//         setImages([null, null, null, null]);
//         setPrice("");
//         setSizes([]);
//         setBestseller(false);
//         setCategory("Men");
//       } else {
//         toast.error(response?.data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to add product!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sizeOptions = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

//   return (
//     <div className="w-full max-w-4xl mx-auto px-1 py-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <div className="p-2 bg-emerald-100 rounded-lg">
//             <Package className="w-6 h-6 text-emerald-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             إضافة <span className="text-emerald-600">منتج جديد</span>
//           </h2>
//         </div>

//         <form onSubmit={onSubmitHandler} className="space-y-8">
//           {/* Image Upload Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-blue-50 rounded-lg">
//                 <Upload className="w-4 h-4 text-blue-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">صور المنتج</p>
//               <span className="text-xs text-gray-500">(اختياري، حد أقصى 4 صور)</span>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[0, 1, 2, 3].map((index) => (
//                 <div key={index} className="relative group">
//                   {images[index] ? (
//                     <div className="relative rounded-xl border-2 border-gray-200 overflow-hidden aspect-square bg-gray-50">
//                       <img
//                         src={URL.createObjectURL(images[index])}
//                         alt={`product-${index}`}
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
//                       >
//                         <X className="w-4 h-4 text-red-500" />
//                       </button>
//                     </div>
//                   ) : (
//                     <label
//                       htmlFor={`image-${index}`}
//                       className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition-all cursor-pointer aspect-square p-4"
//                     >
//                       <Plus className="w-8 h-8 text-gray-400" />
//                       <span className="text-xs text-gray-500 mt-2">إضافة صورة</span>
//                     </label>
//                   )}
//                   <input
//                     type="file"
//                     id={`image-${index}`}
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file) handleImageChange(index, file);
//                     }}
//                     className="hidden"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product Name */}
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-purple-50 rounded-lg">
//                 <Tag className="w-4 h-4 text-purple-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">اسم المنتج</p>
//             </div>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="أدخل اسم المنتج"
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-amber-50 rounded-lg">
//                 <Layers className="w-4 h-4 text-amber-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">وصف المنتج</p>
//             </div>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="أدخل وصفاً مفصلاً للمنتج"
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
//               required
//             />
//           </div>

//           {/* Category and Price */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Category */}
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-indigo-50 rounded-lg">
//                   <Grid className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <p className="text-sm font-medium text-gray-700">الفئة</p>
//               </div>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm bg-white"
//               >
//                 <option value="Men">رجالي</option>
//                 <option value="Women">نسائي</option>
//                 <option value="Kids">أطفال</option>
//               </select>
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <div className="p-1.5 bg-emerald-50 rounded-lg">
//                   <DollarSign className="w-4 h-4 text-emerald-600" />
//                 </div>
//                 <p className="text-sm font-medium text-gray-700">السعر</p>
//               </div>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   EGP
//                 </span>
//                 <input
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   placeholder="0.00"
//                   className="w-full px-4 py-3 pl-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
//                   required
//                 />
//               </div>
//             </div>
//             {/* Discount Percentage */}
// <div className="space-y-2">
//   <div className="flex items-center gap-2">
//     <div className="p-1.5 bg-red-50 rounded-lg">
//       <Tag className="w-4 h-4 text-red-600" />
//     </div>
//     <p className="text-sm font-medium text-gray-700">نسبة الخصم (%)</p>
//   </div>
//   <input
//     type="number"
//     min={0}
//     max={100}
//     value={discountPercentage}
//     onChange={(e) => setDiscountPercentage(e.target.value)}
//     placeholder="0"
//     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500 outline-none transition-all duration-200 text-sm"
//   />
// </div>

// {/* Optional: Discount Start Date */}
// <div className="space-y-2">
//   <div className="flex items-center gap-2">
//     <div className="p-1.5 bg-orange-50 rounded-lg">
//       {/* <Calendar className="w-4 h-4 text-orange-600" /> */}
//     </div>
//     <p className="text-sm font-medium text-gray-700">تاريخ بدء الخصم (اختياري)</p>
//   </div>
//   <input
//     type="date"
//     value={discountStart}
//     onChange={(e) => setDiscountStart(e.target.value)}
//     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-200 text-sm"
//   />
// </div>

// {/* Optional: Discount End Date */}
// <div className="space-y-2">
//   <div className="flex items-center gap-2">
//     <div className="p-1.5 bg-orange-50 rounded-lg">
//       {/* <Calendar className="w-4 h-4 text-orange-600" /> */}
//     </div>
//     <p className="text-sm font-medium text-gray-700">تاريخ انتهاء الخصم (اختياري)</p>
//   </div>
//   <input
//     type="date"
//     value={discountEnd}
//     onChange={(e) => setDiscountEnd(e.target.value)}
//     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-200 text-sm"
//   />
// </div>

//           </div>

//           {/* Sizes */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-pink-50 rounded-lg">
//                 <CheckCircle className="w-4 h-4 text-pink-600" />
//               </div>
//               <p className="text-sm font-medium text-gray-700">الأحجام المتاحة</p>
//               <span className="text-xs text-gray-500">(اختر واحداً أو أكثر)</span>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               {sizeOptions.map((size) => (
//                 <button
//                   key={size}
//                   type="button"
//                   onClick={() =>
//                     setSizes((prev) =>
//                       prev.includes(size)
//                         ? prev.filter((s) => s !== size)
//                         : [...prev, size]
//                     )
//                   }
//                   className={`
//                     relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
//                     ${
//                       sizes.includes(size)
//                         ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:bg-emerald-600"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }
//                   `}
//                 >
//                   {size}
//                   {sizes.includes(size) && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Bestseller Checkbox */}
//           <div className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
//             <div className="relative">
//               <input
//                 type="checkbox"
//                 id="bestseller"
//                 checked={bestseller}
//                 onChange={() => setBestseller(!bestseller)}
//                 className="sr-only"
//               />
//               <div
//                 onClick={() => setBestseller(!bestseller)}
//                 className={`
//                   w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all
//                   ${
//                     bestseller
//                       ? "bg-amber-500 border-amber-500"
//                       : "bg-white border-gray-300 hover:border-amber-400"
//                   }
//                 `}
//               >
//                 {bestseller && <CheckCircle className="w-4 h-4 text-white" />}
//               </div>
//             </div>
//             <label
//               htmlFor="bestseller"
//               className="text-sm font-medium text-gray-700 cursor-pointer select-none"
//               onClick={() => setBestseller(!bestseller)}
//             >
//               إضافة إلى قائمة الأكثر مبيعاً
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`
//               w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 
//               text-white font-semibold rounded-xl shadow-lg 
//               hover:from-emerald-600 hover:to-emerald-700 
//               transition-all duration-300 active:scale-[0.98]
//               disabled:opacity-50 disabled:cursor-not-allowed
//               flex items-center justify-center gap-2
//             `}
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : (
//               <>
//                 <Plus className="w-5 h-5" />
//                 إضافة المنتج
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add;
// =============================
// =============================
// =============================
// =============================
// =============================
// =============================
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { 
  Upload, X, Plus, Package, DollarSign, 
  Tag, CheckCircle, Grid, Layers, Percent, Calendar, Clock
} from "lucide-react";

const Add = ({ token }) => {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  
  // حقول الخصم
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountStart, setDiscountStart] = useState("");
  const [discountEnd, setDiscountEnd] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  // حساب السعر بعد الخصم تلقائياً
  React.useEffect(() => {
    if (discountPercentage > 0 && price > 0) {
      const calculatedFinal = price - (price * discountPercentage / 100);
      setFinalPrice(calculatedFinal.toFixed(2));
    } else {
      setFinalPrice(price);
    }
  }, [discountPercentage, price]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("discription", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      
      // ✅ إضافة بيانات الخصم
      if (discountPercentage && discountPercentage > 0) {
        formData.append("discountPercentage", discountPercentage);
        formData.append("finalPrice", finalPrice);
        
        if (discountStart) {
          formData.append("discountStart", new Date(discountStart).toISOString());
        }
        if (discountEnd) {
          formData.append("discountEnd", new Date(discountEnd).toISOString());
        }
      } else {
        formData.append("discountPercentage", 0);
        formData.append("finalPrice", price);
      }

      // Append only selected images
      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
     console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setCategory("Men");
        setDiscountPercentage("");
        setDiscountStart("");
        setDiscountEnd("");
        setFinalPrice("");
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add product!");
    } finally {
      setLoading(false);
    }
  };

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

  return (
    <div className="w-full max-w-4xl mx-auto px-1 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Package className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            إضافة <span className="text-emerald-600">منتج جديد</span>
          </h2>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Upload className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">صور المنتج</p>
              <span className="text-xs text-gray-500">(اختياري، حد أقصى 4 صور)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative group">
                  {images[index] ? (
                    <div className="relative rounded-xl border-2 border-gray-200 overflow-hidden aspect-square bg-gray-50">
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`product-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor={`image-${index}`}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-emerald-400 transition-all cursor-pointer aspect-square p-4"
                    >
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-2">إضافة صورة</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id={`image-${index}`}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleImageChange(index, file);
                    }}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <Tag className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">اسم المنتج</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم المنتج"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 rounded-lg">
                <Layers className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">وصف المنتج</p>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصفاً مفصلاً للمنتج"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm resize-none"
              required
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg">
                  <Grid className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">الفئة</p>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm bg-white"
              >
                <option value="Men">رجالي</option>
                <option value="Women">نسائي</option>
                <option value="Kids">أطفال</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">السعر</p>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  EGP
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 pl-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Discount Section */}
          <div className="border-t pt-6 mt-2">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-emerald-500" />
              خصم على المنتج (اختياري)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Discount Percentage */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-50 rounded-lg">
                    <Tag className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">نسبة الخصم (%)</p>
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  placeholder="مثال: 15"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500 outline-none transition-all duration-200 text-sm"
                />
              </div>

              {/* Discount Start Date with Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-orange-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">تاريخ ووقت بدء الخصم</p>
                </div>
                <input
                  type="datetime-local"
                  value={discountStart}
                  onChange={(e) => setDiscountStart(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-200 text-sm"
                />
              </div>

              {/* Discount End Date with Time */}
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-orange-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">تاريخ ووقت انتهاء الخصم</p>
                </div>
                <input
                  type="datetime-local"
                  value={discountEnd}
                  onChange={(e) => setDiscountEnd(e.target.value)}
                  min={discountStart}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Show calculated final price */}
            {discountPercentage > 0 && price > 0 && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">السعر بعد الخصم:</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {finalPrice} EGP
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 line-through">
                      {price} EGP
                    </p>
                    <p className="text-sm text-red-500">
                      توفير {Math.round(price * discountPercentage / 100)} EGP
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  سعر العرض ساري من {discountStart || "الآن"} إلى {discountEnd || "غير محدد"}
                </p>
              </div>
            )}
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-pink-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-pink-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">الأحجام المتاحة</p>
              <span className="text-xs text-gray-500">(اختر واحداً أو أكثر)</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((s) => s !== size)
                        : [...prev, size]
                    )
                  }
                  className={`
                    relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      sizes.includes(size)
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:bg-emerald-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {size}
                  {sizes.includes(size) && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
            <div className="relative">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={() => setBestseller(!bestseller)}
                className="sr-only"
              />
              <div
                onClick={() => setBestseller(!bestseller)}
                className={`
                  w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all
                  ${
                    bestseller
                      ? "bg-amber-500 border-amber-500"
                      : "bg-white border-gray-300 hover:border-amber-400"
                  }
                `}
              >
                {bestseller && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
            </div>
            <label
              htmlFor="bestseller"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
              onClick={() => setBestseller(!bestseller)}
            >
              إضافة إلى قائمة الأكثر مبيعاً
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 
              text-white font-semibold rounded-xl shadow-lg 
              hover:from-emerald-600 hover:to-emerald-700 
              transition-all duration-300 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                إضافة المنتج
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;