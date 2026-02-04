import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [loading, setLoading] = useState(false);
    const [image1,setImage1]= useState(false)
    const [image2,setImage2]= useState(false)
    const [image3,setImage3]= useState(false)
    const [image4,setImage4]= useState(false)
    
    const [name,setName] =useState("")
    const [discription,setDescription] =useState("")
    const [category,setCategory] =useState("Men")
    const [subcategory,setSubcategory] =useState("Topwear")
    const [bestseller,setBestseller]= useState(false)
    const [sizes,setSizes]= useState([])
    const [price,setPrice]= useState("")


 const onsubmitHandler =async (e)=>{
        e.preventDefault();
       setLoading(true)
    try {
      const formData =new FormData()



      formData.append("name",name)
      formData.append("discription",discription)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subcategory",subcategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))


      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
   
    const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}})
    // console.log(response.data);
     if (response.data.success) {
            // setToken(reaspose.data.token)

            toast.success(response.data.message)
            setName('')
            setDescription('')
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
            setPrice('')
        }else{
            toast.error(response?.data?.message || "Something went wrong!");
        }
    // setLoading(true)
        
    } catch (error) {
        console.log(error);
            toast.error(error.response?.data?.message || "Failed to add product!");
        
    }finally{
      setLoading(false)
    }
    }

  return (
    <div>
   
      <form onSubmit={onsubmitHandler} className="flex flex-col w-full items-start gap-3">
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img className="w-20" src={!image1 ?assets.upload_area : URL.createObjectURL(image1)} />

              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className="w-20" src={!image2 ?assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className="w-20" src={!image3 ?assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className="w-20" src={!image4 ?assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
          onChange={(e)=>setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
            value={name}
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
          onChange={(e)=>setDescription(e.target.value)}

            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Write content here"
            required
            value={discription}
          ></textarea>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select  onChange={(e)=>setCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub category</p>
            <select  onChange={(e)=>setSubcategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e)=>setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="Number"
              placeholder="00"
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div onClick={()=>setSizes(prev =>prev.includes("S") ? prev.filter(item =>item !== "S"):[...prev,"S"])}>
              <p className={`${sizes.includes("S")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("M") ? prev.filter(item =>item !== "M"):[...prev,"M"])}>
              <p className={`${sizes.includes("M")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("L") ? prev.filter(item =>item !== "L"):[...prev,"L"])}>
              <p className={`${sizes.includes("L")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("XL") ? prev.filter(item =>item !== "XL"):[...prev,"XL"])}>
              <p className={`${sizes.includes("XL")?"bg-orange-300":"bg-slate-200"} px-2 py-1 cursor-pointer`}>XL</p>
            </div>
            <div onClick={()=>setSizes(prev =>prev.includes("XXL") ? prev.filter(item =>item !== "XXL"):[...prev,"XXL"])}>
              <p className={`${sizes.includes("XXL")?"bg-orange-300 ":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input onChange={()=>setBestseller(prev=>!prev) } checked={bestseller} type="checkbox" id="bestseller" />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>
  <button
  type="submit"
  disabled={loading}
  className="w-full sm:w-40 py-3 mt-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <svg
        className="animate-spin w-5 h-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>Adding...</span>
    </>
  ) : (
    "Add Product"
  )}
</button>
      </form>
 
    </div>
  );
};

export default Add;
