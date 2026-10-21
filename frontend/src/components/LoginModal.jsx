import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { signInWithGoogle } from "../firebase.js";

const LoginModal = ({
  isOpen,
  onClose,
  backendUrl,
  setToken,
  navigate,
}) => {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ===================== NORMAL LOGIN =====================
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/login`,
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);

        toast.success("تم تسجيل الدخول بنجاح");

        onClose();
        navigate("/");
      } else {
        toast.error(
          res.data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "حدث خطأ أثناء تسجيل الدخول"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================== REGISTER =====================
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/register`,
        {
          name,
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);

        toast.success("تم إنشاء الحساب بنجاح 🎉");

        onClose();
        navigate("/");
      } else {
        toast.error(
          res.data.message || "حدث خطأ أثناء إنشاء الحساب"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "حدث خطأ أثناء إنشاء الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================== GOOGLE =====================
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const idToken = await signInWithGoogle();

      const res = await axios.post(
        `${backendUrl}/api/user/google-login`,
        {
          idToken,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        setToken(res.data.token);

        toast.success("تم تسجيل الدخول باستخدام جوجل بنجاح 🎉");

        onClose();
        navigate("/");
      } else {
        toast.error(
          res.data.message ||
            "حدث خطأ أثناء التسجيل باستخدام جوجل"
        );
      }
    } catch (error) {
      console.error("Google Login Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        toast.info("تم إغلاق نافذة جوجل");
      } else if (error.code === "auth/popup-blocked") {
        toast.error(
          "المتصفح منع نافذة جوجل، اسمح بالنوافذ المنبثقة"
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "فشل التسجيل باستخدام جوجل"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        dir="rtl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.35,
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative"
        >
          {/* إغلاق */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-800 text-xl"
          >
            ✕
          </button>

          {/* العنوان */}
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {mode === "login"
              ? "مرحباً بعودتك 👋"
              : "إنشاء حساب جديد 👋"}
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            {mode === "login"
              ? "سجل دخولك للمتابعة"
              : "أنشئ حسابك واستمتع بتجربة تسوق أفضل"}
          </p>

          {/* التبديل */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`w-1/2 py-2 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              تسجيل الدخول
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`w-1/2 py-2 text-sm font-medium transition ${
                mode === "register"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              mode === "login"
                ? handleLogin
                : handleRegister
            }
            className="space-y-4"
          >
            {/* الاسم */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  الاسم
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="أدخل اسمك"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-black"
                />
              </div>
            )}

            {/* البريد */}
            <div>
              <label className="block text-sm font-medium mb-1">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="أدخل بريدك الإلكتروني"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-black"
              />
            </div>

            {/* الباسورد */}
            <div>
              <label className="block text-sm font-medium mb-1">
                كلمة المرور
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="أدخل كلمة المرور"
                required
                minLength={8}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-black"
              />
            </div>

            {/* زر */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-lg py-3 hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading
                ? "جاري التنفيذ..."
                : mode === "login"
                ? "تسجيل الدخول"
                : "إنشاء الحساب"}
            </button>
          </form>

          {/* OR */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-xs text-gray-400">
              أو
            </span>

            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition disabled:opacity-50"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
              />

              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 15.6 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />

              <path
                fill="#4CAF50"
                d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.4 27 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
              />

              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.4C41.6 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
              />
            </svg>

            <span className="text-sm font-medium text-gray-700">
              {loading
                ? "جاري التنفيذ..."
                : "المتابعة باستخدام جوجل"}
            </span>
          </button>

          {/* أسفل المودال */}
          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === "login"
              ? "ليس لديك حساب؟"
              : "لديك حساب بالفعل؟"}

            <button
              type="button"
              onClick={() =>
                setMode(
                  mode === "login"
                    ? "register"
                    : "login"
                )
              }
              className="mr-1 text-black font-semibold hover:underline"
            >
              {mode === "login"
                ? "إنشاء حساب"
                : "تسجيل الدخول"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default LoginModal;