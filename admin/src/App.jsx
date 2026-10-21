
// import React, { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Route, Routes } from "react-router-dom";
// import Add from "./pages/Add";
// import List from "./pages/List";
// import Orders from "./pages/Orders";
// import Login from "./components/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import AddElectrical from "./pages/Electrical/AddElectrical";
// import ElectricalList from "./pages/Electrical/ElectricalList";
// import AddRamadan from "./pages/Ramadan/AddRamadan";
// import RamadanList from "./pages/Ramadan/RamadanList";
// import Addgloves from "./pages/gloves/Addgloves";
// import GlovseList from "./pages/gloves/GlovseList";
// import AllUsers from "./pages/AllUsers";
// import Accessories from "./pages/Accessories/Accessories";
// import Accessorieslist from "./pages/Accessories/Accessorieslist";

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;
// export const currency = "EGP";

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   return (
//     <div className="min-h-screen mt-20 flex flex-col bg-gray-50">
//       <ToastContainer position="top-right" rtl />
      
//       {!token ? (
//         <Login setToken={setToken} />
//       ) : (
//         <>
//           {/* Navbar في الأعلى */}
//           <Navbar setToken={setToken} />
//           <hr className="border-gray-200" />

//           {/* الحاوية الرئيسية - تأخذ المساحة المتبقية */}
//           <div className="flex-1 flex flex-col md:flex-row bg-gray-100">
//             {/* Sidebar - مسؤول عن عرض نفسه حسب الشاشة */}
//             <Sidebar />

//             {/* المحتوى الرئيسي */}
//             <main className="flex-1 bg-slate-300  p-4 md:p-6 lg:p-8 overflow-y-auto">
//               <div className="max-w-7xl   mx-auto">
//                 <Routes>
//                   <Route path="/" element={<Add token={token} />} />
//                   <Route path="/add" element={<Add token={token} />} />
//                   <Route path="/list" element={<List token={token} />} />
//                   <Route path="/orders" element={<Orders token={token} />} />
//                   <Route path="/electrical/add" element={<AddElectrical token={token} />} />
//                   <Route path="/electrical/list" element={<ElectricalList token={token} />} />
//                   <Route path="/ramadan/add" element={<AddRamadan token={token} />} />
//                   <Route path="/ramadan/list" element={<RamadanList token={token} />} />
//                   <Route path="/gloves/add" element={<Addgloves token={token} />} />
//                   <Route path="/gloves/list" element={<GlovseList token={token} />} />
//                   <Route path="/accessories/add" element={<Accessories token={token} />} />
//                   <Route path="/accessories/list" element={<Accessorieslist token={token} />} />
//                   <Route path="/users" element={<AllUsers token={token} />} />
                   
//                   {/* ============= */}
//                 </Routes>
//               </div>
//             </main>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddElectrical from "./pages/Electrical/AddElectrical";
import ElectricalList from "./pages/Electrical/ElectricalList";
import AddRamadan from "./pages/Ramadan/AddRamadan";
import RamadanList from "./pages/Ramadan/RamadanList";
import Addgloves from "./pages/gloves/Addgloves";
import GlovseList from "./pages/gloves/GlovseList";
import AllUsers from "./pages/AllUsers";
import Accessories from "./pages/Accessories/Accessories";
import Accessorieslist from "./pages/Accessories/Accessorieslist";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "EGP";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [dailyOrdersCount, setDailyOrdersCount] = useState(0);

  // دالة لجلب عدد طلبات اليوم وتحديثها في Sidebar
  const fetchDailyOrdersCount = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        // تصفية الطلبات الخاصة بيوم اليوم فقط
        const todayOrders = response.data.orders.filter(
          (o) => o.date >= todayStart.getTime()
        );
        setDailyOrdersCount(todayOrders.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchDailyOrdersCount();
    } else {
      localStorage.removeItem("token");
      setDailyOrdersCount(0);
    }
  }, [token]);

  return (
    <div className="min-h-screen mt-20 flex flex-col bg-gray-50">
      <ToastContainer position="top-right" rtl />
      
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Navbar في الأعلى */}
          <Navbar setToken={setToken} />
          <hr className="border-gray-200" />

          {/* الحاوية الرئيسية - تأخذ المساحة المتبقية */}
          <div className="flex-1 flex flex-col md:flex-row bg-gray-100">
            {/* Sidebar - تم تمرير عدد الطلبات اليومية إليه */}
            <Sidebar dailyOrdersCount={dailyOrdersCount} />

            {/* المحتوى الرئيسي */}
            <main className="flex-1 bg-slate-300 p-4 md:p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Add token={token} />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  {/* تمرير دالة التحديث لصفحة الطلبات لكي يتحدث العداد فوراً عند جلب البيانات */}
                  <Route path="/orders" element={<Orders token={token} onOrderUpdate={fetchDailyOrdersCount} />} />
                  <Route path="/electrical/add" element={<AddElectrical token={token} />} />
                  <Route path="/electrical/list" element={<ElectricalList token={token} />} />
                  <Route path="/ramadan/add" element={<AddRamadan token={token} />} />
                  <Route path="/ramadan/list" element={<RamadanList token={token} />} />
                  <Route path="/gloves/add" element={<Addgloves token={token} />} />
                  <Route path="/gloves/list" element={<GlovseList token={token} />} />
                  <Route path="/accessories/add" element={<Accessories token={token} />} />
                  <Route path="/accessories/list" element={<Accessorieslist token={token} />} />
                  <Route path="/users" element={<AllUsers token={token} />} />
                </Routes>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;