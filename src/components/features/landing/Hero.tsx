"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bot, Command, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[100px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-5xl mx-auto space-y-10"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-slate-300">OSM AI 2.0 is now live</span>
            <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-bold tracking-tighter leading-[1.05] text-white">
              Intelligent Services, <br className="hidden sm:block" />
              <span className="text-gradient">Delivered Instantly.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-400 font-medium leading-relaxed">
              Experience the world's most advanced service platform. AI-driven matching, real-time tracking, and enterprise-grade reliability for your business and home.
            </p>
          </div>

          {/* AI Command Palette Prompt */}
          <div className="w-full max-w-2xl mt-12 mb-8 group">
            <div className="relative flex items-center w-full h-16 sm:h-20 bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-white/20 rounded-2xl sm:rounded-full shadow-2xl transition-all overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50">
              <div className="pl-6 pr-4 text-slate-400 flex items-center justify-center">
                <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
              </div>
              <input 
                type="text" 
                placeholder="Ask AI: 'I need an IT audit for my startup...'" 
                className="flex-1 h-full bg-transparent text-white text-base sm:text-lg font-medium outline-none placeholder:text-slate-500"
              />
              <div className="pr-2 sm:pr-4 flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                  <Command className="h-3 w-3" /> K
                </div>
                <Button className="h-10 sm:h-12 px-6 sm:px-8 rounded-xl sm:rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                  Generate
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {["Corporate Cleaning", "IT Infrastructure", "Security Audit", "Office Setup"].map((suggestion) => (
                <div key={suggestion} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-12 border-t border-white/5 w-full justify-center">
            <div className="flex items-center gap-[-10px]">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-slate-800 z-[${10-i}] relative overflow-hidden`}>
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="object-cover w-full h-full" />
                </div>
              ))}
              <div className="pl-4 flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Sparkles key={star} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-400">Trusted by 10k+ companies</span>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            
            <div className="flex items-center gap-4 text-slate-400 font-medium text-sm">
              <span className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> 99.9% Uptime</span>
              <span className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> 24/7 AI Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
