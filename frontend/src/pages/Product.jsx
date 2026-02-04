import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
// import { products } from '../assets/frontend_assets/assets';

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const { productId } = useParams();
  // console.log(productId);
  const [productData, setProductData] = useState(false);
  const fetchProductdata = async () => {
    products.map((i) => {
      if (i._id === productId) {
        setProductData(i);
        // console.log(i);
        setImage(i.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductdata();
  }, [productId, products]);
  console.log(productData);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ----------------1--------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* ----------2-------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className=" flex items-center gap-1 mt-2">
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {productData.price}
            {currency}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.discription}
          </p>
          <div className="flex flex-col gap-4 my-8">
            {/* <p>Select Size</p> */}
            <div className="flex gap-2">
             
              {productData.category !== "Electrical" && (
                <div className="flex flex-col gap-4 my-8">
                  {/* <p>Select Size</p> */}
                  <div className="flex gap-2">
                    {productData.sizes.map((item, index) => (
                      <button
                        onClick={() => setSize(item)}
                        key={index}
                        className={`border py-0.1 px-2 bg-gray-100 ${
                          item === size ? "border-orange-500" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => {
              if (productData.category === "Electrical") {
                addToCart(productData._id, "no_size");
              }else if(productData.category === "Ramadan"){
                addToCart(productData._id, "no_size");

              }else {
                addToCart(productData._id, size);
              }
            }}
            className="bg-black text-white px-4 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* discription */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default Product;
// ====================================
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/frontend_assets/assets";
// import RelatedProducts from "../components/RelatedProducts";
// import ProductRate from "../components/ProductRate";
// import RatingStars from "../components/RatingStars";
// import { toast } from "react-toastify";

// const Product = () => {
//   const { products, currency, addToCart, user, token } = useContext(ShopContext);
//   const { productId } = useParams();
  
//   const [productData, setProductData] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [loading, setLoading] = useState(true);

//   // جلب بيانات المنتج
//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (products.length > 0) {
//         const product = products.find(p => p._id === productId);
//         if (product) {
//           setProductData(product);
//           setMainImage(product.image[0]);
//           setLoading(false);
//         }
//       }
//     };

//     fetchProduct();
//   }, [productId, products]);

//   // معالجة إضافة للعربة
//   const handleAddToCart = () => {
//     // التحقق من تسجيل الدخول
//     if (!user || !token) {
//       toast.error("سجل دخول أولاً لإضافة المنتج للعربة");
//       return;
//     }

//     // التحقق من اختيار المقاس
//     if (!needsSizeSelection() && !hasNoSizeCategory()) {
//       if (!selectedSize) {
//         toast.error("اختر المقاس أولاً");
//         return;
//       }
//     }

//     // تحديد المقاس المناسب
//     const sizeToUse = hasNoSizeCategory() ? "no_size" : selectedSize;
    
//     // إضافة للعربة
//     addToCart(productData._id, sizeToUse);
//   };

//   // التحقق إذا كان المنتج يحتاج لمقاس
//   const needsSizeSelection = () => {
//     if (!productData) return false;
//     return productData.category !== "Electrical" && 
//            productData.category !== "Ramadan" && 
//            productData.category !== "eid";
//   };

//   // التحقق إذا كان المنتج بدون مقاس
//   const hasNoSizeCategory = () => {
//     if (!productData) return false;
//     return productData.category === "Electrical" || 
//            productData.category === "Ramadan" || 
//            productData.category === "eid";
//   };

//   // تحديث التقييم بعد الإضافة
//   const handleRatingAdded = (newRating, newNumReviews) => {
//     setProductData(prev => ({
//       ...prev,
//       rating: newRating,
//       numReviews: newNumReviews
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!productData) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-red-500">المنتج غير موجود</h2>
//         <p className="mt-2">عذراً، لم يتم العثور على المنتج المطلوب</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* مسار الصفحة */}
//       <div className="text-sm text-gray-500 mb-6">
//         <span>الرئيسية</span> / 
//         <span> {productData.category} </span> / 
//         <span className="font-medium"> {productData.name} </span>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* القسم الأيسر - الصور */}
//         <div className="lg:w-1/2">
//           {/* الصورة الرئيسية */}
//           <div className="border rounded-lg overflow-hidden mb-4">
//             <img 
//               src={mainImage} 
//               alt={productData.name}
//               className="w-full h-auto object-cover"
//             />
//           </div>
          
//           {/* معرض الصور المصغرة */}
//           <div className="flex gap-2 overflow-x-auto py-2">
//             {productData.image.map((img, index) => (
//               <div 
//                 key={index}
//                 className={`flex-shrink-0 border-2 rounded cursor-pointer ${
//                   mainImage === img ? 'border-blue-500' : 'border-gray-200'
//                 }`}
//                 onClick={() => setMainImage(img)}
//               >
//                 <img 
//                   src={img} 
//                   alt={`${productData.name} ${index + 1}`}
//                   className="w-20 h-20 object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* القسم الأيمن - تفاصيل المنتج */}
//         <div className="lg:w-1/2">
//           {/* اسم المنتج */}
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             {productData.name}
//           </h1>
          
//           {/* التقييم الحالي */}
//           <div className="flex items-center mb-4">
//             <RatingStars 
//               rating={Math.round(productData.rating || 0)} 
//               interactive={false}
//               size="text-xl"
//             />
//             <span className="mr-2 text-gray-600">
//               ({productData.numReviews || 0} تقييم)
//             </span>
//             <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//               {productData.rating?.toFixed(1) || "0.0"}
//             </span>
//           </div>
          
//           {/* السعر */}
//           <div className="mb-6">
//             <p className="text-2xl font-bold text-gray-900">
//               {productData.price} {currency}
//             </p>
//             {/* {delivry_free > 0 && (
//               <p className="text-green-600 text-sm mt-1">
//                 توصيل مجاني للطلبات فوق {delivry_free} {currency}
//               </p>
//             )} */}
//           </div>
          
//           {/* الوصف */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-lg mb-2">الوصف</h3>
//             <p className="text-gray-600 leading-relaxed">
//               {productData.discription || "لا يوجد وصف للمنتج."}
//             </p>
//           </div>
          
//           {/* اختيار المقاس */}
//           {needsSizeSelection() && productData.sizes?.length > 0 && (
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3">اختر المقاس</h3>
//               <div className="flex flex-wrap gap-2">
//                 {productData.sizes.map((size, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedSize(size)}
//                     className={`
//                       px-4 py-2 border rounded-md transition-all duration-200
//                       ${selectedSize === size 
//                         ? 'bg-blue-600 text-white border-blue-600' 
//                         : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
//                       }
//                     `}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
          
//           {/* زر إضافة للعربة */}
//           <div className="mb-8">
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               أضف إلى العربة
//             </button>
            
//             {needsSizeSelection() && !selectedSize && (
//               <p className="text-red-500 text-sm mt-2">
//                 * يجب اختيار مقاس قبل الإضافة للعربة
//               </p>
//             )}
//           </div>
          
//           {/* معلومات إضافية */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="font-semibold text-lg mb-3">معلومات المنتج</h3>
//             <ul className="space-y-2 text-gray-600">
//               <li className="flex items-center">
//                 <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//                 منتج أصلي 100%
//               </li>
//               <li className="flex items-center">
//                 <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//                 الدفع عند الاستلام متاح
//               </li>
//               <li className="flex items-center">
//                 <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//                 إرجاع وتبديل خلال 7 أيام
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* قسم التقييم */}
//       <div className="mt-12 border-t border-gray-200 pt-8">
//         <h2 className="text-2xl font-bold mb-6">تقييمات المنتج</h2>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* ملخص التقييمات */}
//           <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg">
//             <div className="text-center mb-6">
//               <div className="text-5xl font-bold text-blue-600 mb-2">
//                 {productData.rating?.toFixed(1) || "0.0"}
//               </div>
//               <RatingStars 
//                 rating={Math.round(productData.rating || 0)} 
//                 interactive={false}
//                 size="text-2xl"
//               />
//               <p className="text-gray-600 mt-2">
//                 بناءً على {productData.numReviews || 0} تقييم
//               </p>
//             </div>
            
//             <div className="space-y-3">
//               {[5, 4, 3, 2, 1].map((stars) => {
//                 // حساب النسبة لكل عدد نجوم
//                 const percentage = productData.reviews?.length 
//                   ? (productData.reviews.filter(r => Math.round(r.rating) === stars).length / productData.reviews.length) * 100
//                   : 0;
                
//                 return (
//                   <div key={stars} className="flex items-center">
//                     <span className="w-16 text-gray-600">{stars} نجوم</span>
//                     <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-yellow-400"
//                         style={{ width: `${percentage}%` }}
//                       ></div>
//                     </div>
//                     <span className="w-12 text-gray-600 text-sm">{percentage.toFixed(0)}%</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
          
//           {/* إضافة تقييم جديد */}
//           <div className="lg:col-span-2">
//             <ProductRate 
//               productId={productData._id} 
//               onRated={handleRatingAdded}
//             />
            
//             {/* قائمة التقييمات */}
//             {productData.reviews && productData.reviews.length > 0 ? (
//               <div className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4">آخر التقييمات</h3>
//                 <div className="space-y-4">
//                   {productData.reviews.slice(0, 5).map((review, index) => (
//                     <div key={index} className="border-b border-gray-200 pb-4">
//                       <div className="flex items-center mb-2">
//                         <RatingStars 
//                           rating={review.rating} 
//                           interactive={false}
//                           size="text-lg"
//                         />
//                         <span className="mx-2 text-gray-500 text-sm">
//                           {new Date(review.date).toLocaleDateString('ar-EG')}
//                         </span>
//                       </div>
//                       <p className="text-gray-700">
//                         تقييم من: {review.user === "Guest" ? "زائر" : "مستخدم"}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="mt-8 text-center py-8">
//                 <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                 </svg>
//                 <p className="text-gray-500">لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* المنتجات المشابهة */}
//       <div className="mt-12">
//         <RelatedProducts 
//           category={productData.category} 
//           subCategory={productData.subCategory}
//           currentProductId={productData._id}
//         />
//       </div>
//     </div>
//   );
// };

// export default Product;