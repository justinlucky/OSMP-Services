import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, Tag } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Enterprise Insights & SEO Content | OSM Services",
  description: "Explore the latest insights, strategies, and case studies on infrastructure management, predictive maintenance, and enterprise facility services.",
  keywords: ["facility management", "predictive maintenance", "infrastructure audit", "OSM services", "enterprise services", "deep cleaning"],
  openGraph: {
    title: "OSM Services Insights",
    description: "Industry-leading strategies for enterprise infrastructure.",
    type: "website",
  }
};

const posts = [
  {
    id: "predictive-maintenance-2024",
    title: "The Future of Predictive Maintenance in 2024",
    excerpt: "How AI and IoT sensors are transforming facility management from reactive repairs to proactive infrastructure preservation.",
    category: "Technology",
    author: "OSM Engineering",
    date: "May 18, 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "hvac-efficiency-guide",
    title: "Maximizing Commercial HVAC Efficiency",
    excerpt: "A comprehensive guide to reducing energy costs by 30% through strategic AC maintenance and thermal auditing.",
    category: "Infrastructure",
    author: "Arjun Kumar",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&q=80&w=2071"
  },
  {
    id: "deep-cleaning-protocols",
    title: "Enterprise Deep Cleaning Protocols",
    excerpt: "Standardizing hygiene across 100+ retail locations. Learn the exact protocols used by top-tier facility managers.",
    category: "Operations",
    author: "Sarah Jenkins",
    date: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        <div className="mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary uppercase tracking-widest">
            Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Insights & <span className="text-slate-500">Engineering.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Technical deep dives, strategy guides, and SEO-optimized content to help you scale your infrastructure intelligently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
             <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col glass-dark rounded-[2rem] border border-white/10 overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative h-56 w-full overflow-hidden">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                   <Image 
                     src={post.image} 
                     alt={post.title} 
                     fill 
                     className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
                   />
                   <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                         {post.category}
                      </span>
                   </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                     {post.title}
                   </h3>
                   <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                     {post.excerpt}
                   </p>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                         <Calendar className="h-3.5 w-3.5" />
                         {post.date}
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                         Read More <ArrowUpRight className="h-3 w-3" />
                      </div>
                   </div>
                </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
