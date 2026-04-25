import React from 'react';
import { motion } from 'motion/react';
import { 
  Users2, ShieldCheck, ArrowRight, Trophy, Trash2, Droplets, 
  Database, TrendingUp, LayoutDashboard, ChevronRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, 
  PieChart, Pie, Cell 
} from 'recharts';
import { cn } from '../lib/utils';
import { DIST_DATA, CATEGORY_DATA } from '../data/reportData';

export const HomePage = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-20"
  >
    {/* --- Hero Section --- */}
    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 border border-brand-100 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-brand-600 rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-600">Smart City Laporan Individu 2</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-[900] text-slate-900 leading-[1.05] tracking-tight mb-8">
          Sistem Informasi <br />
          <span className="text-gradient">Kota Cerdas.</span>
        </h1>
        
        <p className="text-slate-500 text-lg sm:text-xl font-medium leading-relaxed mb-10 max-w-xl">
          Transformasi data lingkungan (Sampah & Banjir) menjadi keputusan strategis melalui arsitektur <b>Data Warehouse</b> and <b>Business Intelligence</b> di Kabupaten Indramayu.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-200/60 shadow-soft backdrop-blur-sm group hover:border-brand-300 transition-all">
            <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
               <Users2 className="text-brand-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Analis Data</p>
              <p className="text-slate-900 font-extrabold text-base">M. Rifqy Saputra</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-200/60 shadow-soft backdrop-blur-sm group hover:border-brand-300 transition-all">
            <div className="w-12 h-12 bg-accent-50 group-hover:bg-accent-100 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
               <ShieldCheck className="text-accent-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Institusi</p>
              <p className="text-slate-900 font-extrabold text-base">Polindra SIKC</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onNavigate('warehouse')}
            className="bg-brand-600 text-white px-10 py-5 rounded-full font-black shadow-primary-cta hover:bg-brand-700 hover:scale-105 transition-all cursor-pointer flex items-center gap-3 group"
          >
            Lihat Workplan Data <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 rounded-full font-bold text-slate-700 border border-slate-200 hover:bg-white/50 transition-all cursor-pointer">
            Framework SIKC
          </button>
        </div>
      </div>
      
      <div className="relative perspective-2000 hidden lg:block">
        <motion.div 
          initial={{ rotateY: -15, rotateX: 5, y: 20, opacity: 0 }}
          animate={{ rotateY: -18, rotateX: 8, y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-white rounded-[48px] p-12 shadow-isometric-card border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
            <div className="w-16 h-16 bg-brand-50 rounded-[24px] flex items-center justify-center group-hover:rotate-12 transition-transform">
               <Trophy className="text-brand-600 h-8 w-8" />
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="font-black text-slate-900 text-2xl tracking-tighter">Ringkasan Temuan</h3>
              <p className="text-xs font-bold text-brand-600 mt-2 uppercase tracking-[0.2em]">Step 07: Data Insight Highlights</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">650</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Keluhan</p>
               </div>
               <div className="p-6 bg-brand-50 rounded-[32px] border border-brand-100">
                  <p className="text-3xl font-black text-brand-700 tracking-tighter">202T</p>
                  <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mt-1">Estimasi Sampah</p>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
                <span>Data Consistency</span>
                <span>94.2%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '94.2%' }} 
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-full bg-brand-500" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* --- Project Focus Section --- */}
    <div className="grid md:grid-cols-2 gap-8 mb-32">
      <div className="bg-white/40 backdrop-blur-xl border border-slate-200 rounded-[40px] p-10 group hover:border-brand-400 transition-all">
        <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center mb-8 shadow-primary-cta">
          <Trash2 className="text-white h-7 w-7" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-4">Manajemen Sampah</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Analisis volume harian and kapasitas TPA di Indramayu untuk optimalisasi rute pengangkutan and pengurangan titik pembuangan liar.
        </p>
      </div>
      <div className="bg-white/40 backdrop-blur-xl border border-slate-200 rounded-[40px] p-10 group hover:border-accent-400 transition-all">
        <div className="w-14 h-14 bg-accent-600 rounded-2xl flex items-center justify-center mb-8 shadow-primary-cta">
          <Droplets className="text-white h-7 w-7" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-4">Mitigasi Banjir</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Pemantauan intensitas genangan and drainase perkotaan untuk deteksi dini risiko banjir di wilayah rawan bencana Kabupaten Indramayu.
        </p>
      </div>
    </div>

    {/* --- Visualisasi Data Strategis --- */}
    <div className="mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="max-w-xl">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-600 font-black uppercase tracking-[0.3em] text-sm mb-4"
          >
            Data Intelligence Overview
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">Representasi Visual <br />Kondisi Wilayah.</h2>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-3 h-3 bg-brand-500 rounded-full" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sampah</span>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-3 h-3 bg-accent-500 rounded-full" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Banjir</span>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Kepadatan Masalah (DIST_DATA)</h3>
            <Database className="text-slate-200 h-6 w-6" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DIST_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 800, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '20px' }} 
                />
                <Bar dataKey="complaints" name="Total Pengaduan" fill="#10B981" radius={[8, 8, 0, 0]} barSize={40} />
                <Bar dataKey="volume" name="Volume Sampah (T)" fill="#E2E8F0" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Proporsi Kategori</h3>
            <TrendingUp className="text-slate-200 h-6 w-6" />
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4 relative z-10">
            {CATEGORY_DATA.map((cat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-slate-900">{cat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* --- Comprehensive 9-Step Roadmap --- */}
    <div className="bg-slate-900 rounded-[48px] md:rounded-[64px] p-8 md:p-12 lg:p-24 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <LayoutDashboard className="w-96 h-96" />
      </div>
      
      <div className="relative z-10">
        <div className="max-w-3xl mb-12 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-500 font-black uppercase tracking-[0.3em] text-xs sm:text-sm mb-4"
          >
            BI Development Lifecycle
          </motion.p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-none">Alur Kerja Laporan Individu 2</h2>
          <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-xl">
            Metodologi komprehensif dari identifikasi fundamental hingga implementasi Sistem Pendukung Keputusan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'Step 1-2', t: 'Data Modeling', d: 'Identifikasi Tabel Fakta & Dimensi serta perumusan Pertanyaan Analitik.', p: 'warehouse' },
            { id: 'Step 3', t: 'Stakeholders', d: 'Pemetaan User & Institusi yang membutuhkan Dashboard Intelijen ini.', p: 'kpi' },
            { id: 'Step 4', t: 'KPI Setup', d: 'Penentuan Key Performance Indicators untuk Sampah & Banjir.', p: 'kpi' },
            { id: 'Step 5', t: 'Attributes', d: 'Penyusunan Metrik & Atribut data untuk kedalaman analisis.', p: 'warehouse' },
            { id: 'Step 6-7', t: 'OLAP Cube', d: 'Operasi Slice, Dice, and Drill-down untuk menemukan Insight kritis.', p: 'cube' },
            { id: 'Step 8-9', t: 'Decision Support', d: 'Evaluasi Alternatif & Keputusan Akhir berbasis Data BI.', p: 'decision' },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate(step.p)}
              className="bg-white/5 border border-white/10 p-8 rounded-[40px] cursor-pointer hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest bg-brand-500/10 px-3 py-1 rounded-full group-hover:bg-brand-500 group-hover:text-white transition-colors">{step.id}</span>
                <ChevronRight className="text-slate-600 group-hover:text-brand-500 transition-colors" />
              </div>
              <h4 className="text-2xl font-black mb-3 tracking-tight">{step.t}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{step.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);
