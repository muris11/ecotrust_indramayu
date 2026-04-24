/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
  Box,
  Lightbulb,
  CheckCircle2,
  ArrowLeft,
  ClipboardList,
  Monitor,
  Scissors,
  Layers,
  ListFilter,
  ChevronRight,
  Database,
  Search,
  Users2,
  Trophy,
  Droplets,
  Trash2,
  LayoutDashboard,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Users,
  MessageCircle,
  Send,
  Trash2 as TrashIcon,
  Bot
} from 'lucide-react';
import { cn } from './lib/utils';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- DATA FROM THE REPORT ---

const DIST_DATA = [
  { name: 'Indramayu', complaints: 210, volume: 62, floods: 11 },
  { name: 'Jatibarang', complaints: 260, volume: 85, floods: 17 },
  { name: 'Karangampel', complaints: 180, volume: 55, floods: 11 },
];

const MONTHLY_TRENDS = [
  { month: 'Januari', complaints: 270, volume: 77, floods: 15 },
  { month: 'Februari', complaints: 270, volume: 85, floods: 16 },
  { month: 'Maret', complaints: 110, volume: 40, floods: 8 },
];

const CATEGORY_DATA = [
  { name: 'Sampah', value: 450, color: '#10B981' },
  { name: 'Banjir', value: 200, color: '#059669' },
];

const ANALYTICAL_QUESTIONS = [
  "Kecamatan mana yang memiliki jumlah pengaduan masyarakat tertinggi?",
  "Kecamatan mana yang memiliki volume sampah paling tinggi?",
  "Kategori masalah apa yang paling dominan berdasarkan jumlah pengaduan?",
  "Apakah wilayah dengan volume sampah tinggi memiliki kejadian banjir lebih banyak?",
  "Pada bulan apa jumlah pengaduan lingkungan paling tinggi?",
  "Kecamatan mana yang harus menjadi prioritas penanganan lingkungan?",
  "Bagaimana perbandingan masalah sampah dan banjir berdasarkan data yang tersedia?"
];

const STAKEHOLDERS = [
  { name: "Dinas Lingkungan Hidup", needs: "Data volume sampah, jumlah pengaduan, wilayah bermasalah.", goal: "Menentukan prioritas pengangkutan sampah." },
  { name: "BPBD", needs: "Data kejadian banjir berdasarkan kecamatan dan waktu.", goal: "Menentukan wilayah rawan banjir dan rencana mitigasi." },
  { name: "Bappeda", needs: "Ringkasan KPI lingkungan, tren masalah.", goal: "Mendukung perencanaan kebijakan Smart City." },
  { name: "Masyarakat", needs: "Informasi pengaduan, tindak lanjut pemerintah.", goal: "Meningkatkan transparansi pelayanan publik." }
];

const KPI_LIST = [
  { name: "Total Pengaduan", def: "Jumlah seluruh pengaduan terkait sampah dan banjir.", target: "Menurun setiap bulan" },
  { name: "Total Volume Sampah", def: "Jumlah volume sampah yang tercatat per wilayah.", target: "Terkendali dan tidak meningkat tajam" },
  { name: "Total Kejadian Banjir", def: "Jumlah kejadian banjir pada setiap kecamatan.", target: "Menurun" },
  { name: "Kecamatan Prioritas", def: "Kecamatan dengan kombinasi pengaduan, sampah, dan banjir tertinggi.", target: "Menjadi prioritas penanganan" }
];

// --- HELPERS ---

