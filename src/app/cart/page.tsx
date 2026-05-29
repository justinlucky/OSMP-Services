"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  Gift, 
  Check, 
  PlusCircle, 
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  title: string;
  price: number;
  packageType: string;
  quantity: number;
  image: string;
}

const defaultCartItems: CartItem[] = [
  {
    id: "svc-deep-cleaning",
    title: "Whole Home Deep Cleaning",
    price: 4999,
    packageType: "Standard",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "svc-ac-audit",
    title: "AC Audit & Filter Cleaning",
    price: 1499,
    packageType: "Premium",
    quantity: 2,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
  }
];

const availableAddons = [
  { id: "add-sofa", title: "Sofa Foam Cleaning", price: 299, desc: "Remove deep stains from sofa cushions", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=300" },
  { id: "add-balcony", title: "Balcony Jet Pressure Wash", price: 199, desc: "Deep pressure clean balcony floor", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=300" },
  { id: "add-disinfect", title: "Washroom Disinfection", price: 249, desc: "Sanitize floors, tiles and toilets", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300" }
];

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Initialize from LocalStorage or Fallback
  useEffect(() => {
    const saved = localStorage.getItem("osm_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        setCart(defaultCartItems);
      }
    } else {
      setCart(defaultCartItems);
      localStorage.setItem("osm_cart", JSON.stringify(defaultCartItems));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("osm_cart", JSON.stringify(newCart));
    // Synchronize nav count
    window.dispatchEvent(new Event("storage"));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQty };
      }
      return item;
    });
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    saveCart(updated);
  };

  const resetCart = () => {
    saveCart(defaultCartItems);
    setAppliedCoupon(null);
  };

  const addAddon = (addon: typeof availableAddons[0]) => {
    // Check if already in cart
    const exists = cart.find(item => item.id === addon.id);
    if (exists) {
      const updated = cart.map(item => {
        if (item.id === addon.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: addon.id,
        title: addon.title,
        price: addon.price,
        packageType: "Add-on",
        quantity: 1,
        image: addon.image
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    setIsApplying(true);
    setCouponError(null);

    setTimeout(() => {
      const normalized = couponCode.toUpperCase().trim();
      if (normalized === "PROMO20" || normalized === "WELCOME10" || normalized === "AIWIZARD") {
        setAppliedCoupon(normalized);
        setCouponCode("");
      } else {
        setCouponError("Invalid coupon code. Try using PROMO20 for 15% off!");
      }
      setIsApplying(false);
    }, 1000);
  };

  // Math Calculations
  const itemsSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (appliedCoupon === "PROMO20") discount = Math.round(itemsSubtotal * 0.15);
  else if (appliedCoupon === "WELCOME10") discount = Math.round(itemsSubtotal * 0.10);
  else if (appliedCoupon === "AIWIZARD") discount = Math.round(itemsSubtotal * 0.20);

  const discountedSubtotal = Math.max(0, itemsSubtotal - discount);
  const gst = Math.round(discountedSubtotal * 0.18);
  const serviceTax = Math.round(discountedSubtotal * 0.05);
  const platformFee = itemsSubtotal > 0 ? 49 : 0;
  const grandTotal = discountedSubtotal + gst + serviceTax + platformFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Pick primary item details to feed checkout page query params
    const primary = cart[0];
    const otherTitles = cart.slice(1).map(item => `${item.title} (x${item.quantity})`).join(", ");
    
    const checkoutUrl = `/checkout?title=${encodeURIComponent(primary.title)}&price=${primary.price * primary.quantity}&package=${encodeURIComponent(primary.packageType)}&addons=${encodeURIComponent(otherTitles)}`;
    router.push(checkoutUrl);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 relative flex items-center justify-center text-slate-900 overflow-x-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)] bg-white pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Review Service Cart</h1>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-0.5">Manage details and proceed to secure slot booking</p>
              </div>
            </div>

            {cart.length > 0 && (
              <button 
                onClick={resetCart}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-800 font-bold transition-all shrink-0 self-start sm:self-center"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Default Cart
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {cart.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm text-center space-y-6"
                  >
                    <div className="h-16 w-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-800">Your service cart is empty</h2>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                        You have not selected any services. Navigate to our catalog to select custom service packages.
                      </p>
                    </div>
                    <Link href="/services">
                      <Button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide">
                        Explore Catalog
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6"
                      >
                        {/* Service Image */}
                        <div className="h-20 w-20 rounded-2xl relative overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                          <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                        </div>

                        {/* Title and Badge */}
                        <div className="flex-1 text-center sm:text-left space-y-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                            {item.packageType} Package
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                          <p className="text-xs text-slate-500 font-semibold">Standard dispatch and professional staging</p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2.5 hover:bg-slate-100 text-slate-500 transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-4 text-sm font-black text-slate-800">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2.5 hover:bg-slate-100 text-slate-500 transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Pricing & Actions */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-6 sm:gap-1.5 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0">
                          <div className="flex flex-col text-left sm:text-right">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Price</span>
                            <span className="text-lg font-black text-slate-950">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl text-slate-400 hover:text-rose-600 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Recommended Add-ons */}
              <div className="bg-slate-50 rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-inner space-y-6">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="font-bold tracking-widest uppercase text-xs">Frequently Booked Add-ons</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-850 tracking-tight leading-snug">
                  Enhance your service package with top complementary bookings:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {availableAddons.map((addon) => (
                    <div 
                      key={addon.id} 
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-350 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="h-24 w-full rounded-xl relative overflow-hidden border border-slate-100 bg-slate-50">
                          <img src={addon.image} alt={addon.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight line-clamp-1">{addon.title}</h4>
                          <p className="text-[10px] text-slate-500 font-semibold leading-relaxed line-clamp-2">{addon.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs font-black text-slate-900">₹{addon.price}</span>
                        <button 
                          onClick={() => addAddon(addon)}
                          className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-100 hover:border-blue-200 px-2.5 py-1 rounded-xl transition-all"
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="space-y-6">
              
              {/* Order Calculations */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-extrabold flex items-center gap-2 text-slate-950 text-base mb-6 pb-4 border-b border-slate-100">
                  <ShoppingBag className="h-4.5 w-4.5 text-blue-600" />
                  Booking Calculation
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2.5 text-xs sm:text-sm font-semibold">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Items Subtotal</span>
                      <span className="font-bold text-slate-800">₹{itemsSubtotal.toLocaleString()}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({appliedCoupon})</span>
                        <span className="font-bold">-₹{discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">GST (18%)</span>
                      <span className="text-slate-700">₹{gst.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Services Tax (5%)</span>
                      <span className="text-slate-700">₹{serviceTax.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Platform Booking Fee</span>
                      <span className="text-slate-700">₹{platformFee.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-extrabold text-base">Grand Total</span>
                    <span className="text-blue-600 font-black text-2xl tracking-tight">₹{grandTotal.toLocaleString()}</span>
                  </div>

                  {cart.length > 0 && (
                    <Button 
                      onClick={handleCheckout}
                      className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/10 mt-6 group"
                    >
                      Proceed to Secure Slot
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    100% Satisfaction SLA Protected
                  </div>
                </div>
              </div>

              {/* Coupon Panel */}
              {cart.length > 0 && (
                <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-2 text-indigo-600 mb-3">
                    <Gift className="h-4 w-4" />
                    <span className="font-bold tracking-widest uppercase text-[10px]">Active Partner Deals</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-1">Apply Coupon Code</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mb-4 leading-relaxed">Type your corporate or referral coupon code below to reduce your total.</p>
                  
                  <form onSubmit={handleApplyCoupon} className="space-y-3">
                    <div className="flex gap-2">
                      <Input 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. PROMO20" 
                        className="bg-white border-slate-200 text-xs font-bold rounded-xl h-11 focus:border-blue-500 focus:ring-blue-500 placeholder:text-slate-400 placeholder:font-normal"
                      />
                      <Button 
                        type="submit" 
                        disabled={isApplying || !couponCode}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-11 px-4 rounded-xl shrink-0"
                      >
                        {isApplying ? "..." : "Apply"}
                      </Button>
                    </div>
                    {couponError && <p className="text-[10px] font-bold text-rose-500">{couponError}</p>}
                  </form>

                  <AnimatePresence>
                    {appliedCoupon && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 border border-emerald-200 bg-emerald-50 rounded-xl p-3 flex items-start gap-2.5"
                      >
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block">Coupon Applied</span>
                          <span className="text-xs text-emerald-800 font-bold">Code {appliedCoupon} has successfully discounted your order subtotal!</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sample coupons helper */}
                  <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[9px] font-bold text-slate-450 uppercase block w-full mb-1">Recommended Deals (Click to apply)</span>
                    <button 
                      onClick={() => { setAppliedCoupon("PROMO20"); setCouponError(null); }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-350 text-[10px] font-extrabold text-slate-800 transition-colors"
                    >
                      PROMO20 (15% Off)
                    </button>
                    <button 
                      onClick={() => { setAppliedCoupon("WELCOME10"); setCouponError(null); }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-350 text-[10px] font-extrabold text-slate-800 transition-colors"
                    >
                      WELCOME10 (10% Off)
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
