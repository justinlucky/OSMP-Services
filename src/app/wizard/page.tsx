"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ChevronRight, CheckCircle2, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "goal",
    question: "What is your primary goal?",
    options: [
      { id: "maintenance", label: "Facility Maintenance", desc: "Keep operations running smoothly" },
      { id: "renovation", label: "Complete Renovation", desc: "Transform your workspace" },
      { id: "audit", label: "Infrastructure Audit", desc: "Assess and optimize systems" },
      { id: "emergency", label: "Emergency Repair", desc: "Fix critical issues immediately" }
    ]
  },
  {
    id: "industry",
    question: "What best describes your space?",
    options: [
      { id: "corporate", label: "Corporate Office", desc: "50+ employees" },
      { id: "startup", label: "Startup Hub", desc: "Fast-paced environment" },
      { id: "retail", label: "Retail Store", desc: "High customer footfall" },
      { id: "residential", label: "Premium Residential", desc: "Luxury living space" }
    ]
  },
  {
    id: "timeline",
    question: "When do you need this to start?",
    options: [
      { id: "asap", label: "As soon as possible", desc: "Within 24-48 hours" },
      { id: "week", label: "Within a week", desc: "Planning phase" },
      { id: "month", label: "Next month", desc: "Budgeting phase" },
      { id: "flexible", label: "Flexible", desc: "Just exploring options" }
    ]
  }
];

export default function AIWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [steps[currentStep].id]: optionId });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 3000); // Fake analysis delay
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <AnimatePresence mode="wait">
          {!isAnalyzing && !showResults && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/10"
            >
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between text-sm font-semibold text-slate-500 mb-4">
                   <span>Step {currentStep + 1} of {steps.length}</span>
                   <span>AI Profiling Engine</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-primary to-blue-500"
                     initial={{ width: `${(currentStep / steps.length) * 100}%` }}
                     animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                     transition={{ duration: 0.5 }}
                   />
                </div>
              </div>

              {/* Question */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                   <Bot className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {steps[currentStep].question}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {steps[currentStep].options.map((option) => {
                  const isSelected = answers[steps[currentStep].id] === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-lg font-bold ${isSelected ? "text-primary" : "text-white"}`}>{option.label}</span>
                        {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="text-slate-400 text-sm">{option.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <Button 
                  disabled={!answers[steps[currentStep].id]}
                  onClick={handleNext}
                  className="h-14 px-8 rounded-full bg-white text-black hover:bg-slate-200 font-bold text-lg group"
                >
                  {currentStep === steps.length - 1 ? "Analyze Needs" : "Continue"}
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[50px] animate-pulse" />
                <Loader2 className="h-20 w-20 text-primary animate-spin relative z-10" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">AI is crunching the data</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto">
                Our recommendation engine is matching your requirements against 10,000+ past successful deployments...
              </p>
            </motion.div>
          )}

          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-[2rem] p-8 md:p-12 shadow-2xl border border-primary/20 overflow-hidden relative"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
               
               <div className="flex items-center gap-3 text-primary mb-6">
                 <Sparkles className="h-6 w-6" />
                 <span className="font-bold tracking-widest uppercase text-sm">AI Recommendation Generated</span>
               </div>
               
               <h2 className="text-4xl font-bold text-white tracking-tight mb-8">
                 The Enterprise Infrastructure Bundle
               </h2>

               <div className="grid md:grid-cols-2 gap-8 mb-10">
                 <div className="space-y-6">
                    <p className="text-slate-400 text-lg">
                      Based on your {answers.industry === "corporate" ? "corporate office" : "facility"} requirements, we recommend a comprehensive audit followed by our specialized maintenance program.
                    </p>
                    <ul className="space-y-4">
                      {["Full Systems Audit", "Dedicated Account Manager", "Priority 2-hour SLA", "Predictive Analytics Dashboard"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                 </div>
                 
                 <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 flex flex-col justify-center">
                    <p className="text-slate-500 font-medium mb-2">Estimated Investment</p>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-black text-white">₹14,999</span>
                      <span className="text-slate-500">/mo</span>
                    </div>
                    
                    <Button className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg group">
                      Book Implementation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="link" className="w-full mt-2 text-slate-400 hover:text-white">
                      Download Detailed Proposal
                    </Button>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