const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
    <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '12s' }} />
    <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px]" />
  </div>
);

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'warehouse', label: 'DW Model', icon: Database },
    { id: 'kpi', label: 'KPI & Stakeholder', icon: Trophy },
    { id: 'cube', label: 'Cube & Analytics', icon: Box },
    { id: 'decision', label: 'Outcome & DSS', icon: CheckCircle2 },
  ];

  return (
    <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-linear-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-primary-cta transition-transform group-hover:rotate-6">
              <ShieldCheck className="text-white h-7 w-7" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">EcoTrust <span className="text-brand-600">SIKC</span></span>
              <span className="text-[10px] font-bold text-slate-500 tracking-[0.25em] mt-1.5 uppercase">Indramayu Intelligence</span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "text-xs font-bold transition-all px-4 py-2.5 rounded-full cursor-pointer flex items-center gap-2",
                  activePage === item.id 
                    ? "bg-brand-50 text-brand-600 shadow-sm border border-brand-100" 
                    : "text-slate-500 hover:text-brand-500 hover:bg-slate-50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
             <button className="hidden sm:block text-[11px] font-extrabold text-brand-700 bg-brand-50 px-5 py-2.5 rounded-full border border-brand-100 hover:bg-brand-100 transition-colors">
                Laporan Individu 2
             </button>
             <button className="lg:hidden p-2.5 text-slate-700 bg-slate-100 rounded-xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setIsOpen(false); }}
                  className={cn(
                    "w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm",
                    activePage === item.id ? "bg-brand-50 text-brand-600" : "text-slate-600"
                  )}
                >
                  <item.icon className="h-5 w-5" /> {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- 3D VISUAL COMPONENTS ---

const IsometricCubeVisual = () => (
  <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
    {/* Cube with Axes */}
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Axis Labels */}
          <g className="font-black text-[14px] fill-slate-900">
            <text x="200" y="70" textAnchor="middle">Time</text>
            <text x="50" y="320" textAnchor="middle" transform="rotate(-30 50 320)">Location</text>
            <text x="350" y="320" textAnchor="middle" transform="rotate(30 350 320)">Category</text>
          </g>

          {/* Vertical Time Axis Arrow */}
          <path d="M40 230 L40 150" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M40 230 L40 250" stroke="#10B981" strokeWidth="2" />
          
          {/* Horizontal Arrows */}
          <path d="M160 360 L100 330" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M240 360 L300 330" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* The Isometric Cube (3x3 Grid Style) */}
          <g transform="translate(200, 240)">
            {/* Top Face */}
            <path d="M-100 -60 L0 -120 L100 -60 L0 0 Z" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
            <path d="M-66 -80 L33 -140 M-33 -100 L66 -160" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" transform="translate(0, 40)" />
            <path d="M-66 -40 L34 20 M-34 -100 L66 -40" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Left Face */}
            <path d="M-100 -60 L-100 60 L0 120 L0 0 Z" fill="#10B981" stroke="#064E3B" strokeWidth="2" />
            <path d="M-66 -40 L-66 80 M-33 -20 L-33 100" stroke="#064E3B" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M-100 -20 L0 40 M-100 20 L0 80" stroke="#064E3B" strokeWidth="1" strokeOpacity="0.3" />

            {/* Right Face */}
            <path d="M100 -60 L100 60 L0 120 L0 0 Z" fill="#059669" stroke="#064E3B" strokeWidth="2" />
            <path d="M66 -40 L66 80 M33 -20 L33 100" stroke="#059669" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M100 -20 L0 40 M100 20 L0 80" stroke="#064E3B" strokeWidth="1" strokeOpacity="0.3" />
          </g>

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
            </marker>
          </defs>
        </motion.g>
      </svg>
    </div>

    {/* Info Side */}
    <div className="flex-1 w-full space-y-6">
       <div className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-lg border border-slate-700">
          <table className="w-full text-[11px] leading-tight">
             <thead>
                <tr className="bg-brand-700">
                   <th className="p-3 text-center border-r border-brand-800">Dimensi</th>
                   <th className="p-3 text-center">Isi</th>
                </tr>
             </thead>
             <tbody>
                <tr className="border-b border-slate-800">
                   <td className="p-3 border-r border-slate-800 font-bold bg-white/5">Time</td>
                   <td className="p-3 text-slate-400">Bulan, Triwulan, Tahun</td>
                </tr>
                <tr className="border-b border-slate-800">
                   <td className="p-3 border-r border-slate-800 font-bold bg-white/5">Location</td>
                   <td className="p-3 text-slate-400">Kecamatan</td>
                </tr>
                <tr className="border-b border-slate-800">
                   <td className="p-3 border-r border-slate-800 font-bold bg-white/5">Category</td>
                   <td className="p-3 text-slate-400">Sampah, Banjir</td>
                </tr>
             </tbody>
          </table>
       </div>

       <div className="space-y-3">
          <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-widest">Measure:</h5>
          <div className="grid gap-2">
             {[
                { t: 'Jumlah Pengaduan', i: ClipboardList, c: 'text-brand-600 bg-brand-50' },
                { t: 'Volume Sampah', i: Trash2, c: 'text-emerald-600 bg-emerald-50' },
                { t: 'Kejadian Banjir', i: Droplets, c: 'text-accent-600 bg-accent-50' }
             ].map((m, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                   <div className={cn("p-2 rounded-lg", m.c)}>
                      <m.i className="h-4 w-4" />
                   </div>
                   <span className="text-xs font-extrabold text-slate-900">{m.t}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

// --- PAGES ---

const HomePage = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20"
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
        
        <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 leading-[1.05] tracking-tight mb-8">
          Sistem Informasi <br />
          <span className="text-gradient">Kota Cerdas.</span>
        </h1>
        
        <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10 max-w-xl">
          Transformasi data lingkungan (Sampah & Banjir) menjadi keputusan strategis melalui arsitektur <b>Data Warehouse</b> dan <b>Business Intelligence</b> di Kabupaten Indramayu.
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
          Analisis volume harian dan kapasitas TPA di Indramayu untuk optimalisasi rute pengangkutan dan pengurangan titik pembuangan liar.
        </p>
      </div>
      <div className="bg-white/40 backdrop-blur-xl border border-slate-200 rounded-[40px] p-10 group hover:border-accent-400 transition-all">
        <div className="w-14 h-14 bg-accent-600 rounded-2xl flex items-center justify-center mb-8 shadow-primary-cta">
          <Droplets className="text-white h-7 w-7" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-4">Mitigasi Banjir</h3>
        <p className="text-slate-600 font-medium leading-relaxed">
          Pemantauan intensitas genangan dan drainase perkotaan untuk deteksi dini risiko banjir di wilayah rawan bencana Kabupaten Indramayu.
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
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Representasi Visual <br />Kondisi Wilayah.</h2>
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
    <div className="bg-slate-900 rounded-[64px] p-12 lg:p-24 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <LayoutDashboard className="w-96 h-96" />
      </div>
      
      <div className="relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-500 font-black uppercase tracking-[0.3em] text-sm mb-4"
          >
            BI Development Lifecycle
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none">Alur Kerja Laporan Individu 2</h2>
          <p className="text-slate-400 text-xl font-medium max-w-xl">
            Metodologi komprehensif dari identifikasi fundamental hingga implementasi Sistem Pendukung Keputusan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'Step 1-2', t: 'Data Modeling', d: 'Identifikasi Tabel Fakta & Dimensi serta perumusan Pertanyaan Analitik.', p: 'warehouse' },
            { id: 'Step 3', t: 'Stakeholders', d: 'Pemetaan User & Institusi yang membutuhkan Dashboard Intelijen ini.', p: 'kpi' },
            { id: 'Step 4', t: 'KPI Setup', d: 'Penentuan Key Performance Indicators untuk Sampah & Banjir.', p: 'kpi' },
            { id: 'Step 5', t: 'Attributes', d: 'Penyusunan Metrik & Atribut data untuk kedalaman analisis.', p: 'warehouse' },
            { id: 'Step 6-7', t: 'OLAP Cube', d: 'Operasi Slice, Dice, dan Drill-down untuk menemukan Insight kritis.', p: 'cube' },
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

const StarSchemaVisual = () => (
  <div className="bg-slate-900 p-12 rounded-[56px] border border-white/5 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <Layers className="h-40 w-40 text-brand-500" />
    </div>
    
    <div className="text-center mb-16 relative z-10">
      <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Visualisasi Star Schema</h3>
      <p className="text-brand-500 font-black uppercase text-[10px] tracking-[0.3em]">Data Warehouse Structure</p>
    </div>

    <div className="relative flex flex-col items-center gap-16 scale-90 sm:scale-100 origin-center">
      {/* Fact Table */}
      <div className="z-20 bg-brand-600 p-8 rounded-[32px] border-4 border-white/20 shadow-primary-cta text-white text-center w-64 ring-8 ring-brand-600/20">
        <p className="font-black text-xs uppercase tracking-widest opacity-60 mb-2">Fact Table</p>
        <p className="font-black text-xl mb-4 leading-none">Fact_Lingkungan</p>
        <div className="flex flex-col gap-1 text-[11px] font-bold text-brand-100">
           <span>id_waktu (FK)</span>
           <span>id_lokasi (FK)</span>
           <span>id_kategori (FK)</span>
           <div className="h-px bg-white/20 my-2" />
           <span className="text-white">jumlah_pengaduan</span>
           <span className="text-white">volume_sampah</span>
        </div>
      </div>

      {/* Dim Tables Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {[
          { t: 'Dim_Waktu', f: ['id_waktu (PK)', 'Bulan', 'Tahun'] },
          { t: 'Dim_Lokasi', f: ['id_lokasi (PK)', 'Kecamatan'] },
          { t: 'Dim_Kategori', f: ['id_kategori (PK)', 'Kategori'] },
        ].map((dim, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[24px] text-center backdrop-blur-sm">
            <p className="font-black text-brand-400 text-xs uppercase mb-3">{dim.t}</p>
            <div className="flex flex-col gap-1 text-[11px] text-slate-400 font-bold">
              {dim.f.map((field, idx) => (
                <span key={idx}>{field}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center pt-32 h-[300px]">
          <svg className="w-full h-full opacity-20" viewBox="0 0 600 200">
            <path d="M300 0 L100 150 M300 0 L300 150 M300 0 L500 150" stroke="white" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>
      </div>
    </div>
  </div>
);

const WarehousePage = () => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
    <div className="mb-16">
      <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Langkah 01 - 02</div>
      <h2 className="text-4xl md:text-5xl font-[800] text-slate-900 tracking-tighter uppercase leading-none">Model & Kebutuhan Data.</h2>
    </div>

    <div className="grid lg:grid-cols-3 gap-12 mb-16">
      <div className="lg:col-span-2 space-y-12">
        <div className="bg-white overflow-hidden rounded-[48px] border border-slate-200 shadow-soft">
          <div className="p-10 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                 <Database className="text-brand-500 h-8 w-8" /> 1. Identifikasi Fact Table
              </h3>
              <p className="text-xs text-brand-500 font-black uppercase tracking-[0.2em] mt-2 italic">Fact_Lingkungan (Indramayu City Context)</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl opacity-50" />
          </div>
          <tbody className="text-xs font-bold">
            <div className="p-8 overflow-x-auto">
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 italic">Field Name</th>
                    <th className="pb-6 font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 italic">Definition & Metadata</th>
                  </tr>
                </thead>
                <tbody className="text-[11px]">
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
          </tbody>
        </div>

        <div className="bg-brand-50 p-10 rounded-[56px] border border-brand-100 relative overflow-hidden shadow-inner">
           <div className="relative z-10">
              <h4 className="text-2xl font-black text-brand-900 mb-6 flex items-center gap-3 underline decoration-brand-200">
                 <Search className="h-6 w-6 text-brand-600" /> 2. Analytical Questions
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                 {ANALYTICAL_QUESTIONS.map((q, i) => (
                   <div key={i} className="p-5 bg-white rounded-3xl border border-brand-200 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                      <span className="text-brand-600 font-black text-xs">0{i+1}.</span>
                      <p className="text-xs font-bold text-slate-700 leading-normal">{q}</p>
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
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110", dim.c)}>
                      <dim.i className="h-6 w-6" />
                   </div>
                   <div>
                      <p className="font-extrabold text-slate-900 mb-1">{dim.n}</p>
                      <div className="inline-block px-3 py-1 bg-slate-50 rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">{dim.v}</div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-slate-900 rounded-[32px] text-white overflow-hidden relative">
              <p className="text-xs font-bold leading-relaxed text-slate-300 relative z-10">
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

const KPIPage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
    <div className="mb-16">
      <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4">Langkah 03 - 05</div>
      <h2 className="text-4xl md:text-5xl font-[800] text-slate-900 tracking-tighter">Strategi & Indikator.</h2>
    </div>

    <div className="flex items-center gap-2 mb-12">
      <div className="w-1.5 h-6 bg-brand-600 rounded-full" />
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Step 03-05: KPI & Data Metadata</h2>
    </div>

    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft">
           <div className="flex items-center gap-3 mb-10">
              <Users2 className="text-brand-600 h-7 w-7" />
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">3. Identifikasi Stakeholder</h3>
           </div>
           <div className="grid md:grid-cols-2 gap-8">
              {STAKEHOLDERS.map((s, i) => (
                <div key={i} className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/40 hover:bg-white hover:shadow-hover hover:border-brand-100 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                         <Users className="h-6 w-6" />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase py-1.5 px-3 border border-slate-200 rounded-full">Level: Priority</span>
                   </div>
                   <h4 className="font-extrabold text-slate-900 text-lg mb-4 tracking-tight group-hover:text-brand-700">{s.name}</h4>
                   <div className="space-y-5">
                      <div>
                         <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1.5">Butuh Informasi</p>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">{s.needs}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100">
                         <p className="text-[10px] font-black text-accent-600 uppercase tracking-widest mb-1.5">Tujuan Strategis</p>
                         <p className="text-sm font-bold text-slate-900 leading-relaxed">{s.goal}</p>
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
                <Trophy className="text-brand-400 h-7 w-7" />
                <h3 className="text-2xl font-black tracking-tight">Penentuan KPI (Langkah 4)</h3>
             </div>
             <div className="grid md:grid-cols-2 gap-10">
                {KPI_LIST.map((k, i) => (
                  <div key={i} className="space-y-3 p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm">
                     <h5 className="font-black text-brand-500 text-lg tracking-tight uppercase text-sm">KPI: {k.name}</h5>
                     <p className="text-slate-400 text-xs leading-relaxed">{k.def}</p>
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                        <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Target: {k.target}</span>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-8">
         <div className="bg-brand-600 rounded-[40px] p-8 text-white">
            <h4 className="font-black text-xl mb-6 tracking-tight">5. Mapping to Warehouse</h4>
            <div className="space-y-6">
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black text-brand-200 uppercase tracking-widest mb-1">Measure Name</p>
                  <p className="text-sm font-bold">jumlah_pengaduan</p>
               </div>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black text-brand-200 uppercase tracking-widest mb-1">Measure Name</p>
                  <p className="text-sm font-bold">volume_sampah</p>
               </div>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black text-brand-200 uppercase tracking-widest mb-1">Measure Name</p>
                  <p className="text-sm font-bold">kejadian_banjir</p>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-xs text-brand-100/60 leading-relaxed">
               Semua KPI di atas dipetakan langsung ke Field Numerik di Tabel Fakta untuk memfasilitasi agregasi OLAP.
            </div>
         </div>
         
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-soft">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
               <TrendingUp className="text-slate-400 h-6 w-6" />
            </div>
            <h4 className="font-black text-slate-900 mb-4 tracking-tight">Tren KPI</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
               Dashboard memvisualisasikan perubahan KPI dari bulan ke bulan untuk memantau peningkatan atau penurunan masalah secara real-time.
            </p>
         </div>
      </div>
    </div>
  </motion.div>
);

const CubePage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
    {/* --- Header --- */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 bg-white p-10 rounded-[48px] border border-slate-200 shadow-soft relative overflow-hidden">
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-brand-600 rounded-3xl flex items-center justify-center text-white shadow-primary-cta">
             <Box className="h-12 w-12" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">Langkah 6 - Analisis Cube</h2>
        </div>
        <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-4xl">
          OLAP mendukung operasi seperti <span className="text-brand-600 font-bold italic">slice, dice, drill-down,</span> dan <span className="text-brand-600 font-bold italic">roll-up</span> untuk menganalisis 
          data dari berbagai sudut pandang. Slice memilih satu nilai dimensi tertentu, sedangkan 
          dice memilih beberapa nilai dari beberapa dimensi untuk membentuk sub-cube.
        </p>
      </div>
      <div className="hidden lg:block w-32 h-32 opacity-10 absolute -right-4 -top-4 rotate-12">
         <Monitor className="w-full h-full text-brand-600" />
      </div>
    </div>

    {/* --- 4 Quadrant Grid --- */}
    <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-8">
      
      {/* 1. Bentuk Cube */}
      <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-soft h-full flex flex-col border-t-8 border-t-brand-600 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
           <Layers className="h-24 w-24 text-brand-600" />
        </div>
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">1</div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">1. Bentuk Cube</h3>
        </div>
        <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
           <span className="text-slate-500 font-bold text-sm">Cube Structure:</span>
           <span className="text-brand-700 font-black text-lg tracking-tight uppercase">Time × Loc × Cat</span>
        </div>
        <div className="flex-1">
           <IsometricCubeVisual />
        </div>
      </div>

      {/* 2. Contoh Slice */}
      <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-soft h-full flex flex-col border-t-8 border-t-brand-600 group">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">2</div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">2. Contoh Slice</h3>
        </div>
        <p className="text-slate-500 font-bold mb-8 text-sm flex items-center gap-2">
           <Scissors className="h-4 w-4 text-brand-600" />
           Slice berdasarkan Category = <span className="text-brand-700 font-black px-2 py-0.5 bg-brand-50 rounded-md">Sampah</span>
        </p>

        <div className="bg-slate-900 rounded-[32px] overflow-hidden mb-10 shadow-2xl border border-white/5">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-brand-700 text-white text-[10px] uppercase font-black tracking-widest">
                    <th className="p-4 border-r border-brand-800">Tahun/Bulan</th>
                    <th className="p-4 border-r border-brand-800">Kecamatan</th>
                    <th className="p-4 border-r border-brand-800">Kategori</th>
                    <th className="p-4 text-center">Pengaduan</th>
                 </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-300">
                 <tr className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                    <td className="p-4">2024 / Jan</td>
                    <td className="p-4">Indramayu</td>
                    <td className="p-4 font-black text-brand-400">Sampah</td>
                    <td className="p-4 text-center text-white text-base">120</td>
                 </tr>
                 <tr className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                    <td className="p-4">2024 / Jan</td>
                    <td className="p-4">Jatibarang</td>
                    <td className="p-4 font-black text-brand-400">Sampah</td>
                    <td className="p-4 text-center text-white text-base">150</td>
                 </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4">2024 / Feb</td>
                    <td className="p-4">Karangampel</td>
                    <td className="p-4 font-black text-brand-400">Sampah</td>
                    <td className="p-4 text-center text-white text-base">180</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div className="mt-auto bg-brand-50 p-6 rounded-[32px] border border-brand-100 flex gap-5 items-start">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-soft shrink-0">
              <Lightbulb className="text-brand-600 h-6 w-6" />
           </div>
           <div>
              <p className="font-black text-brand-700 uppercase tracking-widest text-[11px] mb-2">Makna Analisis:</p>
              <p className="text-sm text-slate-700 leading-relaxed font-semibold">Analisis hanya melihat satu nilai dimensi tertentu, sedangkan <strong>slice</strong> membantu pemerintah mengetahui wilayah mana yang memiliki isu sampah paling tinggi.</p>
           </div>
        </div>
      </div>

      {/* 3. Contoh Dice */}
      <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-soft h-full flex flex-col border-t-8 border-t-brand-600 group">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">3</div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">3. Contoh Dice</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
           {['Time = Q1 2024', 'Location = Indramayu/Jatibarang', 'Category = Sampah/Banjir'].map((f, i) => (
             <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-tighter">Sub-Cube: {f}</span>
           ))}
        </div>

        <div className="bg-slate-900 rounded-[32px] overflow-hidden mb-10 shadow-2xl border border-white/5">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-brand-700 text-white text-[10px] uppercase font-black tracking-widest">
                    <th className="p-4 border-r border-brand-800">Bulan</th>
                    <th className="p-4 border-r border-brand-800">Kecamatan</th>
                    <th className="p-4 border-r border-brand-800">Kategori</th>
                    <th className="p-4 text-center">Data</th>
                 </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-300">
                 <tr className="border-b border-slate-800">
                    <td className="p-4 text-slate-400">Jan</td>
                    <td className="p-4">Indramayu</td>
                    <td className="p-4">Sampah</td>
                    <td className="p-4 text-center text-white">120</td>
                 </tr>
                 <tr className="border-b border-slate-800">
                    <td className="p-4 text-slate-400">Jan</td>
                    <td className="p-4">Jatibarang</td>
                    <td className="p-4">Sampah</td>
                    <td className="p-4 text-center text-white">150</td>
                 </tr>
                 <tr className="border-b border-slate-800">
                    <td className="p-4 text-slate-400">Feb</td>
                    <td className="p-4">Indramayu</td>
                    <td className="p-4 font-black text-accent-500">Banjir</td>
                    <td className="p-4 text-center text-white">90</td>
                 </tr>
                 <tr>
                    <td className="p-4 text-slate-400">Mar</td>
                    <td className="p-4">Jatibarang</td>
                    <td className="p-4 font-black text-accent-500">Banjir</td>
                    <td className="p-4 text-center text-white">110</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div className="mt-auto bg-brand-50 p-6 rounded-[32px] border border-brand-100 flex gap-5 items-start">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-soft shrink-0">
              <Box className="text-brand-600 h-6 w-6" />
           </div>
           <div>
              <p className="font-black text-brand-700 uppercase tracking-widest text-[11px] mb-2">Makna Analisis:</p>
              <p className="text-sm text-slate-700 leading-relaxed font-semibold"><strong>Dice</strong> digunakan untuk mengambil subset data yang lebih spesifik, yaitu hanya pada Q1 2024, dua kecamatan tertentu, dan dua kategori masalah.</p>
           </div>
        </div>
      </div>

      {/* 4. Contoh Drill-Down */}
      <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-soft h-full flex flex-col border-t-8 border-t-brand-600 group">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">4</div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">4. Contoh Drill-Down</h3>
        </div>
        <p className="text-slate-500 font-medium mb-10 text-sm italic">Drill-down adalah analisis dari level umum ke level detail:</p>

        <div className="flex justify-center items-center gap-6 py-8 bg-slate-50 rounded-[32px] mb-10 border border-slate-100 shadow-inner">
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Low-res</span>
              <span className="font-black text-slate-900 text-lg">Tahun</span>
           </div>
           <ChevronRight className="h-4 w-4 text-slate-300" />
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Med-res</span>
              <span className="font-black text-slate-900 text-lg">Triwulan</span>
           </div>
           <ChevronRight className="h-4 w-4 text-slate-300" />
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-1">Detailed</span>
              <span className="font-black text-brand-600 text-lg">Bulan</span>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] overflow-hidden mb-10 shadow-2xl border border-white/5">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-teal-700 text-white text-[10px] uppercase font-black tracking-widest">
                    <th className="p-4 border-r border-teal-800">Bulanan</th>
                    <th className="p-4 border-r border-teal-800 text-center">Pengaduan</th>
                    <th className="p-4 text-center">Banjir</th>
                 </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-300">
                 <tr className="border-b border-slate-800 bg-white/5">
                    <td className="p-4 text-white font-black">Januari</td>
                    <td className="p-4 text-center text-brand-400 text-base">270</td>
                    <td className="p-4 text-center">15</td>
                 </tr>
                 <tr className="border-b border-slate-800 bg-white/5">
                    <td className="p-4 text-white font-black">Februari</td>
                    <td className="p-4 text-center text-brand-400 text-base">270</td>
                    <td className="p-4 text-center">16</td>
                 </tr>
                 <tr className="bg-white/5">
                    <td className="p-4 text-white font-black">Maret</td>
                    <td className="p-4 text-center text-brand-400 text-base">110</td>
                    <td className="p-4 text-center">8</td>
                 </tr>
              </tbody>
           </table>
        </div>

        <div className="mt-auto bg-brand-50 p-6 rounded-[32px] border border-brand-100 flex gap-5 items-start">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-soft shrink-0">
              <TrendingUp className="text-brand-600 h-6 w-6" />
           </div>
           <div>
              <p className="font-black text-brand-700 uppercase tracking-widest text-[11px] mb-2">Makna Analisis:</p>
              <p className="text-sm text-slate-700 leading-relaxed font-semibold">Terlihat bahwa bulan Januari dan Februari memiliki jumlah pengaduan paling tinggi, memberikan insight operasional yang kritikal.</p>
           </div>
        </div>
      </div>

    </div>
  </motion.div>
);

const DecisionPage = () => (
  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
    <div className="mb-16">
      <div className="text-brand-600 font-black text-sm uppercase tracking-[0.3em] mb-4 text-center">Langkah 08 - 09</div>
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter text-center uppercase">Hasil & Integrasi DSS</h2>
      <p className="text-slate-400 font-medium text-center max-w-2xl mx-auto mt-6">Tahap akhir untuk merumuskan keputusan strategis berdasarkan kecerdasan bisnis yang telah dikelola.</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div className="space-y-8">
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-soft">
           <div className="flex items-center gap-3 mb-10">
              <CheckCircle2 className="text-brand-500 h-7 w-7" />
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Keputusan DSS Strategis</h3>
           </div>
           
           <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-brand-50 border border-brand-100 group hover:shadow-lg transition-all">
                 <h4 className="font-black text-brand-900 text-lg mb-4 flex justify-between items-center">
                    Keputusan Terbaik 
                    <span className="px-3 py-1 bg-brand-600 text-white text-[10px] font-black rounded-lg">FINAL VOTE</span>
                 </h4>
                 <p className="text-brand-900/70 text-sm italic font-medium leading-relaxed">
                    "Menggabungkan Alternatif 1 (Pengelolaan Sampah) dan Alternatif 2 (Mitigasi Banjir) dengan titik fokus utama di Kecamatan Jatibarang."
                 </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 px-6">
                 <div>
                    <p className="text-4xl font-extrabold text-slate-900 mb-1">260</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Pengaduan</p>
                 </div>
                 <div>
                    <p className="text-4xl font-extrabold text-brand-600 mb-1">85T</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Volume Sampah/Hari</p>
                 </div>
                 <div className="col-span-2 pt-4">
                    <p className="text-3xl font-extrabold text-accent-600 mb-1">17 Kali</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Intensitas Banjir</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden group">
           <div className="relative z-10">
             <h4 className="text-2xl font-black mb-6">Analisis Alternatif Solusi</h4>
             <div className="grid gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                   <p className="font-black text-brand-400 mb-2 uppercase text-xs tracking-widest">Alternatif 01: Optimalisasi</p>
                   <p className="text-slate-400 text-sm leading-relaxed">Menambah armada pengangkutan & pemantauan kebersihan di wilayah prioritas.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                   <p className="font-black text-emerald-400 mb-2 uppercase text-xs tracking-widest">Alternatif 02: Mitigasi</p>
                   <p className="text-slate-400 text-sm leading-relaxed">Normalisasi saluran air & perbaikan drainase secara berkala setiap bulan.</p>
                </div>
             </div>
           </div>
           <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px] group-hover:bg-brand-500/20 transition-all duration-700" />
        </div>
      </div>

      <div className="space-y-10">
        <div className="p-10 bg-gradient-primary rounded-[56px] text-white shadow-isometric-card">
           <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-[20px] flex items-center justify-center">
                 <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Kompilasi Kesimpulan</h3>
           </div>
           
           <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                 <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
                 <p className="text-brand-50 text-base font-medium leading-relaxed">Analisis BI dengan DW & Cube membuat proses pengambilan keputusan lebih <span className="font-black underline decoration-white/40">cepat and terukur</span>.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
                 <p className="text-brand-50 text-base font-medium leading-relaxed">Monitoring KPI Lingkungan adalah langkah krusial untuk keberhasilan program Indramayu Smart City.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
                 <p className="text-brand-50 text-base font-medium leading-relaxed">Rekomendasi akhir adalah pembuatan <span className="font-black italic underline">Dashboard Monitoring Real-time</span>.</p>
              </div>
           </div>
           
           <button className="w-full bg-white text-brand-600 py-5 rounded-[24px] font-black text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-4 cursor-pointer">
              Selesai Membaca Laporan <CheckCircle2 className="h-6 w-6" />
           </button>
        </div>

        <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-soft text-center">
           <Users2 className="text-slate-200 h-12 w-12 mx-auto mb-6" />
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Penulis & Analis</p>
           <h5 className="font-black text-slate-900 text-xl mb-1">Muhammad Rifqy Saputra</h5>
           <p className="text-xs font-bold text-brand-600 uppercase">SIKC - 3B Polindra 2026</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- ICONS ---
const LayersIcon = (props: any) => (<svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>);
const ScissorsIcon = (props: any) => (<svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM4 10h16M2 10h2M10 10v12"></path></svg>);

// --- CHATBOT COMPONENT ---

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Halo! Saya asisten AI EcoTrust SIKC. Ada yang bisa saya bantu terkait laporan Business Intelligence Indramayu ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Anda adalah asisten AI untuk aplikasi EcoTrust SIKC (Sistem Informasi Kota Cerdas) Kabupaten Indramayu. 
            Aplikasi ini membahas Laporan Individu 2 tentang arsitektur Data Warehouse (DW) dan Business Intelligence (BI) untuk masalah Lingkungan (Sampah & Banjir). 
            
            Informasi Penting:
            - Penulis: Muhammad Rifqy Saputra (SIKC 3B Polindra 2026).
            - Fokus: Sampah & Banjir di Indramayu (Kecamatan Indramayu, Jatibarang, Karangampel).
            - Konsep BI: Fact Table (Fact_Lingkungan), Dimensi (Time, Location, Category), Star Schema, OLAP Cube (Slice, Dice, Drill-down), KPI, DSS.
            - Hasil Akhir: Rekomendasi pengelolaan sampah & banjir di Jatibarang.
            
            Jawablah pertanyaan pengguna dengan gaya profesional, informatif, dan ramah. Gunakan Bahasa Indonesia.
            Pastikan respon Anda terstruktur dengan baik menggunakan Markdown (gunakan bold untuk poin penting, list untuk daftar, dsb) agar terlihat rapi dan mudah dibaca.
            
            User message: ${input}` }]
          }
        ],
        config: {
          systemInstruction: "Anda adalah asisten cerdas EcoTrust SIKC yang membantu menjelaskan konsep Data Warehouse dan Business Intelligence untuk Kabupaten Indramayu. Gunakan format markdown yang rapi."
        }
      });

      const assistantMessage = { role: 'assistant' as const, content: response.text || 'Maaf, saya mengalami kendala teknis.' };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Terjadi kesalahan saat menghubungkan ke AI. Pastikan koneksi dan API Key tersedia.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-sm tracking-tight">EcoTrust AI Assistant</h4>
                  <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Intelligent BI Support</p>
                </div>
              </div>
              <button 
                onClick={() => setMessages([{ role: 'assistant', content: 'Halo! Ada yang bisa saya bantu lagi?' }])}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Clear Chat"
              >
                <TrashIcon className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-brand-600 text-white rounded-br-none" 
                      : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                  )}>
                    {msg.role === 'assistant' ? (
                      <div className="text-slate-700">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed font-medium">{children}</p>,
                            strong: ({children}) => <strong className="font-black text-brand-700">{children}</strong>,
                            ul: ({children}) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                            li: ({children}) => <li className="font-medium">{children}</li>,
                            h1: ({children}) => <h1 className="text-lg font-black mb-1">{children}</h1>,
                            h2: ({children}) => <h2 className="text-md font-black mb-1">{children}</h2>,
                            h3: ({children}) => <h3 className="text-sm font-black mb-1">{children}</h3>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-slate-900"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-brand-600 text-white p-3 rounded-xl hover:bg-brand-700 transition-all disabled:opacity-50 shadow-primary-cta"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-isometric-card transition-all relative overflow-hidden",
          isOpen ? "bg-slate-900 text-white" : "bg-brand-700 text-white"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-8 w-8" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-8 w-8" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 blur-xl rounded-full" />
      </motion.button>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Multi-page navigation event listener
  useEffect(() => {
    const handleNavigate = (e: any) => setActivePage(e.detail);
    document.addEventListener('navigate', handleNavigate);
    return () => document.removeEventListener('navigate', handleNavigate);
  }, []);

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-900">
      <BackgroundOrbs />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="relative z-10 pb-24">
        <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {activePage === 'home' && <HomePage onNavigate={setActivePage} />}
              {activePage === 'warehouse' && <WarehousePage />}
              {activePage === 'kpi' && <KPIPage />}
              {activePage === 'cube' && <CubePage />}
              {activePage === 'decision' && <DecisionPage />}
            </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="bg-white border-t border-slate-100 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-primary-cta">
              <ShieldCheck className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">EcoTrust <span className="text-brand-600">SIKC</span></span>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-slate-400 text-xs font-bold">
            <span>&copy; 2026 Smart City Laporan Individu 2</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full hidden md:inline" />
            <span>Jurusan Teknik Informatika</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full hidden md:inline" />
            <span>Sistem Informasi Kota Cerdas POLINDRA</span>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
