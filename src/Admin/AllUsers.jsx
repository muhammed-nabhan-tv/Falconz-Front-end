import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  ShieldCheck,
  ShieldX,
  Mail,
  Phone,
  CalendarDays,
  ShoppingBag,
} from "lucide-react";

import Sidebar from "./Sidebar";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminCustomers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {

      const res = await api.get("/users/allusers");
      //       const raw = res.data;
      // const list = Array.isArray(raw) ? raw : (raw.orders ?? []);
      setUsers(res.data.users);
      console.log(list)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Block / Unblock User
  const toggleBlockUser = async (id, blocked) => {
    try {

      await api.patch(`/users/block/${id}`, {
      isBlocked: !blocked,
      });

      toast.success(
        blocked
          ? "User unblocked"
          : "User blocked"
      );

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Search Users
  const filteredUsers = users.filter((user) => {

    const term = search.toLowerCase();

    return (

      user.name
        ?.toLowerCase()
        .includes(term) ||

      user.email
        ?.toLowerCase()
        .includes(term)

    );
  });
console.log(filteredUsers)
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex">

      {/* SIDEBAR */}
      <div className="w-[280px] min-h-screen border-r border-white/5 bg-[#111111]">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black uppercase">
              Customers
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all users and activities
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
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none"
            />

          </div>

        </div>

        {/* USERS */}
        <div className="space-y-8">

          {filteredUsers.map((user) => (

            <div
              key={user._id}
              className="bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8"
            >

              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8 border-b border-white/5 pb-8">

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  {/* AVATAR */}
                  <div className="w-20 h-20 rounded-full bg-[#0bdf47]/20 flex items-center justify-center text-3xl font-black text-[#0bdf47]">

                    {user.firstName?.[0]}

                  </div>

                  {/* USER INFO */}
                  <div>

                    <h2 className="text-3xl font-black uppercase">
                      {user.firstName}
                    </h2>

                    <div className="space-y-2 mt-4">

                      {/* EMAIL */}
                      <div className="flex items-center gap-3 text-gray-300">

                        <Mail
                          size={16}
                          className="text-[#0bdf47]"
                        />

                        <p>{user.email}</p>

                      </div>

                      {/* PHONE */}
                      <div className="flex items-center gap-3 text-gray-300">

                        <Phone
                          size={16}
                          className="text-[#0bdf47]"
                        />

                        <p>
                          {user.phone || "No phone"}
                        </p>

                      </div>

                      {/* JOINED */}
                      <div className="flex items-center gap-3 text-gray-300">

                        <CalendarDays
                          size={16}
                          className="text-[#0bdf47]"
                        />

                        <p>
                          Joined{" "}
                          {new Date(
                            user.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-5">

                  {/* STATUS */}
                  <div>

                    <p className="text-xs uppercase text-gray-500 mb-2">
                      Account Status
                    </p>

                    <div
                      className={`px-5 py-3 rounded-2xl text-sm font-black uppercase ${
                        user.isBlocked
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >

                      {user.isBlocked
                        ? "Blocked"
                        : "Active"}

                    </div>

                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() =>
                      toggleBlockUser(
                        user._id,
                        user.isBlocked
                      )
                    }
                    className={`px-6 py-4 rounded-2xl font-black uppercase text-sm flex items-center gap-3 ${
                      user.isBlocked
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >

                    {user.isBlocked ? (
                      <>
                        <ShieldCheck size={18} />
                        Unblock User
                      </>
                    ) : (
                      <>
                        <ShieldX size={18} />
                        Block User
                      </>
                    )}

                  </button>

                </div>

              </div>

              {/* USER ACTIVITY */}


            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminCustomers;