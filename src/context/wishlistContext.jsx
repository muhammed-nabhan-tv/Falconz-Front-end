import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

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
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setWishlist(data.products || []);
      }
    } catch (error) {
      console.error("Fetch wishlist error:", error);
    }
  };

  // ✅ Add to Wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok) {
        setWishlist(data.wishlist.products);
      }
    } catch (error) {
      console.error("Add wishlist error:", error);
    }
  };

  // ✅ Remove from Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setWishlist(data.wishlist.products);
      }
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  };

  // ✅ Clear Wishlist
  const clearWishlist = async () => {
    try {
      await fetch("http://localhost:5000/api/wishlist", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

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