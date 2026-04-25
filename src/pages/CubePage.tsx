import React from 'react';
import { motion } from 'motion/react';
import { Box, Layers, Table, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { IsometricCubeVisual } from '../components/IsometricCubeVisual';
import { OLAP_OPERATIONS, SAMPLE_CUBE_DATA } from '../data/reportData';

export const CubePage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
    <div className="mb-12 md:mb-16">
       <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Langkah 06 - 08</div>
       <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Skema & Data Cube</h2>
       <p className="text-slate-400 font-medium max-w-2xl mt-4 md:mt-6 text-sm sm:text-base">Membangun arsitektur data multidimensi untuk memungkinkan analisis cepat (OLAP).</p>
    </div>

    <div className="flex items-center gap-2 mb-12">
      <div className="w-1.5 h-6 bg-brand-600 rounded-full" />
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Step 06-08: The OLAP Data Cube</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-10 mb-16">
      <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft">
         <div className="flex items-center gap-3 mb-10">
            <Box className="text-brand-600 h-7 w-7" />
            <h3 className="text-xl font-black text-slate-900 tracking-tight">7. Simulasi Data Cube</h3>
         </div>
         <p className="text-[11px] text-slate-500 font-medium mb-8 leading-relaxed">
            Data Cube memungkinkan agregasi metrik (Total Laporan) melintasi dimensi (Waktu, Kategori, Lokasi) dalam query berkecepatan tinggi.
         </p>
         <div className="overflow-x-auto">
            <table className="w-full text-left font-mono">
               <thead>
                  <tr className="border-b-2 border-slate-900">
                     <th className="pb-4 font-black text-slate-900 text-[9px] uppercase tracking-widest px-4">Bulan</th>
                     <th className="pb-4 font-black text-slate-900 text-[9px] uppercase tracking-widest px-4">Kategori</th>
                     <th className="pb-4 font-black text-slate-900 text-[9px] uppercase tracking-widest px-4">Kecamatan</th>
                     <th className="pb-4 font-black text-brand-600 text-[9px] uppercase tracking-widest px-4 text-right">Measure (Total)</th>
                  </tr>
               </thead>
               <tbody className="text-[10px] font-bold">
                  {SAMPLE_CUBE_DATA.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors group">
                       <td className="py-4 text-slate-500 px-4 group-hover:text-slate-900">{row.b}</td>
                       <td className="py-4 text-slate-500 px-4 group-hover:text-slate-900">{row.k}</td>
                       <td className="py-4 text-slate-500 px-4 group-hover:text-slate-900">{row.l}</td>
                       <td className="py-4 text-brand-600 px-4 text-right">{row.v}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="bg-slate-900 p-10 rounded-[48px] text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
         <div className="relative z-10">
           <h3 className="text-xl font-black tracking-tight mb-8">Data Cube Architecture</h3>
           <IsometricCubeVisual />
           <div className="mt-8 flex justify-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-500"/> X: Waktu</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"/> Y: Lokasi</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-500"/> Z: Kategori</span>
           </div>
         </div>
      </div>
    </div>

    <div className="bg-white p-10 md:p-12 rounded-[56px] border border-slate-200 shadow-soft">
      <div className="flex items-center gap-3 mb-12">
         <Filter className="text-brand-600 h-7 w-7" />
         <h3 className="text-xl font-black text-slate-900 tracking-tight">8. Operasi OLAP</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {OLAP_OPERATIONS.map((op, i) => {
            const Icon = [Layers, Table, Filter, Box][i];
            return (
           <div key={i} className={cn("p-6 rounded-3xl border transition-all hover:shadow-md", op.bg)}>
              <Icon className={cn("h-6 w-6 mb-4", op.c)} />
              <h4 className="font-black text-slate-900 text-sm mb-2">{op.n}</h4>
              <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{op.d}</p>
           </div>
         )})}
      </div>
    </div>
  </motion.div>
);
