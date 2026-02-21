// import React, { useContext, useEffect, useState } from 'react'
// import Title from './Title'
// import ProductItem from './ProductItem';
// import { ShopContext } from '../context/ShopContext';
// const BestSealer = () => {


//        const {products} = useContext(ShopContext);
//     //    console.log(products);
       
//     const [bestSellerr,setBestSellerr]=useState([]);
//     useEffect(()=>{

//         const bestproduct= products.filter((item)=>(item.bestseller));
//         setBestSellerr(bestproduct.slice(0,5))
//         // console.log(setBestSeller);
        
//     },[products])
//   return (
//     <div className='my-10'>
//         <div className="text-center text-3xl py-8">
//             <Title text1={'BEST'} text2={'SELLER'}/>
//            <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
//   اكتشف منتجاتنا الأكثر مبيعًا التي يثق بها عملاؤنا دائمًا. هذه القطع تجمع بين الجودة العالية، التصميم العصري، والأسلوب الذي يناسب جميع الأذواق. احرص على اقتناء الأفضل من تشكيلتنا المختارة بعناية.
// </p>

//         </div>
//         <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//         {
//         bestSellerr.map((item ,index)=>(
//             <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
//         ))
//         }
     
//         </div>
//     </div>
//   )
// }

// export default BestSealer
// ===============================
// ===============================
// ===============================
// ===============================
// import React, { useContext, useEffect, useState } from 'react'
// import Title from './Title'
// import ProductItem from './ProductItem';
// import { ShopContext } from '../context/ShopContext';

// const BestSealer = () => {
//   const { products } = useContext(ShopContext);
  
//   const [bestSellerr, setBestSellerr] = useState([]);

//   useEffect(() => {
//     // فلترة المنتجات التي هي bestseller أو عليها خصم
//     const filteredProducts = products.filter((item) => {
//       // تحقق إذا كان المنتج bestseller أو عليه خصم
//       const hasDiscount = item.discountPercentage > 0 && 
//                          item.finalPrice < item.price;
      
//       return item.bestseller || hasDiscount;
//     });
    
//     // خذ أول 5 منتجات
//     setBestSellerr(filteredProducts.slice(0, 5));
//   }, [products]);

//   return (
//     <div className='my-10'>
//       <div className="text-center text-3xl py-8">
//         <Title text1={'BEST'} text2={'SELLER'} />
//         <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
//           اكتشف منتجاتنا الأكثر مبيعًا والمخفضة التي يثق بها عملاؤنا دائمًا. 
//           هذه القطع تجمع بين الجودة العالية، التصميم العصري، والأسعار المميزة. 
//           احرص على اقتناء الأفضل من تشكيلتنا المختارة بعناية.
//         </p>
//       </div>
      
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//         {bestSellerr.map((item, index) => (
//           <ProductItem 
//             key={index} 
//             id={item._id} 
//             image={item.image} 
//             name={item.name} 
//             price={item.price}
//             discountPercentage={item.discountPercentage}
//             finalPrice={item.finalPrice}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default BestSealer
// ===============================
import React, { useContext, useEffect, useState, useCallback } from 'react'
import Title from './Title'
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext';

const BestSealer = () => {
  const { products } = useContext(ShopContext);
  // console.log(products);
  
  const [bestSellerr, setBestSellerr] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // دالة للتحقق من صلاحية الخصم
  const isDiscountValid = useCallback((item) => {
    // إذا مفيش خصم أصلاً
    if (!item.discountPercentage || item.discountPercentage <= 0) return false;
    
    // إذا كان في تاريخ انتهاء
    if (item.discountEnd) {
      const now = new Date().getTime();
      const endTime = new Date(item.discountEnd).getTime();
      // الخصم صالح فقط إذا لم ينتهِ الوقت
      return now <= endTime;
    }
    
    // لو مفيش تاريخ انتهاء، الخصم صالح إذا كان السعر بعد الخصم أقل
    return item.finalPrice < item.price;
  }, []);

  // دالة لفلترة وتحديث المنتجات
  const updateBestSellers = useCallback(() => {
    if (!products?.length) return;

    const filteredProducts = products.filter((item) => {
      // تحقق من bestseller
      const isBestseller = item.bestseller === true;
      
      // تحقق من الخصم مع مراعاة التاريخ
      const hasValidDiscount = isDiscountValid(item);
      
      return isBestseller || hasValidDiscount;
    });
    
    // خذ أول 5 منتجات
    setBestSellerr(filteredProducts.slice(0, 5));
    setLastUpdate(Date.now()); // تحديث وقت آخر تحديث
  }, [products, isDiscountValid]);

  // تحديث عند تغير المنتجات
  useEffect(() => {
    updateBestSellers();
  }, [products, updateBestSellers]);

  // التحقق الدوري من صلاحية الخصم (كل دقيقة)
  useEffect(() => {
    // دالة للتحقق من المنتجات التي انتهى خصمها
    const checkExpiredDiscounts = () => {
      let needsUpdate = false;
      
      bestSellerr.forEach(item => {
        // إذا كان المنتج في القائمة وعليه خصم
        if (item.discountPercentage > 0 && item.discountEnd) {
          const now = new Date().getTime();
          const endTime = new Date(item.discountEnd).getTime();
          
          // إذا انتهى الخصم للتو
          if (now > endTime && now - endTime < 60000) { // خلال الدقيقة الأولى بعد الانتهاء
            needsUpdate = true;
          }
        }
      });
      
      // إذا احتاج تحديث، أعد فلترة المنتجات
      if (needsUpdate) {
        updateBestSellers();
      }
    };

    // تحقق كل 30 ثانية
    const interval = setInterval(checkExpiredDiscounts, 30000);

    return () => clearInterval(interval);
  }, [bestSellerr, updateBestSellers]);

  // التحقق عند عودة التطبيق للواجهة
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // لما المستخدم يرجع للصفحة، تحدث البيانات
        updateBestSellers();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateBestSellers]);

  return (
    <div className='my-10'>
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
          اكتشف منتجاتنا الأكثر مبيعًا والمخفضة التي يثق بها عملاؤنا دائمًا. 
          هذه القطع تجمع بين الجودة العالية، التصميم العصري، والأسعار المميزة. 
          احرص على اقتناء الأفضل من تشكيلتنا المختارة بعناية.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerr.map((item, index) => (
          <ProductItem 
            key={item._id || index} 
            id={item._id} 
            image={item.image} 
            name={item.name} 
            price={item.price}
            discountPercentage={item.discountPercentage}
            finalPrice={item.finalPrice}
            discountEnd={item.discountEnd} // أضفنا تاريخ الانتهاء
          />
        ))}
      </div>

      {/* مؤشر آخر تحديث (اختياري - للتصحيح) */}
      {/* <div className="text-xs text-gray-400 text-center mt-4">
        آخر تحديث: {new Date(lastUpdate).toLocaleTimeString()}
      </div> */}
    </div>
  )
}

export default BestSealer