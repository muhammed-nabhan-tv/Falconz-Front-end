// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   Heart,
//   ShoppingBag,
//   Zap,
//   Star,
//   SlidersHorizontal,
//   Plus,
//   ArrowRight,
//   X,
//   Eye,
// } from "lucide-react";
// import { gsap } from "gsap";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../component/Navbar";
// import { useCart } from "../context/cartContext";
// import { useWishlist } from "../context/WishlistContext";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const gridRef = useRef(null);

//   // ── Filter state ──────────────────────────────────────────
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [sortBy, setSortBy] = useState("default"); // "default" | "asc" | "desc"

//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();
//   const navigate = useNavigate();

//   // Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/products", {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });
//         const data = await response.json();
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // GSAP Animation
//   useEffect(() => {
//     if (!loading) {
//       const ctx = gsap.context(() => {
//         gsap.from(".shop-card", {
//           y: 50,
//           opacity: 0,
//           stagger: 0.1,
//           duration: 0.8,
//           ease: "power3.out",
//         });
//       }, gridRef);
//       return () => ctx.revert();
//     }
//   }, [loading]);

//   // ── Derived: unique categories from products ──────────────
//   const categories = [
//     "All",
//     ...new Set(products.map((p) => p.category).filter(Boolean)),
//   ];

//   // ── Derived: filtered + sorted products ───────────────────
//   const filteredProducts = products
//     .filter((p) => p?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
//     .filter((p) =>
//       selectedCategory === "All" ? true : p.category === selectedCategory,
//     )
//     .filter((p) => (maxPrice !== "" ? p.price <= parseFloat(maxPrice) : true))
//     .sort((a, b) => {
//       if (sortBy === "asc") return a.price - b.price;
//       if (sortBy === "desc") return b.price - a.price;
//       return 0;
//     });

//   const clearFilters = () => {
//     setSelectedCategory("All");
//     setMaxPrice("");
//     setSortBy("default");
//   };

//   const activeFilterCount = [
//     selectedCategory !== "All",
//     maxPrice !== "",
//     sortBy !== "default",
//   ].filter(Boolean).length;

//   return (
//     <div className="bg-[#0D0D0D] min-h-screen text-white selection:bg-[#98D8AA] selection:text-black">
//       <Navbar />

//       {/* HEADER */}
//       <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
//           <div className="space-y-4">
//             <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase bg-white/5">
//               Organic Selection
//             </div>
//             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
//               The <span className="border-text text-[#0bdf47]">Market</span>
//             </h1>
//           </div>

//           {/* Search + Filter */}
//           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//             <div className="relative group flex-1">
//               <Search
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0bdf47] transition-colors"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search fresh harvest..."
//                 className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#0bdf47]/50 focus:ring-4 focus:ring-[#0bdf47]/10 transition-all font-medium"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* ── Filter button — only change: onClick + badge ── */}
//             <button
//               onClick={() => setShowFilter((v) => !v)}
//               className="relative flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
//             >
//               <SlidersHorizontal size={20} />
//               Filter
//               {activeFilterCount > 0 && (
//                 <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#0bdf47] text-black text-[10px] font-black rounded-full flex items-center justify-center">
//                   {activeFilterCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* ── Filter Panel (slides in below header) ── */}
//         {showFilter && (
//           <div className="mt-6 p-6 bg-[#1A1A1A] border border-white/10 rounded-3xl flex flex-col sm:flex-row gap-6 flex-wrap">
//             {/* Category */}
//             <div className="flex-1 min-w-[180px]">
//               <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
//                 Category
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => setSelectedCategory(cat)}
//                     className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border
//                       ${
//                         selectedCategory === cat
//                           ? "bg-[#0bdf47] text-black border-[#0bdf47]"
//                           : "bg-white/5 border-white/10 text-white/70 hover:border-[#0bdf47]/40"
//                       }`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Max Price */}
//             <div className="flex-1 min-w-[160px]">
//               <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
//                 Max Price ($)
//               </p>
//               <input
//                 type="number"
//                 min="0"
//                 placeholder="e.g. 50"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#0bdf47]/50 focus:ring-2 focus:ring-[#0bdf47]/10 transition-all font-medium text-sm"
//               />
//             </div>

