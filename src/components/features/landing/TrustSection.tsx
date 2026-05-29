"use client";

import { motion } from "framer-motion";

export const TrustSection = () => {
  const logos = [
    "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Tesla", "Stripe", "Vercel"
  ];

  return (
    <section className="py-12 border-y border-gray-200 bg-background overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Powering infrastructure for industry leaders
        </p>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap items-center gap-16 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {/* Double the logos for seamless infinite scrolling */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="text-2xl font-black text-gray-400 hover:text-gray-800 transition-colors duration-300 select-none">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
