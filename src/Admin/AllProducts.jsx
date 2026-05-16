import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  X,
} from "lucide-react";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    img: "",
    description: "",
    isStock: true,
  });

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Add / Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/products/${editId}`, formData);

        toast.success("Product updated");
      } else {
        await api.post("/products", formData);

        toast.success("Product added");
      }

      fetchProducts();

      setShowModal(false);

      setEditId(null);

      setFormData({
        name: "",
        category: "",
        price: "",
        img: "",
        description: "",
        isStock: true,
      });

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      toast.success("Product deleted");

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Edit Product
  const editProduct = (product) => {
    setEditId(product._id);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      img: product.img,
      description: product.description,
      isStock: product.isStock,
    });

    setShowModal(true);
  };

  // ✅ Filter Logic
  let filteredProducts = [...products];

  // search
  filteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category?.toLowerCase() ===
        category.toLowerCase()
    );
  }

  // price
  if (priceSort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (priceSort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

 // ... keep all your imports and logic exactly the same ...

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black">
      {/* 1. Add a flex container here */}
      <div className="flex">
        
        {/* 2. Sidebar component */}
        <Sidebar />

        {/* 3. Main content wrapper with flex-1 and padding */}
        <main className="flex-1 p-6 md:p-10 pt-24 lg:pt-10"> 
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <div>
              <h1 className="text-5xl font-black uppercase">Products</h1>
              <p className="text-gray-400 mt-2">Manage all store products</p>
            </div>

            <button
              onClick={() => {
                setShowModal(true);
                setEditId(null);
                setFormData({
                  name: "",
                  category: "",
                  price: "",
                  img: "",
                  description: "",
                  isStock: true,
                });
              }}
              className="bg-[#0bdf47] text-black px-6 py-3 rounded-2xl flex items-center gap-2 font-black uppercase text-sm"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* FILTERS */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-4 py-4 outline-none"
            >
              <option value="">All Categories</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Snacks">Snacks</option>
            </select>

            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-4 py-4 outline-none"
            >
              <option value="">Sort By Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#1A1A1A] border border-white/5 rounded-[2rem] overflow-hidden"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-xl font-black uppercase">{product.name}</h2>
                      <p className="text-sm text-gray-400">{product.category}</p>
                    </div>
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-bold ${
                        product.isStock
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.isStock ? "In Stock" : "Out"}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-5">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-[#0bdf47]">₹{product.price}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => editProduct(product)}
                        className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* MODAL (Keep outside the flex container to prevent positioning issues) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5 z-50">
          <div className="bg-[#1A1A1A] w-full max-w-2xl rounded-[2rem] p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-8">
              <Package className="text-[#0bdf47]" />
              <h2 className="text-3xl font-black uppercase">
                {editId ? "Update Product" : "Add Product"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 outline-none"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 outline-none"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.img}
                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 outline-none"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 outline-none h-32"
              />
              <button
                type="submit"
                className="w-full bg-[#0bdf47] text-black py-4 rounded-2xl font-black uppercase"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;