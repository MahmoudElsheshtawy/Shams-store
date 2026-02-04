import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext';
const BestSealer = () => {


       const {products} = useContext(ShopContext);
    //    console.log(products);
       
    const [bestSellerr,setBestSellerr]=useState([]);
    useEffect(()=>{

        const bestproduct= products.filter((item)=>(item.bestseller));
        setBestSellerr(bestproduct.slice(0,5))
        // console.log(setBestSeller);
        
    },[products])
  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title text1={'BEST'} text2={'SELLER'}/>
           <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
  اكتشف منتجاتنا الأكثر مبيعًا التي يثق بها عملاؤنا دائمًا. هذه القطع تجمع بين الجودة العالية، التصميم العصري، والأسلوب الذي يناسب جميع الأذواق. احرص على اقتناء الأفضل من تشكيلتنا المختارة بعناية.
</p>

        </div>
        <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
        bestSellerr.map((item ,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))
        }
     
        </div>
    </div>
  )
}

export default BestSealer
// import React, { useEffect, useState } from 'react'
// import Title from './Title'
// import ProductItem from './ProductItem'
// import { assets, productsss } from '../assets/frontend_assets/assets'

// const BestSealer = () => {
//     const [bestSellerr, setBestSellerr] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         const bestproduct = productsss.filter(item => item.bestseller)
//         setBestSellerr(bestproduct.slice(0, 5))
//         setIsLoading(false)
//     }, [])

//     const skeletons = Array.from({ length: 5 })

//     return (
//         <div className='my-10'>
//             <div className="text-center text-3xl py-8">
//                 <Title text1={'BEST'} text2={'SELLER'} />
//                 <p className='w-3/4 m-auto font-bold text-xs sm:text-base text-gray-600'>
//                     اكتشف منتجاتنا الأكثر مبيعًا التي يثق بها عملاؤنا دائمًا.
//                 </p>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//                 {isLoading
//                     ? skeletons.map((_, index) => (
//                         <div key={index} className="bg-white rounded-lg shadow p-2 flex flex-col gap-2 animate-pulse">
//                             <div className="bg-gray-200 w-full h-32 sm:h-40 rounded-md" />
//                             <div className="bg-gray-200 h-4 w-3/4 rounded" />
//                             <div className="bg-gray-200 h-4 w-1/2 rounded" />
//                         </div>
//                     ))
//                     : bestSellerr.map((item, index) => {
//                         const images =
//                             Array.isArray(item.image) && item.image.length > 0
//                                 ? item.image
//                                 : [assets.upload_area]

//                         return (
//                             <ProductItem
//                                 key={item._id || index}
//                                 id={item._id}
//                                 image={images}
//                                 name={item.name}
//                                 price={item.price}
//                             />
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default BestSealer