//             {/* Sort */}
//             <div className="flex-1 min-w-[160px]">
//               <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
//                 Sort by Price
//               </p>
//               <div className="flex gap-2">
//                 {[
//                   { label: "Default", value: "default" },
//                   { label: "Low → High", value: "asc" },
//                   { label: "High → Low", value: "desc" },
//                 ].map((opt) => (
//                   <button
//                     key={opt.value}
//                     onClick={() => setSortBy(opt.value)}
//                     className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border
//                       ${
//                         sortBy === opt.value
//                           ? "bg-[#0bdf47] text-black border-[#0bdf47]"
//                           : "bg-white/5 border-white/10 text-white/70 hover:border-[#0bdf47]/40"
//                       }`}
//                   >
//                     {opt.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Clear */}
//             {activeFilterCount > 0 && (
//               <div className="flex items-end">
//                 <button
//                   onClick={clearFilters}
//                   className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:text-red-400 hover:border-red-400/30 transition-all"
//                 >
//                   <X size={14} /> Clear all
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </section>

//       {/* PRODUCT GRID — uses filteredProducts instead of products */}
//       <main className="px-6 pb-32 max-w-7xl mx-auto" ref={gridRef}>
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0bdf47]"></div>
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
//             <ShoppingBag size={48} strokeWidth={1} />
//             <p className="text-lg font-bold">No products match your filters</p>
//             <button
//               onClick={clearFilters}
//               className="text-[#0bdf47] text-sm font-bold underline underline-offset-4"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => {
//               const isWishlisted = wishlist.some(
//                 (item) =>
//                   (item._id || item).toString() === product._id.toString(),
//               );

//               return (
//                 <div
//                   key={product._id}
//                   className=" group bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-4 hover:border-[#0bdf47]/30 transition-all duration-500"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0D0D0D] mb-6 group">
//                     {/* Product Image */}
//                     <img
//                       src={product.img || "https://via.placeholder.com/400"}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />

//                     {/* NEW: View Detail Overlay (Appears on Hover) */}
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <Link
//                         to={`/product/${product._id}`}
//                         className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0bdf47] transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
//                       >
//                         <Eye size={16} />
//                         View Details
//                       </Link>
//                     </div>

//                     {/* Wishlist Button */}
//                     <button
//                       onClick={() => toggleWishlist(product._id)}
//                       className={`absolute top-4 right-4 z-10 p-3 backdrop-blur-md rounded-2xl transition-all border border-white/10 hover:scale-110
//       ${
//         isWishlisted
//           ? "text-red-500 bg-red-500/20"
//           : "text-white/70 bg-black/40 hover:text-red-500"
//       }`}
//                     >
//                       <Heart
//                         size={20}
//                         fill={isWishlisted ? "currentColor" : "none"}
//                       />
//                     </button>

//                     {/* Category Badge */}
//                     <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-[#0bdf47] text-black text-[10px] font-black uppercase rounded-lg">
//                       {product.category || "Fresh"}
//                     </div>
//                   </div>

//                   {/* INFO */}
//                   <div className="px-2 space-y-4">
//                     <h3 className="text-xl font-bold tracking-tight">
//                       {product.name}
//                     </h3>

//                     <div className="flex items-baseline gap-2">
//                       <span className="text-3xl font-black text-[#0bdf47]">
//                         ${product.price}
//                       </span>
//                       <span className="text-gray-500 text-sm line-through">
//                         ${(product.price * 1.2).toFixed(2)}
//                       </span>
//                     </div>

//                     {/* BUTTONS */}
//                     <div className="grid grid-cols-5 gap-2 pt-2">
//                       <button
//                         onClick={() =>
//                           navigate("/checkout", {
//                             state: {
//                               source: "buyNow",
//                               items: [{ productId: product._id, quantity: 1 }],
//                             },
//                           })
//                         }
//                         className="col-span-3 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase hover:bg-[#0bdf47] transition-all flex items-center justify-center gap-2 group/buy"
//                       >
//                         Buy Now{" "}
//                         <ArrowRight
//                           size={16}
//                           className="group-hover/buy:translate-x-1 transition-transform"
//                         />
//                       </button>

//                       <button
//                         className="col-span-2 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#0bdf47] hover:text-black transition-all"
//                         onClick={() => addToCart(product._id, 1)}
//                       >
//                         <ShoppingBag size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Shop;



