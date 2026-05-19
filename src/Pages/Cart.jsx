

import { useEffect, useRef } from "react";
import { useCart } from "../context/cartContext";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, CreditCard } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../component/Navbar";

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart,total } = useCart();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  // const total = cart.reduce((sum,item)=>{sum+item.price*item.quantity})

  // console.log(total)
  // 🔁 Always load fresh cart
  useEffect(() => {
    fetchCart();
    
    const ctx = gsap.context(() => {
      gsap.from(".cart-item", {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".summary-card", {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-black tracking-widest uppercase bg-white/5 text-[#0bdf47]">
            Your Basket
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Checkout <span className="text-transparent border-text">Bag</span>
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-[#1A1A1A] rounded-[3rem] border border-white/5">
            <ShoppingBag size={64} className="text-gray-600" />
            <h2 className="text-3xl font-bold">Your bag is empty</h2>
            <Link to="/products" className="bg-[#0bdf47] text-black px-8 py-4 rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform">
              Back to Market
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- LEFT: CART ITEMS --- */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="cart-item group flex flex-col sm:flex-row items-center gap-6 bg-[#1A1A1A] border border-white/5 p-6 rounded-[2.5rem] hover:border-[#0bdf47]/30 transition-all duration-500">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-[#0D0D0D]">
                    <img 
                      src={item.productId?.image || item.productId?.img || "https://via.placeholder.com/150"} 
                      alt={item.productId?.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h3 className="text-xl font-bold tracking-tight">{item.productId?.name}</h3>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Fresh Produce</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                       <span className="text-[#0bdf47] font-black text-xl">₹{item.productId?.price}</span>
                       <span className="text-gray-600 text-xs">Qty: {item.quantity}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => removeFromCart(item.productId._id || item.productId)}
                    className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <button
                onClick={async () => {
                  await clearCart();
                  fetchCart();
                }}
                className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors ml-4"
              >
                Clear all items
              </button>
            </div>

            {/* --- RIGHT: SUMMARY CARD --- */}
            <div className="lg:col-span-4">
              <div className="summary-card sticky top-32 bg-white text-black rounded-[3rem] p-10 space-y-8 shadow-2xl shadow-[#0bdf47]/10">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between font-bold text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-500 text-sm">
                    <span>Delivery</span>
                    <span className="text-green-600 font-black tracking-widest">FREE</span>
                  </div>
                  <div className="border-t border-black/10 pt-4 flex justify-between items-end">
                    <span className="font-black uppercase text-xs">Total Amount</span>
                    <span className="text-4xl font-black leading-none">₹{total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/checkout", {   state: {
    cartItems: cart,
  } })}
                    className="group w-full bg-[#0D0D0D] text-white py-5 rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-3 hover:bg-[#0bdf47] hover:text-black transition-all duration-300"
                  >
                    Proceed to Checkout <CreditCard size={18} className="group-hover:rotate-12 transition-transform" />
                  </button>
                  
                  <Link to="/shop" className="flex items-center justify-center gap-2 text-xs font-black uppercase text-gray-400 hover:text-black transition-colors">
                    Continue Shopping <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
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

export default Cart;