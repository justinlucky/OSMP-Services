"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Calendar, MapPin, CreditCard, 
  ShoppingBag, ArrowLeft, Smartphone, 
  Wifi, IndianRupee, CheckCircle2, PartyPopper, 
  Navigation 
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const steps = ["Service", "Schedule", "Address", "Payment"];

const allAddons = [
  { name: "Sofa Cleaning", price: 299 },
  { name: "Balcony Wash", price: 199 },
  { name: "Bathroom Cleaning", price: 149 },
  { name: "Kitchen Cleaning", price: 249 },
  { name: "Hair Styling Treatment", price: 299 },
  { name: "Pedicure & Manicure", price: 249 },
  { name: "Extra Massage session", price: 199 },
  { name: "AC gas services", price: 499 },
  { name: "General services", price: 199 },
  { name: "Gas filling", price: 399 },
  { name: "AC install and uninstallation", price: 599 },
  { name: "Heavy furniture packing", price: 999 },
  { name: "Insurance add-on", price: 499 },
  { name: "Bubble wrap protection", price: 299 },
  { name: "OS Installation / Upgrade", price: 399 },
  { name: "Thermal Paste Replacement", price: 199 },
  { name: "RAM Upgrade (8GB)", price: 1499 },
  { name: "SSD Upgrade (512GB)", price: 2499 },
  { name: "Data Backup & Restore", price: 199 },
  { name: "Tempered Glass Installation", price: 99 },
  { name: "OS Software Tuning", price: 149 },
  { name: "Internal Port Cleaning", price: 89 }
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title");
  const priceParam = searchParams.get("price");
  const packageParam = searchParams.get("package");
  const addonsParam = searchParams.get("addons");

  const [currentStep, setCurrentStep] = useState(0);
  const [paid, setPaid] = useState(false);
  
  const [bookingDetails, setBookingDetails] = useState({
    date: "17 May 2026",
    time: "11:00 AM",
    address: "123 Luxury Ave, Suite 405, Manhattan, NY 10001",
    service: titleParam || "Whole Home Deep Cleaning",
    price: priceParam || "499",
    package: packageParam || "Standard",
    addons: addonsParam || ""
  });

  useEffect(() => {
    if (titleParam || priceParam || packageParam || addonsParam) {
      setBookingDetails((prev) => ({
        ...prev,
        service: titleParam || prev.service,
        price: priceParam || prev.price,
        package: packageParam || prev.package,
        addons: addonsParam || prev.addons
      }));
    }
  }, [titleParam, priceParam, packageParam, addonsParam]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const addonsArray = bookingDetails.addons ? bookingDetails.addons.split(",").filter(Boolean) : [];
  const selectedAddonsData = addonsArray.map(name => {
    const trimmed = name.trim();
    // Support parsing 'Sofa Cleaning (x1)' format
    const cleanName = trimmed.split(" (x")[0];
    const match = allAddons.find(a => a.name === cleanName);
    return match ? match : { name: trimmed, price: 199 };
  });

  const addonSum = selectedAddonsData.reduce((sum, item) => sum + item.price, 0);

  // Dynamic pricing breakdown
  const subtotal = parseInt(bookingDetails.price, 10) || 499;
  const baseAndAddons = subtotal + addonSum;
  const gst = Math.round(baseAndAddons * 0.18);
  const servicesTax = Math.round(baseAndAddons * 0.05);
  const otherTaxes = Math.round(baseAndAddons * 0.025);
  const platformFee = 49;
  const finalPrice = baseAndAddons + gst + servicesTax + otherTaxes + platformFee;

  const [confirmedBookingId, setConfirmedBookingId] = useState<string>("");

  const handlePay = () => {
    const randomId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: randomId,
      service: bookingDetails.service,
      date: bookingDetails.date,
      time: bookingDetails.time,
      status: "Confirmed",
      price: String(finalPrice),
      address: bookingDetails.address
    };

    const savedBookings = localStorage.getItem("userBookings");
    const updated = savedBookings ? JSON.parse(savedBookings) : [];
    updated.unshift(newBooking);
    localStorage.setItem("userBookings", JSON.stringify(updated));

    setConfirmedBookingId(randomId);
    setPaid(true);
    
    // Clear cart upon payment
    localStorage.removeItem("osm_cart");
    window.dispatchEvent(new Event("storageUpdate"));
  };

  if (paid) return <PaymentSuccess bookingDetails={{ ...bookingDetails, price: String(finalPrice) }} bookingId={confirmedBookingId} />;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 py-16 md:px-8 relative z-10">
        <div className="mx-auto max-w-4xl space-y-8 pt-10">
          
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-4">
               <Link 
                 href="/cart"
                 className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors shadow-sm")}
               >
                 <ArrowLeft className="h-5 w-5" />
               </Link>
               <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Booking Checkout</h1>
            </div>
            
            {/* Steps Progress */}
            <div className="flex items-center gap-3 overflow-x-auto py-2 no-scrollbar">
               {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                   <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                     index <= currentStep ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-550"
                   }`}>
                     {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                   </div>
                   <span className={`text-xs font-bold ${index <= currentStep ? "text-blue-700" : "text-slate-500"}`}>
                     {step}
                   </span>
                   {index < steps.length - 1 && <div className="h-px w-6 bg-slate-200" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             {/* Left Main Content */}
             <div className="lg:col-span-2">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-6"
                    >
                      {currentStep === 0 && <StepService next={nextStep} service={bookingDetails.service} packageType={bookingDetails.package} />}
                      {currentStep === 1 && (
                        <StepSchedule 
                          next={nextStep} 
                          prev={prevStep} 
                          details={bookingDetails} 
                          setDetails={setBookingDetails} 
                        />
                      )}
                      {currentStep === 2 && (
                        <StepAddress 
                          next={nextStep} 
                          prev={prevStep} 
                          details={bookingDetails} 
                          setDetails={setBookingDetails} 
                        />
                      )}
                      {currentStep === 3 && <StepPayment prev={prevStep} onPay={handlePay} price={String(finalPrice)} />}
                    </motion.div>
                 </AnimatePresence>
             </div>

             {/* Right Order Summary Sidebar */}
             <div className="space-y-6">
                 <div className="bg-white rounded-[2.5rem] border border-slate-200 p-6 space-y-6 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="font-extrabold flex items-center gap-2 text-slate-900 relative z-10 text-base">
                      <ShoppingBag className="h-4.5 w-4.5 text-blue-600" />
                      Order Summary
                    </h3>
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex gap-3">
                        <div className="h-16 w-16 rounded-xl bg-slate-55 relative overflow-hidden shrink-0 border border-slate-200">
                             <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" alt="Service" className="object-cover w-full h-full" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-sm font-extrabold text-slate-800 line-clamp-2">{bookingDetails.service}</h4>
                           <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[9px] font-black text-blue-600 uppercase tracking-widest">{bookingDetails.package} Package</span>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      <div className="space-y-2.5 text-xs sm:text-sm font-semibold">
                         <div className="flex justify-between">
                            <span className="text-slate-500">Base Price ({bookingDetails.package})</span>
                            <span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span>
                         </div>

                         {selectedAddonsData.map((item, idx) => (
                           <div key={idx} className="flex justify-between font-bold">
                              <span className="text-slate-500 leading-tight line-clamp-1">{item.name}</span>
                              <span className="text-slate-800">₹{item.price.toLocaleString()}</span>
                           </div>
                         ))}

                         <div className="flex justify-between text-xs">
                            <span className="text-slate-500">GST (18%)</span>
                            <span className="font-bold text-slate-700">₹{gst.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Services Tax (5%)</span>
                            <span className="font-bold text-slate-700">₹{servicesTax.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Local / Other Tax (2.5%)</span>
                            <span className="font-bold text-slate-700">₹{otherTaxes.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Platform Booking Fee</span>
                            <span className="font-bold text-slate-700">₹{platformFee}</span>
                         </div>
                         <div className="flex justify-between text-emerald-600 font-bold text-xs">
                            <span>Promo Discount Applied</span>
                            <span>-₹49</span>
                         </div>
                      </div>

                      <div className="h-px bg-slate-100" />

                      <div className="flex justify-between items-center">
                         <span className="text-slate-900 font-extrabold text-base">Grand Total</span>
                         <span className="text-blue-600 font-black text-2xl tracking-tight">₹{finalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-[10px] text-slate-500 font-bold relative z-10 leading-relaxed">
                       All calculations are based on standard Indian marketplace tax structures and prioritised dispatch.
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-slate-900 font-bold">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

// STEP 0: REVIEW PACKAGE
const StepService = ({ next, service, packageType }: { next: () => void; service: string; packageType: string }) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-6 shadow-xl relative overflow-hidden">
     <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review Package</h2>
        <p className="text-sm text-slate-500 font-semibold">Confirm your service details before scheduling.</p>
     </div>
     <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
           <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{service}</h3>
           <span className="px-3 py-1 rounded-full border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider bg-blue-50 self-start sm:self-center">{packageType}</span>
        </div>
        <ul className="space-y-3 text-sm text-slate-700 font-bold">
           <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-600 flex-shrink-0" /> Verified Background-Checked Partners</li>
           <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-600 flex-shrink-0" /> 100% Damage Protection & Service Guarantee</li>
           <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-600 flex-shrink-0" /> Multi-Step Quality Checklist Assurance</li>
        </ul>
     </div>
     <Button onClick={next} className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/10">Confirm and Continue</Button>
  </div>
);

// STEP 1: SCHEDULE SERVICE
const StepSchedule = ({ next, prev, details, setDetails }: any) => {
  const dates = ["17 May 2026", "18 May 2026", "19 May 2026", "20 May 2026", "21 May 2026"];
  const slots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-xl relative overflow-hidden">
       <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Schedule Service</h2>
          <p className="text-sm text-slate-500 font-semibold">Pick a date and time slot that works best for you.</p>
       </div>
       
       <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest block">Select Date</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
             {dates.map((d) => (
               <button 
                 key={d} 
                 type="button"
                 onClick={() => setDetails((prevDetails: any) => ({ ...prevDetails, date: d }))}
                 className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                   details.date === d 
                   ? "border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm font-black scale-105" 
                   : "border-slate-200 bg-white hover:border-slate-350 text-slate-600 hover:bg-slate-50 font-bold"
                 }`}
               >
                  <span className="text-[10px] font-black uppercase opacity-60 mb-1">May</span>
                  <span className="text-xl font-black">{d.split(' ')[0]}</span>
               </button>
             ))}
          </div>
       </div>

       <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest block">Available Slots</h3>
          <div className="grid grid-cols-2 gap-3">
             {slots.map((t) => (
               <button 
                 key={t} 
                 type="button"
                 onClick={() => setDetails((prevDetails: any) => ({ ...prevDetails, time: t }))}
                 className={`rounded-xl border p-4 text-sm font-bold transition-all ${
                   details.time === t 
                   ? "border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm font-black" 
                   : "border-slate-200 bg-white hover:border-slate-350 text-slate-600 hover:bg-slate-50"
                 }`}
               >
                 {t}
               </button>
             ))}
          </div>
       </div>

       <div className="flex gap-4 pt-6 border-t border-slate-100">
          <Button onClick={prev} variant="outline" className="flex-1 h-14 rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 font-bold">Back</Button>
          <Button onClick={next} className="flex-[2] h-14 rounded-xl bg-blue-600 hover:bg-blue-750 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/10">Next Step</Button>
       </div>
    </div>
  );
};

