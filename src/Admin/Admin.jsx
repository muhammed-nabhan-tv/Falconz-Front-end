// import React, { useEffect, useState, useRef, } from "react";
// import {
//   LayoutDashboard,
//   Box,
//   ShoppingBag,
//   Users,
//   TrendingUp,
//   Plus,
//   MoreHorizontal,
//   ArrowUpRight,
//   Search,
//   Settings,
// } from "lucide-react";
// import { gsap } from "gsap";
// import Navbar from "../component/Navbar";
// import api from "../utils/axiosInstance";
// import { Link } from "react-router-dom";


// // const navigate = 
// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     revenue: 0,
//     orders: 0,
//     customers: 0,
//     growth: "+12.5%",
//   });

//   const [orders, setOrders]   = useState([]);
//   const [search, setSearch]   = useState("");
//   const [loading, setLoading] = useState(true);

//   const dashboardRef = useRef(null);

//   // ── Fetch orders ───────────────────────────────────────────
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res  = await api.get("/orders/all-orders");
//         // FIX: axios wraps response in res.data
//         // your API returns { orders: [...] } OR just an array — handle both
//         const raw  = res.data;
//         const list = Array.isArray(raw) ? raw : (raw.orders ?? []);

//         setOrders(list);
        
//         // ── Stats from the order list ──
//         const revenue   = list.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
//         const customers = new Set(list.map((o) => o.userId?.toString())).size;

//         setStats({
//           revenue,
//           orders:    list.length,
//           customers,
//           growth:    "+12.5%",
//         });
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // ── GSAP entrance ──────────────────────────────────────────
//   useEffect(() => {
//     if (loading) return;
//     const ctx = gsap.context(() => {
//       gsap.from(".stat-card", {
//         y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
//       });
//       gsap.from(".table-row", {
//         x: -20, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.out", delay: 0.4,
//       });
//     }, dashboardRef);
//     return () => ctx.revert();
//   }, [loading]);

//   // ── Search filter ──────────────────────────────────────────
//   const filtered = orders.filter((o) => {
//     const term = search.toLowerCase();
//     return (
//       o._id?.toLowerCase().includes(term) ||
//       o.shippingAddress?.address?.toLowerCase().includes(term) ||
//       o.status?.toLowerCase().includes(term)
//     );
//   });
// console.log(filtered)
//   // ── Status badge style ─────────────────────────────────────
//   const statusStyle = (status) => {
//     switch (status) {
//       case "delivered":  return "bg-green-500/10 text-green-400";
//       case "pending":    return "bg-yellow-500/10 text-yellow-400";
//       case "cancelled":  return "bg-red-500/10 text-red-400";
//       case "shipped":    return "bg-blue-500/10 text-blue-400";
//       case "confirmed":  return "bg-purple-500/10 text-purple-400";
//       default:           return "bg-gray-500/10 text-gray-400";
//     }
//   };

//   return (
//     <div
//       ref={dashboardRef}
//       className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black"
//     >
//       <Navbar />

//       <div className="flex pt-24">
//         {/* ── SIDEBAR ── */}
//         <aside className="hidden lg:flex w-72 flex-col p-6 border-r border-white/5 sticky top-24 h-[calc(100vh-6rem)]">
//           <div className="space-y-2">
//             {[
//               { name: "Overview",path:"/Dashboard",   icon: <LayoutDashboard size={18} />, active: true },
//               { name: "Products", path:"products",  icon: <Box size={18} /> },
//               { name: "Orders", path:"/Allorder",    icon: <ShoppingBag size={18} /> },
//               { name: "Customers",path:"/Dashboard",  icon: <Users size={18} /> },
//               { name: "Analytics", path:"/Dashboard", icon: <TrendingUp size={18} /> },
//               { name: "Settings", path:"/Dashboard",  icon: <Settings size={18} /> },
//             ].map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
//                   item.active
//                     ? "bg-[#0bdf47] text-black"
//                     : "text-gray-500 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 {item.icon} {item.name}
//               </Link>
//             ))}
//           </div>

//           <div className="mt-auto p-6 bg-white/5 rounded-3xl border border-white/10">
//             <p className="text-[10px] font-black uppercase text-gray-500 mb-2">
//               System Status
//             </p>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-[#0bdf47] rounded-full animate-pulse" />
//               <span className="text-xs font-bold">Servers Operational</span>
//             </div>
//           </div>
//         </aside>

