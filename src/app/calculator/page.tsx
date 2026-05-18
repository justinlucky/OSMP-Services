"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, MessageCircle, Calculator, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { id: "ac-repair", name: "AC Maintenance & Repair", basePrice: 999 },
  { id: "deep-clean", name: "Full Home Deep Cleaning", basePrice: 2499 },
  { id: "plumbing", name: "Plumbing Services", basePrice: 499 },
  { id: "electrical", name: "Electrical & Wiring", basePrice: 499 },
  { id: "painting", name: "Interior Painting", basePrice: 4999 },
  { id: "pest-control", name: "Pest Control", basePrice: 1299 }
];

const multipliers = {
  size: [
    { label: "1 BHK", value: 1 },
    { label: "2 BHK", value: 1.5 },
    { label: "3 BHK", value: 2 },
    { label: "Villa / Independent", value: 3 }
  ],
  urgency: [
    { label: "Standard (2-3 days)", value: 1 },
    { label: "Next Day", value: 1.2 },
    { label: "Emergency (within 2 hours)", value: 1.5 }
  ]
};

export default function PricingCalculator() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedSize, setSelectedSize] = useState(multipliers.size[0].value);
  const [selectedUrgency, setSelectedUrgency] = useState(multipliers.urgency[0].value);

  const basePrice = services.find(s => s.id === selectedService)?.basePrice || 0;
  const estimatedTotal = Math.round(basePrice * selectedSize * selectedUrgency);

  const handleWhatsApp = () => {
    const text = `Hi OSM Services! I used your calculator. I need a quotation for ${services.find(s=>s.id===selectedService)?.name}. Estimated total shown was ₹${estimatedTotal}. Can we discuss?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest">
              Instant Estimation
            </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Interactive Pricing Calculator
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get an instant, transparent estimate for your service requirements powered by our dynamic pricing algorithm.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Configuration Panel */}
          <div className="w-full lg:w-2/3 space-y-8 glass-dark p-8 rounded-[2rem]">
            {/* Service Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">1</span>
                Select Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${selectedService === service.id ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10"}`}
                  >
                    <span className="font-medium">{service.name}</span>
                    {selectedService === service.id && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Size */}
            <div className="space-y-4 pt-4 border-t border-white/5">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">2</span>
                Property Size
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {multipliers.size.map(size => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.value)}
                    className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${selectedSize === size.value ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"}`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="space-y-4 pt-4 border-t border-white/5">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">3</span>
                Service Urgency
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {multipliers.urgency.map(urgency => (
                  <button
                    key={urgency.label}
                    onClick={() => setSelectedUrgency(urgency.value)}
                    className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${selectedUrgency === urgency.value ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"}`}
                  >
                    {urgency.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Total Panel */}
          <div className="w-full lg:w-1/3 sticky top-32">
            <motion.div 
              className="glass-panel p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"
              key={estimatedTotal}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               {/* Glowing corner */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
               
               <div className="relative z-10 space-y-6">
                 <div>
                    <h4 className="text-slate-400 font-medium mb-2">Estimated Total</h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-black text-white tracking-tighter">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                      <span className="text-slate-500 font-medium">approx</span>
                    </div>
                 </div>

                 <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Base Price</span>
                      <span className="text-white font-medium">₹{basePrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Size Multiplier</span>
                      <span className="text-white font-medium">x{selectedSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Urgency Multiplier</span>
                      <span className="text-white font-medium">x{selectedUrgency}</span>
                    </div>
                 </div>

                 <div className="pt-6 space-y-3">
                    <Button onClick={handleWhatsApp} className="w-full h-14 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center gap-2 text-lg group">
                      <MessageCircle className="h-5 w-5" />
                      Inquire on WhatsApp
                      <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="w-full h-14 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF Quotation
                    </Button>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
