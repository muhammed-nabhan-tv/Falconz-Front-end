
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Navbar from "./component/Navbar";
import Footer from "./component/Footer"; 
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Auth/Login";
import SignUp from "./Auth/signup";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/wishlistPage";
import Profile from "./Pages/Profile";
// import Product from "./Pages/Product";
import ProductDetail from "./Pages/productDetails";
import Orders from "./Pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Admin/Admin"
import AllProducts from "./Admin/AllProducts";
import AllOrders from "./Admin/AllOrders";
import AllUsers from "./Admin/AllUsers";             
import Checkout from "./Pages/Checkout";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { setNavigate } from "./utils/navigate";
import {ProtectedRoute} from "./utils/ProtectedRoute"; 
function AppContent() {
  const navigate = useNavigate();
  setNavigate(navigate);
  const location = useLocation();

  // Auto redirect admin after refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (
        user.role?.toLowerCase() === "admin" &&
        (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")
      ) {
        navigate("/admindashboard", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  // Pages where we **don't want Navbar/Footer**
  const hideNavFooterPages = ["/login", "/signup", "/admindashboard","/products","/allorders","/users"];

  const showNavFooter = !hideNavFooterPages.includes(location.pathname);

  return (
    <>
      {/* {showNavFooter && <Navbar />} */}
      <WishlistProvider>
    <CartProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Guest-only routes */}
        <Route
          path="/login"
          element={
              <Login />
          }
        />
        <Route
          path="/signup"
          element={
              <SignUp />
          }
        />

        {/* Admin only */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allorders"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllProducts />
           </ProtectedRoute>
          }
        />
        <Route
          path="/allusers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AllUsers />
          </ProtectedRoute>
          }
        />

        {/* User protected routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
           </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
           </ProtectedRoute>
          }
        />
      </Routes>

      {/* {showNavFooter && <Footer />} */}
      <ToastContainer />
          </CartProvider>
          </WishlistProvider>
    </>
  );
}

export default AppContent;
