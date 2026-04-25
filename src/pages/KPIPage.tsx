import React from 'react';
import { motion } from 'motion/react';
import { Users2, Users, Trophy, CheckCircle2, TrendingUp } from 'lucide-react';
import { STAKEHOLDERS, KPI_LIST } from '../data/reportData';

export const KPIPage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
    <div className="mb-12 md:mb-16">
      <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Langkah 03 - 05</div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Strategi & Indikator</h2>
      <p className="text-slate-400 font-medium max-w-2xl mt-4 md:mt-6 text-sm sm:text-base">Menentukan indikator kinerja utama and pemetaan kebutuhan data untuk mendukung analisis strategis.</p>
    </div>

    <div className="flex items-center gap-2 mb-12">
      <div className="w-1.5 h-6 bg-brand-600 rounded-full" />
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Step 03-05: KPI & Data Metadata</h2>
    </div>

    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft">
           <div className="flex items-center gap-3 mb-10">
              <Users2 className="text-brand-600 h-7 w-7" />
              <h3 className="text-xl font-black text-slate-900 tracking-tight">3. Identifikasi Stakeholder</h3>
           </div>
           <div className="grid md:grid-cols-2 gap-8">
              {STAKEHOLDERS.map((s, i) => (
                <div key={i} className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/40 hover:bg-white hover:shadow-hover hover:border-brand-100 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                         <Users className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase py-1.5 px-3 border border-slate-200 rounded-full">Level: Priority</span>
                   </div>
                   <h4 className="font-extrabold text-slate-900 text-base mb-4 tracking-tight group-hover:text-brand-700">{s.name}</h4>
                   <div className="space-y-5">
                      <div>
                         <p className="text-[9px] font-black text-brand-600 uppercase tracking-widest mb-1.5">Butuh Informasi</p>
                         <p className="text-xs text-slate-600 font-medium leading-relaxed">{s.needs}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100">
                         <p className="text-[9px] font-black text-accent-600 uppercase tracking-widest mb-1.5">Tujuan Strategis</p>
                         <p className="text-xs font-bold text-slate-900 leading-relaxed">{s.goal}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10">
              <Trophy className="text-brand-400/20 h-40 w-40" />
           </div>
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-12">
                <Trophy className="text-brand-400 h-6 w-6" />
                <h3 className="text-xl font-black tracking-tight">Penentuan KPI (Langkah 4)</h3>
             </div>
             <div className="grid md:grid-cols-2 gap-10">
                {KPI_LIST.map((k, i) => (
                  <div key={i} className="space-y-3 p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm">
                     <h5 className="font-black text-brand-500 text-sm tracking-tight uppercase">KPI: {k.name}</h5>
                     <p className="text-slate-400 text-[10px] leading-relaxed">{k.def}</p>
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-brand-600" />
                        <span className="text-[9px] font-black text-brand-600 uppercase tracking-widest">Target: {k.target}</span>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-8">
         <div className="bg-brand-600 rounded-[40px] p-8 text-white">
            <h4 className="font-black text-lg mb-6 tracking-tight">5. Mapping to Warehouse</h4>
            <div className="space-y-6">
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[9px] font-black text-brand-200 uppercase tracking-widest mb-1">Measure Name</p>
                  <p className="text-xs font-bold">jumlah_pengaduan</p>
               </div>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[9px] font-black text-brand-200 uppercase tracking-widest mb-1">Measure Name</p>
                  <p className="text-xs font-bold">volume_sampah</p>
               </div>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[9px] font-black text-brand-200 uppercase tracking-widest mb-1">Measure Name</p>
                  <p className="text-xs font-bold">kejadian_banjir</p>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-[10px] text-brand-100/60 leading-relaxed">
               Semua KPI di atas dipetakan langsung ke Field Numerik di Tabel Fakta untuk memfasilitasi agregasi OLAP.
            </div>
         </div>
         
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-soft">
            <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
               <TrendingUp className="text-slate-400 h-5 w-5" />
            </div>
            <h4 className="font-black text-sm text-slate-900 mb-4 tracking-tight">Tren KPI</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
               Dashboard memvisualisasikan perubahan KPI dari bulan ke bulan untuk memantau peningkatan atau penurunan masalah secara real-time.
            </p>
         </div>
      </div>
    </div>
  </motion.div>
);
