// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // 🔑 Always use ONE method
//   const getToken = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?.token;
//   };

//   // ✅ Fetch Cart
//   const fetchCart = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/cart", {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setCart(data.items || []);
//       }
//     } catch (error) {
//       console.error("Fetch cart error:", error);
//     }
//   };

//   // ✅ Add to cart
//   const addToCart = async (productId, quantity = 1) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });

//       if (res.ok) {
//         toast.success("Item added to cart 🛒");

//         // 🔥 IMPORTANT
//         fetchCart(); // refresh cart
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 🔁 Auto load cart
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, fetchCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔑 Token helper
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || localStorage.getItem("token");
  console.log(user?.token || localStorage.getItem("token"))
};
  // ✅ Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.items || []);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  // ✅ Add to cart
  const addToCart = async (productId, quantity = 1,price) => {
    try {
      await api.post("/cart/add", { productId, quantity });
      toast.success("Item added to cart 🛒");
      fetchCart(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  // ❌ Remove ONE item
const removeFromCart = async (productId) => {
  try {
    const res = await api.delete(`/cart/${productId}`);
    setCart(res.data.items || []);
    toast.error("Item removed");
  } catch (error) {
    console.error("Remove cart error:", error);
  }
};
  // 🧹 Clear ALL items
const clearCart = async () => {
  try {
    await api.delete("/cart");
    setCart([]); // ✅ manually clear
    toast.warning("Cart cleared 🧹");
  } catch (error) {
    console.error("Clear cart error:", error);
  }
};

  // 💰 Total (helper)
  // const total = cart.reduce(
  //   (sum, item) => sum + item.productId.price * item.quantity,
  //   0
  // );
  // 🔁 Load cart on start
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        // total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);