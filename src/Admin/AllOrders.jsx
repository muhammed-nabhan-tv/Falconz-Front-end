import React, { useEffect, useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Phone,
  User,
  CalendarDays,
} from "lucide-react";

import Sidebar from "./Sidebar";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {

      const res = await api.get("/orders/allorders");
      setOrders(res.data.orders|| []);
      console.log(orders)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    try {

      await api.patch(`/orders/${id}`, {
        status,
      });

      toast.success("Order status updated");

      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Search
const filteredOrders = orders.filter((order) => {

  const term = search.toLowerCase();

  return (
    // 🔍 Search by order id
    order._id?.toLowerCase().includes(term) ||
    // 🔍 Search by user name
    order.userId?.firstName
      ?.toLowerCase()
      .includes(term) ||
    // 🔍 Search by product name
    order.items?.some((item) =>
      item.name
        ?.toLowerCase()
        .includes(term)
    )
  );
});
  
  // ✅ Status Style
  const statusStyle = (status) => {
    switch (status) {

      case "pending":
        return "bg-yellow-500/20 text-yellow-400";

      case "confirmed":
        return "bg-blue-500/20 text-blue-400";

      case "shipped":
        return "bg-purple-500/20 text-purple-400";

      case "delivered":
        return "bg-green-500/20 text-green-400";

      case "cancelled":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };
// console.log(filteredOrders)
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex">

      {/* SIDEBAR */}
      <div className="w-[280px] border-r border-white/5 bg-[#111111] min-h-screen">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black uppercase">
              Orders
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all customer orders
            </p>

          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[350px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search order id..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none"
            />

          </div>

        </div>

        {/* ORDERS */}
        <div className="space-y-8">

          {filteredOrders.map((order) => (

            <div
              key={order._id}
              className="bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8"
            >

              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8 border-b border-white/5 pb-8">

                {/* LEFT */}
                <div className="space-y-4">

                  {/* ORDER ID */}
                  <div>

                    <p className="text-gray-500 text-xs uppercase mb-2">
                      Order ID
                    </p>

                    <h2 className="font-black text-xl">
                      #{order._id}
                    </h2>

                  </div>

                  {/* USER */}
                  <div className="flex items-center gap-3">

                    <User
                      size={18}
                      className="text-[#0bdf47]"
                    />

                    <div>

                      <p className="font-bold">
                        {order.userId?.firstName || "Unknown"}
                      </p>

                      <p className="text-sm text-gray-400">
                        {order.userId?.email}
                      </p>

                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="flex items-center gap-3">

                    <Phone
                      size={18}
                      className="text-[#0bdf47]"
                    />

                    <p>
                      {order.shippingAddress?.phone || "No Phone"}
                    </p>

                  </div>

                  {/* ADDRESS */}
                  <div className="flex items-start gap-3">

                    <MapPin
                      size={18}
                      className="text-[#0bdf47] mt-1"
                    />

                    <div>

                      <p>
                        {order.shippingAddress?.address}
                      </p>

                      <p className="text-sm text-gray-400">
                        {order.shippingAddress?.city} -{" "}
                        {order.shippingAddress?.pincode}
                      </p>

                    </div>

                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-3">

                    <CalendarDays
                      size={18}
                      className="text-[#0bdf47]"
                    />

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-5">

                  {/* TOTAL */}
                  <div>

                    <p className="text-gray-500 text-xs uppercase mb-2">
                      Total Amount
                    </p>

                    <h2 className="text-4xl font-black text-[#0bdf47]">
                      ₹{order.totalAmount}
                    </h2>

                  </div>

                  {/* STATUS */}
                  <div>

                    <p className="text-gray-500 text-xs uppercase mb-2">
                      Status
                    </p>

                    <div className="flex items-center gap-3">

                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${statusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      {/* CHANGE STATUS */}
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="bg-black/20 border border-white/5 rounded-xl px-4 py-2 outline-none"
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

              </div>

              {/* PRODUCTS */}
              <div>

                <div className="flex items-center gap-3 mb-6">

                  <Package className="text-[#0bdf47]" />

                  <h3 className="text-2xl font-black uppercase">
                    Ordered Products
                  </h3>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                  {order.items.map((item) => (

                    <div
                      key={item._id}
                      className="bg-black/20 border border-white/5 rounded-2xl p-4 flex gap-4"
                    >

                      {/* IMAGE */}
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-24 h-24 rounded-2xl object-cover"
                      />

                      {/* CONTENT */}
                      <div className="flex-1">

                        <h2 className="font-black uppercase">
                          {item.name}
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                          {item.category}
                        </p>

                        <div className="flex items-center justify-between mt-4">

                          <p className="text-sm">
                            Qty: {item.quantity}
                          </p>

                          <h3 className="font-black text-[#0bdf47]">
                            ₹
                            {item.price *
                              item.quantity}
                          </h3>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminOrders;