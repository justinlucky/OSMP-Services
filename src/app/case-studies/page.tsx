"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, TrendingUp, Building2, Server } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const caseStudies = [
  {
    id: "tech-corp",
    client: "Global Tech Hub",
    industry: "Enterprise IT",
    title: "Reducing Server Room Cooling Costs by 42%",
    description: "How our predictive maintenance algorithms and smart AC auditing saved a Fortune 500 company over ₹1.2M annually while ensuring 99.999% uptime.",
    metrics: [
      { label: "Cost Reduction", value: "42%" },
      { label: "Uptime", value: "99.999%" },
      { label: "ROI", value: "3.5x" }
    ],
    tags: ["Predictive Maintenance", "HVAC", "AI Routing"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "nexus-retail",
    client: "Nexus Retail",
    industry: "Retail & Commercial",
    title: "Rapid Deployment for 50+ Retail Locations",
    description: "Deploying a standardized deep cleaning and electrical audit across 50 locations nationwide within a 72-hour window using our decentralized contractor network.",
    metrics: [
      { label: "Locations", value: "50+" },
      { label: "Turnaround", value: "72 hrs" },
      { label: "Compliance", value: "100%" }
    ],
    tags: ["Deep Cleaning", "Electrical", "Scale"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest">
            Success Stories
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Transforming Enterprise <br />
            <span className="text-slate-500">Infrastructure.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover how industry leaders leverage OSM's intelligent routing and predictive maintenance to scale operations and reduce overhead.
          </p>
        </div>

        {/* Featured Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
               <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
               <div className="relative glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col h-full transition-all group-hover:border-white/20">
                  
                  {/* Image Section */}
                  <div className="relative h-64 md:h-80 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                    <Image 
                      src={study.image} 
                      alt={study.title} 
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6 z-20">
                       <span className="px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
                         <Building2 className="h-3 w-3 text-primary" /> {study.industry}
                       </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 md:p-10 flex-1 flex flex-col">
                     <div className="flex items-center gap-2 mb-4">
                        <span className="text-primary font-mono text-xs tracking-wider">{study.client}</span>
                        <span className="h-px w-8 bg-white/20" />
                     </div>
                     
                     <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-primary transition-colors">
                        {study.title}
                     </h3>
                     
                     <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                        {study.description}
                     </p>

                     {/* KPI Grid */}
                     <div className="grid grid-cols-3 gap-4 mb-8 pt-8 border-t border-white/10">
                        {study.metrics.map((metric) => (
                           <div key={metric.label}>
                              <p className="text-2xl font-black text-white tracking-tighter mb-1">{metric.value}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
                           </div>
                        ))}
                     </div>

                     <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                           {study.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-medium text-slate-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                               {tag}
                             </span>
                           ))}
                        </div>
                        <Button variant="ghost" className="text-white group-hover:text-primary hover:bg-white/5 p-2 rounded-full h-10 w-10">
                           <ArrowUpRight className="h-5 w-5" />
                        </Button>
                     </div>
                  </div>

               </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 p-12 rounded-[3rem] glass-panel border border-primary/20 text-center relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-blue-500/10" />
           <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white tracking-tight">Ready to optimize your infrastructure?</h2>
              <p className="text-slate-400">Join 500+ enterprises leveraging OSM for facilities management.</p>
              <div className="flex items-center justify-center gap-4 pt-4">
                 <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-slate-200 font-bold text-lg">
                    Schedule Audit
                 </Button>
                 <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 text-white bg-white/5 hover:bg-white/10 font-bold text-lg">
                    Contact Sales
                 </Button>
              </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
