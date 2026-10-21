
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const [currentState, setCurrentState] = useState("login");

  const { navigate, backendUrl, token, setToken } =
    useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // =========================
  // Normal Login / Register
  // =========================
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Singn UP") {
        const response = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message || "بيانات الدخول غير صحيحة");
        }
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "حدث خطأ، حاول مرة أخرى"
      );
    }
  };

  // =========================
  // Google Login
  // =========================
  const googleLogin = async () => {
    try {
      // Open Google login popup
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      // Firebase user
      const user = result.user;

      // Firebase ID Token
      const idToken = await user.getIdToken();

      // console.log("Google User:", user);

      // Send Firebase token to your backend
      const response = await axios.post(
        backendUrl + "/api/user/google-login",
        {
          idToken,
        }
      );

      if (response.data.success) {
        // Save your backend JWT
        setToken(response.data.token);

        localStorage.setItem(
          "token",
          response.data.token
        );

        toast.success("تم تسجيل الدخول بنجاح");
      } else {
        toast.error(
          response.data.message ||
            "فشل تسجيل الدخول باستخدام Google"
        );
      }
    } catch (error) {
      console.error("Google Login Error:", error);

      // User closed the Google popup
      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        toast.info("تم إغلاق نافذة تسجيل الدخول");
        return;
      }

      // Popup blocked by browser
      if (
        error.code ===
        "auth/popup-blocked"
      ) {
        toast.error(
          "المتصفح قام بمنع نافذة Google"
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
          "فشل تسجيل الدخول باستخدام Google"
      );
    }
  };

  // =========================
  // Redirect after Login
  // =========================
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Title */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState}
        </p>

        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name - Register only */}
      {currentState === "login" ? null : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      )}

      {/* Email */}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      {/* Password */}
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      {/* Forgot Password + Switch */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">
          Forgot your password?
        </p>

        {currentState === "login" ? (
          <p
            onClick={() =>
              setCurrentState("Singn UP")
            }
            className="cursor-pointer"
          >
            انشاء حساب
          </p>
        ) : (
          <p
            onClick={() =>
              setCurrentState("login")
            }
            className="cursor-pointer"
          >
            تسجيل الدخول
          </p>
        )}
      </div>

      {/* Normal Login / Register Button */}
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "login"
          ? "Sign In"
          : "Sign Up"}
      </button>

      {/* Divider */}
      <div className="flex items-center w-full gap-3 my-2">
        <hr className="flex-1 border-gray-300" />

        <span className="text-sm text-gray-500">
          OR
        </span>

        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google Login */}
      <button
        type="button"
        onClick={googleLogin}
        className="w-full border border-gray-800 py-2 flex items-center justify-center gap-3 hover:bg-gray-100 transition"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />

        <span>Continue with Google</span>
      </button>
    </form>
  );
};

export default Login;
