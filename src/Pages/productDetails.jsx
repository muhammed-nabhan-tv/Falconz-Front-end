import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Leaf,
} from "lucide-react";
import { gsap } from "gsap";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const heroRef = useRef(null);
  const infoRef = useRef(null);

  // ── Fetch product by id ───────────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== "undefined") fetchProduct();
    else setError("Invalid product ID");
  }, [id]);

  // ── GSAP entrance ─────────────────────────────────────────
  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from(".detail-hero", {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".detail-info > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, [product]);

  const isWishlisted = wishlist.some(
    (item) => (item._id || item).toString() === id
  );

  const handleAddToCart = () => {
    addToCart(product._id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
  state: {
    buyNowItem: {
      productId: product,
      quantity: quantity,
    },
  },
    });
  };

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-[#0D0D0D] min-h-screen text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#0bdf47]" />
            <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
              Loading product...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="bg-[#0D0D0D] min-h-screen text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="text-8xl font-black text-white/5">404</div>
            <p className="text-gray-400 text-lg">{error || "Product not found"}</p>
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 px-6 py-3 bg-[#0bdf47] text-black font-black rounded-2xl mx-auto hover:opacity-90 transition-all"
            >
              <ArrowLeft size={18} /> Back to Market
            </button>
          </div>
        </div>
      </div>
    );
  }

  const discountedPrice = (product.price * 1.2).toFixed(2);
  const savings = (product.price * 0.2).toFixed(2);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="pt-28 pb-4 px-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0bdf47] transition-colors text-sm font-medium group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Market
        </button>
      </div>

      {/* ── Main layout ── */}
      <main className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* ── LEFT: Image panel ── */}
          <div className="detail-hero lg:sticky lg:top-28" ref={heroRef}>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#1A1A1A] border border-white/5">
              <img
                src={product.img || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Category badge */}
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#0bdf47] text-black text-[10px] font-black uppercase rounded-xl tracking-widest">
                {product.category || "Fresh"}
              </div>

              {/* Savings badge */}
              <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-[11px] font-black text-[#0bdf47]">
                SAVE ${savings}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`absolute bottom-6 right-6 p-4 backdrop-blur-md rounded-2xl transition-all border border-white/10 hover:scale-110
                  ${
                    isWishlisted
                      ? "text-red-500 bg-red-500/20"
                      : "text-white/70 bg-black/40 hover:text-red-500"
                  }`}
              >
                <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: <Truck size={16} />, label: "Free Delivery" },
                { icon: <RotateCcw size={16} />, label: "Easy Returns" },
                { icon: <Shield size={16} />, label: "Quality Assured" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-2 py-4 bg-[#1A1A1A] border border-white/5 rounded-2xl text-gray-400 hover:border-[#0bdf47]/20 transition-all"
                >
                  <span className="text-[#0bdf47]">{b.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product info ── */}
          <div className="detail-info space-y-8 pt-4" ref={infoRef}>

            {/* Name + rating */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-[#0bdf47]" />
                <span className="text-xs font-bold text-[#0bdf47] uppercase tracking-widest">
                  Organic
                </span>
              </div>
              <h1 className="text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-none">
                {product.name}
              </h1>
              {/* Stars (static decorative — wire to real reviews if you have them) */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="text-[#0bdf47]"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  5.0 · 128 reviews
                </span>
              </div>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-4 py-6 border-y border-white/5">
              <span className="text-6xl font-black text-[#0bdf47]">
                ${product.price}
              </span>
              <div className="space-y-1">
                <p className="text-gray-500 text-lg line-through font-medium">
                  ${discountedPrice}
                </p>
                <p className="text-xs font-black text-[#0bdf47] bg-[#0bdf47]/10 px-2 py-0.5 rounded-lg">
                  20% OFF
                </p>
              </div>
            </div>

            {/* Quantity picker */}
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-14 text-center text-lg font-black border-x border-white/10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  Total:{" "}
                  <span className="text-white font-black">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white text-black py-5 rounded-2xl font-black text-sm uppercase hover:bg-[#0bdf47] transition-all flex items-center justify-center gap-2 group/buy"
              >
                Buy Now
                <ArrowRight
                  size={18}
                  className="group-hover/buy:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-5 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 transition-all border
                  ${
                    addedToCart
                      ? "bg-[#0bdf47] text-black border-[#0bdf47]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#0bdf47]/30"
                  }`}
              >
                <ShoppingBag size={18} />
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Tabs: Description / Details */}
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-white/5 pb-0">
                {["description", "details"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all border-b-2 -mb-px
                      ${
                        activeTab === tab
                          ? "border-[#0bdf47] text-[#0bdf47]"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-gray-400 leading-relaxed text-sm">
                {activeTab === "description" ? (
                  <p>
                    {product.description ||
                      `${product.name} is freshly sourced and organically grown. Rich in nutrients and free from pesticides, it's the perfect addition to any healthy lifestyle. Harvested at peak ripeness for maximum flavour and nutrition.`}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {[
                      { label: "Category", value: product.category || "Fresh Produce" },
                      { label: "Price per unit", value: `$${product.price}` },
                      { label: "SKU", value: product._id?.slice(-8).toUpperCase() },
                      { label: "Stock", value: product.stock ?? "In Stock" },
                      { label: "Origin", value: product.origin || "Locally Sourced" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between py-3 border-b border-white/5 text-sm"
                      >
                        <span className="text-gray-600 font-medium">{row.label}</span>
                        <span className="text-white font-bold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;