"use client";

import { motion } from "framer-motion";
import { 
  Users, DollarSign, Activity, BarChart3, 
  Settings, Layers, Database, ShieldAlert,
  ArrowUpRight, ArrowDownRight, Search, 
  MoreVertical, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const kpis = [
  { label: "Total Revenue", value: "₹2.4M", trend: "+12.5%", isPositive: true },
  { label: "Active Deployments", value: "1,248", trend: "+5.2%", isPositive: true },
  { label: "Conversion Rate", value: "68.4%", trend: "+2.1%", isPositive: true },
  { label: "System Latency", value: "24ms", trend: "-4.3%", isPositive: false },
];

const recentLeads = [
  { id: "L-9021", name: "Global Tech Inc.", intent: "High", value: "₹45k", status: "Qualified" },
  { id: "L-9022", name: "Nexus Properties", intent: "Medium", value: "₹12k", status: "Contacted" },
  { id: "L-9023", name: "Sarah Jenkins", intent: "High", value: "₹8k", status: "New" },
  { id: "L-9024", name: "Apex Manufacturing", intent: "Low", value: "₹120k", status: "Contacted" }
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
               <ShieldAlert className="h-4 w-4 text-emerald-500" />
             </div>
             <span className="text-lg font-bold tracking-tight text-white">OSM Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 mt-2 px-3">Analytics</div>
          <button className="w-full flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-white">
             <BarChart3 className="h-4 w-4 text-primary" /> Overview
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl hover:bg-white/5 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all">
             <Activity className="h-4 w-4" /> Live Traffic
          </button>
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 mt-8 px-3">Management</div>
          <button className="w-full flex items-center gap-3 rounded-xl hover:bg-white/5 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all">
             <Users className="h-4 w-4" /> Leads & Clients
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl hover:bg-white/5 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all">
             <Layers className="h-4 w-4" /> Service Catalog
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl hover:bg-white/5 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all">
             <Database className="h-4 w-4" /> Database Ops
          </button>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 rounded-xl hover:bg-white/5 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all">
             <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-64">
               <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search UUID, Lead, or Invoice..." 
                 className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs text-white outline-none focus:border-primary/50"
               />
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs font-mono text-emerald-400">SYS_OPT_NORMAL</span>
             </div>
             <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
               AD
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
             <div>
               <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Executive Dashboard</h1>
               <p className="text-sm text-slate-400">Real-time platform telemetry and lead ingestion.</p>
             </div>
             <Button className="h-9 px-4 rounded-lg bg-white hover:bg-slate-200 text-black font-bold text-xs shadow-lg">
               Generate Report
             </Button>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {kpis.map((kpi, i) => (
               <motion.div 
                 key={kpi.label}
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.05 }}
                 className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden"
               >
                 <p className="text-xs font-medium text-slate-500 mb-2">{kpi.label}</p>
                 <p className="text-2xl font-bold text-white tracking-tight mb-2">{kpi.value}</p>
                 <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                   {kpi.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                   {kpi.trend}
                 </div>
                 {/* Sparkline Mock */}
                 <div className="absolute bottom-0 left-0 right-0 h-8 opacity-20">
                   <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                     <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,6 L90,0 L100,20 Z" fill={kpi.isPositive ? "#10b981" : "#ef4444"} />
                   </svg>
                 </div>
               </motion.div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Lead Pipeline */}
             <div className="lg:col-span-2 space-y-4">
               <div className="flex items-center justify-between">
                 <h2 className="text-lg font-bold text-white">Live Lead Pipeline</h2>
                 <button className="text-xs font-semibold text-primary hover:text-white transition-colors">View All Pipeline</button>
               </div>
               
               <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-white/5 text-xs text-slate-400 uppercase font-mono tracking-wider">
                     <tr>
                       <th className="px-6 py-4 font-semibold">Lead / Company</th>
                       <th className="px-6 py-4 font-semibold">Intent</th>
                       <th className="px-6 py-4 font-semibold">Est. Value</th>
                       <th className="px-6 py-4 font-semibold">Status</th>
                       <th className="px-6 py-4"></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 text-slate-300">
                     {recentLeads.map((lead) => (
                       <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                         <td className="px-6 py-4">
                           <div className="font-medium text-white">{lead.name}</div>
                           <div className="text-xs text-slate-500 font-mono">{lead.id}</div>
                         </td>
                         <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                             lead.intent === 'High' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                             lead.intent === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                             'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                           }`}>
                             {lead.intent}
                           </span>
                         </td>
                         <td className="px-6 py-4 font-mono font-medium text-white">{lead.value}</td>
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             {lead.status === 'Qualified' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                             <span className="text-xs">{lead.status}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                           <button className="text-slate-500 hover:text-white"><MoreVertical className="h-4 w-4" /></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>

             {/* System Health */}
             <div className="space-y-4">
               <h2 className="text-lg font-bold text-white">AI Engine Health</h2>
               <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                 <div>
                   <div className="flex justify-between text-xs mb-2">
                     <span className="text-slate-400">Match Accuracy</span>
                     <span className="text-white font-mono">98.2%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary rounded-full w-[98%]" />
                   </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between text-xs mb-2">
                     <span className="text-slate-400">API Load</span>
                     <span className="text-white font-mono">42%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 rounded-full w-[42%]" />
                   </div>
                 </div>

                 <div className="pt-4 border-t border-white/5">
                   <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Active Bots</h3>
                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-sm text-white font-medium">Sales routing (B2B)</span>
                       </div>
                       <span className="text-xs text-slate-500">14 active</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-sm text-white font-medium">Customer support</span>
                       </div>
                       <span className="text-xs text-slate-500">128 active</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
