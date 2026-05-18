"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { steps } from "@/data/landing";

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest mb-6">
            Intelligent Workflow
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Automated from <br/> Request to Resolution.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
            Our platform orchestrates the entire lifecycle of your service request, eliminating friction and ensuring world-class delivery.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto pl-4 md:pl-0">
          {/* Animated Connecting Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-slate-900 flex items-center justify-center z-10 shadow-xl ring-1 ring-white/20">
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} pl-12 md:pl-0`}>
                    <div className="glass-dark p-8 rounded-3xl group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-inner text-white group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500 ${isEven ? "md:ml-auto" : "md:mr-auto"}`}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      
                      <h3 className="text-2xl font-bold tracking-tight text-white mb-4">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
