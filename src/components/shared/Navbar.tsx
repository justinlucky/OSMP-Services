"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, User, ShoppingCart, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem("osm_cart");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const count = parsed.reduce((sum: number, item: any) => sum + item.quantity, 0);
          setCartCount(count);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };
    
    // Initial run
    updateCount();
    
    // Listen to local storage updates
    window.addEventListener("storage", updateCount);
    
    // Custom storage event handler since window storage event only fires on other tabs by default
    const handleCartChange = () => {
      updateCount();
    };
    window.addEventListener("storageUpdate", handleCartChange);
    
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("storageUpdate", handleCartChange);
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
      className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm transition-all"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/10"
          >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
            </svg>
          </motion.div>
          <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:opacity-80 transition-all">OSM Services</span>
        </Link>

        {/* Location & Search (Desktop) */}
        <div className="hidden flex-1 items-center gap-4 px-8 md:flex max-w-2xl">
          <div className="flex h-10 w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50/50 px-4 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
            <MapPin className="h-4 w-4 text-slate-500" />
            <select className="bg-transparent text-sm focus:outline-none outline-none border-none cursor-pointer text-slate-800 font-semibold">
              <option>Bangalore, IN</option>
              <option>Hyderabad, IN</option>
              <option>Chennai, IN</option>
            </select>
            <div className="h-4 w-px bg-gray-200" />
            <Search className="h-4 w-4 text-slate-500" />
            <input
              placeholder="Search for services..."
              className="flex-1 bg-transparent text-sm focus:outline-none outline-none border-none text-slate-800"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden items-center gap-6 md:flex mr-4">
            <Link href="/services" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link href="/wizard" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors relative group flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI Wizard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link href="/calculator" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors relative group">
              Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          </div>
          <Link href="/cart" className="relative mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 transition-colors" title="View Cart">
            <ShoppingCart className="h-5 w-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white font-black animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground active:translate-y-px [&_svg]:size-5 shadow-sm"
            >
              <Menu className="text-slate-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-250">
              <DropdownMenuItem>
                <Link href="/cart" className="w-full text-slate-800 font-bold flex items-center justify-between">
                  <span>My Cart</span>
                  {cartCount > 0 && <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black">{cartCount}</span>}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services" className="w-full text-slate-800">Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/pricing" className="w-full text-slate-800">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full text-slate-800">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/bookings" className="w-full text-slate-800">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full text-slate-800">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/logout")} className="text-destructive font-bold cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger 
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground active:translate-y-px [&_svg]:size-5 shadow-sm"
            >
              <User className="text-slate-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-250">
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full text-slate-800">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/bookings" className="w-full text-slate-800">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full text-slate-800">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/logout")} className="text-destructive font-bold cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
};