// STEP 2: SERVICE ADDRESS
const StepAddress = ({ next, prev, details, setDetails }: any) => {
  const [locating, setLocating] = useState(false);

  const detectLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setDetails((prevDetails: any) => ({
          ...prevDetails,
          address: `Latitude: ${lat}, Longitude: ${lon} (Auto-detected near Bangalore)`
        }));
        setLocating(false);
      },
      () => {
        alert("Failed to capture geo-location. Please check your browser permissions.");
        setLocating(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-xl relative overflow-hidden">
       <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Service Address</h2>
          <p className="text-sm text-slate-500 font-semibold">Where should we send our professionals?</p>
       </div>
       <div className="space-y-4">
          <div className="space-y-3">
             <label className="text-xs font-bold text-slate-800 uppercase tracking-widest block">Full Address and Details</label>
             <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                   <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                   <Input 
                      value={details.address}
                      onChange={(e) => setDetails((prevDetails: any) => ({ ...prevDetails, address: e.target.value }))}
                      placeholder="Your street address" 
                      className="pl-12 h-14 rounded-xl flex-1 bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 font-semibold shadow-inner"
                      required 
                   />
                </div>
                <Button 
                   type="button" 
                   onClick={detectLocation}
                   disabled={locating}
                   className="h-14 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold px-6 shrink-0 flex gap-2 transition-all shadow-sm"
                >
                   <Navigation className="h-4 w-4" />
                   {locating ? "Locating..." : "Auto Detect"}
                </Button>
             </div>
             <p className="text-[10px] text-slate-400 font-bold">Coordinates are safely captured via the browser Geolocation API.</p>
          </div>
       </div>
       <div className="flex gap-4 pt-6 border-t border-slate-100">
          <Button onClick={prev} variant="outline" className="flex-1 h-14 rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold">Back</Button>
          <Button onClick={next} className="flex-[2] h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/10">Proceed to Payment</Button>
       </div>
    </div>
  );
};

