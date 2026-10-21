import React, { useContext } from "react";
import CartTotal from '../components/CartTotal'
// import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const [showVodafoneModal, setShowVodafoneModal] = useState(false);
  const [paid, setPaid] = useState(false);

  // States جديدة لإثبات التحويل
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [whatsappClicked, setWhatsappClicked] = useState(false);

  const vodafoneNumber = "201103436285"; // بدون صفر في الأول

  const whatsappLink = `https://wa.me/${vodafoneNumber}?text=${encodeURIComponent(
    "مرحبا، قمت بتحويل المبلغ لفودافون كاش وأرفق صورة التحويل"
  )}`;

  const { navigate, backendUrl, token, products, cartItems, delivry_free, setCartItems, getCartAmount } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  // اختيار صورة التحويل
  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("برجاء اختيار صورة فقط");
    if (file.size > 5 * 1024 * 1024) return toast.error("حجم الصورة يجب ألا يتجاوز 5 ميجا");
    setScreenshot(file);
    setPreview(URL.createObjectURL(file));
    setWhatsappClicked(false);
    setPaid(false);
  };

  // إغلاق المودال (لو لم يكمل الخطوات يرجع للدفع عند الاستلام)
  const closeVodafoneModal = () => {
    setShowVodafoneModal(false);
    if (!paid) {
      setMethod("cod");
      setScreenshot(null);
      setPreview(null);
      setWhatsappClicked(false);
    }
  };

  const onSubmithandeler = async (event) => {
    event.preventDefault();

    // منع إتمام الطلب بالكاش بدون رفع الصورة وإرسالها على واتساب
    if (method === "cash" && (!paid || !screenshot)) {
      toast.error("برجاء رفع صورة التحويل وإرسالها على واتساب أولاً");
      setShowVodafoneModal(true);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    try {
      let orderItem = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              itemInfo.image = itemInfo.image[0]; //add
              orderItem.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivry_free
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })

          if (response.data.success) {
            setCartItems({})
            localStorage.removeItem("cart")
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        }

        case 'cash': {
          // الكاش يُرسل كـ FormData لأن فيه صورة (لا تضع Content-Type يدوياً)
          const fd = new FormData();
          fd.append("address", JSON.stringify(orderData.address));
          fd.append("items", JSON.stringify(orderData.items));
          fd.append("amount", orderData.amount);
          fd.append("screenshot", screenshot);

          const responsee = await axios.post(backendUrl + '/api/order/cash', fd, { headers: { token } })

          if (responsee.data.success) {
            setCartItems({})
            localStorage.removeItem("cart")
            navigate('/orders')
          } else {
            toast.error(responsee.data.message)
          }
          break;
        }

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <>
      {showVodafoneModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 max-h-[90vh] overflow-y-auto">

            <h3 className="text-lg font-bold text-center mb-4">
              الدفع عبر فودافون كاش
            </h3>

            <p className="text-center text-gray-600 mb-2">
              برجاء تحويل المبلغ على الرقم:
            </p>

            <p className="text-center font-bold text-xl mb-4 text-emerald-600">
              01103436285
            </p>

            {/* خطوة 1: رفع الصورة */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1) ارفع صورة التحويل <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshot}
              className="w-full text-sm border border-gray-300 rounded-lg p-2 mb-3"
            />
            {preview && (
              <img
                src={preview}
                alt="صورة التحويل"
                className="w-full max-h-48 object-contain rounded-lg border mb-4"
              />
            )}

            {/* خطوة 2: واتساب */}
            <p className="text-sm font-medium text-gray-700 mb-2">
              2) أرسل الصورة على واتساب
            </p>
            <a
              href={screenshot ? whatsappLink : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!screenshot) {
                  e.preventDefault();
                  return toast.error("ارفع صورة التحويل أولاً");
                }
                setWhatsappClicked(true);
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-full font-medium text-white mb-1 transition ${
                screenshot ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              📲 إرسال الصورة عبر واتساب
            </a>
            {whatsappClicked && (
              <p className="text-xs text-emerald-600 text-center mb-4">✓ تم فتح واتساب</p>
            )}

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={closeVodafoneModal}
                className="flex-1 border rounded-lg py-2"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={!screenshot || !whatsappClicked}
                onClick={() => {
                  setPaid(true);
                  setShowVodafoneModal(false);
                  toast.success("تم تأكيد الدفع، يمكنك إكمال الطلب");
                }}
                className={`flex-1 rounded-lg py-2 text-white ${
                  screenshot && whatsappClicked ? "bg-emerald-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                تأكيد
              </button>
            </div>

          </div>
        </div>
      )}

      <form onSubmit={onSubmithandeler} className="flex flex-col lg:flex-row justify-between gap-6 pt-6 min-h-[75vh] border-t border-gray-200">
        {/* Left Section - Delivery Information */}
        <div className="flex-1 lg:max-w-[550px]">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">
                <span className="text-emerald-600">معلومات</span> التوصيل
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <div className="space-y-5">
                {/* Name Fields - Close Together */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      الاسم الأول <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      name="firstName"
                      className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                      type="text"
                      placeholder="الاسم الأول"
                      onChange={onchangeHandler}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      الاسم الأخير <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      name="lastName"
                      className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                      type="text"
                      placeholder="الاسم الأخير"
                      onChange={onchangeHandler}
                      value={formData.lastName}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    البريد الإلكتروني <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                    type="email"
                    placeholder="example@email.com"
                    onChange={onchangeHandler}
                    value={formData.email}
                  />
                </div>

                {/* Street Address */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    عنوان الشارع <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    name="street"
                    className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                    type="text"
                    placeholder="اسم الشارع والرقم"
                    onChange={onchangeHandler}
                    value={formData.street}
                  />
                </div>

                {/* City and Phone - Close Together */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      المدينة <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      name="city"
                      className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                      type="text"
                      placeholder="المدينة"
                      onChange={onchangeHandler}
                      value={formData.city}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      رقم الهاتف <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      name="phone"
                      className="w-full border border-gray-300 rounded-lg py-3 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                      type="tel"
                      placeholder="01XXXXXXXX"
                      onChange={onchangeHandler}
                      value={formData.phone}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="lg:w-[380px]">
          <div className="sticky top-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                ملخص الطلب
              </h3>
              <CartTotal />
            </div>

            {/* Payment Method - Compact Design */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                <h3 className="font-bold text-gray-800">
                  طريقة <span className="text-emerald-600">الدفع</span>
                </h3>
              </div>

              <div className="space-y-3">
                {/* COD Option - Compact */}
                <div
                  onClick={() => { setMethod('cod'); setPaid(false); }}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all duration-150 ${
                    method === 'cod'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === 'cod'
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {method === 'cod' && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">الدفع عند الاستلام</p>
                    <p className="text-xs text-gray-500 mt-0.5">ادفع عند استلام الطلب</p>
                  </div>
                </div>

                {/* Vodafone Cash Option - Compact */}
                <div
                  onClick={() => {
                    setMethod('cash');
                    if (!paid) setShowVodafoneModal(true);
                  }}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-all duration-150 ${
                    method === 'cash'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === 'cash'
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {method === 'cash' && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">تحويل كاش</p>
                  </div>
                  <div className="px-2 py-1 bg-red-50 rounded">
                    <span className="text-xs font-medium text-red-600">0 11 03436285</span>
                  </div>
                </div>

                {/* زر يعيد فتح المودال ويوضح حالة الدفع */}
                {method === "cash" && (
                  <button
                    type="button"
                    onClick={() => setShowVodafoneModal(true)}
                    className={`w-full py-3 rounded-full text-sm font-medium text-white ${
                      paid ? "bg-emerald-600" : "bg-green-500 animate-pulse"
                    }`}
                  >
                    {paid
                      ? "✓ تم رفع الصورة وإرسالها (تعديل)"
                      : "📲 ارفع صورة التحويل وأرسلها على واتساب"}
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button - Compact */}
            <div className="bg-gradient-to-r from-emerald-50 to-gray-50 rounded-xl p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">سيتم تأكيد طلبك خلال 24 ساعة</span>
                  <span className="text-emerald-600 font-medium">سريع</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تأكيد الطلب
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mt-2">
                    بالضغط على زر التأكيد، فإنك توافق على
                    <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium mx-1">
                      الشروط والأحكام
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;