"use client";

import { motion } from "framer-motion";
import { 
  Calendar, Clock, MapPin, User, Settings, 
  CreditCard, LogOut, ChevronRight, CheckCircle2,
  Package, Bell, Activity, ArrowUpRight, 
  FileText, MessageSquare, LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const metrics = [
  { label: "Active Projects", value: "3", trend: "+1 this month" },
  { label: "Total Spent", value: "₹45k", trend: "Lifetime" },
  { label: "Support Tickets", value: "0", trend: "All resolved" },
];

const activeProjects = [
  {
    id: "PRJ-9021",
    service: "Corporate Office Deep Clean & AC Audit",
    progress: 65,
    status: "In Progress",
    nextMilestone: "AC Inspection at 2:00 PM",
    teamLead: "Arjun K."
  },
  {
    id: "PRJ-8842",
    service: "IT Infrastructure Setup",
    progress: 15,
    status: "Scheduled",
    nextMilestone: "Equipment Delivery on Monday",
    teamLead: "Sarah M."
  }
];

const recentInvoices = [
  { id: "INV-2024-041", amount: "12,500", date: "15 Apr 2024", status: "Paid" },
  { id: "INV-2024-038", amount: "4,200", date: "02 Apr 2024", status: "Paid" }
];

export default function ClientPortal() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Premium Sidebar */}
      <aside className="hidden w-72 border-r border-white/5 bg-black/20 backdrop-blur-xl md:flex flex-col">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
              <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">OSM Portal</span>
          </Link>
        </div>
        
        <div className="px-6 mb-8">
          <div className="p-4 rounded-2xl glass-dark border border-white/10 flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-full h-full object-cover opacity-80" />
             </div>
             <div>
                <p className="text-sm font-bold text-white">Acme Corp</p>
                <p className="text-[10px] text-primary font-mono tracking-wider">ENTERPRISE TIER</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/5 px-4 py-3 text-sm font-semibold text-white shadow-sm">
             <Activity className="h-4 w-4 text-primary" /> Overview
          </Link>
          <Link href="/dashboard/projects" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">
             <Package className="h-4 w-4" /> Active Projects
          </Link>
          <Link href="/dashboard/invoices" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">
             <FileText className="h-4 w-4" /> Invoices
          </Link>
          <Link href="/dashboard/support" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">
             <LifeBuoy className="h-4 w-4" /> Support Tickets
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">
             <Settings className="h-4 w-4" /> Settings
          </Link>
        </nav>

        <div className="p-4">
          <Link href="/logout" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
             <LogOut className="h-4 w-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Command Center</h1>
              <p className="text-slate-400">Manage your active deployments and infrastructure.</p>
            </div>
            <div className="flex items-center gap-4">
               <Button variant="outline" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-10 w-10 p-0">
                  <Bell className="h-4 w-4" />
               </Button>
               <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-6 h-10 shadow-[0_0_15px_rgba(var(--primary),0.4)]">
                  Deploy New Service
               </Button>
            </div>
          </div>

          {/* High-Level Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {metrics.map((m, i) => (
               <motion.div 
                 key={m.label}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
               >
                 <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Activity className="h-12 w-12 text-primary" />
                 </div>
                 <p className="text-sm font-medium text-slate-500 mb-2">{m.label}</p>
                 <p className="text-3xl font-bold text-white mb-2 tracking-tight">{m.value}</p>
                 <p className="text-xs font-mono text-emerald-400">{m.trend}</p>
               </motion.div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* Main Timeline/Projects */}
             <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-xl font-bold text-white">Active Deployments</h2>
                   <Link href="#" className="text-sm text-primary hover:underline flex items-center gap-1">View Timeline <ArrowUpRight className="h-4 w-4"/></Link>
                </div>

                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                       
                       <div className="flex justify-between items-start mb-6">
                         <div>
                           <div className="flex items-center gap-3 mb-2">
                             <span className="text-xs font-mono text-slate-500">{project.id}</span>
                             <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full ${project.status === 'In Progress' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                               {project.status}
                             </span>
                           </div>
                           <h3 className="text-lg font-bold text-white">{project.service}</h3>
                         </div>
                         <div className="text-right">
                           <div className="text-xs text-slate-400 mb-1">Team Lead</div>
                           <div className="flex items-center gap-2">
                             <div className="h-6 w-6 rounded-full bg-white/10 overflow-hidden"><img src="https://i.pravatar.cc/100?img=11" alt="Lead"/></div>
                             <span className="text-sm text-white font-medium">{project.teamLead}</span>
                           </div>
                         </div>
                       </div>

                       <div className="space-y-2 mb-4">
                         <div className="flex justify-between text-xs text-slate-400">
                           <span>Deployment Progress</span>
                           <span className="text-white font-mono">{project.progress}%</span>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                         </div>
                       </div>

                       <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 text-sm">
                         <Clock className="h-4 w-4 text-primary" />
                         <span className="text-slate-300">Next Action: <strong className="text-white">{project.nextMilestone}</strong></span>
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Sidebar Widgets */}
             <div className="space-y-8">
                
                {/* Recent Invoices */}
                <div>
                   <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Recent Invoices</h2>
                      <Link href="#" className="text-sm text-slate-400 hover:text-white">All</Link>
                   </div>
                   <div className="glass-dark rounded-[2rem] border border-white/10 p-2">
                     {recentInvoices.map((inv, i) => (
                       <div key={inv.id} className={`p-4 flex items-center justify-between ${i !== recentInvoices.length - 1 ? 'border-b border-white/5' : ''}`}>
                         <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                             <CheckCircle2 className="h-5 w-5" />
                           </div>
                           <div>
                             <p className="text-sm font-bold text-white">₹{inv.amount}</p>
                             <p className="text-xs font-mono text-slate-500">{inv.id}</p>
                           </div>
                         </div>
                         <Button variant="ghost" size="sm" className="h-8 px-3 text-xs border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg">
                           Download
                         </Button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Quick Support */}
                <div className="glass-panel rounded-[2rem] border border-white/10 p-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                   <h3 className="text-lg font-bold text-white mb-2 relative z-10">Need Assistance?</h3>
                   <p className="text-sm text-slate-400 mb-6 relative z-10">Connect directly with your dedicated account manager.</p>
                   <Button className="w-full rounded-xl bg-white text-black font-bold hover:bg-slate-200">
                     <MessageSquare className="h-4 w-4 mr-2" /> Open Priority Chat
                   </Button>
                </div>

             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
