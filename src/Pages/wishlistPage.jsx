// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   // 🔥 Fetch wishlist from backend
//   const fetchWishlist = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/wishlist", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       // backend returns { products: [] }
//       setWishlist(data.products || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     } else {
//       fetchWishlist();
//     }
//   }, []);

//   // ❌ Remove item
//   const removeFromWishlist = async (productId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/wishlist/${productId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       setWishlist(data.wishlist.products);

//       toast.warning("Removed from wishlist");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🧹 Clear wishlist
//   const clearWishlist = async () => {
//     try {
//       await fetch("http://localhost:5000/api/wishlist", {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setWishlist([]);
//       toast.success("Wishlist cleared");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🛒 Add to cart (optional)
//   const addToCart = async (productId) => {
//     try {
//       await fetch("http://localhost:5000/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           productId,
//           quantity: 1,
//         }),
//       });

//       toast.success("Added to cart");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-20">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

//       {wishlist.length > 0 ? (
//         <>
//           <button
//             onClick={clearWishlist}
//             className="mb-6 bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Clear Wishlist
//           </button>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {wishlist.map((product) => (
//               <div key={product._id} className="bg-white p-4 rounded shadow">
//                 <img
//                   src={product.img}
//                   alt={product.name}
//                   className="w-full h-40 object-cover"
//                 />

//                 <h3 className="mt-2 font-semibold">{product.name}</h3>
//                 <p>₹{product.price}</p>

//                 <div className="flex gap-2 mt-4">
//                   <button
//                     onClick={() => addToCart(product._id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={() => removeFromWishlist(product._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="text-center mt-20">
//           <h2 className="text-xl">Wishlist is empty 💔</h2>
//           <Link to="/shop" className="text-green-600 underline">
//             Go to Shop
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;


import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, ShoppingBag, ArrowRight, HeartCrack, Plus } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../component/Navbar";
import api from "../utils/axiosInstance";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const token = localStorage.getItem("token");

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchWishlist();
    }
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!loading && wishlist.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".wish-card", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }, gridRef);
      return () => ctx.revert();
    }
  }, [loading, wishlist.length]);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);
      setWishlist(res.data.wishlist.products);
      toast.warning("Removed from wishlist");
    } catch (err) {
      console.error(err);
    }
  };

  const clearWishlist = async () => {
    try {
      await api.delete("/wishlist");
      setWishlist([]);
      toast.success("Wishlist cleared");
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0bdf47]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-black tracking-widest uppercase bg-white/5 text-[#0bdf47]">
              Saved Items
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Your <span className="text-transparent border-text">Wishlist</span>
            </h1>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
            >
              <Trash2 size={18} /> Clear List
            </button>
          )}
        </div>

        {wishlist.length > 0 ? (
          <main ref={gridRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className=" group bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-4 hover:border-[#0bdf47]/30 transition-all duration-500 shadow-xl"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#0D0D0D] mb-6">
                    <img
                      src={product.image || product.img || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info Area */}
                  <div className="px-2 space-y-3">
                    <h3 className="text-xl font-bold tracking-tight truncate">{product.name}</h3>
                    <p className="text-3xl font-black text-[#0bdf47]">₹{product.price}</p>

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-5 gap-2 pt-2">
                      <button
                        onClick={() => addToCart(product._id)}
                        className="col-span-4 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase hover:bg-[#0bdf47] transition-all flex items-center justify-center gap-2 group/buy"
                      >
                        Add to Cart <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="col-span-1 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
              <HeartCrack size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Wishlist is empty</h2>
              <p className="text-gray-500 max-w-xs mx-auto">
                Looks like you haven't saved any fresh harvest yet.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#0bdf47] text-black px-8 py-4 rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform"
            >
              Go to Shop <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>

      {/* CSS for the Outline Text Effect */}
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

export default Wishlist;