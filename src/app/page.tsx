"use client";

import { Hero } from "@/components/features/landing/Hero";
import { TrustSection } from "@/components/features/landing/TrustSection";
import { CategoryGrid } from "@/components/features/landing/CategoryGrid";
import { FeaturedServices } from "@/components/features/landing/FeaturedServices";
import { HowItWorks } from "@/components/features/landing/HowItWorks";
import { WhyChooseUs } from "@/components/features/landing/WhyChooseUs";
import { Testimonials } from "@/components/features/landing/Testimonials";
import { FAQ } from "@/components/features/landing/FAQ";
import { ShieldCheck, Sparkles, Smartphone, Apple } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// Custom Google Play Icon
const GooglePlayIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M3.609 1.814L13.792 12 3.609 22.186c-.18.18-.385.274-.614.283-.23.008-.44-.077-.63-.255l-.014-.014c-.187-.19-.281-.4-.281-.63V2.43c0-.23.094-.44.281-.63l.014-.014c.19-.178.4-.263.63-.255.229.009.434.103.614.283zM14.735 12.943l3.056 3.056L6.331 22.21l8.404-9.267zm5.541-2.073l-2.062 1.131-3.056-3.056 5.118 1.925zm-2.062 2.262l2.062 1.131c.323.177.491.432.505.765.014.333-.122.623-.408.871l-5.215-2.767 3.056 3.056zM14.735 11.057L6.331 1.79l11.46 6.211-3.056 3.056z" />
    </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrustSection />
      <CategoryGrid />
      <WhyChooseUs />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
      
      {/* App Download Section - Refined */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-primary text-white overflow-hidden relative"
      >
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:px-12">
            <div className="space-y-8 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-tight">
                <Smartphone className="h-4 w-4" />
                <span>Next-Gen Mobile App</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
                Experience <span className="italic">OSM Services</span> <br className="hidden sm:block" />
                Right in Your Pocket
              </h2>
              
              <p className="text-white/80 text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Book services in seconds, track your professional in real-time, and manage everything from a single intuitive interface.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center relative overflow-hidden">
                        <Image src="/app-icon.png" alt="OSM Services Icon" fill className="object-cover p-1" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold">Exclusive Deals</p>
                        <p className="text-xs text-white/60">App-only discounts & offers</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center relative overflow-hidden">
                        <Smartphone className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold">Secure Payments</p>
                        <p className="text-xs text-white/60">One-tap UPI & Card payments</p>
                    </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="h-[60px] px-8 rounded-2xl bg-black text-white font-bold flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-black/20 border border-white/10 group">
                  <Apple className="h-8 w-8 fill-current group-hover:text-primary transition-colors" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Download on the</span>
                    <span className="text-xl font-bold">App Store</span>
                  </div>
                </button>
                <button className="h-[60px] px-8 rounded-2xl bg-black text-white font-bold flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-black/20 border border-white/10 group">
                  <div className="group-hover:text-primary transition-colors">
                    <GooglePlayIcon />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Get it on</span>
                    <span className="text-xl font-bold lowercase first-letter:uppercase">Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full lg:w-1/2 flex items-center justify-center"
            >
              <div className="relative group">
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-white/20 rounded-[4rem] blur-3xl group-hover:scale-110 transition-transform duration-700" />
                {/* Phone Mockup Frame */}
                <div className="relative h-[600px] w-[280px] rounded-[3.5rem] border-[12px] border-slate-900 bg-slate-950 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] ring-4 ring-white/10">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 rounded-b-3xl border-x border-b border-white/5" />
                  {/* Mock Content */}
                  <div className="absolute inset-x-4 top-16 bottom-4 rounded-[2rem] bg-slate-900 overflow-hidden border border-white/5">
                      <div className="h-full w-full bg-slate-900 p-6 flex flex-col justify-between relative overflow-hidden">
                          {/* Background Glow inside phone */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                          
                          <div className="space-y-6 relative z-10">
                              <div className="flex items-center justify-between">
                                  <div className="h-10 w-10 relative overflow-hidden rounded-xl border border-white/10">
                                      <Image src="/app-icon.png" alt="Icon" fill className="object-cover" />
                                  </div>
                                  <div className="flex gap-1">
                                      <div className="h-1.5 w-1.5 bg-white/40 rounded-full" />
                                      <div className="h-1.5 w-4 bg-white/40 rounded-full" />
                                  </div>
                              </div>
                              <div className="space-y-3">
                                  <div className="h-5 w-40 bg-white/80 rounded-full" />
                                  <div className="h-5 w-24 bg-white/40 rounded-full" />
                              </div>
                          </div>
                          
                          <div className="space-y-4 relative z-10">
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="h-24 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-2">
                                     <div className="h-8 w-8 bg-white/10 rounded-lg animate-pulse" />
                                     <div className="h-2 w-12 bg-white/20 rounded-full" />
                                 </div>
                                 <div className="h-24 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-2">
                                     <div className="h-8 w-8 bg-white/10 rounded-lg animate-pulse" />
                                     <div className="h-2 w-12 bg-white/20 rounded-full" />
                                 </div>
                             </div>
                             <div className="h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center">
                                 <div className="h-2 w-24 bg-slate-200 rounded-full" />
                             </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <FAQ />
    </div>
  );
}
