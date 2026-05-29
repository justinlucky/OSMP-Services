import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">OSM Services</span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              On-demand services made simple. Your trusted platform for home, professional, and lifestyle services.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200/50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200/50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200/50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-200/50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 transition-colors">All Services</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Categories</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Home Maintenance</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Cleaning Services</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Salon for Women</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Health & Wellness</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Newsletter</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Subscribe to get latest updates and offers.
            </p>
            <div className="flex gap-2">
              <input 
                placeholder="Email address" 
                className="h-10 flex-1 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-800"
              />
              <button className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-600">
          <p>© 2024 OSM Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
