
import React, { useEffect, useState, useRef } from "react";
import { Package, User, Calendar, Box, LogOut, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../component/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const containerRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".profile-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".order-card", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, [orders]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- LOGIC: Only show top 2 products/orders ---
  const recentOrders = orders.slice(0, 2);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-4 mb-12 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-black tracking-widest uppercase bg-white/5 text-[#0bdf47]">
            Member Portal
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Your <span className="text-transparent border-text">Profile</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: USER INFO BENTO --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="profile-card bg-[#1A1A1A] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-[#0bdf47] rounded-[2rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(11,223,71,0.2)]">
                  <User size={40} />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Full Name</p>
                    <h2 className="text-2xl font-bold tracking-tight">{user?.name || "Member Name"}</h2>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Email Address</p>
                    <p className="text-gray-300 font-medium">{user?.email || "email@example.com"}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 text-[#0bdf47] text-xs font-black uppercase tracking-widest">
                    <Calendar size={14} /> Registered Member
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="group flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300"
                  >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Logout Session
                  </button>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                <User size={200} />
              </div>
            </div>
          </div>

          {/* --- RIGHT: RECENT ORDERS --- */}
          <div className="lg:col-span-8 bg-[#1A1A1A] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight flex items-center gap-3">
                    <Package className="text-[#0bdf47]" /> Recent Activity
                </h2>
                
                {/* NAVIGATION BUTTON TO ALL ORDERS */}
                <Link 
                  to="/orders" 
                  className="group flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0bdf47] hover:border-[#0bdf47]/50 transition-all"
                >
                    View All Orders <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                    <Box size={48} className="mx-auto text-gray-700 mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No orders found yet</p>
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className=" group bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-[#0bdf47]/20 transition-all"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ID: {order._id.slice(-6)}</p>
                        <div className={`mt-1 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest w-fit ${
                          order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-[#0bdf47]/10 text-[#0bdf47]'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Total</span>
                        <span className="text-2xl font-black text-[#0bdf47]">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                          <span className="font-bold text-[10px] uppercase tracking-tight">{item.name}</span>
                          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            {item.quantity} Unit{item.quantity > 1 ? 's' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
        }
      `}} />
    </div>
  );
};

export default Profile;