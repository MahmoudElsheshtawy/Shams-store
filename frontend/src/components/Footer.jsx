
import React, { useEffect, useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  Heart,
  ShoppingBag,
  Code,
  Smartphone,
  Globe
} from "lucide-react";

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer
      className={`bg-gradient-to-b from-white to-gray-50 shadow-2xl shadow-gray-200/50 rounded-t-3xl pt-12 md:pt-16 pb-6 px-4 sm:px-6 md:px-12 lg:px-20 mt-20 md:mt-32 transition-all duration-1000 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Footer Grid - متجاوب بالكامل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 text-sm">
        
        {/* القسم الأول: Logo + Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Shams Store
            </h1>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Shams Store brings you the latest trends with timeless elegance.
            Discover your style and express yourself with confidence.
          </p>
          
          {/* Developer Credit - Highlighted */}
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 rounded-lg shadow-md">
                <Code className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-amber-700 font-medium">Developed by</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">Mahmoud_Elsheshtawy</span>
                  <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-700 rounded-full text-[10px] font-semibold">
                    Full Stack
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* القسم الثاني: Company Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 relative inline-block">
            COMPANY
            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></span>
          </h3>
          <ul className="flex flex-col gap-3 text-gray-600">
            {['Home', 'About Us', 'Delivery', 'Privacy Policy'].map((item, index) => (
              <li 
                key={index}
                className="hover:text-emerald-600 cursor-pointer transition-all duration-300 hover:translate-x-2 flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* القسم الثالث: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 relative inline-block">
            QUICK LINKS
            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></span>
          </h3>
          <ul className="flex flex-col gap-3 text-gray-600">
            {['FAQ', 'Terms & Conditions', 'Return Policy', 'Size Guide'].map((item, index) => (
              <li 
                key={index}
                className="hover:text-emerald-600 cursor-pointer transition-all duration-300 hover:translate-x-2 flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* القسم الرابع: Contact Info + Newsletter + Developer Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 relative inline-block">
            GET IN TOUCH
            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></span>
          </h3>
          
          {/* Contact Info Cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Phone className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Store Phone</p>
                <a  className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                  01092997107
                </a>
              </div>
            </div>
            
            {/* <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300"> */}
              {/* <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-4 h-4 text-blue-600" />
              </div> */}
              {/* <div>
                <p className="text-xs text-gray-500">Store Email</p>
                <a href="mailto:info@shamsstore.com" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  info@shamsstore.com
                </a>
              </div> */}
            {/* </div> */}
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Store Address</p>
                <p className="text-sm font-medium text-gray-900">Cairo, Egypt</p>
              </div>
            </div>

            {/* Developer Contact - WhatsApp */}
            {/* <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-xl border border-green-200/50"> */}
              {/* <div className="flex items-center gap-3"> */}
                {/* <div className="p-2 bg-green-500 rounded-lg shadow-md">
                  <Smartphone className="w-4 h-4 text-white" />
                </div> */}
                {/* <div className="flex-1">
                  <p className="text-xs text-green-700 font-medium mb-1">تواصل مع المبرمج</p>
                  <a 
                    href="https://wa.me/01093482958"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>راسلني على واتساب</span>
                  </a>
                </div> */}
              {/* </div> */}
            {/* </div> */}
          </div>

          {/* Newsletter - يظهر فقط في الشاشات المتوسطة فأكبر */}
          <div className="hidden sm:block pt-2">
            <p className="text-sm font-semibold text-gray-800 mb-2">Newsletter</p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all text-sm bg-white"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider مع تأثير */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-gradient-to-b from-white to-gray-50 text-xs text-gray-400">
            <Heart className="w-4 h-4 text-emerald-500 inline-block mx-1" />
          </span>
        </div>
      </div>

      {/* Bottom Bar - متجاوب للهاتف - Developer Focused */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        {/* <p className="text-gray-500 text-xs sm:text-sm order-2 sm:order-1"> */}
          {/* © {currentYear} Shams Store. All rights reserved. */}
        {/* </p> */}
        <div className="flex flex-col sm:flex-row items-center gap-3 order-1 sm:order-2">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-gray-600 text-xs sm:text-sm">Developed by</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-sm sm:text-base">
              Mahmoud_Elsheshtawy
            </span>
            <a 
              href="https://wa.me/01093482958"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg"
            >
              <Send className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Newsletter + Developer Contact - يظهر فقط في الهاتف */}
      <div className="sm:hidden mt-6 space-y-4">
        {/* Newsletter */}
  

        {/* Developer Contact Mobile */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">تواصل مع المطور</p>
              <a 
                href="https://wa.me/01093482958"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm font-medium w-full justify-center"
              >
                <Send className="w-4 h-4" />
                <span>واتساب: 01093482958</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;