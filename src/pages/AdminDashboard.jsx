import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL, API_BASE } from "../api"; // import both API_URL and API_BASE

const AdminDashboard = ({ onProductsUpdate }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    sections: [],
    price: "",
    discount: "",
    file: null,
  });

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
      onProductsUpdate?.();
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  }, [onProductsUpdate]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleSection = (value) =>
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.includes(value)
        ? prev.sections.filter((s) => s !== value)
        : [...prev.sections, value],
    }));

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0])
      setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.file) return alert("Please select an image!");

    const fd = new FormData();
    fd.append("productName", form.name);
    fd.append("description", form.description);
    fd.append("category", form.category.toLowerCase());
    fd.append("section", JSON.stringify(form.sections));
    fd.append("price", form.price);
    fd.append("discount", form.discount || "0");
    fd.append("imgUrl", form.file);

    try {
      const res = await axios.post(`${API_URL}/products`, fd);
      setProducts((prev) => [...prev, res.data]);
      onProductsUpdate?.();
      alert("Product uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading product");
    }

    setForm({
      name: "",
      description: "",
      category: "",
      sections: [],
      price: "",
      discount: "",
      file: null,
    });
  };

  const handleDeleteSection = async (productId, sectionToDelete) => {
    try {
      if (!sectionToDelete) {
        await axios.delete(`${API_URL}/products/${productId}`);
      } else {
        await axios.patch(`${API_URL}/products/${productId}`, { sectionToDelete });
      }
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting section/product");
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#0f3460]">Admin Dashboard</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6 lg:col-span-1">
            <h2 className="text-2xl font-semibold text-[#0f3460] mb-6">Add New Product</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border p-3 rounded-lg"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full border p-3 rounded-lg"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full border p-3 rounded-lg"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border p-3 rounded-lg"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <div className="space-y-2">
                <label className="font-semibold">Select Sections</label>
                {["shop", "big discount", "new arrivals", "best sales"].map((sec) => (
                  <div key={sec} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.sections.includes(sec)}
                      onChange={() => toggleSection(sec)}
                    />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
              {form.sections.includes("big discount") && (
                <input
                  type="number"
                  placeholder="Discount %"
                  className="w-full border p-3 rounded-lg"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  min="0"
                  max="100"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <button type="submit" className="w-full bg-[#0f3460] text-white py-3 rounded-lg">
                Upload Product
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-[#0f3460]">Products</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">No products added yet.</p>
            ) : (
              <table className="w-full border-collapse border text-sm">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Section</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    const sections = Array.isArray(item.section) ? item.section : [];
                    return sections.map((sec, index) => (
                      <tr key={item._id + "-" + index}>
                        <td className="border p-2">
                          <img
                            src={`${API_BASE}${item.imgUrl}`} // use API_BASE here
                            alt={item.productName}
                            className="w-14 h-14 object-cover rounded"
                          />
                        </td>
                        <td className="border p-2 font-semibold">{item.productName}</td>
                        <td className="border p-2 capitalize">{item.category}</td>
                        <td className="border p-2 capitalize">{sec}</td>
                        <td className="border p-2 font-bold text-[#0f3460]">${item.price}</td>
                        <td className="border p-2">
                          <button
                            onClick={() => handleDeleteSection(item._id, sec)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
