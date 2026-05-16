import React from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  Users,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
// import api from "../utils/axiosInstance";
const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {logout} = useAuth
const user = JSON.parse(
  localStorage.getItem("user")
);
  const menuItems = [
    { name: "Overview", path: "/admindashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Products", path: "/products", icon: <Box size={18} /> },
    { name: "Orders", path: "/allorders", icon: <ShoppingBag size={18} /> },
    { name: "Customers", path: "/allusers", icon: <Users size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <aside className="hidden lg:flex w-72 flex-col p-6 border-r border-white/5 sticky top-10 h-[calc(100vh-6rem)]">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                isActive
                  ? "bg-[#0bdf47] text-black"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          );
        })}
      </div>

<div className="mt-auto p-6 bg-white/5 rounded-3xl border border-white/10">

  <p className="text-[10px] font-black uppercase text-gray-500 mb-4">
    Logged In Admin
  </p>

  <div className="flex items-center gap-4">

    {/* AVATAR */}
    <div className="w-12 h-12 rounded-full bg-[#0bdf47]/20 text-[#0bdf47] flex items-center justify-center text-lg font-black uppercase">

      {user?.name?.[0] || "A"}

    </div>

    {/* USER INFO */}
    <div>

      <h3 className="text-sm font-black uppercase">
        {user?.name || "Admin"}
      </h3>

      <p className="text-xs text-gray-400 uppercase mt-1">
        {user?.role || "admin"}
      </p>

    </div>

  </div>
  <button
  onClick={handleLogout}
  className="mt-4 w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
>

  <LogOut size={18} />

  Logout

</button>
</div>
    </aside>
  );
};

export default Sidebar;