import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { GiGloves, GiRunningShoe } from "react-icons/gi";
import { Gem, Layers, Users } from "lucide-react";

// تم إضافة dailyOrdersCount كـ prop (الافتراضي 0)
const Sidebar = ({ dailyOrdersCount = 0 }) => {

  // دالة لتحديد كلاس الـ NavLink النشط للديسكتوب
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-500 md:border-r-4 md:border-l-0 font-medium"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  // دالة لتحديد كلاس الـ NavLink النشط للموبايل
  const mobileNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center min-w-[70px] py-2 px-1 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-emerald-600 bg-emerald-50 font-medium"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  // دالة مساعدة لرسم البادج الأحمر
  const renderBadge = () => {
    if (!dailyOrdersCount || dailyOrdersCount <= 0) return null;

    return (
      <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center border-2 border-white animate-pulse">
        {dailyOrdersCount > 99 ? "+99" : dailyOrdersCount}
      </span>
    );
  };

  return (
    <>
      {/* ========== نسخة الموبايل (شاشات أصغر من md) ========== */}
      <div className="md:hidden w-full bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-start overflow-x-auto px-1 py-1 gap-1 scrollbar-hide">
          <NavLink to="/add" className={mobileNavLinkClass}>
            <AiOutlinePlusCircle className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">إضافة</span>
          </NavLink>

          <NavLink to="/list" className={mobileNavLinkClass}>
            <AiOutlineUnorderedList className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">المنتجات</span>
          </NavLink>

          {/* زر الطلبات مع البادج الأحمر */}
          <NavLink to="/orders" className={mobileNavLinkClass}>
            <div className="relative inline-block">
              <FaShoppingCart className="text-2xl" />
              {renderBadge()}
            </div>
            <span className="text-[11px] mt-1 whitespace-nowrap">الطلبات</span>
          </NavLink>

          {/* قسم الأحذية في الموبايل */}
          <NavLink to="/electrical/add" className={mobileNavLinkClass}>
            <GiRunningShoe className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">إضافة حذاء</span>
          </NavLink>

          <NavLink to="/electrical/list" className={mobileNavLinkClass}>
            <AiOutlineUnorderedList className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">قائمة أحذية</span>
          </NavLink>

          {/* قسم القفازات في الموبايل */}
          <NavLink to="/gloves/add" className={mobileNavLinkClass}>
            <GiGloves className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">إضافة قفاز</span>
          </NavLink>

          <NavLink to="/gloves/list" className={mobileNavLinkClass}>
            <AiOutlineUnorderedList className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">قائمة قفازات</span>
          </NavLink>

          {/* قسم الإكسسوارات والمستخدمين */}
          <NavLink to="/Accessories/add" className={mobileNavLinkClass}>
            <Gem className="text-2xl text-emerald-500" />
            <span className="text-[11px] mt-1 whitespace-nowrap">الإكسسوارات</span>
          </NavLink>

          <NavLink to="/Accessories/list" className={mobileNavLinkClass}>
            <Layers className="text-2xl text-emerald-500" />
            <span className="text-[11px] mt-1 whitespace-nowrap">قائمة الإكسسوارات</span>
          </NavLink>

          <NavLink to="/users" className={mobileNavLinkClass}>
            <Users className="text-2xl" />
            <span className="text-[11px] mt-1 whitespace-nowrap">المستخدمين</span>
          </NavLink>
        </div>
      </div>

      {/* ========== نسخة الديسكتوب (شاشات md فأكبر) ========== */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-l border-gray-200 h-screen sticky top-0 overflow-y-auto shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            لوحة التحكم
          </h2>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-4">
          {/* مجموعة المنتجات الرئيسية */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              عام
            </p>
            <NavLink to="/add" className={navLinkClass}>
              <AiOutlinePlusCircle className="text-xl" />
              <span>إضافة منتج</span>
            </NavLink>

            <NavLink to="/list" className={navLinkClass}>
              <AiOutlineUnorderedList className="text-xl" />
              <span>جميع المنتجات</span>
            </NavLink>

            {/* زر الطلبات في الديسكتوب مع البادج الأحمر */}
            <NavLink to="/orders" className={navLinkClass}>
              <div className="relative inline-block">
                <FaShoppingCart className="text-xl" />
                {renderBadge()}
              </div>
              <span className="mr-1">الطلبات</span>
            </NavLink>
          </div>

          {/* مجموعة الأحذية */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              الأحذية
            </p>
            <NavLink to="/electrical/add" className={navLinkClass}>
              <GiRunningShoe className="text-xl" />
              <span>إضافة حذاء</span>
            </NavLink>

            <NavLink to="/electrical/list" className={navLinkClass}>
              <AiOutlineUnorderedList className="text-xl" />
              <span>قائمة الأحذية</span>
            </NavLink>
          </div>

          {/* مجموعة القفازات */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              القفازات
            </p>
            <NavLink to="/gloves/add" className={navLinkClass}>
              <GiGloves className="text-xl" />
              <span>إضافة قفاز</span>
            </NavLink>

            <NavLink to="/gloves/list" className={navLinkClass}>
              <AiOutlineUnorderedList className="text-xl" />
              <span>قائمة القفازات</span>
            </NavLink>
          </div>

          {/* مجموعة الإكسسوارات */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              الإكسسوارات
            </p>
            <NavLink to="/Accessories/add" className={navLinkClass}>
              <Gem className="text-xl" />
              <span>إضافة إكسسوارات</span>
            </NavLink>
            <NavLink to="/Accessories/list" className={navLinkClass}>
              <Layers className="text-xl" />
              <span>قائمة الإكسسوارات</span>
            </NavLink>
          </div>

          {/* مجموعة المستخدمين */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              المستخدمين
            </p>
            <NavLink to="/users" className={navLinkClass}>
              <Users className="text-xl" />
              <span>جميع المستخدمين</span>
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;