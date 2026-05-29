"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Bot, Command, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const carouselSlides = [
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200",
    label: "Deep Cleaning & Sanitation"
  },
  {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    label: "Washroom Disinfection"
  },
  {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
    label: "AC Filter Audit & Maintenance"
  },
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200",
    label: "Professional Plumbing Repair"
  },
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200",
    label: "Kitchen Grease Degreasing"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200",
    label: "Furniture Assembly & Shifting"
  }
];

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#F9FAFB] pt-32 pb-20">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#F9FAFB]" />
        
        {/* Soft Blue & Slate Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-[150px] mix-blend-multiply animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col items-start text-left space-y-8"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 hover:border-blue-200 transition-colors cursor-pointer group">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm font-semibold text-blue-700">OSM AI 2.0 is now live</span>
              <ChevronRight className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
            </div>

            {/* Main Headline */}
            <div className="space-y-4 text-left w-full">
              <h1 className="text-4xl sm:text-5xl lg:text-[4.8rem] font-bold tracking-tighter leading-[1.05] text-gray-900">
                Intelligent Services, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 font-extrabold">Delivered Instantly.</span>
              </h1>
              <p className="max-w-xl text-lg text-gray-600 font-medium leading-relaxed">
                Experience the {"world's"} most advanced service platform. AI-driven matching, real-time tracking, and enterprise-grade reliability for your business and home.
              </p>
            </div>

            {/* AI Command Palette Prompt */}
            <div className="w-full max-w-xl group">
              <div className="relative flex items-center w-full h-16 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all overflow-hidden">
                <div className="pl-5 pr-3 text-blue-600 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-700 animate-pulse" />
                </div>
                <input 
                  type="text" 
                  placeholder="Ask AI: 'I need an IT audit for my startup...'" 
                  className="flex-1 h-full bg-transparent text-indigo-950 text-sm sm:text-base font-semibold outline-none placeholder:text-indigo-700"
                />
                <div className="pr-3 flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-[10px] font-mono text-gray-700">
                    <Command className="h-3 w-3" /> K
                  </div>
                  <Button className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider transition-all">
                    Generate
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {["Corporate Cleaning", "IT Infrastructure", "Security Audit", "Office Setup"].map((suggestion) => (
                  <div key={suggestion} className="px-3.5 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-800 hover:bg-gray-200 hover:text-gray-950 transition-colors cursor-pointer font-medium">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-gray-250 w-full">
              <div className="flex items-center gap-[-10px]">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-slate-200 z-[${10-i}] relative overflow-hidden -ml-2 first:ml-0`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="object-cover w-full h-full" />
                  </div>
                ))}
                <div className="pl-3 flex flex-col items-start">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map((star) => (
                      <Sparkles key={star} className="h-3 w-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest leading-none">Trusted by 10k+ companies</span>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-gray-200" />
              
              <div className="flex items-center gap-4 text-gray-800 font-bold text-xs tracking-wider">
                <span className="flex items-center gap-1.5"><ArrowRight className="h-3.5 w-3.5 text-blue-600" /> 99.9% Uptime</span>
                <span className="flex items-center gap-1.5"><ArrowRight className="h-3.5 w-3.5 text-blue-600" /> 24/7 AI Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Auto-Scrolling Premium Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative w-full aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-slate-900 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide}
                src={carouselSlides[activeSlide].image}
                alt={carouselSlides[activeSlide].label}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Deep dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none z-10" />

            {/* Prominent Service Title Text Caption Overlaid On Top of Image */}
            <div className="absolute inset-x-0 bottom-16 px-6 text-center z-20 select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-1.5"
                >
                  <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 font-mono block drop-shadow">
                    Premium Service
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight uppercase font-display">
                    {carouselSlides[activeSlide].label}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/5">
              {carouselSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-blue-500 w-4" : "bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
