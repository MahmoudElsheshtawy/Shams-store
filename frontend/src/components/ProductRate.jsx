import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import RatingStars from "./RatingStars";

const ProductRate = ({ productId, onRated }) => {
  const { token, user, backendUrl, navigate } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    // التحقق من تسجيل الدخول
    if (!user || !token) {
      toast.error("يجب تسجيل الدخول لتقييم المنتج");
      navigate('/login');
      return;
    }

    // التحقق من اختيار النجوم
    if (!rating || rating < 1) {
      toast.error("اختر عدد النجوم أولاً");
      return;
    }

    try {
      setLoading(true);
      
      // إرسال التقييم للباك إند
      const { data } = await axios.post(
        `${backendUrl}/api/products/${productId}/review`,
        { rating: rating },
        { 
          headers: { 
            'token': token 
          } 
        }
      );

      if (data.success) {
        toast.success(data.message);
        
        // تحديث الواجهة
        if (onRated) {
          onRated(data.rating, data.numReviews);
        }
        
        // إعادة تعيين النجوم
        setRating(0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("خطأ في إرسال التقييم:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("انتهت جلسة الدخول، سجل دخول مرة أخرى");
          navigate('/login');
        } else {
          toast.error(error.response.data?.message || "حدث خطأ في السيرفر");
        }
      } else if (error.request) {
        toast.error("لا يوجد اتصال بالسيرفر");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-lg mb-3">قيم هذا المنتج</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">اختر عدد النجوم:</p>
        <RatingStars 
          rating={rating} 
          setRating={setRating} 
          interactive={true}
          size="text-3xl"
        />
      </div>
      
      <button
        onClick={submitRating}
        disabled={loading || !rating}
        className={`
          w-full py-2 px-4 rounded-md font-medium
          transition-all duration-300
          ${loading || !rating 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            جاري الإرسال...
          </span>
        ) : (
          "إرسال التقييم"
        )}
      </button>
      
      {!user && (
        <p className="mt-3 text-sm text-red-500">
          * يجب تسجيل الدخول لتتمكن من تقييم المنتجات
        </p>
      )}
    </div>
  );
};

export default ProductRate;