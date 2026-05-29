"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/landing";

export const CategoryGrid = () => {
  return (
    <section className="py-24 relative bg-background overflow-hidden border-y border-gray-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              AI-Optimized Services
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our intelligent routing algorithm instantly connects you with the top 1% of vetted professionals for your specific requirements.
            </p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-2 text-sm font-semibold text-gray-800 px-6 py-3 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-all shrink-0"
          >
            Explore Capabilities
            <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
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
                className="group flex flex-col items-start gap-6 rounded-3xl border border-gray-200 bg-white p-6 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-lg shadow-sm relative overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 to-transparent transition-opacity duration-500" />
                
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 border border-gray-200 text-gray-800 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600`}>
                  <category.icon className="h-6 w-6" />
                </div>
                
                <div className="space-y-1 relative z-10">
                  <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors block">{category.name}</span>
                  <span className="text-sm font-medium text-gray-500 block">Instant Matching</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
