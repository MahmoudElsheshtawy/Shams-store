import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddElectrical = ({ token }) => {
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
      formData.append("category", "Electrical");

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("Electrical product added");
        setName("");
        setDiscription("");
        setPrice("");
        setImages([null, null, null, null]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 border p-5 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-xl font-bold">➕ Add Electrical Product</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        className="border p-2 rounded"
        required
      />

      <textarea
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 rounded"
        required
      />

      <div className="grid grid-cols-2 gap-2">
        {images.map((img, idx) => (
          <label
            key={idx}
            className="relative cursor-pointer border rounded-lg overflow-hidden w-full h-24 flex justify-center items-center bg-gray-100"
          >
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageChange(e, idx)}
            />
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={assets.upload_area} alt="upload" className="w-12 h-12" />
            )}
          </label>
        ))}
      </div>

      <button
        disabled={loading}
        className="bg-black text-white py-2 rounded mt-2"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddElectrical;
