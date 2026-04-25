import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Zap, BarChart3, ArrowRight, Bot } from 'lucide-react';
import { cn } from '../lib/utils';
import { AI_INSIGHTS, SYSTEM_ARCHITECTURE } from '../data/reportData';

export const DecisionPage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
    <div className="mb-12 md:mb-16">
       <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Langkah 09</div>
       <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Decision & Architecture</h2>
       <p className="text-slate-400 font-medium max-w-2xl mt-4 md:mt-6 text-sm sm:text-base">Menerjemahkan data menjadi tindakan nyata and memahami aliran arsitektur sistem.</p>
    </div>

    <div className="flex items-center gap-2 mb-12">
      <div className="w-1.5 h-6 bg-brand-600 rounded-full" />
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Step 09: Pengambilan Keputusan (AI)</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-10 mb-16">
       <div className="bg-slate-900 rounded-[48px] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-10">
                <Bot className="h-8 w-8 text-accent-400" />
                <h3 className="text-xl font-black tracking-tight">AI Generated Insights</h3>
             </div>
             <div className="space-y-6">
                {AI_INSIGHTS.map((insight, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm group hover:bg-white/10 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-accent-400 border border-accent-500/30 px-3 py-1 rounded-full bg-accent-500/10">
                           {insight.type}
                        </span>
                     </div>
                     <h4 className="font-bold text-sm mb-2 text-white">{insight.title}</h4>
                     <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{insight.desc}</p>
                     <div className="pt-4 border-t border-white/10 flex gap-3">
                        <ArrowRight className="h-4 w-4 text-accent-500 shrink-0" />
                        <p className="text-[10px] font-bold text-accent-100">{insight.action}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       <div className="space-y-10">
          <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft">
             <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Arsitektur BI System</h3>
             <div className="relative">
                <div className="absolute top-8 left-6 bottom-8 w-0.5 bg-slate-100" />
                <div className="space-y-8">
                   {SYSTEM_ARCHITECTURE.map((step, i) => (
                     <div key={i} className="relative pl-12">
                        <div className="absolute left-0 top-1 w-12 flex justify-center">
                           <div className="w-3 h-3 rounded-full bg-brand-500 ring-4 ring-brand-50" />
                        </div>
                        <h4 className="font-black text-slate-900 text-sm mb-1">{step.step}</h4>
                        <p className="text-[10px] text-brand-600 font-bold uppercase tracking-widest mb-2">{step.tech}</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
          
          <div className="bg-brand-50 p-8 rounded-[40px] border border-brand-100 flex items-start gap-5">
             <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Lightbulb className="text-brand-600 h-6 w-6" />
             </div>
             <div>
                <h4 className="font-black text-slate-900 text-sm mb-2">Conclusion</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                   Dengan menerapkan Data Warehouse and BI, Pemerintah Kabupaten Indramayu dapat beralih dari pelaporan reaktif menjadi <strong>pengambilan keputusan proaktif</strong> berbasis data untuk penanganan sampah and banjir.
                </p>
             </div>
          </div>
       </div>
    </div>
  </motion.div>
);
