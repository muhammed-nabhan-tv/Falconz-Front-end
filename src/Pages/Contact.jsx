import React, { useEffect, useRef, useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send,
  Twitter,
  Instagram,
  Facebook,
  Plus
} from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../component/Navbar";

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".contact-header", {
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
        duration: 20,
        repeat: -1,
      });
      // Bento Items Reveal
      gsap.from(".bento-item", {
        scale: 0.95,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={containerRef} className="bg-[#0D0D0D] min-h-screen text-white selection:bg-[#98D8AA] selection:text-black">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-16 px-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="contact-header inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-black tracking-widest uppercase bg-white/5">
            Get in Touch
          </div>
          <h1 className="contact-header text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            Let's <span className="text-transparent border-text">Talk</span>
          </h1>
          <p className="contact-header max-w-2xl text-gray-400 text-lg md:text-xl font-medium pt-4">
            Have a question about our harvest? Our team of organic experts is here to help you cultivate a healthier lifestyle.
          </p>
        </div>
      </section>
            {/* --- MARQUEE CTA --- */}
      <div className="py-12 bg-[#0bdf47] text-black overflow-hidden whitespace-nowrap rotate-[-1deg] scale-105 z-20 relative">
        <div className=" marquee-inner flex font-black text-4xl md:text-5xl uppercase tracking-tighter">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="flex items-center">
              We're Listening <Plus size={40} className="mx-10" /> 
              Support 24/7 <Plus size={40} className="mx-10" />
              Community Driven <Plus size={40} className="mx-10" />
            </span>
          ))}
        </div>
      </div>

      {/* --- CONTACT BENTO GRID --- */}
      <main className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. CONTACT FORM (Main Action) */}
          <div className="bento-item lg:col-span-7 bg-[#1A1A1A] rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="text-[#0bdf47]" /> Send a Message
            </h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 ml-2">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 ml-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500 ml-2">Your Inquiry</label>
                <textarea 
                  name="message"
                  rows="5"
                  onChange={handleInputChange}
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all font-medium resize-none"
                ></textarea>
              </div>
              
              <button className="group w-full md:w-auto bg-[#0bdf47] text-black px-12 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all active:scale-95 shadow-xl shadow-[#0bdf47]/10">
                SEND MESSAGE <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* 2. CONTACT INFO SIDEBAR */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            
            {/* Quick Contact Info */}
            <div className="bento-item bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#0bdf47] group-hover:text-black transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Us</p>
                  <p className="text-xl font-bold">hello@freshroot.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#0bdf47] group-hover:text-black transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Call Us</p>
                  <p className="text-xl font-bold">+1 (555) 012-3456</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#0bdf47] group-hover:text-black transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Visit Us</p>
                  <p className="text-xl font-bold">123 Organic St, Farm City</p>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="bento-item bg-[#98D8AA] rounded-[3rem] p-10 text-black flex flex-col justify-between items-start min-h-[200px]">
              <h3 className="text-2xl font-black uppercase italic">Follow the Green</h3>
              <div className="flex gap-4">
                {[Twitter, Instagram, Facebook].map((Icon, i) => (
                  <button key={i} className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center hover:bg-black hover:text-[#98D8AA] transition-all">
                    <Icon size={24} />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      {/* </section> */}
      </main>

      {/* --- INLINE STYLE --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.3);
        }
        @media (max-width: 768px) {
          .border-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
        }
      `}} />
    </div>
  );
};

export default Contact;