// STEP 3: COMPLETE PAYMENT
const StepPayment = ({ prev, onPay, price }: { prev: () => void; onPay: () => void; price: string }) => {
  const [selected, setSelected] = useState("upi");
  const methods = [
    { id: "upi", label: "UPI (GPay / PhonePe)", icon: Smartphone, sub: "Instant payment via any UPI app" },
    { id: "card", label: "Credit / Debit Card", icon: CreditCard, sub: "Visa, Mastercard, RuPay" },
    { id: "netbanking", label: "Net Banking", icon: Wifi, sub: "All major Indian banks supported" },
    { id: "cash", label: "Cash After Service", icon: IndianRupee, sub: "Pay in cash when work is done" },
  ];
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 space-y-8 shadow-xl relative overflow-hidden">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Complete Payment</h2>
        <p className="text-sm text-slate-500 font-semibold">Select your preferred payment method.</p>
      </div>
      <div className="space-y-4">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setSelected(method.id)}
            className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
              selected === method.id 
              ? "border-blue-600 bg-blue-50/50 shadow-sm" 
              : "border-slate-200 bg-white hover:border-slate-350"
            }`}
          >
            <div className={`h-12 w-12 flex items-center justify-center rounded-xl shrink-0 ${
              selected === method.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
            }`}>
              <method.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className={`font-bold text-base transition-colors ${selected === method.id ? 'text-blue-900 font-extrabold' : 'text-slate-800'}`}>{method.label}</p>
              <p className="text-[11px] font-semibold text-slate-500 leading-none mt-1">{method.sub}</p>
            </div>
            {selected === method.id && <Check className="h-5 w-5 text-blue-600 shrink-0 mr-2" />}
          </button>
        ))}
      </div>
      <div className="flex gap-4 pt-6 border-t border-slate-100">
        <Button onClick={prev} variant="outline" className="flex-1 h-14 rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold">Back</Button>
        <Button
          onClick={onPay}
          className="flex-[2] h-14 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all shadow-lg shadow-emerald-500/10"
        >
          Confirm and Pay ₹{price}
        </Button>
      </div>
    </div>
  );
};

// STEP 4: PAYMENT SUCCESS / BOOKING CONFIRMATION
const PaymentSuccess = ({ bookingDetails, bookingId }: any) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
    
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full space-y-8 relative z-10 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>
        <PartyPopper className="h-8 w-8 text-amber-500 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Booking Confirmed!</h1>
        <p className="text-slate-650 text-sm font-semibold leading-relaxed">
          Your payment of <strong className="text-slate-900 font-extrabold">₹{bookingDetails.price}</strong> was received successfully. A confirmation has been sent to your registered email.
        </p>
      </div>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl text-left overflow-hidden shadow-inner">
        <div className="p-6 space-y-4 font-bold text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Booking ID</span>
            <span className="font-mono text-slate-900 font-extrabold">#{bookingId || "OSM-SUCCESS"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Service</span>
            <span className="text-slate-800 font-extrabold leading-tight text-right max-w-[200px] truncate">{bookingDetails.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Scheduled</span>
            <span className="text-slate-800 font-extrabold">{bookingDetails.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">Time Slot</span>
            <span className="text-slate-800 font-extrabold">{bookingDetails.time}</span>
          </div>
          <div className="flex flex-col pt-4 border-t border-slate-200 mt-4 font-bold">
            <span className="text-slate-500 font-semibold mb-1">Address</span>
            <span className="text-xs text-slate-700 leading-relaxed font-semibold">{bookingDetails.address}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
         <Link href="/dashboard">
            <Button className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/10">
               View Command Center
            </Button>
         </Link>
         <Link href="/">
            <Button variant="ghost" className="w-full h-14 rounded-xl font-bold text-slate-500 hover:text-slate-850 hover:bg-slate-100 transition-colors">
               Return Home
            </Button>
         </Link>
      </div>
    </motion.div>
  </div>
);
