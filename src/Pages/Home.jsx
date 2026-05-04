import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBasket, 
  ArrowUpRight, 
  Zap, 
  Heart, 
  ShieldCheck, 
  Star,
  Plus,
  ArrowRight
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/Navbar";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const { user } = useAuth();
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Split Animation
      gsap.from(".char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      });

      // 2. Horizontal Marquee
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // 3. Bento Box Reveal
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // 4. Parallax Image
      gsap.to(".parallax-img", {
        scrollTrigger: {
          trigger: ".parallax-img",
          scrub: true,
        },
        y: -100,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    
    <div ref={containerRef} className="bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black overflow-hidden">
      <Navbar/>
      {/* --- FLOATING INTERACTIVE CTA --- */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl shadow-2xl">
        <Link to="/login" className="px-6 py-3 text-sm font-bold hover:bg-white/10 rounded-xl transition-all">Sign In</Link>
        <Link to="/signup" className="px-6 py-3 text-sm font-bold bg-[#0bdf47] text-black rounded-xl hover:scale-105 transition-all">Start Shopping</Link>
      </div> */}

    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2  p-2 rounded-2xl shadow-2xl">

      {/* If NOT logged in → show Sign In */}
      {!user && (
        <Link
          to="/login"
          className="px-6 py-3 text-sm font-bold hover:bg-white/10 rounded-xl transition-all"
        >
          Sign In
        </Link>
      )}

      {/* Start Shopping (always visible) */}

<Link
  to={user ? "/products" : "/signup"}
  className="group flex items-center gap-2 px-8 py-3 text-sm font-bold bg-[#0bdf47] text-black rounded-xl transition-all hover:scale-105"
>
  Start Shopping

  <ArrowRight
    className="transition-transform duration-300 group-hover:translate-x-1"
    size={18}
  />
</Link>

    </div>
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#436850] blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900 blur-[150px] rounded-full" />
        </div>

        <div className="text-center z-10 space-y-4 px-6">
          <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-[0.3em] uppercase bg-white/5 backdrop-blur-md mb-4">
            Next-Gen Grocery App
          </div>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase">
            <span className="block char">Fresh</span>
            <span className="block char text-transparent border-text">Market</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-medium pt-8">
            The grocery experience reimagined. Hand-picked organic goods, delivered with surgical precision.
          </p>
        </div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <div className="py-10 bg-[#0bdf47] text-black overflow-hidden whitespace-nowrap rotate-[-2deg] scale-105 z-20 relative">
        <div className="marquee-inner flex font-black text-6xl md:text-8xl uppercase tracking-tighter">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center">
              Fresh Roots <Plus size={60} className="mx-10" /> 
              Organic Only <Plus size={60} className="mx-10" />
            </span>
          ))}
        </div>
      </div>

      {/* --- BENTO CONTENT GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
          
          {/* Main Large Card */}
          <div className="bento-item md:col-span-8 bg-[#1A1A1A] rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden relative group">
            <div className="z-10">
              <h3 className="text-4xl font-bold mb-4">Farm to Table<br/>In 30 Minutes.</h3>
              <p className="text-gray-400 max-w-sm">Our logistics network ensures that your produce never sits in a warehouse.</p>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                <ShoppingBasket size={300} className="text-[#436850] translate-y-1/4 translate-x-1/4" />
            </div>
          </div>

          {/* Small Feature Card */}
          <div className="bento-item md:col-span-4 bg-[#0bdf47] rounded-[3rem] p-10 text-black flex flex-col justify-between">
            <Zap size={40} fill="black" />
            <div>
              <h4 className="text-2xl font-black uppercase">Turbo Delivery</h4>
              <p className="font-medium opacity-80">Free for members over $50.</p>
            </div>
          </div>

          {/* Another Column */}
          <div className="bento-item md:col-span-4 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col gap-6">
            <div className="flex gap-2">
               {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#98D8AA" color="#98D8AA" />)}
            </div>
            <p className="text-xl italic">"The freshest avocados I've ever ordered online. Seriously game changing."</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-700" />
              <span className="font-bold">Sarah Jenkins</span>
            </div>
          </div>

          {/* Long Vertical Image Card */}
          <div className="bento-item md:col-span-8 bg-[#1A1A1A] rounded-[3rem] overflow-hidden relative min-h-[400px]">
             <img 
               src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1000" 
               alt="Veggies" 
               className="parallax-img w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                <h3 className="text-3xl font-bold">Sustainability at Heart</h3>
                <p className="text-gray-400">100% Compostable packaging.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Products", val: "5k+" },
            { label: "Farmers", val: "120+" },
            { label: "Cities", val: "18" },
            { label: "Rating", val: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl md:text-6xl font-black text-[#0bdf47]">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 px-6 text-center">
        <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase">
          Ready to join the <br/> <span className="text-[#0bdf47]">Green Side?</span>
        </h2>
        <Link to="/signup" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-2xl hover:scale-110 transition-transform">
          SIGN UP NOW <ArrowUpRight />
        </Link>
      </section>

      {/* CSS for the Outline Text Effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        @media (min-width: 768px) {
          .border-text { -webkit-text-stroke: 2px rgba(255,255,255,0.3); }
        }
      `}} />
    </div>
  );
};

export default Home;

