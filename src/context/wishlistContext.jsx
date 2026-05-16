import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // 🔑 get token (adjust based on your storage)
  const getToken = () => {
    // return localStorage.getItem("token"); 
    // OR:
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
    console.log(user?.token)
  };

  // ✅ Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.products || []);
    } catch (error) {
      console.error("Fetch wishlist error:", error);
    }
  };

  // ✅ Add to Wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await api.post("/wishlist/add", { productId });
      setWishlist(res.data.wishlist.products);
    } catch (error) {
      console.error("Add wishlist error:", error);
    }
  };

  // ✅ Remove from Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);
      setWishlist(res.data.wishlist.products);
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  };

  // ✅ Clear Wishlist
  const clearWishlist = async () => {
    try {
      await api.delete("/wishlist");
      setWishlist([]);
    } catch (error) {
      console.error("Clear wishlist error:", error);
    }
  };

  // ✅ Toggle (BEST UX ❤️)
const toggleWishlist = async (productId) => {
  const exists = wishlist.some(
    (item) =>
      (item._id || item).toString() === productId.toString()
  );

  if (exists) {
    await removeFromWishlist(productId);
    toast.error('item removed')
  } else {
    await addToWishlist(productId);
    toast.success('item added')
  }
};

  // auto fetch on load
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// custom hook
export const useWishlist = () => useContext(WishlistContext);