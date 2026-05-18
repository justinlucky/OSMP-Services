"use client";

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

  return (
    <motion.nav 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
      className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto rounded-[2rem] border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-10 w-10 overflow-hidden rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
            </svg>
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-gradient group-hover:opacity-80 transition-all">OSM Services</span>
        </Link>

        {/* Location & Search (Desktop) */}
        <div className="hidden flex-1 items-center gap-4 px-8 md:flex max-w-2xl">
          <div className="flex h-10 w-full items-center gap-2 rounded-full border bg-muted/40 px-4 transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select className="bg-transparent text-sm focus:outline-none outline-none border-none cursor-pointer">
              <option>Bangalore, IN</option>
              <option>Hyderabad, IN</option>
              <option>Chennai, IN</option>
            </select>
            <div className="h-4 w-px bg-border" />
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search for services..."
              className="flex-1 bg-transparent text-sm focus:outline-none outline-none border-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden items-center gap-6 md:flex mr-4">
            <Link href="/services" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/wizard" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors relative group flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI Wizard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/calculator" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link href="/pricing" className="text-sm font-semibold hover:text-primary transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="relative mr-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              2
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 active:translate-y-px [&_svg]:size-5 shadow-sm"
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/services" className="w-full">Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/pricing" className="w-full">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/bookings" className="w-full">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/logout")} className="text-destructive font-bold cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger 
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 active:translate-y-px [&_svg]:size-5 shadow-sm"
            >
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/bookings" className="w-full">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="w-full">Profile</Link>
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

