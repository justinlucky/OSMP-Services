"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, ArrowRight, Eye, EyeOff,
  Smartphone, ShieldCheck, Sparkles, Star,
  CheckCircle2, Zap, Users, TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const floatingStats = [
  { icon: Users, label: "50K+ Users", color: "from-blue-500 to-cyan-400" },
  { icon: Star, label: "4.9 Rating", color: "from-amber-400 to-orange-500" },
  { icon: Zap, label: "Instant Book", color: "from-violet-500 to-purple-600" },
  { icon: TrendingUp, label: "98% Happy", color: "from-emerald-400 to-teal-500" },
];

const testimonials = [
  {
    quote: "Booking a home deep clean was seamless. The professional arrived on time and did an incredible job!",
    author: "Priya Sharma",
    role: "Homeowner, Bangalore",
  },
  {
    quote: "Best service marketplace I've used. Transparent pricing and verified professionals every time.",
    author: "Rahul Menon",
    role: "IT Professional, Hyderabad",
  },
  {
    quote: "From salon services to AC repair — OSM handles everything. My go-to app for all home needs.",
    author: "Ananya Reddy",
    role: "Working Professional, Chennai",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    if (loginMethod === "phone") {
      if (!otpSent) {
        setOtpSent(true);
        setIsLoading(false);
        return;
      }
      // Verify OTP (mock)
      if (otp.length === 6) {
        localStorage.setItem("isLoggedIn", "true");
        const existing = localStorage.getItem("currentUser");
        if (!existing) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ name: "User", email: "", phone, role: "user" })
          );
        }
        router.push("/dashboard");
        return;
      } else {
        setError("Please enter a valid 6-digit OTP.");
        setIsLoading(false);
        return;
      }
    }

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
        return;
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }
    }

    // Fallback if no user was signed up yet
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-50">
      {/* LEFT PANEL — Brand Showcase (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-12 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-violet-400/10 blur-3xl"
          />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl"
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white" />
              </svg>
            </motion.div>
            <span className="text-2xl font-black tracking-tight">OSM Services</span>
          </Link>
        </div>

        {/* Middle: Hero Content + Floating Stats */}
        <div className="relative z-10 space-y-10 my-auto">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> Trusted by 50,000+ users
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight"
            >
              Your home deserves
              <br />
              the <span className="text-cyan-300">best care.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base text-blue-100 font-medium leading-relaxed max-w-md"
            >
              Book verified professionals for cleaning, repairs, salon services,
              and more — all at transparent prices.
            </motion.p>
          </div>

          {/* Floating Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ scale: 1.04, y: -2 }}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-xl p-4 hover:bg-white/[0.12] transition-all cursor-default"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-bold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom: Rotating Testimonials */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-xl p-6 space-y-3"
            >
              <p className="text-sm text-blue-100 italic leading-relaxed font-medium">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-black">
                  {testimonials[currentTestimonial].author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{testimonials[currentTestimonial].author}</p>
                  <p className="text-xs text-blue-200 font-medium">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              {/* Dots */}
              <div className="flex gap-1.5 pt-1">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === currentTestimonial ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT PANEL — Login Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16 relative">
        {/* Background Blobs (mobile visible) */}
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                OSM Services
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h1>
            <p className="text-sm font-medium text-slate-500">
              Sign in to your account to continue booking services.
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex rounded-2xl bg-slate-100 p-1 gap-1">
            <button
              type="button"
              onClick={() => { setLoginMethod("email"); setError(""); setOtpSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                loginMethod === "email"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod("phone"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                loginMethod === "phone"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-center gap-2.5 text-xs font-semibold text-red-600 bg-red-50 p-3.5 rounded-xl border border-red-100"
                >
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <span className="text-red-500 text-[10px] font-black">!</span>
                  </div>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {loginMethod === "email" ? (
              <motion.div
                key="email-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="pl-12 h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 font-medium text-sm shadow-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                    <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 font-medium text-sm shadow-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="phone-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500 text-sm font-bold">
                      🇮🇳 +91
                    </div>
                    <Input
                      type="tel"
                      placeholder="98765 43210"
                      className="pl-[5.5rem] h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 font-medium text-sm shadow-sm"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      required
                      disabled={otpSent}
                    />
                  </div>
                </div>
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1.5"
                  >
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Enter OTP</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="6-digit code"
                        maxLength={6}
                        className="pl-12 h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 font-medium text-sm tracking-[0.3em] text-center shadow-sm"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      OTP sent to +91 {phone}. <button type="button" onClick={() => setOtpSent(false)} className="text-blue-600 font-bold hover:underline">Change number</button>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-13 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/20 group disabled:opacity-70 relative overflow-hidden"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  {loginMethod === "phone" && !otpSent ? "Send OTP" : "Sign In"}
                  <ArrowRight className="ml-2 h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-500 font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Create account
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 pt-4 opacity-50">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" /> SSL Secured
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <CheckCircle2 className="h-3.5 w-3.5" /> 256-bit Encrypted
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
