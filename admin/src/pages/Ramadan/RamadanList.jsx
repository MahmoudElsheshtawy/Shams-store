
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../App";
import { toast } from "react-toastify";

// ----- Price Editor -----
const PriceEditor = ({ item, updatePrice }) => {
  const [edit, setEdit] = useState(false);
  const [price, setPrice] = useState(item.price);
  const [updating, setUpdating] = useState(false); // animation for update

  const handleSave = async () => {
    setUpdating(true);
    await updatePrice(item._id, Number(price));
    setEdit(false);
    setTimeout(() => setUpdating(false), 500); // remove animation after 0.5s
  };

  return edit ? (
    <div className="flex gap-2 flex-wrap">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded-lg px-2 py-1 w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
      >
        Save
      </button>
      <button
        onClick={() => setEdit(false)}
        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
      >
        Cancel
      </button>
    </div>
  ) : (
    <span
      className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm cursor-pointer inline-block transform hover:scale-105 ${
        updating ? "animate-pulse" : ""
      }`}
      onClick={() => setEdit(true)}
    >
      {updating ? "Updated!" : "Edit Price"}
    </span>
  );
};

// ----- Electrical Product List (List view with animation) -----
const RamadanList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(products);

  // Fetch products
  const fetchElectrical = async () => {
    setLoading(true);
    try {
     const res = await axios.get(`${backendUrl}/api/product/ramadan`, {
       headers: { token },
      
       
    });
      if (res.data.success) setProducts(res.data.products || []);
      else toast.error(res.data.message);
    } catch {
      toast.error("Failed to load electrical products");
    } finally {
      setLoading(false);
    }

  };

  // Remove product
  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchElectrical();
      } else toast.error(res.data.message);
    } catch {
      toast.error("Failed to remove product");
    }
  };

  // Update price
  const updatePrice = async (id, newPrice) => {
    if (!newPrice) return toast.error("Enter a valid price");
    try {
      const res = await axios.put(
        `${backendUrl}/api/product/update-price`,
        { id, price: Number(newPrice) },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Price updated");
        fetchElectrical();
      } else toast.error(res.data.message);
    } catch {
      toast.error("Failed to update price");
    }
  };

  useEffect(() => {
    fetchElectrical();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Ramadan and eid List🎉
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((item, idx) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-2xl shadow hover:shadow-lg transition p-4 gap-4 transform opacity-0 animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* Image */}
              <img
                src={item.image?.[0] || "/placeholder.png"}
                alt={item.name || "No Name"}
                className="w-full md:w-32 h-32 object-cover rounded-xl flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between gap-2 w-full">
                <div>
                  <h3 className="font-semibold text-lg">{item.name || "-"}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.discription || "No description"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{item.subCategory || "-"}</p>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mt-2 md:mt-0">
                  <span className="font-semibold text-gray-800 transition transform duration-300 hover:scale-105">
                    {item.price || 0} {currency}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <PriceEditor item={item} updatePrice={updatePrice} />
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RamadanList;
