
import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import Title from './Title';

const Ourpolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle-free exchange policy",
    },
    {
      icon: assets.quality_icon,
      title: "7 Day Return Policy",
      desc: "We provide 7 days free return policy",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "We provide 24/7 customer support",
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-8 md:px-16">
      {/* Title */}
      <div className="text-center mb-12">
        <Title text1="Privacy Policy" text2="TOTALS" />
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img src={policy.icon} alt="" className="w-16 mb-4" />
            <p className="font-semibold text-lg mb-2">{policy.title}</p>
            <p className="text-gray-400 text-sm">{policy.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourpolicy;


// import React from 'react'
// import { assets } from '../assets/frontend_assets/assets'
// import Title from './Title'

// const Ourpolicy = () => {
//   return (
//     <div className=' flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md: text-base text-gray-700'>
//      <div>
//          <div className='text-2xl'>
//             <Title text1={'Privacy Policy'} text2={'TOTALS'} />
//          </div>
//      </div>
//      <div>
//          <div>
//             <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="" />
//             <p className='font-semibold' >Easy Exching Policy</p>
//             <p className='text-gray-400'>We offer hassle free exchange policy</p>
//          </div>
//          <div>
//             <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="" />
//             <p className='font-semibold' >7 day Return Policy</p>
//             <p className='text-gray-400'>We provide 7 days free return policy</p>
//          </div>
//          <div>
//             <img className='w-12 m-auto mb-5' src={assets.support_img} alt="" />
//             <p className='font-semibold' >Best customer support</p>
//             <p className='text-gray-400'>we provide 24/7 customer support</p>
//          </div>
        
//      </div>

//     </div>
//   )
// }

// export default Ourpolicy