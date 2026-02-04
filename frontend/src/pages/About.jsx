// import React from "react";
// import { assets } from "../assets/frontend_assets/assets";

// const About = () => {
//   return (
//     <div className="bg-gray-50 text-gray-700 px-6 md:px-16 lg:px-28 py-20">
//   {/* Section Title */}
//   <div className="text-center mb-16">
//     <div className="inline-flex items-center gap-3">
//       <p className="text-gray-500 tracking-wide text-lg">
//         ABOUT <span className="text-gray-800 font-semibold">US</span>
//       </p>
//       <div className="w-12 h-[2px] bg-gray-700"></div>
//     </div>
//   </div>

//   {/* About Content */}
//   <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
//     <img
//       className="w-full md:max-w-[450px] rounded-2xl shadow-md object-cover"
//       src={assets.aboout}
//       alt="About Fashionesta"
//     />

//     <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-3/5">
//       <p className="leading-relaxed" dir="rtl" >
//       في   <i className="font-semibold text-gray-800">Fashonesta</i>  إحنا مش بس بنبيع ملابس وإكسسوارات… إحنا بنخلق تجربة أناقة فريدة وعصرية لكل عميل. من أول التصميمات المبتكرة لأعلى جودة في الخامات، هدفنا هو إن كل قطعة تلبسها تعكس شخصيتك وأسلوبك الخاص.
// منذ تأسيس البراند، ركزنا على تقديم منتجات بتجمع بين الفخامة، الراحة، والأناقة، مع مراعاة كل التفاصيل الصغيرة اللي بتفرق في المظهر النهائي.
// سواء كنت بتدور على إطلالة يومية مميزة أو قطعة مميزة للمناسبات الخاصة، Fashonesta هنا علشان نساعدك تبرز وتلمع.
// Fashonesta – Where Style Meets You.
//       </p>

  
//     </div>
//   </div>

//   {/* Why Choose Us Title */}
//   <div className="text-center mb-10">
//     <div className="inline-flex items-center gap-3">
//       <p className="text-gray-500 tracking-wide text-lg">
//         WHY <span className="text-gray-800 font-semibold">CHOOSE US</span>
//       </p>
//       <div className="w-12 h-[2px] bg-gray-700"></div>
//     </div>
//   </div>

//   {/* Why Choose Us Boxes */}
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
//     <div className="bg-white border rounded-2xl shadow-sm p-10 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
//       <b className="text-gray-800 text-lg">Quality Assurance</b>
//       <p className="text-gray-600 leading-relaxed">
//         We meticulously select and vet each product to ensure it meets our
//         stringent quality standards.
//       </p>
//     </div>

//     <div className="bg-white border rounded-2xl shadow-sm p-10 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
//       <b className="text-gray-800 text-lg">Convenience</b>
//       <p className="text-gray-600 leading-relaxed">
//         With our user-friendly interface and hassle-free ordering process,
//         shopping has never been easier.
//       </p>
//     </div>

//     <div className="bg-white border rounded-2xl shadow-sm p-10 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
//       <b className="text-gray-800 text-lg">Exceptional Service</b>
//       <p className="text-gray-600 leading-relaxed">
//         Our team of dedicated professionals is here to assist you every step of
//         the way — your satisfaction is our top priority.
//       </p>
//     </div>
//   </div>
// </div>

   
//   );
// };

// export default About;
import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-700 px-4 sm:px-8 md:px-16 lg:px-28 py-4 sm:py-20">

      {/* Section Title */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-3">
          <p className="text-gray-500 tracking-wide text-base sm:text-lg">
            ABOUT <span className="text-gray-800 font-semibold">US</span>
          </p>
          <div className="w-10 sm:w-12 h-[2px] bg-gray-700"></div>
        </div>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-20">
        <img
          className="w-full max-w-md md:max-w-[450px] rounded-2xl shadow-md object-cover"
          src={assets.shamsstore}
          alt="about shamsStore"
        />
<div className="flex flex-col gap-5 text-gray-600 md:w-3/5 text-right m-auto mt-1">
  <p className="leading-loose text-sm sm:text-base" dir="rtl">
    في <span className="font-semibold text-gray-800">Shams Store</span>،
    إحنا مش بس بنقدّم ملابس رياضية وأحذية عصرية… إحنا بنخلق تجربة أناقة فريدة
    وعصرية لكل عميل.
  </p>

  <p className="leading-loose text-sm sm:text-base" dir="rtl">
    من أول التصميمات المبتكرة ولحد أعلى جودة في الخامات، هدفنا إن كل
    قطعة تلبسها تكون انعكاس حقيقي لشخصيتك وأسلوبك الخاص.
  </p>

  <p className="leading-loose text-sm sm:text-base" dir="rtl">
    منذ تأسيس <span className="font-semibold text-gray-800">Shams Store</span>، ركّزنا على الجمع بين الفخامة، الراحة، والأناقة،
    مع اهتمام خاص بأدق التفاصيل اللي بتصنع الفرق.
  </p>

  <p className="leading-loose text-sm sm:text-base font-medium text-gray-800" dir="rtl">
    Shams Store – حيث تلتقي الأناقة بأسلوبك
  </p>
</div>

      </div>

      {/* Why Choose Us Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3">
          <p className="text-gray-500 tracking-wide text-base sm:text-lg">
            WHY <span className="text-gray-800 font-semibold">CHOOSE US</span>
          </p>
          <div className="w-10 sm:w-12 h-[2px] bg-gray-700"></div>
        </div>
      </div>

      {/* Why Choose Us Boxes */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-sm"
        dir="rtl"
      >
        <div className="bg-white border rounded-2xl shadow-sm p-8 sm:p-10 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300">
          <b className="text-gray-800 text-base sm:text-lg">
            جودة نثق بها
          </b>
          <p className="text-gray-600 leading-relaxed">
            بنختار كل قطعة بعناية شديدة علشان نضمن أعلى مستوى من الجودة في
            الخامات والتشطيب.
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-8 sm:p-10 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300">
          <b className="text-gray-800 text-base sm:text-lg">
            تجربة تسوّق سهلة
          </b>
          <p className="text-gray-600 leading-relaxed">
            واجهة استخدام بسيطة، خطوات شراء سريعة، وتجربة مريحة من أول زيارة
            لحد استلام الطلب.
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-8 sm:p-10 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300">
          <b className="text-gray-800 text-base sm:text-lg">
            دعم وخدمة مميزة
          </b>
          <p className="text-gray-600 leading-relaxed">
            فريقنا دايمًا جاهز يساعدك ويضمن إن تجربتك مع SHAMS_STORE تكون
            مثالية في كل خطوة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
