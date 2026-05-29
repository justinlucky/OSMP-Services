"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/landing";

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">What Our Community Says</h2>
          <p className="text-gray-600 text-lg">Join 50,000+ happy users who&apos;ve transformed their home service experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-[2.5rem] bg-gray-50 border border-gray-200 transition-all hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-current" : "text-gray-250"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{testimonial.date}</span>
              </div>

              <blockquote className="text-lg font-medium leading-relaxed mb-8 text-gray-700">
                &quot;{testimonial.content}&quot;
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-gray-900 leading-none">{testimonial.name}</p>
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-1">Booked {testimonial.service}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Stats */}
        <div className="mt-24 pt-16 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
                <p className="text-4xl font-black text-blue-600">4.8/5</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Average Rating</p>
            </div>
            <div className="space-y-1">
                <p className="text-4xl font-black text-blue-600">1M+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Services Delivered</p>
            </div>
            <div className="space-y-1">
                <p className="text-4xl font-black text-blue-600">15k+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Service Experts</p>
            </div>
            <div className="space-y-1">
                <p className="text-4xl font-black text-blue-600">500+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Cities Covered</p>
            </div>
        </div>
      </div>
    </section>
  );
};
