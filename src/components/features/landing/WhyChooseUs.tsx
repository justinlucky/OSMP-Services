"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity, Lock } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time AI Matching",
      description: "Our proprietary algorithm analyzes 50+ data points to connect you with the perfect professional in milliseconds."
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-grade Vetting",
      description: "Only the top 1% of applicants pass our rigorous 5-stage background check and technical evaluation process."
    },
    {
      icon: Activity,
      title: "Predictive Maintenance",
      description: "For corporate clients, our system predicts when infrastructure needs servicing before failures occur."
    },
    {
      icon: Lock,
      title: "Bank-level Security",
      description: "All communications, data, and payments are secured with AES-256 encryption. Your privacy is guaranteed."
    }
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden border-y border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest">
                Platform Architecture
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
                Built for Scale. <br />
                <span className="text-slate-500">Engineered for Precision.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                We don't just connect you with service providers. We provide an intelligent layer of quality control, security, and automation that legacy platforms cannot match.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-[2.5rem] overflow-hidden glass-panel border border-white/10 p-2"
            >
               {/* Abstract Data Visualization UI Mockup */}
               <div className="rounded-[2rem] bg-slate-950/80 w-full aspect-square md:aspect-[4/5] relative overflow-hidden flex flex-col justify-between p-8 border border-white/5">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                     <div className="space-y-2">
                        <p className="text-xs font-mono text-primary uppercase tracking-wider">Live System Status</p>
                        <p className="text-3xl font-light text-white tracking-tighter">99.999% <span className="text-sm text-slate-500">Uptime</span></p>
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Operational
                     </div>
                  </div>

                  <div className="relative z-10 space-y-4">
                     <div className="h-24 w-full rounded-2xl bg-white/5 border border-white/5 flex items-end p-4 gap-2">
                        {[40, 70, 45, 90, 65, 85, 100, 60, 80, 50].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             viewport={{ once: true }}
                             transition={{ delay: 0.5 + (i * 0.05), duration: 1 }}
                             className="flex-1 bg-primary/40 rounded-t-sm"
                           />
                        ))}
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                           <p className="text-xs text-slate-500 mb-1">Active Nodes</p>
                           <p className="text-xl font-bold text-white">4,281</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                           <p className="text-xs text-slate-500 mb-1">Matching Latency</p>
                           <p className="text-xl font-bold text-white">12ms</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
