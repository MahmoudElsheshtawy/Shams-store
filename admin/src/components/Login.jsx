// import React, { useState } from 'react'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'
// const Login = ({setToken}) => {
//     const [email ,setEmail]= useState('')
//     const [password ,setPassword]= useState('')
//     const onsubmitHandler =async (e)=>{
//     try {
//         e.preventDefault();
//         console.log(email,password);
//         const reaspose =await axios.post(backendUrl+'/api/user/admin',{email,password})

//         if (reaspose.data.success) {
//             setToken(reaspose.data.token)
//         }else{
//             toast.error(reaspose.data.message)
//         }
//     } catch (error) {
//         console.log(error);
//             toast.error(error.message)
        
//     }
//     }
//   return (
//     <div className=' min-h-screen flex items-center justify-center w-full '>
//         <div className='bg-white shadow-md rounded-lg px-4 py-6 max-w-md'>
//             <h1 className='text-2xl font-bold mb-4'> Admin panel</h1>
//             <form onSubmit={onsubmitHandler} >

//                 <div className='mb-3 min-w-72'>
//                     <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
//                     <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='your@gmail.com' required/>
//                 </div>
//                  <div className='mb-3 min-w-72'>
//                     <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
//                     <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' placeholder='Enter your password' required/>
//                 </div>
//                 <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Login
{/* <div class="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
    <h1 class="text-2xl font-bold mb-4">Admin Panel</h1>
    <form>
    <div class="mb-3 min-w-72">
    <p class="text-sm font-medium text-gray-700 mb-2">Email Address</p>
    <input class="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="email" placeholder="your@email.com" required="" value="admin@example.com">
    </div><div class="mb-3 min-w-72">
    <p class="text-sm font-medium text-gray-700 mb-2">Password</p><input class="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="Enter your password" required="" value="greatstack123">
    </div>
    <button class="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit"> Login </button></form></div> */}
    import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        backendUrl + "/api/user/admin",
        { email, password }
      );

      if (response.data.success) {
        // ✅ حفظ التوكن
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);

        toast.success("Login successful");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-6 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>

        <form onSubmit={onsubmitHandler}>
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full px-3 py-2 border rounded-md outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full px-3 py-2 border rounded-md outline-none"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
