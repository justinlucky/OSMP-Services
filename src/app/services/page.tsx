"use client";

import { ListingHeader, ListingSidebar } from "@/components/features/services/ListingComponents";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { X, Sparkles, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const services = [
  // --- Cleaning ---
  {
    id: "1",
    title: "Full House Deep Cleaning",
    category: "Cleaning",
    price: "1999",
    originalPrice: "2999",
    rating: 4.9,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
    duration: "4 hours",
    isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "3",
    title: "Bathroom Deep Cleaning",
    category: "Cleaning",
    price: "499",
    originalPrice: "699",
    rating: 4.7,
    reviews: 820,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    duration: "1.5 hours",
  },
  {
    id: "5",
    title: "Kitchen Cleaning & Degreasing",
    category: "Cleaning",
    price: "999",
    originalPrice: "1499",
    rating: 4.8,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    duration: "2 hours",
  },
  {
    id: "6",
    title: "Sofa & Upholstery Cleaning",
    category: "Cleaning",
    price: "699",
    originalPrice: "999",
    rating: 4.6,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
    duration: "2 hours",
  },

  // --- Salon ---
  {
    id: "10",
    title: "Haircut & Styling at Home",
    category: "Salon",
    price: "399",
    originalPrice: "599",
    rating: 4.8,
    reviews: 870,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    duration: "45 mins",
    isFeatured: true,
    badge: "Popular",
  },
  {
    id: "11",
    title: "Full Body Waxing",
    category: "Salon",
    price: "799",
    originalPrice: "999",
    rating: 4.7,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
  },
  {
    id: "12",
    title: "Facial & Skin Treatment",
    category: "Salon",
    price: "899",
    originalPrice: "1299",
    rating: 4.9,
    reviews: 530,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
  },

  // --- Repairs ---
  {
    id: "20",
    title: "AC Filter Cleaning & Service",
    category: "Repairs",
    price: "499",
    originalPrice: "699",
    rating: 4.7,
    reviews: 920,
    image: "/ac-cleaning.png",
    duration: "1 hour",
    badge: "Seasonal",
    isFeatured: true,
  },
  {
    id: "21",
    title: "Switch & Socket Repair",
    category: "Repairs",
    price: "199",
    originalPrice: "299",
    rating: 4.9,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    duration: "30 mins",
  },
  {
    id: "22",
    title: "Plumbing & Pipe Repair",
    category: "Repairs",
    price: "399",
    originalPrice: "499",
    rating: 4.6,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    duration: "1.5 hours",
  },

  // --- Moving ---
  {
    id: "50",
    title: "Home Relocation (1 BHK)",
    category: "Moving",
    price: "3999",
    originalPrice: "5499",
    rating: 4.7,
    reviews: 480,
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=800",
    duration: "4-6 hours",
    isFeatured: true,
    badge: "Trusted",
  },
  {
    id: "51",
    title: "Furniture Assembly & Setup",
    category: "Moving",
    price: "499",
    originalPrice: "699",
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    duration: "1-2 hours",
  },

  // --- Laptops ---
  {
    id: "60",
    title: "Laptop General Diagnostics & Service",
    category: "Laptops",
    price: "399",
    originalPrice: "599",
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800",
    duration: "1-2 hours",
    isFeatured: true,
    badge: "Most Booked",
  },
  {
    id: "61",
    title: "Laptop Screen Replacement",
    category: "Laptops",
    price: "2499",
    originalPrice: "3499",
    rating: 4.9,
    reviews: 150,
    image: "/services/laptop_screen_repair.png",
    duration: "1.5 hours",
  },
  {
    id: "62",
    title: "Keyboard & Battery Doorstep Replacement",
    category: "Laptops",
    price: "1299",
    originalPrice: "1999",
    rating: 4.7,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
  },
  {
    id: "70",
    title: "Mobile Screen Repair & Replacement",
    category: "Mobiles",
    price: "1499",
    originalPrice: "2499",
    rating: 4.8,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=800",
    duration: "1 hour",
    isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "71",
    title: "Mobile Battery Replacement",
    category: "Mobiles",
    price: "899",
    originalPrice: "1299",
    rating: 4.7,
    reviews: 230,
    image: "/services/phone_battery_replacement.png",
    duration: "45 mins",
  },
  {
    id: "72",
    title: "Mobile Charging Port Repair",
    category: "Mobiles",
    price: "599",
    originalPrice: "899",
    rating: 4.6,
    reviews: 120,
    image: "/services/mobile_charging_port.png",
    duration: "30 mins",
  },
  {
    id: "73",
    title: "Software Update & Backup Service",
    category: "Mobiles",
    price: "399",
    originalPrice: "599",
    rating: 4.9,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    duration: "45 mins",
  },
];

const categoryFeatures = [
  {
    category: "Cleaning & Pest Control",
    slug: "cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Cleaning",
        items: [
          { name: "Bathroom Cleaning", desc: "Shine & sanitization", icon: "🚽" },
          { name: "Kitchen Cleaning", desc: "Degreasing & deep clean", icon: "🍳" },
          { name: "Living & Bedroom Cleaning", desc: "Dusting & mopping", icon: "🛋️" },
          { name: "Full Home/ By Room Cleaning", desc: "Complete deep cleaning", icon: "🏠" }
        ]
      },
      {
        title: "Pest Control",
        items: [
          { name: "Cockroach Control", desc: "Complete elimination", icon: "🪳" },
          { name: "Termite Control", desc: "Protection guarantee", icon: "🐜" },
          { name: "Bed Bugs Control", desc: "Advanced treatments", icon: "🪲" },
          { name: "Ant Control", desc: "Long-lasting protection", icon: "🐜" }
        ]
      }
    ]
  },
  {
    category: "AC & Appliance Repair",
    slug: "repairs",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Large appliances",
        items: [
          { name: "AC", desc: "Quick cooling fix", icon: "❄️" },
          { name: "Washing Machine", desc: "Prompt motor fix", icon: "🧺" },
          { name: "Refrigerator", desc: "Cooling & gas fix", icon: "🧊" },
          { name: "Television", desc: "Display repair", icon: "📺" }
        ]
      },
      {
        title: "Other appliances",
        items: [
          { name: "Chimney", desc: "Filter cleaning", icon: "🍳" },
          { name: "Microwave", desc: "Heating restoration", icon: "🍲" },
          { name: "Stove", desc: "Burner repair", icon: "🔥" }
        ]
      }
    ]
  },
  {
    category: "Men's Salon & Massage",
    slug: "salon",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Men's Services",
        items: [
          { name: "Salon for Men", desc: "Haircut & styling", icon: "🧔" },
          { name: "Massage for Men", desc: "Therapeutic massage", icon: "💆‍♂️" }
        ]
      }
    ]
  },
  {
    category: "Women's Salon & Spa",
    slug: "salon",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Beauty & Wellness",
        items: [
          { name: "Salon for Women", desc: "Waxing & facials", icon: "💇‍♀️" },
          { name: "Spa for Women", desc: "Relaxing massage", icon: "💆‍♀️" },
          { name: "Hair Studio for Women", desc: "Cut & color", icon: "✂️" },
          { name: "Makeup, Saree & Styling", desc: "Party & bridal", icon: "💄" }
        ]
      }
    ]
  },
  {
    category: "Electrician, Plumber & Carpenter",
    slug: "repairs",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Repairs",
        items: [
          { name: "Electrician", desc: "Sockets & wiring", icon: "🔌" },
          { name: "Plumber", desc: "Fix leaks & pipes", icon: "🚰" },
          { name: "Carpenter", desc: "Fix doors & beds", icon: "🔨" }
        ]
      },
      {
        title: "Installations & other services",
        items: [
          { name: "Fan Installation", desc: "Ceiling & wall fans", icon: "🌀" },
          { name: "Furniture Assembly", desc: "IKEA & more", icon: "🛋️" }
        ]
      }
    ]
  },
  {
    category: "Laptop Repair & Service",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Laptop Services",
        items: [
          { name: "Diagnostics & Service", desc: "Complete health check", icon: "💻" },
          { name: "Screen Replacement", desc: "Genuine screen fix", icon: "🖥️" },
          { name: "Keyboard & Battery", desc: "Part replacement", icon: "🔋" },
          { name: "OS & Software Install", desc: "Setup & Antivirus", icon: "💿" }
        ]
      },
      {
        title: "Other Services",
        items: [
          { name: "RAM Upgrade", desc: "Memory expansion", icon: "💾" },
          { name: "Storage Upgrade", desc: "SSD installation", icon: "💽" },
          { name: "Motherboard Repair", desc: "Chip-level fix", icon: "⚙️" },
          { name: "Data Recovery", desc: "Lost files restore", icon: "🔍" }
        ]
      }
    ]
  },
  {
    category: "Mobile Repair & Service",
    slug: "mobiles",
    image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80&w=800",
    subsections: [
      {
        title: "Mobile Services",
        items: [
          { name: "Screen Repair", desc: "On-site replacement", icon: "📱" },
          { name: "Battery Install", desc: "New energy fixed", icon: "🔋" },
          { name: "Port Repair", desc: "Charging fixes", icon: "🔌" },
          { name: "Software Repair", desc: "OS & Backup", icon: "☁️" }
        ]
      },
      {
        title: "Other Services",
        items: [
          { name: "Camera Repair", desc: "Lens replacement", icon: "📷" },
          { name: "Speaker/Mic Fix", desc: "Audio issues", icon: "🔊" },
          { name: "Water Damage", desc: "Liquid cleanup", icon: "💧" },
          { name: "Back Glass Fix", desc: "Rear panel replace", icon: "📱" }
        ]
      }
    ]
  }
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedExplorerCategory, setSelectedExplorerCategory] = useState<any | null>(null);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
  }, [categoryParam]);

  const displayedServices = activeCategory === "All" 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <ListingHeader />

      {/* Urban Company Style Categories Banner */}
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-primary/10 p-6 md:p-8 shadow-xl shadow-primary/5 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight md:text-2xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                Explore Categories & Services
              </h2>
              <p className="text-sm text-muted-foreground">Select a category to view specific subsection features exactly like Urban Company</p>
            </div>
            <button 
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "All" ? "gradient-primary text-white shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Show All Services
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categoryFeatures.map((cat, index) => (
              <motion.button
                key={cat.category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedExplorerCategory(cat)}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-transparent hover:border-primary/30 bg-muted/40 hover:bg-white dark:hover:bg-slate-800 transition-all text-center hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-muted overflow-hidden relative shadow-md">
                   <img src={cat.image} alt={cat.category} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-xs md:text-sm font-black leading-tight group-hover:text-primary transition-colors line-clamp-2">
                     {cat.category}
                   </h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row md:px-8">
        <ListingSidebar />

        <main className="flex-1 space-y-6">
          {activeCategory !== "All" && (
            <div className="flex items-center justify-between p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm">
               <span className="text-sm font-bold">Currently Filtering By: <span className="text-primary capitalize">{activeCategory}</span></span>
               <button onClick={() => setActiveCategory("All")} className="text-xs font-bold text-muted-foreground hover:text-primary underline">Clear Filter</button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm hover:border-primary transition-colors">1</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm text-muted-foreground hover:border-primary transition-colors">2</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm text-muted-foreground hover:border-primary transition-colors">3</button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg border bg-background font-bold text-sm text-muted-foreground hover:border-primary transition-colors">12</button>
          </div>
        </main>
      </div>

      {/* Categories Details Popup/Modal */}
      <AnimatePresence>
         {selectedExplorerCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col gap-6"
             >
                <div className="flex items-center justify-between border-b pb-4">
                   <div className="space-y-1">
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                         {selectedExplorerCategory.category}
                      </h2>
                      <p className="text-xs text-slate-500 font-semibold">Select a specific subsection to filter our listed catalog</p>
                   </div>
                   <button 
                     onClick={() => setSelectedExplorerCategory(null)}
                     className="h-9 w-9 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-all"
                   >
                     <X className="h-4 w-4" />
                   </button>
                </div>
 
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 no-scrollbar">
                   {selectedExplorerCategory.subsections.map((sub: any) => (
                      <div key={sub.title} className="space-y-4">
                         <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{sub.title}</h3>
                         <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {sub.items.map((item: any, itemIndex: number) => (
                               <motion.button
                                 key={item.name}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: itemIndex * 0.03 }}
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 onClick={() => {
                                   setActiveCategory(selectedExplorerCategory.slug);
                                   setSelectedExplorerCategory(null);
                                 }}
                                 className="group flex flex-col items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:border-primary/45 hover:bg-primary/5 transition-all text-center h-full justify-between"
                               >
                                  <span className="text-3xl p-2 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-750 transition-transform group-hover:scale-110">{item.icon}</span>
                                  <div className="space-y-0.5">
                                     <h4 className="text-xs font-black leading-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2">{item.name}</h4>
                                     <p className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold line-clamp-1">{item.desc}</p>
                                  </div>
                               </motion.button>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
 
                <div className="flex items-center justify-end pt-4 border-t gap-2 shrink-0">
                   <button 
                     onClick={() => setSelectedExplorerCategory(null)}
                     className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-xs text-slate-700 transition-all"
                   >
                     Close
                   </button>
                   <button 
                     onClick={() => {
                       setActiveCategory(selectedExplorerCategory.slug);
                       setSelectedExplorerCategory(null);
                     }}
                     className="px-4 py-2 rounded-xl gradient-primary font-bold text-xs text-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-1"
                   >
                     Explore Sub-category <ChevronRight className="h-3.5 w-3.5" />
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-bold">Loading Services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
