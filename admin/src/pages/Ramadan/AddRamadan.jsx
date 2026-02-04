import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddRamadan = ({ token }) => {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("discription", discription);
      formData.append("price", price);
      formData.append("category", "Ramadan"); // ⭐ المهم

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Ramadan product added 🌙");
        setName("");
        setDiscription("");
        setPrice("");
        setImages([null, null, null, null]);
      }
    } catch (err) {
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
   
    
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold">🌙 Add Ramadan_Eid Products</h2>

      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required className="border p-2 rounded"/>
      <textarea value={discription} onChange={e=>setDiscription(e.target.value)} placeholder="Description" required className="border p-2 rounded"/>
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" required className="border p-2 rounded"/>

      <div className="grid grid-cols-2 gap-2">
        {images.map((img, idx) => (
          <label key={idx} className="border h-24 flex items-center justify-center cursor-pointer">
            <input type="file" hidden onChange={(e)=>handleImageChange(e,idx)} />
            {img ? (
              <img src={URL.createObjectURL(img)} className="w-full h-full object-cover"/>
            ) : (
              <img src={assets.upload_area} className="w-10"/>
            )}
          </label>
        ))}
      </div>

      <button className="bg-black text-white py-2 rounded">
        {loading ? "Adding..." : "Add Ramadan Product"}
      </button>
    </form>
  );
};

export default AddRamadan;