//         {/* ── MAIN ── */}
//         <main className="flex-1 p-6 lg:p-12 overflow-hidden">
//           <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//             <div>
//               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0bdf47] mb-2">
//                 Admin Console
//               </p>
//               <h1 className="text-5xl font-black uppercase tracking-tighter">
//                 Dashboard
//               </h1>
//             </div>
//             {/* <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#0bdf47] transition-all">
//               <Plus size={16} /> Add Product
//             </button> */}
//           </header>

//           {/* ── STATS ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
//             {[
//               { label: "Total Revenue",    val: `₹${stats.revenue.toFixed(2)}`, icon: <TrendingUp className="text-[#0bdf47]" /> },
//               { label: "Total Orders",     val: stats.orders,                    icon: <ShoppingBag className="text-[#0bdf47]" /> },
//               { label: "Total Customers",  val: stats.customers,                 icon: <Users className="text-[#0bdf47]" /> },
//               { label: "Monthly Growth",   val: stats.growth,                    icon: <ArrowUpRight className="text-[#0bdf47]" /> },
//             ].map((stat, i) => (
//               <div
//                 key={i}
//                 className="stat-card bg-[#1A1A1A] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden"
//               >
//                 <div className="relative z-10">
//                   <div className="mb-4">{stat.icon}</div>
//                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
//                     {stat.label}
//                   </p>
//                   <h3 className="text-3xl font-black">{stat.val}</h3>
//                 </div>
//                 <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#0bdf47] blur-[100px] opacity-10 rounded-full" />
//               </div>
//             ))}
//           </div>

//           {/* ── ORDERS TABLE ── */}
//           <div className="bg-[#1A1A1A] border border-white/5 rounded-[3rem] p-8 lg:p-12 shadow-2xl">
//             <div className="flex items-center justify-between mb-10">
//               <h2 className="text-2xl font-black uppercase tracking-tight italic">
//                 Live Orders
//               </h2>
//               <div className="relative">
//                 <Search
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//                   size={14}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search orders..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="bg-black/20 border border-white/5 rounded-full py-2 pl-10 pr-6 text-xs outline-none focus:border-[#0bdf47]/50 transition-all"
//                 />
//               </div>
//             </div>

//             {loading ? (
//               <div className="flex justify-center py-16">
//                 <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#0bdf47]" />
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="text-center py-16 text-gray-500 text-sm font-medium">
//                 {search ? "No orders match your search" : "No orders yet"}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className="border-b border-white/5">
//                       {["Order ID", "Customer", "Items", "Status", "Amount", "Date"].map((h) => (
//                         <th key={h} className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/5">
//                     {/* FIX: was `orders.map((orders) =>` — wrong variable name caused all the undefined errors */}
//                     {filtered.map((order) => (
//                       <tr
//                         key={order._id}  //FIX: was order.items._id — _id is on the order itself 
//                         className="table-row group hover:bg-white/[0.02] transition-colors"
//                       >
//                         {/* Order ID — FIX: was order.items._id */}
//                         <td className="py-6 font-mono text-xs text-gray-400">
//                           #{order._id.slice(-6).toUpperCase()}
//                         </td>

//                         {/* Customer — FIX: shippingAddress is on order, not order.items */}
//                         <td className="py-6">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold">
//                               {order.shippingAddress?.address?.[0]?.toUpperCase() || "?"}
//                             </div>
//                             <div>
//                               <p className="font-bold text-sm">
//                                 {order.shippingAddress?.address || "N/A"}
//                               </p>
//                               <p className="text-[10px] text-gray-500">
//                                 {order.shippingAddress?.city}, {order.shippingAddress?.pincode}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         {/* Items — FIX: order.items is the array, map over it */}
//                         <td className="py-6">
//                           <div className="flex flex-col gap-1">
//                             {order.items.map((item, i) => (
//                               <span key={i} className="text-xs text-gray-400">
//                                 {item.name} × {item.quantity}
//                               </span>
//                             ))}
//                           </div>
//                         </td>

//                         {/* Status — FIX: was order.items.status — status is on the order */}
//                         <td className="py-6">
//                           <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${statusStyle(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </td>

//                         {/* Amount — FIX: was order.items.totalAmount */}
//                         <td className="py-6 font-black">
//                           ₹{order.totalAmount}
//                         </td>

