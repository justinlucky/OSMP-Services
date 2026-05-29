"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/landing";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Common Questions</h2>
          <p className="text-gray-600 text-lg">Everything you need to know about OSM Services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold tracking-tight text-gray-900">{faq.question}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-100 transition-all ${isOpen ? "rotate-180 bg-blue-50 text-blue-600" : ""}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 p-10 rounded-[3rem] bg-white border border-gray-200 text-center space-y-6 relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <h3 className="text-2xl md:text-3xl font-black relative z-10 text-gray-900">Still have questions?</h3>
             <p className="text-gray-600 relative z-10">If you cannot find the answer to your question in our FAQ, you can always contact us. We will answer you shortly!</p>
             <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
                 <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:scale-105 transition-all shadow-lg shadow-blue-500/20">Contact Support</button>
                 <button className="px-8 py-3 rounded-2xl bg-gray-100 text-gray-800 font-bold hover:bg-gray-200 transition-all border border-gray-200">Read Documentation</button>
             </div>
         </div>
      </div>
    </section>
  );
};
