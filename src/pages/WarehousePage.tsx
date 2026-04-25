import React from 'react';
import { motion } from 'motion/react';
import { Database, Search, Layers, TrendingUp, MapPin, Box } from 'lucide-react';
import { cn } from '../lib/utils';
import { ANALYTICAL_QUESTIONS } from '../data/reportData';
import { StarSchemaVisual } from '../components/StarSchemaVisual';

export const WarehousePage = () => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
    <div className="mb-12 md:mb-16 text-center">
      <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Langkah 01 - 02</div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Model & Kebutuhan Data.</h2>
    </div>

    <div className="grid lg:grid-cols-3 gap-12 mb-16">
      <div className="lg:col-span-2 space-y-12">
        <div className="bg-white overflow-hidden rounded-[32px] md:rounded-[48px] border border-slate-200 shadow-soft">
          <div className="p-6 md:p-10 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-black tracking-tight flex items-center gap-3">
                 <Database className="text-brand-500 h-6 w-6 md:h-8 md:w-8" /> 1. Identifikasi Fact Table
              </h3>
              <p className="text-[10px] text-brand-500 font-black uppercase tracking-[0.2em] mt-2 italic">Fact_Lingkungan (Indramayu City Context)</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl opacity-50" />
          </div>
          <div className="p-8 overflow-x-auto">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 italic">Field Name</th>
                  <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 italic">Definition & Metadata</th>
                </tr>
              </thead>
              <tbody className="text-[11px] font-bold">
                {[
                  { k: "id_fact", d: "Primary Key - Identitas Unik Laporan (Serial)" },
                  { k: "id_waktu", d: "Foreign Key - Relasi ke Dim_Waktu" },
                  { k: "id_lokasi", d: "Foreign Key - Relasi ke Dim_Lokasi" },
                  { k: "id_kategori", d: "Foreign Key - Relasi ke Dim_Kategori" },
                  { k: "jumlah_pengaduan", d: "Measure - Total Laporan Masyarakat (Numeric)" },
                  { k: "volume_sampah", d: "Measure - Kapasitas Sampah (Ton/Hari)" },
                  { k: "kejadian_banjir", d: "Measure - Intensitas Banjir Tercatat" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors group">
                    <td className="py-5 font-black text-slate-900 px-6 group-hover:text-brand-600">{row.k}</td>
                    <td className="py-5 text-slate-500 px-6 font-medium italic opacity-70">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-brand-50 p-10 rounded-[56px] border border-brand-100 relative overflow-hidden shadow-inner">
           <div className="relative z-10">
              <h4 className="text-xl font-black text-brand-900 mb-6 flex items-center gap-3 underline decoration-brand-200">
                 <Search className="h-6 w-6 text-brand-600" /> 2. Analytical Questions
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                 {ANALYTICAL_QUESTIONS.map((q, i) => (
                   <div key={i} className="p-5 bg-white rounded-3xl border border-brand-200 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                      <span className="text-brand-600 font-black text-xs">0{i+1}.</span>
                      <p className="text-[11px] font-bold text-slate-700 leading-normal">{q}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft h-full">
           <div className="flex items-center gap-3 mb-10 text-slate-400">
              <Layers className="h-6 w-6" />
              <h3 className="text-lg font-black tracking-tight text-slate-900">Dimension Hierarchy</h3>
           </div>
           <div className="space-y-10">
              {[
                { n: "Time / Waktu", v: "Bulan > Triwulan > Tahun", c: "bg-brand-50 text-brand-600", i: TrendingUp },
                { n: "Area / Lokasi", v: "Kecamatan > Kabupaten", c: "bg-emerald-50 text-emerald-600", i: MapPin },
                { n: "Category / Kategori", v: "Sampah | Banjir", c: "bg-slate-100 text-slate-500", i: Box },
              ].map((dim, i) => (
                <div key={i} className="flex gap-5 group">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110", dim.c)}>
                      <dim.i className="h-5 w-5" />
                   </div>
                   <div>
                      <p className="font-extrabold text-slate-900 mb-1 text-sm">{dim.n}</p>
                      <div className="inline-block px-3 py-1 bg-slate-50 rounded-full border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">{dim.v}</div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-slate-900 rounded-[32px] text-white overflow-hidden relative">
              <p className="text-[11px] font-bold leading-relaxed text-slate-300 relative z-10">
                 "DW ini menggunakan <span className="text-brand-500">Star Schema</span> untuk mendukung performa OLAP."
              </p>
              <Database className="absolute -bottom-4 -left-4 h-16 w-16 text-white/5 opacity-20 rotate-12" />
           </div>
        </div>
      </div>
    </div>

    <StarSchemaVisual />
  </motion.div>
);