//                         {/* Date */}
//                         <td className="py-6 text-xs text-gray-500">
//                           {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                             day:   "2-digit",
//                             month: "short",
//                             year:  "numeric",
//                           })}
//                         </td>

//                         {/* Action */}
//                         {/* <td className="py-6">
//                           <button className="p-2 text-gray-500 hover:text-white transition-colors">
//                             <MoreHorizontal size={18} />
//                           </button>
//                         </td> */}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState, useRef } from "react";
import {
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../component/Navbar";
import Sidebar from "./Sidebar"; // Import the new component
import api from "../utils/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    growth: "+12.5%",
  });

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/orders/allorders");
        const raw = res.data;
        const list = Array.isArray(raw) ? raw : (raw.orders ?? []);

        setOrders(list);
        console.log(orders)
        const revenue = list.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const customers = new Set(list.map((o) => o.userId?.toString())).size;

        setStats({
          revenue,
          orders: list.length,
          customers,
          growth: "+12.5%",
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".table-row", {
        x: -20, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power2.out", delay: 0.4,
      });
    }, dashboardRef);
    return () => ctx.revert();
  }, [loading]);

  const filtered = orders.filter((o) => {
    const term = search.toLowerCase();
    return (
      o._id?.toLowerCase().includes(term) ||
      o.shippingAddress?.address?.toLowerCase().includes(term) ||
      o.status?.toLowerCase().includes(term)
    );
  });

  const statusStyle = (status) => {
    switch (status) {
      case "delivered": return "bg-green-500/10 text-green-400";
      case "pending":   return "bg-yellow-500/10 text-yellow-400";
      case "cancelled": return "bg-red-500/10 text-red-400";
      case "shipped":   return "bg-blue-500/10 text-blue-400";
      case "confirmed": return "bg-purple-500/10 text-purple-400";
      default:          return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-[#0D0D0D] text-white">
      {/* <Navbar /> */}

      <div className="flex pt-5">
        {/* Render Sidebar Component */}
        <Sidebar />

        <main className="flex-1 p-6 lg:p-12 overflow-hidden">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0bdf47] mb-2">
                Admin Console
              </p>
              <h1 className="text-5xl font-black uppercase tracking-tighter">
                Dashboard
              </h1>
            </div>
          </header>

          {/* STATS SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Revenue", val: `₹${stats.revenue.toFixed(2)}`, icon: <TrendingUp className="text-[#0bdf47]" /> },
              { label: "Total Orders", val: stats.orders, icon: <ShoppingBag className="text-[#0bdf47]" /> },
              { label: "Total Customers", val: stats.customers, icon: <Users className="text-[#0bdf47]" /> },
              { label: "Monthly Growth", val: stats.growth, icon: <ArrowUpRight className="text-[#0bdf47]" /> },
            ].map((stat, i) => (
              <div key={i} className="stat-card bg-[#1A1A1A] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="mb-4">{stat.icon}</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black">{stat.val}</h3>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#0bdf47] blur-[100px] opacity-10 rounded-full" />
              </div>
            ))}
          </div>

          {/* ORDERS TABLE */}
          <div className="bg-[#1A1A1A] border border-white/5 rounded-[3rem] p-8 lg:p-12 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black uppercase tracking-tight italic">Live Orders</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-black/20 border border-white/5 rounded-full py-2 pl-10 pr-6 text-xs outline-none focus:border-[#0bdf47]/50 transition-all"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#0bdf47]" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Order ID", "Customer", "Items", "Status", "Amount", "Date"].map((h) => (
                        <th key={h} className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filtered.map((order) => (
                      <tr key={order._id} className="table-row group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 font-mono text-xs text-gray-400">#{order._id.slice(-6).toUpperCase()}</td>
                        <td className="py-6">
                           <p className="font-bold text-sm">{order.shippingAddress?.address || "N/A"}</p>
                           <p className="text-[10px] text-gray-500">{order.shippingAddress?.city}</p>
                        </td>
                        <td className="py-6">
                          <div className="flex flex-col gap-1">
                            {order.items.map((item, i) => (
                              <span key={i} className="text-xs text-gray-400">{item.name} × {item.quantity}</span>
                            ))}
                          </div>
                        </td>
                        <td className="py-6">
                          <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${statusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-6 font-black">₹{order.totalAmount}</td>
                        <td className="py-6 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;