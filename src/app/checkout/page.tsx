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
    const match = allAddons.find(a => a.name === name);
    return match ? match : { name, price: 199 };
  });

  const addonSum = selectedAddonsData.reduce((sum, item) => sum + item.price, 0);

  // Dynamic pricing breakdown
  const subtotal = parseInt(bookingDetails.price, 10) || 499;
  const baseAndAddons = subtotal + addonSum;
  const gst = Math.round(baseAndAddons * 0.18);
  const servicesTax = Math.round(baseAndAddons * 0.05);
  const otherTaxes = Math.round(baseAndAddons * 0.025);
  const finalPrice = baseAndAddons + gst + servicesTax + otherTaxes;

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
  };

  if (paid) return <PaymentSuccess bookingDetails={{ ...bookingDetails, price: String(finalPrice) }} bookingId={confirmedBookingId} />;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-16 md:px-8 relative z-10">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
               <Link 
                 href="/services"
                 className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full bg-white/5 hover:bg-white/10 text-white")}
               >
                 <ArrowLeft className="h-5 w-5" />
               </Link>
               <h1 className="text-3xl font-bold tracking-tight text-white">Booking Checkout</h1>
            </div>
            
            <div className="flex items-center gap-4 px-4 overflow-x-auto py-2 no-scrollbar">
               {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                   <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                     index <= currentStep ? "gradient-primary text-white" : "border bg-background text-muted-foreground"
                   }`}>
                     {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                   </div>
                   <span className={`text-xs font-bold hidden sm:block ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
                     {step}
                   </span>
                   {index < steps.length - 1 && <div className="h-px w-8 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={currentStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
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

             <div className="space-y-6">
                <div className="glass-panel rounded-[2rem] border border-white/10 p-6 space-y-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                   <h3 className="font-bold flex items-center gap-2 text-white relative z-10">
                     <ShoppingBag className="h-4 w-4" />
                     Order Summary
                   </h3>
                   
                   <div className="space-y-4 relative z-10">
                     <div className="flex gap-3">
                        <div className="h-16 w-16 rounded-xl bg-white/5 relative overflow-hidden shrink-0 border border-white/10">
                            <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" alt="Svc" fill className="object-cover opacity-80" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-sm font-bold text-white line-clamp-1">{bookingDetails.service}</h4>
                           <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{bookingDetails.package} Package</p>
                        </div>
                     </div>

                     <div className="h-px bg-white/10" />

                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span className="text-slate-400">Base Price ({bookingDetails.package})</span>
                           <span className="font-medium text-white">₹{subtotal}</span>
                        </div>

                        {selectedAddonsData.map((item) => (
                          <div key={item.name} className="flex justify-between font-medium">
                             <span className="text-slate-400">{item.name} (Sub-Service)</span>
                             <span className="text-white">₹{item.price}</span>
                          </div>
                        ))}

                        <div className="flex justify-between text-xs">
                           <span className="text-slate-500">GST (18%)</span>
                           <span className="font-medium text-slate-300">₹{gst}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                           <span className="text-slate-500">Services Tax (5%)</span>
                           <span className="font-medium text-slate-300">₹{servicesTax}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                           <span className="text-slate-500">Local / Other Tax (2.5%)</span>
                           <span className="font-medium text-slate-300">₹{otherTaxes}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                           <span className="text-slate-500">Platform Fee</span>
                           <span className="font-medium text-slate-300">₹49</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-bold text-xs">
                           <span>Discount (PROMO20)</span>
                           <span>-₹49</span>
                        </div>
                     </div>

                     <div className="h-px bg-white/10" />

                     <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-primary font-black text-2xl tracking-tighter">₹{finalPrice}</span>
                     </div>
                   </div>
                   
                   <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-[10px] text-slate-400 relative z-10">
                      All calculations are based on standard Indian marketplace tax structures.
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-bold">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

const StepService = ({ next, service, packageType }: { next: () => void; service: string; packageType: string }) => (
  <div className="glass-dark rounded-[2rem] border border-white/10 p-8 space-y-6">
     <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Review Package</h2>
        <p className="text-sm text-slate-400">Confirm your service details before scheduling.</p>
     </div>
     <div className="rounded-2xl border border-white/5 bg-white/5 p-6 space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-white text-lg">{service}</h3>
           <span className="px-3 py-1 rounded-full border border-primary/50 text-primary text-xs font-bold uppercase tracking-wider bg-primary/10">{packageType}</span>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
           <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Professional Partners</li>
           <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Complete service guarantee</li>
           <li className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-400" /> Fully custom selected package</li>
        </ul>
     </div>
     <Button onClick={next} className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">Confirm and Continue</Button>
  </div>
);

const StepSchedule = ({ next, prev, details, setDetails }: any) => {
  const dates = ["17 May 2026", "18 May 2026", "19 May 2026", "20 May 2026", "21 May 2026"];
  const slots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

  return (
    <div className="glass-dark rounded-[2rem] border border-white/10 p-8 space-y-8">
       <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">Schedule Service</h2>
          <p className="text-sm text-slate-400">Pick a date and time slot that works best for you.</p>
       </div>
       
       <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Select Date</h3>
          <div className="grid grid-cols-5 gap-3">
             {dates.map((d) => (
               <button 
                 key={d} 
                 onClick={() => setDetails((prevDetails: any) => ({ ...prevDetails, date: d }))}
                 className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all ${
                   details.date === d ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(var(--primary),0.3)] font-bold scale-105" : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                 }`}
               >
                  <span className="text-[10px] font-bold uppercase opacity-80 mb-1">May</span>
                  <span className="text-xl font-black">{d.split(' ')[0]}</span>
               </button>
             ))}
          </div>
       </div>

       <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Available Slots</h3>
          <div className="grid grid-cols-2 gap-3">
             {slots.map((t) => (
               <button 
                 key={t} 
                 onClick={() => setDetails((prevDetails: any) => ({ ...prevDetails, time: t }))}
                 className={`rounded-xl border p-4 text-sm font-bold transition-all ${
                   details.time === t ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]" : "border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                 }`}
               >
                 {t}
               </button>
             ))}
          </div>
       </div>

       <div className="flex gap-4 pt-4 border-t border-white/10">
          <Button onClick={prev} variant="outline" className="flex-1 h-14 rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10">Back</Button>
          <Button onClick={next} className="flex-[2] h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">Next Step</Button>
       </div>
    </div>
  );
};

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
    <div className="glass-dark rounded-[2rem] border border-white/10 p-8 space-y-8">
       <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">Service Address</h2>
          <p className="text-sm text-slate-400">Where should we send our professionals?</p>
       </div>
       <div className="space-y-4">
          <div className="space-y-3">
             <label className="text-sm font-bold text-white uppercase tracking-widest">Full Address and Details</label>
             <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                   <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                   <Input 
                      value={details.address}
                      onChange={(e) => setDetails((prevDetails: any) => ({ ...prevDetails, address: e.target.value }))}
                      placeholder="Your street address" 
                      className="pl-12 h-14 rounded-xl flex-1 bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-primary/50"
                      required 
                   />
                </div>
                <Button 
                   type="button" 
                   onClick={detectLocation}
                   disabled={locating}
                   className="h-14 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold px-6 shrink-0 flex gap-2"
                >
                   <Navigation className="h-4 w-4" />
                   {locating ? "Locating..." : "Auto Detect"}
                </Button>
             </div>
             <p className="text-[10px] text-slate-500">Coordinates are captured via the browser Geolocation API.</p>
          </div>
       </div>
       <div className="flex gap-4 pt-4 border-t border-white/10">
          <Button onClick={prev} variant="outline" className="flex-1 h-14 rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10">Back</Button>
          <Button onClick={next} className="flex-[2] h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_15px_rgba(var(--primary),0.4)]">Proceed to Payment</Button>
       </div>
    </div>
  );
};

