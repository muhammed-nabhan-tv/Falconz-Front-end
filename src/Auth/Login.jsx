// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff, LogIn, ShoppingBasket } from "lucide-react"; 
// import { gsap } from "gsap";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Refs for GSAP animations
//   const leftPanel = useRef(null);
//   const rightPanel = useRef(null);
//   const formItems = useRef([]);

//   useEffect(() => {
//     const tl = gsap.timeline();

//     // Entrance animations
//     tl.fromTo(leftPanel.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" })
//       .fromTo(rightPanel.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8")
//       .fromTo(formItems.current, 
//         { y: 20, opacity: 0 }, 
//         { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 
//         "-=0.5"
//       );
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const loggedUser = await login(email, password);
//       setSuccess(true);
      
//       // Brief delay for success animation before navigating
//       setTimeout(() => {
//         if (loggedUser.role?.toLowerCase() === "admin") {
//           navigate("/admindashboard", { replace: true });
//         } else {
//           navigate("/", { replace: true });
//         }
//       }, 1500);

//     } catch (err) {
//       setError(err.message || "Login failed. Please check your credentials.");
//       // Shake animation on error
//       gsap.to(rightPanel.current, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-slate-50 font-sans overflow-hidden">
      
//       {/* Left Side: Visual Branding */}
//       <div ref={leftPanel} className="hidden lg:flex lg:w-1/2 bg-[#12372A] relative items-center justify-center">
//         <div className="absolute inset-0 opacity-30">
//           <img 
//             src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
//             alt="Fresh Produce" 
//             className="object-cover w-full h-full"
//           />
//         </div>
//         <div className="relative z-10 text-center px-12">
//           <div className="flex justify-center mb-6">
//             <div className="bg-white p-5 rounded-full shadow-2xl">
//               <ShoppingBasket size={48} className="text-[#436850]" />
//             </div>
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
//           <p className="text-emerald-100 text-lg max-w-md">
//             Your fresh groceries are just a login away. Ready to stock up your pantry?
//           </p>
//         </div>
//       </div>

//       {/* Right Side: Login Form */}
//       <div ref={rightPanel} className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
//         <div className="w-full max-w-md">
          
//           <div ref={(el) => (formItems.current[0] = el)} className="mb-10 text-center lg:text-left">
//             <h2 className="text-3xl font-bold text-slate-800">Sign In</h2>
//             <p className="text-slate-500 mt-2">Enter your details to access your basket.</p>
//           </div>

//           {/* Status Messages */}
//           {success && (
//             <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center shadow-sm">
//               <span className="mr-2 text-xl font-bold">✓</span> Successfully logged in!
//             </div>
//           )}

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             {/* Email Field */}
//             <div ref={(el) => (formItems.current[1] = el)} className="space-y-1">
//               <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#436850] focus:border-transparent outline-none transition-all placeholder-slate-400"
//                 placeholder="name@email.com"
//                 disabled={loading}
//               />
//             </div>

//             {/* Password Field */}
//             <div ref={(el) => (formItems.current[2] = el)} className="space-y-1">
//               <div className="flex justify-between items-center px-1">
//                 <label className="text-sm font-semibold text-slate-700">Password</label>
//                 <button type="button" className="text-xs font-semibold text-[#436850] hover:underline">Forgot password?</button>
//               </div>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#436850] focus:border-transparent outline-none transition-all placeholder-slate-400"
//                   placeholder="••••••••"
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div ref={(el) => (formItems.current[3] = el)}>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group w-full bg-[#436850] hover:bg-[#12372A] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-900/10 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
//                     Checking Credentials...
//                   </>
//                 ) : (
//                   <>
//                     <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
//                     Sign In
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Redirect to Signup */}
//           <div ref={(el) => (formItems.current[4] = el)} className="mt-8 text-center">
//             <p className="text-slate-600">
//               New to our market?{" "}
//               <Link to="/signup" className="text-[#436850] font-bold hover:underline underline-offset-4">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, LogIn, ShoppingBasket } from "lucide-react"; 
import { gsap } from "gsap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Refs for GSAP animations
  const leftPanel = useRef(null);
  const rightPanel = useRef(null);
  const formItems = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Entrance animations
    tl.fromTo(leftPanel.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(rightPanel.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8")
      .fromTo(formItems.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 
        "-=0.5"
      );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loggedUser = await login(email, password);
      setSuccess(true);
      
      setTimeout(() => {
        if (loggedUser.role?.toLowerCase() === "admin") {
          navigate("/admindashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 1500);

    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      // Shake animation on error
      gsap.to(rightPanel.current, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0D0D0D] font-sans overflow-hidden selection:bg-[#98D8AA] selection:text-black">
      
      {/* Left Side: Visual Branding */}
      <div ref={leftPanel} className="hidden lg:flex lg:w-1/2 bg-[#1A1A1A] relative items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
            alt="Fresh Produce" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-12 space-y-6">
          <div className="flex justify-center">
            <div className="bg-[#0bdf47] p-5 rounded-3xl shadow-[0_0_50px_rgba(11,223,71,0.3)] rotate-3">
              <ShoppingBasket size={48} className="text-black" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-white leading-none uppercase tracking-tighter">
            Welcome <span className="text-[#0bdf47]">Back</span><br />
            <span className="text-transparent border-text">FreshRoot</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Log in to access your curated selection of organic harvests.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div ref={rightPanel} className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#0D0D0D] relative">
        {/* Background Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#436850] blur-[150px] rounded-full opacity-20 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          
          <div ref={(el) => (formItems.current[0] = el)} className="mb-10 text-center lg:text-left">
            <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/5 text-[#0bdf47] mb-4">
               Secure Access
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">Sign In</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to manage your basket.</p>
          </div>

          {/* Status Messages */}
          {success && (
            <div className="mb-6 p-4 bg-[#0bdf47]/10 border border-[#0bdf47]/20 text-[#0bdf47] rounded-2xl flex items-center text-sm font-bold animate-pulse">
              <span className="mr-2 text-xl font-bold">✓</span> Successfully logged in!
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div ref={(el) => (formItems.current[1] = el)} className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all placeholder:text-gray-700"
                placeholder="name@email.com"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div ref={(el) => (formItems.current[2] = el)} className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#0bdf47] hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0bdf47] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div ref={(el) => (formItems.current[3] = el)}>
              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-white text-black font-black py-4 rounded-xl shadow-xl shadow-black/20 hover:bg-[#0bdf47] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4 uppercase text-sm tracking-tighter"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-2" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                    Enter Market
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Redirect to Signup */}
          <div ref={(el) => (formItems.current[4] = el)} className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-gray-500 text-sm font-medium">
              New to our market?{" "}
              <Link to="/signup" className="text-[#0bdf47] font-black hover:underline underline-offset-4 uppercase text-xs tracking-widest ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .border-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
      `}} />
    </div>
  );
}

export default Login;