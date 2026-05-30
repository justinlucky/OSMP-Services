"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  MapPin,
  ShoppingCart,
  Menu,
  X,
  Sparkles,
  User,
  UserPlus
} from "lucide-react"
import { usePathname } from "next/navigation"
import { Show, SignInButton, UserButton, SignUpButton, UserAvatar, useUser } from "@clerk/nextjs"

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()
  const { user } = useUser()

  // Cart Count Logic
  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem("osm_cart")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          const count = parsed.reduce((sum: number, item: any) => sum + item.quantity, 0)
          setCartCount(count)
        } catch (e) {
          setCartCount(0)
        }
      } else {
        setCartCount(0)
      }
    }

    updateCount()
    window.addEventListener("storage", updateCount)
    window.addEventListener("storageUpdate", updateCount)

    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener("storageUpdate", updateCount)
    }
  }, [])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">OSM</span>
            </motion.div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">OSM Services</span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search (Desktop) */}
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2 w-72">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search services..."
                className="bg-transparent text-sm focus:outline-none flex-1"
              />
            </div>

            {/* Cart needed Authentication */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Auth */}
            <div className="hidden md:block">
              <Show when="signed-in">
                <UserButton />
              </Show>
              <Show when="signed-out">
                <div className="flex gap-2">
                  <SignUpButton mode="modal">
                    <Button size="sm" className="w-full">
                      <UserPlus/> Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </Show>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/about" onClick={closeMenu} className="block">About Us</Link>
              <Link href="/services" onClick={closeMenu} className="block">Services</Link>
              <Link href="/wizard" onClick={closeMenu} className="block">AI Wizard</Link>
              <Link href="/calculator" onClick={closeMenu} className="block">Calculator</Link>
              <Link href="/pricing" onClick={closeMenu} className="block">Pricing</Link>
              
              <Separator />
              
              {/* Auth */}
              <Show when="signed-in">
                <span className="flex items-center gap-2">
                  <UserButton />
                  <span>{user?.firstName} {user?.lastName}</span>
                </span>
              </Show>
              <Show when="signed-out">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="w-full">Sign Up</Button>
                  </SignUpButton>
                </div>
              </Show>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}