import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import {
  Truck,
  CheckCircle,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ✅ token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [items, setItems] = useState([]);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  // ✅ animation + load items
  useEffect(() => {
    if (!state) {
      navigate("/shop");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".checkout-step", {
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      });

      gsap.from(".summary-panel", {
        x: 30,
        opacity: 0,
        duration: 1,
      });
    }, containerRef);

    // 🛒 CART CHECKOUT
    if (state.cartItems) {
      setItems(state.cartItems);
    }

    // ⚡ BUY NOW
    else if (state.buyNowItem) {
      setItems([state.buyNowItem]);
    }

    return () => ctx.revert();
  }, []);

  // 💰 TOTAL
  const total = items.reduce((sum, item) => {
    const price = item.productId?.price || item.price || 0;

    return sum + price * item.quantity;
  }, 0);

  // 📦 PLACE ORDER
  const placeOrder = async () => {
    try {

      // unified items
      const orderItems = items.map((item) => ({
        productId: item.productId?._id || item.productId,
        quantity: item.quantity,
      }));
  if(!address.address||!address.city||!address.phone||!address.pincode){
    toast.warning("ALL FIELDS REQUIRED")
  }
      const res = await api.post("/orders", {
        items: orderItems,
        shippingAddress: address,
        paymentMethod: "COD",
        clearCart: !!state.cartItems,
      });

      navigate("/orders");
      toast.success("order confirmed");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0D0D0D] text-white"
    >
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 rounded-2xl"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-5xl font-black uppercase">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8">

            {/* SHIPPING */}
            <div className="checkout-step bg-[#1A1A1A] p-10 rounded-[3rem]">

              <div className="flex items-center gap-3 mb-8">
                <Truck />
                <h2 className="text-2xl font-bold">
                  Shipping Address
                </h2>
              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Address"
                  required:true
                  className="w-full bg-white/5 p-4 rounded-2xl outline-none"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      address: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="City"
                  required:true
                  className="w-full bg-white/5 p-4 rounded-2xl outline-none"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  required:true
                  className="w-full bg-white/5 p-4 rounded-2xl outline-none"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                />
                <input
                  type="Number"
                  placeholder="Number"
                  required:true
                  className="w-full bg-white/5 p-4 rounded-2xl outline-none"
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="checkout-step bg-[#1A1A1A] p-10 rounded-[3rem]">

              <div className="flex items-center gap-3 mb-6">
                <CreditCard />
                <h2 className="text-2xl font-bold">
                  Payment
                </h2>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-[#0bdf47]">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-[#0bdf47]" />
                  <p className="font-bold">
                    Cash on Delivery
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">

            <div className="summary-panel bg-white text-black rounded-[3rem] p-10 sticky top-32">

              <h2 className="text-3xl font-black mb-8">
                Order Summary
              </h2>

              <div className="space-y-5 mb-8 max-h-[300px] overflow-y-auto">

                {items.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between border-b pb-4"
                  >

                    <div>
                      <p className="font-bold">
                        {item.productId?.name || item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-[#0bdf47]">
                      ₹
                      {(item.productId?.price || item.price) *
                        item.quantity}
                    </p>

                  </div>
                ))}

              </div>

              {/* TOTAL */}
              <div className="border-t pt-6">

                <div className="flex justify-between mb-6">
                  <span className="font-bold">
                    Total
                  </span>

                  <span className="text-3xl font-black">
                    ₹{total}
                  </span>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-[#0bdf47] hover:text-black transition-all"
                >
                  Place Order
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Checkout;