import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Zap,
  Star,
  SlidersHorizontal,
  Plus,
  ArrowRight,
  X,
  Eye,
} from "lucide-react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../utils/axiosInstance";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const gridRef = useRef(null);

  // Filter & Sort State
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const filteredProducts = products
    .filter((p) => p?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (selectedCategory === "All" ? true : p.category === selectedCategory))
    .filter((p) => (maxPrice !== "" ? p.price <= parseFloat(maxPrice) : true))
    .sort((a, b) => {
      if (sortBy === "asc") return a.price - b.price;
      if (sortBy === "desc") return b.price - a.price;
      return 0;
    });
  // GSAP Animation
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".shop-card", 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        );
      }, gridRef);
      return () => ctx.revert();
    }
  }, [loading, filteredProducts?.length]);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];



  const clearFilters = () => {
    setSelectedCategory("All");
    setMaxPrice("");
    setSortBy("default");
  };

  const activeFilterCount = [
    selectedCategory !== "All",
    maxPrice !== "",
    sortBy !== "default",
  ].filter(Boolean).length;

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      {/* --- HEADER --- */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-white/5 text-[#0bdf47]">
              Organic Selection
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              The <span className="border-text text-[#0bdf47]">Market</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0bdf47] transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search fresh harvest..."
                className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#0bdf47]/50 transition-all font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowFilter((v) => !v)}
              className="relative flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              <SlidersHorizontal size={20} />
              Filter
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#0bdf47] text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* --- FILTER PANEL --- */}
        {showFilter && (
          <div className="mt-6 p-8 bg-[#1A1A1A] border border-white/10 rounded-[2.5rem] flex flex-col sm:flex-row gap-8 flex-wrap animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex-1 min-w-[200px]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                      selectedCategory === cat ? "bg-[#0bdf47] text-black border-[#0bdf47]" : "bg-white/5 border-white/10 text-white/70 hover:border-[#0bdf47]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-[160px]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Max Price (₹)</p>
              <input
                type="number"
                placeholder="e.g. 500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#0bdf47]/50 text-sm font-bold"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Sort</p>
              <div className="flex gap-2">
                {[{ label: "Default", value: "default" }, { label: "Low", value: "asc" }, { label: "High", value: "desc" }].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all border ${
                      sortBy === opt.value ? "bg-[#0bdf47] text-black border-[#0bdf47]" : "bg-white/5 border-white/10 text-white/70 hover:border-[#0bdf47]/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- PRODUCT GRID --- */}
      <main className="px-6 pb-32 max-w-7xl mx-auto" ref={gridRef}>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0bdf47]"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="text-lg font-bold uppercase tracking-widest">No harvest matches your search</p>
            <button onClick={clearFilters} className="text-[#0bdf47] text-xs font-black uppercase tracking-widest underline underline-offset-8">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => (item._id || item).toString() === product._id.toString());

              return (
                <div key={product._id} className="shop-card group bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-4 hover:border-[#0bdf47]/30 transition-all duration-500">
                  
                  {/* IMAGE AREA */}
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0D0D0D] mb-6 group/img">
                    <img
                      src={product.img || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Quick Detail Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                      <Link
                        to={`/product/${product._id}`}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0bdf47] transition-all transform translate-y-4 group-hover/img:translate-y-0 duration-500"
                      >
                        <Eye size={16} /> View Details
                      </Link>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className={`absolute top-4 right-4 z-10 p-3 backdrop-blur-md rounded-2xl transition-all border border-white/10 hover:scale-110 ${
                        isWishlisted ? "text-red-500 bg-red-500/20" : "text-white/70 bg-black/40 hover:text-red-500"
                      }`}
                    >
                      <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-[#0bdf47] text-black text-[10px] font-black uppercase rounded-lg">
                      {product.category || "Fresh"}
                    </div>
                  </div>

                  {/* PROFESSIONAL INFO AREA */}
                  <div className="px-2 pt-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#0bdf47] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-1 italic">
                          Premium Harvest
                        </p>
                      </div>
                      {/* <div className="flex items-center gap-1 text-[#98D8AA] font-bold text-xs bg-white/5 px-2 py-1 rounded-lg">
                        <Star size={12} fill="currentColor" /> {product.rating || "5.0"}
                      </div> */}
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                      <div className="flex flex-col leading-none">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-700 mb-1">Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-[#0bdf47]">₹{product.price}</span>
                          <span className="text-gray-600 text-xs line-through italic">₹{(product.price * 1.2).toFixed(0)}</span>
                        </div>
                      </div>

                      {/* Quick Action Button */}
                      <button
                        onClick={() => addToCart(product._id, 1)}
                        className="h-12 w-12 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-[#0bdf47] transition-all duration-300 active:scale-90 shadow-xl shadow-black/20 group/add"
                      >
                        <Plus size={20} className="group-hover/add:rotate-90 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
        }
        @media (max-width: 768px) {
          .border-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
        }
      `}} />
    </div>
  );
};

export default Shop;