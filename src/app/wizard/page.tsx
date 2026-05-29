"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  ShieldAlert, 
  Activity, 
  Star, 
  Zap, 
  Clock, 
  Users, 
  MessageSquare,
  ThumbsUp,
  Percent,
  Search,
  Paintbrush,
  Briefcase,
  Rocket,
  Store,
  Home,
  Flame,
  Calendar,
  HelpCircle,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "goal",
    question: "What is your primary goal?",
    options: [
      { id: "maintenance", label: "Facility Maintenance", desc: "Keep operations running smoothly and prevent failure", icon: Zap, iconColor: "text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-200" },
      { id: "renovation", label: "Complete Renovation", desc: "Transform your workspace with full design & fit-outs", icon: Paintbrush, iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:border-indigo-200" },
      { id: "audit", label: "Infrastructure Audit", desc: "Assess and optimize electrical, water & HVAC systems", icon: Search, iconColor: "text-purple-600 bg-purple-50 border-purple-100 hover:border-purple-200" },
      { id: "emergency", label: "Emergency Repair", desc: "Fix critical issues immediately with zero downtime", icon: ShieldAlert, iconColor: "text-rose-600 bg-rose-50 border-rose-100 hover:border-rose-200" }
    ]
  },
  {
    id: "industry",
    question: "What best describes your space?",
    options: [
      { id: "corporate", label: "Corporate Office", desc: "Medium to large scale workspace with 50+ staff", icon: Briefcase, iconColor: "text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-200" },
      { id: "startup", label: "Startup Hub", desc: "Fast-moving, high-intensity collaborative environment", icon: Rocket, iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-200" },
      { id: "retail", label: "Retail & Commercial", desc: "Public store or outlet with high customer footfall", icon: Store, iconColor: "text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-200" },
      { id: "residential", label: "Premium Residential", desc: "Luxury estate, apartment complex, or villa", icon: Home, iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:border-indigo-200" }
    ]
  },
  {
    id: "timeline",
    question: "When do you need this to start?",
    options: [
      { id: "asap", label: "As soon as possible", desc: "Within 24 to 48 hours for immediate dispatch", icon: Flame, iconColor: "text-rose-600 bg-rose-50 border-rose-100 hover:border-rose-200" },
      { id: "week", label: "Within a week", desc: "Staged planning and rapid onboarding phase", icon: Calendar, iconColor: "text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-200" },
      { id: "month", label: "Next month", desc: "Scheduled deployment for future planning", icon: Clock, iconColor: "text-slate-655 bg-slate-100 border-slate-200 hover:border-slate-300" },
      { id: "flexible", label: "Flexible", desc: "Consultative planning and general quoting", icon: HelpCircle, iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:border-indigo-200" }
    ]
  }
];

// Rich AI Diagnostic Compiler
const getRecommendation = (answers: Record<string, string>) => {
  const goal = answers.goal || "maintenance";
  const industry = answers.industry || "corporate";
  const timeline = answers.timeline || "asap";

  const goalMap: Record<string, { title: string; subtitle: string; action: string; benefits: string[]; metrics: { risk: number; efficiency: number; frequency: string } }> = {
    maintenance: {
      title: "Preventive Care & Operations Suite",
      subtitle: "Scheduled Maintenance & Asset Management Plan",
      action: "Designed to maximize facility uptime and avoid costly emergency repairs through structured checkups and priority SLA support.",
      benefits: [
        "Bi-weekly comprehensive plumbing & electrical systems auditing",
        "HVAC performance tuning & high-efficiency filter cleaning",
        "Dedicated Facility Account Coordinator & direct hotlines",
        "Predictive breakdowns analytics via centralized client portal"
      ],
      metrics: { risk: 18, efficiency: 94, frequency: "Bi-Weekly" }
    },
    renovation: {
      title: "Workspace Transformation Program",
      subtitle: "Turnkey Design, Demolition & Premium Build-out",
      action: "A phased transformation plan to update aesthetic appeal, environmental sustainability, and space utilization with zero operation halts.",
      benefits: [
        "Turnkey CAD floorplan design & acoustic mapping validation",
        "Modern ergonomic furniture staging & smart lighting presets",
        "Eco-friendly building material sourcing (LEED certified options)",
        "Post-construction deep sanitization & IAQ air compliance check"
      ],
      metrics: { risk: 8, efficiency: 98, frequency: "As-needed / Project basis" }
    },
    audit: {
      title: "Infrastructure Integrity Audit",
      subtitle: "Deep Technical Diagnostics & Safety Compliance Assessment",
      action: "A rigorous deep-dive engineering audit to locate energy losses, safety hazards, and structural optimization opportunities.",
      benefits: [
        "Thermal camera imaging of core electrical panels and switches",
        "Water flow rate regulation & chemical purity diagnostics",
        "Carbon monoxide, VOC, and particulate air safety check",
        "Itemized asset depreciation report with 5-year capital expenditure forecast"
      ],
      metrics: { risk: 45, efficiency: 88, frequency: "Semi-Annually" }
    },
    emergency: {
      title: "Critical Response & Disaster Recovery",
      subtitle: "Immediate Mechanical, Electrical & Structural Remediation",
      action: "On-demand emergency response for high-risk component failures, electrical outages, or active structural flooding.",
      benefits: [
        "Guaranteed 60-minute dispatch of senior master electrician/plumber",
        "Active hazard isolation & source containment standard",
        "Temporary power bypass/utility systems routing setup",
        "Post-incident forensic root cause report & prevention plan"
      ],
      metrics: { risk: 94, efficiency: 72, frequency: "On-Demand" }
    }
  };

  const industryMap: Record<string, { name: string; multiplier: number; size: string; duration: string; SLA: string }> = {
    corporate: { name: "Corporate Office (Enterprise Scale)", multiplier: 1.8, size: "4 - 8 specialists", duration: "48 - 72 hours", SLA: "2 Hours" },
    startup: { name: "Startup Tech Hub (Agile Flow)", multiplier: 0.95, size: "2 - 4 specialists", duration: "24 - 36 hours", SLA: "4 Hours" },
    retail: { name: "Retail & Commercial Space (High Footfall)", multiplier: 1.3, size: "3 - 5 after-hours crew", duration: "12 - 24 hours (night shifts)", SLA: "1 Hour" },
    residential: { name: "Premium Residential Estate (Luxury Standard)", multiplier: 1.1, size: "2 - 3 white-glove technicians", duration: "16 - 24 hours", SLA: "3 Hours" }
  };

  const timelineMap: Record<string, { priority: string; desc: string }> = {
    asap: { priority: "Immediate Priority", desc: "Deployment scheduled within 24-48 hours with express onboarding." },
    week: { priority: "High Priority", desc: "Consultation and site staging scheduled within 7 business days." },
    month: { priority: "Standard Priority", desc: "Detailed resource scheduling for next month's planning cycle." },
    flexible: { priority: "Consultative Info", desc: "Custom quotation and flexible timing options to suit budget allocation." }
  };

  const g = goalMap[goal] || goalMap.maintenance;
  const ind = industryMap[industry] || industryMap.corporate;
  const time = timelineMap[timeline] || timelineMap.asap;

  let basePrice = 14999;
  if (goal === "renovation") basePrice = 85000;
  if (goal === "audit") basePrice = 12500;
  if (goal === "emergency") basePrice = 5900;

  const finalPrice = Math.round(basePrice * ind.multiplier);

  return {
    title: g.title,
    subtitle: g.subtitle,
    action: g.action,
    benefits: g.benefits,
    metrics: g.metrics,
    industryName: ind.name,
    crewSize: ind.size,
    duration: ind.duration,
    SLA: ind.SLA,
    priority: time.priority,
    timelineDesc: time.desc,
    price: finalPrice
  };
};

export default function AIWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Real-Time Feedback & Sentiment Analysis States
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackResponse, setFeedbackResponse] = useState<any>(null);

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
      }, 2500); // Cinematic analysis delay
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  // Compute recommendation
  const rec = showResults ? getRecommendation(answers) : null;

  // Process Real-Time Feedback with sentiment assessment
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmittingFeedback(true);
    
    // Analyze input in real-time
    setTimeout(() => {
      const comment = feedbackText.toLowerCase();
      let adjustedPrice = rec ? rec.price : 0;
      let optimizationType = "Standard Partner Bonus";
      let optimizationMsg = "We've added a complimentary deep sanitation voucher to your account!";
      let sentimentType = "Neutral";
      let sentimentScore = 75;

      // Price sentiment check
      if (comment.includes("expensive") || comment.includes("price") || comment.includes("cost") || comment.includes("high") || rating <= 3) {
        adjustedPrice = Math.round(adjustedPrice * 0.85); // 15% discount
        optimizationType = "AI Price Optimization Activated";
        optimizationMsg = "We hear you! An automatic 15% First-Time Partner Discount has been applied directly to your proposal investment.";
        sentimentType = "Value Critical";
        sentimentScore = 48;
      } 
      // Speed sentiment check
      else if (comment.includes("fast") || comment.includes("slow") || comment.includes("speed") || comment.includes("quick") || comment.includes("urgent")) {
        optimizationType = "AI Priority Dispatch Active";
        optimizationMsg = `We've upgraded your account priority. SLA dispatched timeline reduced from ${rec?.SLA || '3 hours'} to VIP Express (within 45 mins) at no additional charge.`;
        sentimentType = "Efficiency Oriented";
        sentimentScore = 85;
      }
      // Quality / Positive sentiment check
      else if (comment.includes("good") || comment.includes("great") || comment.includes("excellent") || comment.includes("perfect") || rating >= 4) {
        optimizationType = "Complimentary Quality Add-on";
        optimizationMsg = "Thank you for the high rating! We've bundled an extra full-service Indoor Air Quality (IAQ) testing assessment (worth ₹3,500) completely free of charge.";
        sentimentType = "Highly Positive";
        sentimentScore = 96;
      }

      setFeedbackResponse({
        sentiment: sentimentType,
        score: sentimentScore,
        optimizationTitle: optimizationType,
        optimizationText: optimizationMsg,
        newPrice: adjustedPrice,
        originalPrice: rec ? rec.price : 0,
        applied: true
      });
      setIsSubmittingFeedback(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 relative flex items-center justify-center text-slate-900 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] bg-white pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-500/5 via-indigo-500/2 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {!isAnalyzing && !showResults && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200 relative"
            >
              {/* Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
                   <span>Step {currentStep + 1} of {steps.length}</span>
                   <span className="flex items-center gap-1.5 text-blue-600 font-extrabold">
                     <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                     AI Profiling Engine
                   </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-full"
                     initial={{ width: `${(currentStep / steps.length) * 100}%` }}
                     animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                     transition={{ duration: 0.5 }}
                   />
                </div>
              </div>

              {/* Question */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-blue-5 border border-blue-200 flex items-center justify-center">
                   <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {steps[currentStep].question}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {steps[currentStep].options.map((option) => {
                  const isSelected = answers[steps[currentStep].id] === option.id;
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`group p-6 rounded-2xl border-2 cursor-pointer text-left transition-all duration-300 flex items-start ${
                        isSelected 
                        ? "border-blue-600 bg-blue-50/50 shadow-md shadow-blue-500/5 text-blue-900" 
                        : "border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50"
                      }`}
                    >
                      {/* Visual Icon Badge */}
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center border transition-all duration-300 mr-4 flex-shrink-0 ${
                        isSelected ? "bg-blue-600 text-white border-blue-600" : option.iconColor
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-base font-bold transition-colors ${isSelected ? "text-blue-700 font-extrabold" : "text-slate-800 font-semibold"}`}>{option.label}</span>
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ml-2 ${isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"}`}>
                            {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed font-medium">{option.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer Button navigation */}
              <div className="flex justify-end">
                <Button 
                  disabled={!answers[steps[currentStep].id]}
                  onClick={handleNext}
                  className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-750 text-white font-bold text-base transition-all shadow-lg shadow-blue-600/10 group"
                >
                  {currentStep === steps.length - 1 ? "Compile & Analyze Needs" : "Continue"}
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[40px] animate-pulse" />
                <Loader2 className="h-20 w-20 text-blue-600 animate-spin relative z-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Compiling Deep System Analysis</h2>
              <p className="text-slate-600 text-base max-w-md mx-auto font-semibold leading-relaxed">
                Crunching your preferences, assessing risk factors, and cross-referencing with 10k+ architectural project guidelines...
              </p>
            </motion.div>
          )}

          {showResults && rec && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 w-full"
            >
              {/* Header Analysis Summary */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200 overflow-hidden relative">
                 <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
                 
                 <div className="flex items-center gap-2 text-blue-600 mb-4">
                   <Sparkles className="h-5 w-5" />
                   <span className="font-bold tracking-widest uppercase text-xs">AI Recommendation & Diagnostic Profile</span>
                 </div>
                 
                 <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                   {rec.title}
                 </h2>
                 <p className="text-slate-600 font-bold text-sm max-w-2xl mb-8">
                   {rec.subtitle} • {rec.industryName}
                 </p>

                 {/* Custom Diagnostic Metrics Section */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-t border-b border-slate-100 py-8">
                   <div className="space-y-2">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Risk Exposure Level</span>
                     <div className="flex items-center gap-2.5">
                       <ShieldAlert className={`h-5 w-5 ${rec.metrics.risk > 50 ? "text-rose-600" : "text-emerald-600"}`} />
                       <span className="text-lg font-bold text-slate-800">{rec.metrics.risk}%</span>
                       <span className="text-xs font-semibold text-slate-500">{rec.metrics.risk > 50 ? "(Urgent Focus)" : "(Low Risk)"}</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full ${rec.metrics.risk > 50 ? "bg-rose-500" : "bg-emerald-500"}`} 
                         style={{ width: `${rec.metrics.risk}%` }}
                       />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Efficiency Improvement</span>
                     <div className="flex items-center gap-2.5">
                       <Activity className="h-5 w-5 text-blue-600" />
                       <span className="text-lg font-bold text-slate-800">+{rec.metrics.efficiency}%</span>
                       <span className="text-xs font-semibold text-slate-500">(Target Gain)</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className="h-full rounded-full bg-blue-600" 
                         style={{ width: `${rec.metrics.efficiency}%` }}
                       />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Recommended Inspection</span>
                     <div className="flex items-center gap-2.5">
                       <Clock className="h-5 w-5 text-indigo-600" />
                       <span className="text-lg font-bold text-slate-800">{rec.metrics.frequency}</span>
                     </div>
                     <div className="text-xs font-semibold text-slate-500">Preventative Maintenance Schedule</div>
                   </div>
                 </div>

                 {/* Core Recommendation & Pricing Bundle */}
                 <div className="grid md:grid-cols-5 gap-8 items-center pb-2">
                   {/* Left Side: Scope Breakdown */}
                   <div className="md:col-span-3 space-y-6">
                      <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                        {rec.action} We have compiled a comprehensive list of immediate operational milestones:
                      </p>
                      <ul className="space-y-3.5">
                        {rec.benefits.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-800 text-sm font-bold leading-tight">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Interactive Spec Chips */}
                      <div className="flex flex-wrap gap-2.5 pt-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-bold">
                          <Users className="h-3.5 w-3.5 text-blue-600" /> Crew: {rec.crewSize}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-bold">
                          <Clock className="h-3.5 w-3.5 text-indigo-600" /> Duration: {rec.duration}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-bold">
                          <Zap className="h-3.5 w-3.5 text-amber-600" /> Dispatch SLA: {rec.SLA}
                        </div>
                      </div>
                   </div>
                   
                   {/* Right Side: Price Card */}
                   <div className="md:col-span-2 bg-slate-50 rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-center text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Estimated Investment</p>
                      <div className="flex items-baseline justify-center gap-1 mb-6">
                        <span className="text-4xl sm:text-5xl font-black text-slate-900">
                          ₹{feedbackResponse && feedbackResponse.applied ? feedbackResponse.newPrice.toLocaleString() : rec.price.toLocaleString()}
                        </span>
                        <span className="text-slate-500 font-bold text-sm">/mo</span>
                      </div>
                      
                      <Button className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-600/10 group">
                        Book Implementation
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <button className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors mt-4 block">
                        Download Comprehensive PDF Scope
                      </button>
                   </div>
                 </div>
              </div>

              {/* PREMIUM VALUE & ROI VISUALIZATION PANEL */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2rem] p-6 sm:p-8 border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-2 text-blue-700 mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-bold tracking-widest uppercase text-xs">Estimated Efficiency ROI & Value Metrics</span>
                </div>
                
                <h3 className="text-base sm:text-lg font-extrabold text-slate-800 mb-6">
                  How this plan compares to traditional ad-hoc reactive servicing:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cost Metric */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">Estimated Annual Cost</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Save ~47%</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-650 font-bold">
                        <span>Ad-hoc Reactive Repair</span>
                        <span className="font-bold text-slate-800">₹3,42,000 /yr</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-650 font-bold">
                        <span>OSM Preventive Plan</span>
                        <span className="font-black text-blue-600">₹1,79,988 /yr</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "52%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Downtime Metric */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase">System Downtime Hours</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">94% Less Downtime</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-655 font-bold">
                        <span>Standard Agency Response</span>
                        <span className="font-bold text-slate-800">72 Hours /yr</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-655 font-bold">
                        <span>OSM 2-Hour SLA Plan</span>
                        <span className="font-black text-emerald-600">4 Hours /yr</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "6%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ENHANCED LIVE FEEDBACK AND SENTIMENT OPTIMIZATION SYSTEM */}
              <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />
                
                <div className="flex items-center gap-2 text-indigo-600 mb-4">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-bold tracking-widest uppercase text-xs">Real-Time Proposal Optimizer</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                  Help us perfect this proposal
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-semibold mb-6 max-w-xl">
                  Provide rating and detailed feedback. Our AI NLP engine will immediately analyze your expectations, optimize your pricing structure, or upgrade dispatch metrics.
                </p>

                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  {/* Star Rating Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Your Satisfaction Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110 duration-200"
                        >
                          <Star 
                            className={`h-7 w-7 transition-all ${
                              star <= rating 
                              ? "fill-amber-500 text-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]" 
                              : "text-slate-300 hover:text-slate-400 bg-transparent"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comments Box */}
                  <div className="space-y-2">
                    <label htmlFor="comments" className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Specific Comments / Special Needs</label>
                    <textarea
                      id="comments"
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="e.g. 'Can we lower the cost?' or 'This is highly urgent' or 'Need air quality audits as well'..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 placeholder:text-slate-450 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold shadow-inner"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-start">
                    <Button
                      type="submit"
                      disabled={rating === 0 || isSubmittingFeedback}
                      className="h-12 px-6 rounded-xl bg-indigo-650 hover:bg-indigo-750 text-white font-bold text-xs uppercase tracking-widest transition-all relative overflow-hidden"
                    >
                      {isSubmittingFeedback ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Processing Analysis...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Activity className="h-4 w-4" /> Run Real-Time Optimization
                        </span>
                      )}
                    </Button>
                  </div>
                </form>

                {/* DYNAMIC REAL-TIME SENTIMENT & OFFER OPTIMIZATION REPORT */}
                <AnimatePresence>
                  {feedbackResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="mt-8 border border-slate-250 bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <ThumbsUp className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">AI Sentiment Profiling</span>
                            <span className="text-sm font-extrabold text-slate-800">{feedbackResponse.sentiment} ({feedbackResponse.score}% Score)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-bold text-indigo-700">
                          <Percent className="h-3.5 w-3.5 text-indigo-600" />
                          Status: Active Optimization Applied
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
                            {feedbackResponse.optimizationTitle}
                          </span>
                          <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                            {feedbackResponse.optimizationText}
                          </p>
                        </div>

                        {feedbackResponse.newPrice !== feedbackResponse.originalPrice && (
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 uppercase">Adjusted Booking Price:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs line-through text-slate-400 font-bold">₹{feedbackResponse.originalPrice.toLocaleString()}</span>
                              <span className="text-base font-black text-emerald-600">₹{feedbackResponse.newPrice.toLocaleString()}/mo</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* DYNAMIC PERSONALIZED FAQ PANEL */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center gap-2 text-indigo-600">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-bold tracking-widest uppercase text-xs">Proposal Guard & Security FAQ</span>
                </div>
                
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Frequently Asked Questions
                </h3>
                
                <div className="divide-y divide-slate-100">
                  {[
                    {
                      q: "What certifications do your deployed crew members hold?",
                      a: "All deployed OSM specialists are fully licensed, vetted, and carry comprehensive general liability insurance policies (up to ₹50 Lakhs) for your complete protection."
                    },
                    {
                      q: "Can we customize this proposal scope later?",
                      a: "Absolutely! Once booked, your Dedicated Facility Manager will perform a physical site staging and refine the scope milestones in direct collaboration with your operations lead."
                    },
                    {
                      q: "Is there an exit clause for the subscription bundle?",
                      a: "Yes. Our enterprise plans feature flexible month-to-month scheduling. You can modify, pause, or suspend subscription coverage with a simple 30-day notice."
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0">
                      <h4 className="text-sm font-bold text-slate-800 mb-1.5">{faq.q}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
