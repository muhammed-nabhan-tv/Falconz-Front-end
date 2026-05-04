import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Leaf, 
  Truck, 
  Star, 
  Target, 
  Eye, 
  Plus,
  ArrowUpRight
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../component/Navbar";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".about-hero-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
            // 2. Horizontal Marquee
            gsap.to(".marquee-inner", {
              xPercent: -50,
              ease: "none",
              duration: 15,
              repeat: -1,
            });
      // Bento Items Reveal
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <ShieldCheck className="text-[#0bdf47]" />, title: 'Secure Payment', desc: 'Bank-level SSL encryption for every transaction.' },
    { icon: <Leaf className="text-[#0bdf47]" />, title: '100% Organic', desc: 'Certified pesticide-free produce from local soil.' },
    { icon: <Truck className="text-[#0bdf47]" />, title: 'Turbo Delivery', desc: 'Freshness delivered to your door in under 24 hours.' },
    { icon: <Star className="text-[#0bdf47]" />, title: 'Quality First', desc: 'Not satisfied? Instant refund, no questions asked.' }
  ];

  return (
    <div ref={containerRef} className="bg-[#0D0D0D] text-white selection:bg-[#98D8AA] selection:text-black overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#436850] blur-[120px] rounded-full" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="about-hero-text inline-block px-4 py-1.5 border border-white/10 rounded-full text-xs font-black tracking-widest uppercase bg-white/5">
            Our Journey
          </div>
          <h1 className="about-hero-text text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            Falcon<span className="text-transparent border-text">Fruit</span> Story
          </h1>
          <p className="about-hero-text max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium pt-4">
            Founded in 2020, we reimagined the grocery chain by connecting the soil 
            directly to your digital doorstep.
          </p>
        </div>
      </section>

      {/* --- STORY BENTO GRID --- */}
      <section className="px-6 py-20 max-w-7xl mx-auto bento-grid">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Story Card */}
          <div className="bento-item md:col-span-8 bg-[#1A1A1A] rounded-[3rem] p-12 border border-white/5 relative overflow-hidden group">
            <h2 className="text-4xl font-bold mb-6">Born from the Earth</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              FreshRoot started with a simple problem: quality organic food was too hard to find. 
              We spent years building relationships with local farmers who care about the planet 
              as much as we do. Today, we're a bridge between sustainable soil and health-conscious souls.
            </p>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
               <Leaf size={300} />
            </div>
          </div>

          {/* Stats Card */}
          <div className="bento-item md:col-span-4 bg-[#0bdf47] rounded-[3rem] p-10 text-black flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <div className="text-5xl font-black">10K+</div>
                <div className="font-bold uppercase tracking-widest text-sm opacity-70">Happy Souls</div>
              </div>
              <div>
                <div className="text-5xl font-black">50+</div>
                <div className="font-bold uppercase tracking-widest text-sm opacity-70">Local Farms</div>
              </div>
            </div>
            <Link to="/shop" className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
               <ArrowUpRight />
            </Link>
          </div>

          {/* Mission & Vision */}
          <div className="bento-item md:col-span-6 bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-6">
            <Target className="text-[#0bdf47]" size={40} />
            <h3 className="text-2xl font-bold uppercase">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To revolutionize access to organic nutrition by creating a zero-waste 
              ecosystem that rewards both the farmer and the consumer.
            </p>
          </div>

          <div className="bento-item md:col-span-6 bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-6">
            <Eye className="text-[#0bdf47]" size={40} />
            <h3 className="text-2xl font-bold uppercase">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              A future where "Organic" isn't a premium choice, but the standard for every 
              household, regardless of their location.
            </p>
          </div>
        </div>
      </section>

      {/* --- WHY US (MARQUEE STYLE) --- */}
      <div className="py-20 bg-[#0bdf47] text-black overflow-hidden whitespace-nowrap rotate-[1deg] scale-105 z-20 relative">
        <div className="marquee-inner flex font-black text-4xl md:text-6xl uppercase tracking-tighter">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="flex items-center">
              Pesticide Free <Plus size={40} className="mx-8" /> 
              Farm Direct <Plus size={40} className="mx-8" />
              Eco Packaging <Plus size={40} className="mx-8" />
            </span>
          ))}
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className=" p-8 rounded-[2.5rem] bg-[#1A1A1A] border border-white/5 hover:border-[#0bdf47]/50 transition-all text-center">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {f.icon}
            </div>
            <h4 className="text-xl font-bold mb-3 uppercase tracking-tight">{f.title}</h4>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-40 px-6 text-center bg-gradient-to-t from-[#0bdf47]/10 to-transparent">
        <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-none">
          Ready to join the <br/> <span className="text-[#0bdf47]">Movement?</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/shop" className="bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:scale-110 transition-transform">
            GO TO MARKET
          </Link>
          <Link to="/contact" className="border border-white/20 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/10 transition-all">
            GET IN TOUCH
          </Link>
        </div>
      </section>

      {/* CSS for the Outline Text Effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.3);
        }
        @media (min-width: 768px) {
          .border-text { -webkit-text-stroke: 2px rgba(255,255,255,0.3); }
        }
      `}} />
    </div>
  );
};

export default About;