// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   Heart,
//   ShoppingBag,
//   Zap,
//   Star,
//   SlidersHorizontal,
//   Plus,
//   ArrowRight
// } from "lucide-react";
// import { gsap } from "gsap";
// import axios from "axios"; // Ensure axios is installed: npm install axios
// import Navbar from "../component/Navbar";
// import { useCart } from "../context/cartContext";
// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const gridRef = useRef(null);
//   const {addToCart} = useCart()

//   // 1. Fetch Data from MongoDB
// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/products", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         credentials: 'include'
//       });

//       const data = await response.json(); // 👈 this is required
//       setProducts(data);                  // 👈 use parsed data
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, []);
//   // 2. GSAP Entrance Animation
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

//   return (
//     <div className="bg-[#0D0D0D] min-h-screen text-white selection:bg-[#98D8AA] selection:text-black">
//       <Navbar />

//       {/* --- PAGE HEADER --- */}
//       <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
//           <div className="space-y-4">
//             <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase bg-white/5">
//               Organic Selection
//             </div>
//             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
//               The <span className="text-transparent border-text">Market</span>
//             </h1>
//           </div>

//           {/* Search & Filter Bar */}
//           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//             <div className="relative group flex-1">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0bdf47] transition-colors" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search fresh harvest..."
//                 className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#0bdf47]/50 focus:ring-4 focus:ring-[#0bdf47]/10 transition-all font-medium"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
//               <SlidersHorizontal size={20} />
//               Filter
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* --- PRODUCT GRID --- */}
//       <main className="px-6 pb-32 max-w-7xl mx-auto" ref={gridRef}>
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0bdf47]"></div>
//           </div>
//         ) : (
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//   {/* Check if products exists using ?. and provide a fallback empty array [] */}
//   {(products || [])
//     .filter((p) => p?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
//     .map((product) => (
//       <div
//         key={product._id}
//         className=" group bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-4 hover:border-[#0bdf47]/30 transition-all duration-500"
//       >
//         {/* Image Area */}
//         <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0D0D0D] mb-6">
//           <img
//             src={product.img || "https://via.placeholder.com/400"}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//           />

//           {/* Floating Wishlist Button */}
//           <button className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-2xl text-white/70 hover:text-red-500 hover:scale-110 transition-all border border-white/10">
//             <Heart size={20} />
//           </button>

//           {/* Stock Badge */}
//           <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0bdf47] text-black text-[10px] font-black uppercase rounded-lg">
//             {product.category || "Fresh"}
//           </div>
//         </div>

//         {/* Info Area */}
//         <div className="px-2 space-y-4">
//           <div className="flex justify-between items-start">
//             <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
//             <div className="flex items-center gap-1 text-[#98D8AA] font-bold text-sm">
//               {/* <Star size={14} fill="currentColor" /> {product.rating || "5.0"} */}
//             </div>
//           </div>

//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-black text-[#0bdf47]">
//               ${product.price}
//             </span>
//             <span className="text-gray-500 text-sm line-through">
//               ${(product.price * 1.2).toFixed(2)}
//             </span>
//           </div>

//           {/* CTA Buttons */}
//           <div className="grid grid-cols-5 gap-2 pt-2">
//             <button className="col-span-3 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase hover:bg-[#0bdf47] transition-all flex items-center justify-center gap-2 group/buy">
//               Buy Now{" "}
//               <ArrowRight
//                 size={16}
//                 className="group-hover/buy:translate-x-1 transition-transform"
//               />
//             </button>
//             <button className="col-span-2 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#0bdf47] hover:text-black transition-all group/cart"
//             onClick={()=>addToCart(product._id, 1)}
//             >
//               <ShoppingBag size={20} />
//             </button>
//             {/* <button className="col-span-1 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#0bdf47] hover:text-black transition-all">
//               <Plus size={20} />
//             </button> */}
//           </div>
//         </div>
//       </div>
//     ))}
// </div>
//         )}
//       </main>

//       {/* --- INLINE STYLE FOR OUTLINE TEXT --- */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         .border-text {
//           -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
//         }
//         @media (max-width: 768px) {
//           .border-text { -webkit-text-stroke: 1px rgba(255,255,255,0.4); }
//         }
//       `}} />
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
} from "lucide-react";
import { gsap } from "gsap";
import axios from "axios";
import Navbar from "../component/Navbar";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ ADDED

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const gridRef = useRef(null);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist(); // ✅ ADDED

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from(".shop-card", {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }, gridRef);
      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase bg-white/5">
              Organic Selection
            </div>
         <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
             The <span className=" border-text text-[#0bdf47]">Market</span>
           </h1>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#0bdf47] transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search fresh harvest..."
                className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-[#0bdf47]/50 focus:ring-4 focus:ring-[#0bdf47]/10 transition-all font-medium"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
              <SlidersHorizontal size={20} />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <main className="px-6 pb-32 max-w-7xl mx-auto" ref={gridRef}>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0bdf47]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(products || [])
              .filter((p) =>
                p?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((product) => {
                const isWishlisted = wishlist.some(
                  (item) =>
                    (item._id || item).toString() === product._id.toString(),
                );

                return (
                  <div
                    key={product._id}
                    className="group bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-4 hover:border-[#0bdf47]/30 transition-all duration-500"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0D0D0D] mb-6">
                      <img
                        src={product.img || "https://via.placeholder.com/400"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* ❤️ UPDATED WISHLIST BUTTON */}
                      <button
                        onClick={() => toggleWishlist(product._id)}
                        className={`absolute top-4 right-4 p-3 backdrop-blur-md rounded-2xl transition-all border border-white/10 hover:scale-110
                          ${
                            isWishlisted
                              ? "text-red-500 bg-red-500/20"
                              : "text-white/70 bg-black/40 hover:text-red-500"
                          }`}
                      >
                        <Heart
                          size={20}
                          fill={isWishlisted ? "currentColor" : "none"}
                        />
                      </button>

                      {/* CATEGORY */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0bdf47] text-black text-[10px] font-black uppercase rounded-lg">
                        {product.category || "Fresh"}
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="px-2 space-y-4">
                      <h3 className="text-xl font-bold tracking-tight">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#0bdf47]">
                          ${product.price}
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </span>
                      </div>

                      {/* BUTTONS */}
                      <div className="grid grid-cols-5 gap-2 pt-2">
                        <button className="col-span-3 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase hover:bg-[#0bdf47] transition-all flex items-center justify-center gap-2 group/buy">
                          Buy Now{" "}
                          <ArrowRight
                            size={16}
                            className="group-hover/buy:translate-x-1 transition-transform"
                          />
                        </button>

                        <button
                          className="col-span-2 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#0bdf47] hover:text-black transition-all"
                          onClick={() => addToCart(product._id, 1)}
                        >
                          <ShoppingBag size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
