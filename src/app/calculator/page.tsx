"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, MessageCircle, Calculator, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { id: "room-cleaning", name: "Room Cleaning", basePrice: 500 },
  { id: "ac-repair", name: "AC Maintenance & Repair", basePrice: 1200 },
  { id: "washroom-cleaning", name: "Washroom Cleaning", basePrice: 300 },
  { id: "kitchen-cleaning", name: "Kitchen Cleaning", basePrice: 400 },
  { id: "plumbing", name: "Plumbing Services", basePrice: 800 },
  { id: "electrical", name: "Electrical & Wiring", basePrice: 900 },
  { id: "painting", name: "Interior Painting", basePrice: 1500 },
  { id: "furniture-assembly", name: "Furniture Assembly", basePrice: 600 },
  { id: "pest-control", name: "Pest Control", basePrice: 1100 }
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
  const [selectedServices, setSelectedServices] = useState<string[]>([services[1].id]);
  const [selectedSize, setSelectedSize] = useState(multipliers.size[0].value);
  const [selectedUrgency, setSelectedUrgency] = useState(multipliers.urgency[0].value);

  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter(x => x !== id) : prev;
      } else {
        return [...prev, id];
      }
    });
  };

  const subtotal = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id);
    return sum + (service?.basePrice || 0);
  }, 0);

  const discountApplied = selectedServices.length >= 4;
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const discountedSubtotal = subtotal - discountAmount;
  
  const estimatedTotal = Math.round(discountedSubtotal * selectedSize * selectedUrgency);

  const handleWhatsApp = () => {
    const serviceNames = selectedServices.map(id => services.find(s => s.id === id)?.name).join(", ");
    const sizeLabel = multipliers.size.find(s => s.value === selectedSize)?.label;
    const urgencyLabel = multipliers.urgency.find(u => u.value === selectedUrgency)?.label;
    
    const text = `Hi OSM Services! I used your calculator. I need a quotation for services: ${serviceNames}. Property Size: ${sizeLabel}, Urgency: ${urgencyLabel}. Estimated total shown was ₹${estimatedTotal}. Can we discuss?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, "_blank");
  };

  const clearAll = () => {
    setSelectedServices([services[1].id]);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-32 pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-50/30 rounded-full blur-[100px] mix-blend-multiply" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 uppercase tracking-widest">
              Instant Estimation
            </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Interactive Pricing Calculator
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Select multiple services for your space. <span className="text-blue-600 font-bold">Save 15% instantly</span> on a bundle of <span className="text-slate-900 font-bold underline">4 or more</span> services!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Configuration Panel */}
          <div className="w-full lg:w-2/3 space-y-8 bg-white border border-slate-250/70 p-8 rounded-[2rem] shadow-sm">
            
            {/* Service Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold">1</span>
                  Select Services <span className="text-xs font-semibold text-slate-500 font-mono">({selectedServices.length} selected)</span>
                </h3>
                <button onClick={clearAll} className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? "border-blue-600 bg-blue-50 text-slate-900 shadow-sm" 
                          : "border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className={`font-semibold ${isSelected ? "text-slate-950 font-bold" : "text-slate-800"}`}>{service.name}</span>
                        <span className="text-xs text-blue-600 font-mono font-bold mt-0.5">₹{service.basePrice}</span>
                      </div>
                      {isSelected ? (
                        <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><Check className="h-3 w-3" /></span>
                      ) : (
                        <span className="h-5 w-5 rounded-full border border-slate-300 flex items-center justify-center"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
 
            {/* Property Size */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
               <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold">2</span>
                Property Size
               </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {multipliers.size.map(size => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.value)}
                    className={`p-3 rounded-xl border text-center text-sm font-medium transition-all cursor-pointer ${
                      selectedSize === size.value 
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm" 
                        : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
               <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold">3</span>
                Service Urgency
               </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {multipliers.urgency.map(urgency => (
                  <button
                    key={urgency.label}
                    onClick={() => setSelectedUrgency(urgency.value)}
                    className={`p-3 rounded-xl border text-center text-sm font-medium transition-all cursor-pointer ${
                      selectedUrgency === urgency.value 
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm" 
                        : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
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
              className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden"
              key={estimatedTotal}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               {/* Glowing corner */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
               
               <div className="relative z-10 space-y-6">
                 <div>
                    <h4 className="text-slate-550 font-bold text-xs mb-1 uppercase tracking-wider">Estimated Total</h4>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      {discountApplied && (
                        <span className="text-base line-through text-slate-400 font-medium">₹{Math.round(subtotal * selectedSize * selectedUrgency)}</span>
                      )}
                      <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                      <span className="text-slate-500 font-bold text-xs">approx</span>
                    </div>
                 </div>

                 {/* Active Discount Alert */}
                 {discountApplied && (
                   <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl p-3 text-center shadow-sm">
                     🎉 Bundle discount of 15% applied! Saved ₹{Math.round(discountAmount * selectedSize * selectedUrgency)}
                   </div>
                 )}

                 {/* Services summary preview */}
                 <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                   {selectedServices.map(id => {
                     const service = services.find(s => s.id === id);
                     return (
                       <div key={id} className="flex justify-between items-center text-xs bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">
                         <span className="text-slate-800 font-semibold truncate max-w-[70%]">{service?.name}</span>
                         <div className="flex items-center gap-1.5">
                           <span className="text-slate-600 font-mono">₹{service?.basePrice}</span>
                           <button onClick={() => toggleService(id)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                             <X className="h-3.5 w-3.5" />
                           </button>
                         </div>
                       </div>
                     );
                   })}
                 </div>

                 <div className="space-y-3 pt-6 border-t border-slate-100">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-500">Services Subtotal</span>
                      <span className="text-slate-900 font-semibold">₹{subtotal}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-sm text-emerald-600 font-bold">
                        <span>Bundle Savings (-15%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-500">Size Multiplier</span>
                      <span className="text-slate-900 font-semibold">x{selectedSize}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-500">Urgency Multiplier</span>
                      <span className="text-slate-900 font-semibold">x{selectedUrgency}</span>
                    </div>
                 </div>

                 <div className="pt-6 space-y-3">
                    <Button onClick={handleWhatsApp} className="w-full h-14 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center justify-center gap-2 text-lg group cursor-pointer border-none">
                      <MessageCircle className="h-5 w-5" />
                      Inquire on WhatsApp
                      <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="w-full h-14 rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm">
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
