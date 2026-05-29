"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, ArrowRight, Eye, EyeOff,
  Smartphone, ShieldCheck, Sparkles, Star,
  CheckCircle2, Zap, Users, TrendingUp,
  Phone, Building2, Briefcase, Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    desc: "All service partners are background-checked and certified",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Book services in under 60 seconds with real-time availability",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    desc: "100% satisfaction guarantee or your money back",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    desc: "No hidden fees — see exact costs before you book",
    color: "from-blue-400 to-cyan-500",
  },
];

const passwordStrengthChecks = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "vendor">("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = details, 2 = password
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const passwordStrength = passwordStrengthChecks.filter((c) => c.test(password)).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-amber-400", "bg-emerald-500"][passwordStrength];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!name || !email) {
        setError("Please fill in all required fields.");
        return;
      }
      setStep(2);
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }
    if (passwordStrength < 3) {
      setError("Please choose a stronger password.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const userObj = { name, email, password, phone, role };
    localStorage.setItem("currentUser", JSON.stringify(userObj));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        name,
        email,
        phone: phone ? `+91 ${phone}` : "+91 98765 43210",
        address: "123 Luxury Ave, Suite 405, Manhattan, NY 10001",
      })
    );

    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-50">
      {/* LEFT PANEL — Brand Showcase (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-20 w-96 h-96 rounded-full bg-pink-400/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/2 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl"
          />
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
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

        {/* Middle: Features Showcase */}
        <div className="relative z-10 space-y-10 my-auto">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> Join 50,000+ happy customers
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight"
            >
              Start your journey
              <br />
              with <span className="text-pink-300">OSM today.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base text-purple-100 font-medium leading-relaxed max-w-md"
            >
              Create your free account and discover India&apos;s most trusted home
              services marketplace.
            </motion.p>
          </div>

          {/* Animated Features */}
          <div className="space-y-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                onMouseEnter={() => setActiveFeature(i)}
                className={`flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 cursor-default ${
                  i === activeFeature
                    ? "bg-white/[0.12] border border-white/[0.15] shadow-lg scale-[1.02]"
                    : "bg-transparent border border-transparent hover:bg-white/[0.06]"
                }`}
              >
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg shrink-0 transition-transform duration-500 ${
                  i === activeFeature ? "scale-110" : ""
                }`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">{feature.title}</p>
                  <p className={`text-xs font-medium transition-all duration-500 ${
                    i === activeFeature ? "text-purple-100 opacity-100" : "text-purple-200 opacity-70"
                  }`}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom: Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 flex items-center gap-4"
        >
          <div className="flex -space-x-2.5">
            {["P", "R", "A", "S", "M"].map((letter, i) => (
              <div
                key={i}
                className="h-9 w-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-white/20 flex items-center justify-center text-xs font-black backdrop-blur-xl"
              >
                {letter}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-medium text-purple-200">
              Rated <span className="font-bold text-white">4.9/5</span> by 12,000+ customers
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL — Signup Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16 relative">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md space-y-7"
        >
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-700">
                OSM Services
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Create your account</h1>
            <p className="text-sm font-medium text-slate-500">
              {step === 1
                ? "Tell us about yourself to get started."
                : "Set a secure password for your account."}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all ${
                step >= 1 ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/20" : "bg-slate-100 text-slate-400"
              }`}>
                {step > 1 ? <Check className="h-3.5 w-3.5" /> : "1"}
              </div>
              <span className={`text-xs font-bold ${step >= 1 ? "text-slate-700" : "text-slate-400"}`}>Details</span>
            </div>
            <div className={`h-px flex-1 transition-all ${step >= 2 ? "bg-purple-400" : "bg-slate-200"}`} />
            <div className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all ${
                step >= 2 ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/20" : "bg-slate-100 text-slate-400"
              }`}>
                2
              </div>
              <span className={`text-xs font-bold ${step >= 2 ? "text-slate-700" : "text-slate-400"}`}>Security</span>
            </div>
          </div>

          {/* Role Toggle */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex rounded-2xl bg-slate-100 p-1 gap-1"
            >
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                  role === "user"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <User className="h-4 w-4" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                  role === "vendor"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                Vendor
              </button>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
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

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder={role === "vendor" ? "Business / Your Name" : "Your full name"}
                        className="pl-12 h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 font-medium text-sm shadow-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="pl-12 h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 font-medium text-sm shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number <span className="text-slate-400 normal-case tracking-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-500 text-sm font-bold">
                        🇮🇳 +91
                      </div>
                      <Input
                        type="tel"
                        placeholder="98765 43210"
                        className="pl-[5.5rem] h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 font-medium text-sm shadow-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                    </div>
                  </div>

                  {/* Role-specific banner */}
                  <div className={`flex items-start gap-3 rounded-xl p-3.5 border ${
                    role === "user"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                      : "bg-blue-50 border-blue-100 text-blue-700"
                  }`}>
                    {role === "user" ? (
                      <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
                    ) : (
                      <Building2 className="h-5 w-5 shrink-0 mt-0.5" />
                    )}
                    <p className="text-[11px] font-bold leading-relaxed">
                      {role === "user"
                        ? "Your data is 256-bit encrypted. We never share your information with third parties."
                        : "Join our network of 5,000+ verified professionals. Start receiving bookings within 24 hours."}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Password field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Create Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-12 pr-12 h-13 rounded-xl bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 font-medium text-sm shadow-sm"
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

                  {/* Password Strength Meter */}
                  {password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                passwordStrength >= level ? strengthColor : "bg-slate-100"
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs font-bold ${
                          passwordStrength <= 1 ? "text-red-500" :
                          passwordStrength === 2 ? "text-orange-500" :
                          passwordStrength === 3 ? "text-amber-500" :
                          "text-emerald-500"
                        }`}>
                          {strengthLabel}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {passwordStrengthChecks.map((check) => (
                          <div key={check.label} className="flex items-center gap-2">
                            <div className={`h-4 w-4 rounded-full flex items-center justify-center transition-all ${
                              check.test(password) ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300"
                            }`}>
                              <Check className="h-2.5 w-2.5" />
                            </div>
                            <span className={`text-[11px] font-medium transition-colors ${
                              check.test(password) ? "text-emerald-600" : "text-slate-400"
                            }`}>
                              {check.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Terms Agreement */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        agreedToTerms
                          ? "bg-gradient-to-br from-violet-500 to-purple-600 border-purple-500"
                          : "border-slate-300 bg-white group-hover:border-slate-400"
                      }`}>
                        {agreedToTerms && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium leading-relaxed">
                      I agree to the{" "}
                      <Link href="#" className="text-purple-600 font-bold hover:underline">Terms of Service</Link>{" "}
                      and{" "}
                      <Link href="#" className="text-purple-600 font-bold hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setStep(1); setError(""); }}
                  className="h-13 rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold px-6 shadow-sm"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className={`flex-1 h-13 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold text-base transition-all shadow-lg shadow-purple-500/20 group disabled:opacity-70 relative overflow-hidden`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    {step === 1 ? "Continue" : "Create Account"}
                    <ArrowRight className="ml-2 h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          {step === 1 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    or sign up with
                  </span>
                </div>
              </div>

              {/* Social Signups */}
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
            </>
          )}

          {/* Login link */}
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-purple-600 hover:text-purple-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 pt-2 opacity-50">
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
