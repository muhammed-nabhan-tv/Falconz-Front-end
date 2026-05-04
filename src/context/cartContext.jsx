import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add to cart (API call)
const addToCart = async (productId, quantity = 1) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // 👈 important
    const token = user?.token;
    console.log(token)
    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    toast.success("item added to cart")

  } catch (error) {
    console.error(error);
  }
};

  // ✅ Get cart
//   const fetchCart = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/cart", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setCart(data.items || data.cart?.items);
//       }
//     } catch (error) {
//       console.error("Fetch cart error:", error);
//     }
//   };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(CartContext);