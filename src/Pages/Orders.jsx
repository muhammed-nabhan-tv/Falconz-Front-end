import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import {
  Package,
  Calendar,
  CreditCard,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import Navbar from "../component/Navbar";
import api from "../utils/axiosInstance";

const Orders = () => {
  const containerRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
console.log("token:"+token)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      const data = res.data;
      setOrders(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
    // ✅ fetch orders
  useEffect(() => {
    fetchOrders();

    const ctx = gsap.context(() => {
      gsap.from(".order-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
// console.log(orders)
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0D0D0D] text-white"
    >
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            My Orders
          </h1>

          <p className="text-gray-400 mt-4 uppercase text-sm tracking-widest">
            Track all your purchases
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-16 h-16 border-4 border-[#0bdf47] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders == [] ? (

          /* EMPTY */
          <div className="bg-[#1A1A1A] rounded-[3rem] p-16 text-center border border-white/5">
            <ShoppingBag
              size={80}
              className="mx-auto mb-6 text-[#0bdf47]"
            />

            <h2 className="text-3xl font-black uppercase mb-4">
              No Orders Yet
            </h2>

            <p className="text-gray-400">
              Start shopping to see your orders here.
            </p>
          </div>

        ) : (

          /* ORDERS */
          <div className="space-y-10">

            {orders.map((order) => (

              <div
                key={order._id}
                className="order-card bg-[#1A1A1A] rounded-[3rem] p-8 md:p-10 border border-white/5"
              >

                {/* TOP */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-6 mb-8">

                  <div>
                    <h2 className="text-2xl font-black uppercase">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-400 mt-3 text-sm">
                      <Calendar size={16} />

                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">

                    <div
                      className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest
                      ${
                        order.status === "delivered"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {order.status}
                    </div>

                    <div className="text-4xl font-black text-[#0bdf47]">
                      ₹{order.totalAmount}
                    </div>

                  </div>

                </div>

                {/* ITEMS */}
                <div className="space-y-5 mb-8">

                  {order.items.map((item) => (

                    <div
                      key={item._id}
                      className="flex items-center justify-between bg-white/5 rounded-2xl p-5"
                    >

                      <div className="flex items-center gap-5">

                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        <div>
                          <h3 className="font-black uppercase">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-400 mt-1">
                            Category: {item.category}
                          </p>

                          <p className="text-sm text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                      </div>

                      <div className="text-right">
                        <p className="text-xl font-black text-[#0bdf47]">
                          ₹{item.price * item.quantity}
                        </p>

                        <p className="text-sm text-gray-400">
                          ₹{item.price} each
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

                {/* BOTTOM */}
                <div className="grid md:grid-cols-2 gap-6 border-t border-white/10 pt-6">

                  {/* SHIPPING */}
                  <div className="bg-white/5 rounded-2xl p-6">

                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="text-[#0bdf47]" />
                      <h3 className="font-black uppercase">
                        Shipping Address
                      </h3>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {order.shippingAddress?.address}
                      <br />
                      {order.shippingAddress?.city}
                      <br />
                      {order.shippingAddress?.pincode}
                    </p>

                  </div>

                  {/* PAYMENT */}
                  <div className="bg-white/5 rounded-2xl p-6">

                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="text-[#0bdf47]" />
                      <h3 className="font-black uppercase">
                        Payment
                      </h3>
                    </div>

                    <p className="text-gray-300">
                      {order.paymentMethod}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>
    </div>
  );
};

export default Orders;