const StepPayment = ({ prev, onPay, price }: { prev: () => void; onPay: () => void; price: string }) => {
  const [selected, setSelected] = useState("upi");
  const methods = [
    { id: "upi", label: "UPI (GPay / PhonePe)", icon: Smartphone, sub: "Instant payment via any UPI app" },
    { id: "card", label: "Credit / Debit Card", icon: CreditCard, sub: "Visa, Mastercard, RuPay" },
    { id: "netbanking", label: "Net Banking", icon: Wifi, sub: "All major Indian banks supported" },
    { id: "cash", label: "Cash After Service", icon: IndianRupee, sub: "Pay in cash when work is done" },
  ];
  return (
    <div className="glass-dark rounded-[2rem] border border-white/10 p-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Complete Payment</h2>
        <p className="text-sm text-slate-400">Select your preferred payment method.</p>
      </div>
      <div className="space-y-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
              selected === method.id ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.2)]" : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className={`h-12 w-12 flex items-center justify-center rounded-xl shrink-0 ${selected === method.id ? 'bg-primary/20 text-primary' : 'bg-white/10 text-slate-400'}`}>
              <method.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className={`font-bold text-lg ${selected === method.id ? 'text-white' : 'text-slate-300'}`}>{method.label}</p>
              <p className="text-[11px] text-slate-500">{method.sub}</p>
            </div>
            {selected === method.id && <Check className="h-6 w-6 text-primary shrink-0 mr-2" />}
          </button>
        ))}
      </div>
      <div className="flex gap-4 pt-4 border-t border-white/10">
        <Button onClick={prev} variant="outline" className="flex-1 h-14 rounded-xl border-white/10 text-white bg-white/5 hover:bg-white/10">Back</Button>
        <Button
          onClick={onPay}
          className="flex-[2] h-14 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          Confirm and Pay ₹{price}
        </Button>
      </div>
    </div>
  );
};

const PaymentSuccess = ({ bookingDetails, bookingId }: any) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
    
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full space-y-8 relative z-10 glass-panel p-10 rounded-[2.5rem] border border-white/10"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <PartyPopper className="h-8 w-8 text-amber-400 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Booking Confirmed!</h1>
        <p className="text-slate-400">
          Your payment of <strong className="text-white">₹{bookingDetails.price}</strong> was received successfully. A confirmation has been sent to your registered email.
        </p>
      </div>
      <div className="bg-black/40 border border-white/5 rounded-2xl text-left overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Booking ID</span>
            <span className="font-mono text-white">#{bookingId || "OSM-SUCCESS"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Service</span>
            <span className="font-medium text-white">{bookingDetails.service}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Scheduled</span>
            <span className="font-medium text-white">{bookingDetails.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Time Slot</span>
            <span className="font-medium text-white">{bookingDetails.time}</span>
          </div>
          <div className="flex flex-col text-sm pt-4 border-t border-white/5 mt-4">
            <span className="text-slate-500 mb-1">Address</span>
            <span className="font-medium text-xs text-slate-300">{bookingDetails.address}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
         <Link href="/dashboard">
            <Button className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_15px_rgba(var(--primary),0.3)]">
               View Command Center
            </Button>
         </Link>
         <Link href="/">
            <Button variant="ghost" className="w-full h-14 rounded-xl font-semibold text-slate-400 hover:text-white hover:bg-white/5">
               Return Home
            </Button>
         </Link>
      </div>
    </motion.div>
  </div>
);
