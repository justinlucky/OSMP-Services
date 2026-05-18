"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/landing";

export const CategoryGrid = () => {
  return (
    <section className="py-24 relative bg-background overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              AI-Optimized Services
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Our intelligent routing algorithm instantly connects you with the top 1% of vetted professionals for your specific requirements.
            </p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md shrink-0"
          >
            Explore Capabilities
            <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
            >
              <Link 
                href={category.href}
                className="group flex flex-col items-start gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-white/10 relative overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-500" />
                
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:text-primary`}>
                  <category.icon className="h-6 w-6" />
                </div>
                
                <div className="space-y-1 relative z-10">
                  <span className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors block">{category.name}</span>
                  <span className="text-sm font-medium text-slate-500 block">Instant Matching</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
