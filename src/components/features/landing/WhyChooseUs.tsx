"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Activity, Lock, Sparkles } from "lucide-react";

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
    <section className="py-32 bg-background relative overflow-hidden border-y border-gray-200">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600 uppercase tracking-widest">
                Platform Architecture
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 leading-[1.1]">
                Built for Scale. <br />
                <span className="text-slate-500">Engineered for Precision.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                We {"don't"} just connect you with service providers. We provide an intelligent layer of quality control, security, and automation that legacy platforms cannot match.
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
                  <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
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
              className="relative z-10 rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 p-2 shadow-sm"
            >
               {/* Abstract Data Visualization UI Mockup */}
               <div className="rounded-[2rem] bg-white w-full aspect-square md:aspect-[4/5] relative overflow-hidden flex flex-col justify-between p-8 border border-gray-150">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                     <div className="space-y-2">
                        <p className="text-xs font-mono text-blue-600 uppercase tracking-wider">Live System Status</p>
                        <p className="text-3xl font-light text-gray-900 tracking-tighter">99.999% <span className="text-sm text-slate-500">Uptime</span></p>
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Operational
                     </div>
                  </div>

                  {/* Room Cleaning AI Animation */}
                  <div className="flex-1 w-full relative flex items-center justify-center my-6 z-10">
                    <div className="relative w-full max-w-[320px] aspect-[4/3] bg-gray-55/80 border border-gray-200 rounded-2xl overflow-hidden flex items-center p-3 shadow-md bg-slate-50">
                      {/* Grid */}
                      <div className="grid grid-cols-4 gap-2 w-full h-full relative z-10">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="bg-white rounded-xl border border-gray-100 relative overflow-hidden flex items-center justify-center">
                             {/* Dust particles */}
                             <motion.div 
                               className="w-1.5 h-1.5 rounded-full bg-slate-400"
                               animate={{ 
                                 opacity: [1, 1, 0, 0, 1],
                                 scale: [1, 1, 0, 0, 1]
                               }}
                               transition={{ 
                                 duration: 6,
                                 times: [0, (i % 4) * 0.15, (i % 4) * 0.15 + 0.1, 0.9, 1],
                                 repeat: Infinity,
                                 ease: "easeInOut"
                               }}
                             />
                             {/* Clean effect flash */}
                             <motion.div 
                               className="absolute inset-0 bg-blue-500/10"
                               animate={{ opacity: [0, 0.8, 0, 0, 0] }}
                               transition={{ 
                                 duration: 6,
                                 times: [0, (i % 4) * 0.15, (i % 4) * 0.15 + 0.1, 0.9, 1],
                                 repeat: Infinity,
                                 ease: "easeInOut"
                               }}
                             />
                          </div>
                        ))}
                      </div>

                      {/* AI Cleaning Drone */}
                      <motion.div 
                        className="absolute z-20 w-10 h-10 bg-blue-50 border border-blue-600 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ 
                          x: ["-120px", "0px", "120px", "120px", "0px", "-120px", "-120px"],
                          y: ["-45px", "-45px", "-45px", "45px", "45px", "45px", "-45px"]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5 text-blue-600" />
                      </motion.div>

                      {/* Scanner Line */}
                      <motion.div 
                        className="absolute inset-x-0 h-40 bg-gradient-to-b from-blue-500/0 via-blue-500/5 to-blue-500/10 border-b border-blue-500/20 z-30"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Overlay Badge */}
                      <div className="absolute top-3 left-3 z-40 bg-white border border-gray-200 rounded flex items-center gap-2 px-2.5 py-1.5 shadow-sm">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-wider text-gray-700 font-mono">Smart Cleaning Mapping</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-4">
                     <div className="h-24 w-full rounded-2xl bg-gray-50 border border-gray-100 flex items-end p-4 gap-2">
                        {[40, 70, 45, 90, 65, 85, 100, 60, 80, 50].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             whileInView={{ height: `${h}%` }}
                             viewport={{ once: true }}
                             transition={{ delay: 0.5 + (i * 0.05), duration: 1 }}
                             className="flex-1 bg-blue-500/40 rounded-t-sm"
                           />
                        ))}
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                           <p className="text-xs text-slate-500 mb-1">Active Nodes</p>
                           <p className="text-xl font-bold text-gray-900">4,281</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                           <p className="text-xs text-slate-500 mb-1">Matching Latency</p>
                           <p className="text-xl font-bold text-gray-900">12ms</p>
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
