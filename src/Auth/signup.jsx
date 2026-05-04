
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff, Leaf, ShoppingBasket } from "lucide-react"; // Optional: npm i lucide-react

// function SignUp() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { register } = useAuth();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       setLoading(false);
//       return;
//     }

//     try {
//       await register(formData.firstName, formData.lastName, formData.email, formData.password);
//       setSuccess(true);
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.message || "Failed to create account");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-slate-50 font-sans">
//       {/* Left Side: Visual/Branding (Hidden on mobile) */}
//       <div className="hidden lg:flex lg:w-1/2 bg-[#12372A] relative overflow-hidden items-center justify-center">
//         <div className="absolute inset-0 opacity-20">
//           <img 
//             src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
//             alt="Fresh Vegetables" 
//             className="object-cover w-full h-full"
//           />
//         </div>
//         <div className="relative z-10 text-center px-12">
//           <div className="flex justify-center mb-6">
//              <div className="bg-white p-4 rounded-full shadow-2xl">
//                 <ShoppingBasket size={48} className="text-[#436850]" />
//              </div>
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-4">Freshness Delivered.</h1>
//           <p className="text-emerald-100 text-lg">Join our community and get the season's best harvests delivered straight to your doorstep.</p>
//         </div>
//       </div>

//       {/* Right Side: Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
//         <div className="w-full max-w-md">
          
//           {/* Header */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
//             <p className="text-slate-500 mt-2">Start your healthy journey with us today.</p>
//           </div>

//           {/* Success Alert */}
//           {success && (
//             <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center animate-fade-in">
//               <span className="mr-2">✓</span> Account created! Taking you to login...
//             </div>
//           )}

//           {/* Error Alert */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSignUp} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-slate-700">First Name</label>
//                 <input
//                   name="firstName"
//                   type="text"
//                   required
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#436850] focus:border-transparent outline-none transition-all"
//                   placeholder="John"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-semibold text-slate-700">Last Name</label>
//                 <input
//                   name="lastName"
//                   type="text"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#436850] focus:border-transparent outline-none transition-all"
//                   placeholder="Doe"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-sm font-semibold text-slate-700">Email Address</label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#436850] focus:border-transparent outline-none transition-all"
//                 placeholder="name@example.com"
//               />
//             </div>

//             <div className="space-y-1 relative">
//               <label className="text-sm font-semibold text-slate-700">Password</label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#436850] focus:border-transparent outline-none transition-all"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               <p className="text-xs text-slate-400 mt-1">Must be at least 6 characters.</p>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#436850] hover:bg-[#12372A] text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-900/20 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
//                   Processing...
//                 </span>
//               ) : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-slate-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-[#436850] font-bold hover:underline">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ShoppingBasket, ArrowRight } from "lucide-react";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await register(formData.firstName, formData.lastName, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0D0D0D] font-sans overflow-x-hidden selection:bg-[#98D8AA] selection:text-black ">
      
      {/* --- LEFT SIDE: BRANDING (Hidden on Mobile/Tablet < 1024px) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A1A1A] relative overflow-hidden items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
            alt="Fresh Vegetables" 
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
          <h1 className="text-6xl font-black text-white leading-none uppercase tracking-tighter">
            Fresh<span className="text-[#0bdf47]">Root</span> <br /> 
            <span className="text-transparent border-text">Community</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Join the movement towards organic, farm-direct nutrition delivered with surgical precision.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM (Full width on mobile) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 relative">
        
        {/* Background Glows (Responsive Opacity) */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[50%] bg-[#436850] blur-[120px] rounded-full opacity-10 lg:opacity-20 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo (Only visible on small screens) */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center sm:justify-start">
             <div className="bg-[#0bdf47] p-2 rounded-xl">
                <ShoppingBasket size={24} className="text-black" />
             </div>
             <span className="text-xl font-black text-white tracking-tighter">FRESH<span className="text-[#0bdf47]">ROOT</span></span>
          </div>

          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/5 text-[#0bdf47] mb-4">
               New Member
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Create Account</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Start your healthy journey with us today.</p>
          </div>

          {/* Alerts */}
          {success && (
            <div className="mb-6 p-4 bg-[#0bdf47]/10 border border-[#0bdf47]/20 text-[#0bdf47] rounded-2xl flex items-center text-sm font-bold animate-pulse">
              <span className="mr-2">✓</span> Account created! Redirecting...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Grid switches to 1 column on very small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500 ml-1">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all placeholder:text-gray-700 text-sm"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-[#0bdf47] focus:ring-4 focus:ring-[#0bdf47]/10 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0bdf47] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-600 ml-1 uppercase font-bold">Min 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-white text-black font-black py-4 rounded-xl shadow-xl shadow-black/20 hover:bg-[#0bdf47] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-6 uppercase text-xs sm:text-sm tracking-tighter"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-3"></div>
                  Verifying...
                </div>
              ) : (
                <>
                  Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 sm:mt-10 text-center border-t border-white/5 pt-6 sm:pt-8">
            <p className="text-gray-500 text-xs sm:text-sm font-medium">
              Already a member?{" "}
              <Link to="/login" className="text-[#0bdf47] font-black hover:underline underline-offset-4 uppercase text-[10px] sm:text-xs tracking-widest ml-1">
                Sign in
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

export default SignUp;