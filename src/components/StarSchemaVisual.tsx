import React from 'react';
import { Database, Calendar, MapPin, Tag } from 'lucide-react';

export const StarSchemaVisual = () => (
  <div className="relative p-6 sm:p-12 w-full max-w-4xl mx-auto overflow-hidden">
    <div className="absolute inset-0 bg-slate-900 rounded-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl" />
    
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12 items-center">
      
      {/* Left Dimension */}
      <div className="space-y-6 z-10 hidden md:block">
        <div className="bg-slate-800 border-2 border-slate-700 p-4 rounded-xl shadow-xl hover:border-brand-500 hover:scale-105 transition-all">
          <div className="flex items-center gap-3 mb-3 pb-2 border-b border-slate-700">
            <div className="bg-brand-500/20 p-2 rounded-lg"><Calendar className="h-5 w-5 text-brand-400" /></div>
            <span className="font-bold text-white text-sm">Dim_Waktu</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li><span className="text-yellow-500">PK</span> id_waktu</li>
            <li>tanggal</li>
            <li>bulan</li>
            <li>tahun</li>
          </ul>
        </div>
      </div>

      {/* Center Fact Table */}
      <div className="relative z-20 mx-auto w-full max-w-[300px]">
        {/* Connecting Lines for Desktop */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 hidden md:block pointer-events-none">
          {/* To Left */}
          <line x1="15%" y1="50%" x2="40%" y2="50%" stroke="#10B981" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
          {/* To Top Right */}
          <line x1="60%" y1="50%" x2="80%" y2="25%" stroke="#10B981" strokeWidth="2" strokeDasharray="4" className="animate-pulse" style={{animationDelay: '0.2s'}} />
          {/* To Bottom Right */}
          <line x1="60%" y1="50%" x2="80%" y2="75%" stroke="#10B981" strokeWidth="2" strokeDasharray="4" className="animate-pulse" style={{animationDelay: '0.4s'}} />
        </svg>

        <div className="bg-gradient-to-br from-brand-600 to-emerald-700 border-2 border-emerald-400 p-5 rounded-2xl shadow-2xl shadow-emerald-900/50 hover:scale-105 transition-transform relative">
          <div className="absolute -top-3 -right-3 bg-accent-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg">FACT</div>
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/50">
            <div className="bg-white/20 p-2 rounded-xl"><Database className="h-6 w-6 text-white" /></div>
            <span className="font-black text-white text-base">Fakta_Pengaduan</span>
          </div>
          <ul className="text-xs text-emerald-50 space-y-2 font-mono">
            <li className="flex justify-between"><span className="text-yellow-300">FK</span> <span>id_waktu</span></li>
            <li className="flex justify-between"><span className="text-yellow-300">FK</span> <span>id_lokasi</span></li>
            <li className="flex justify-between"><span className="text-yellow-300">FK</span> <span>id_kategori</span></li>
            <div className="w-full h-px bg-emerald-500/50 my-2" />
            <li className="flex justify-between font-bold text-white"><span className="text-emerald-200">MSR</span> <span>jml_pengaduan</span></li>
            <li className="flex justify-between font-bold text-white"><span className="text-emerald-200">MSR</span> <span>vol_sampah</span></li>
            <li className="flex justify-between font-bold text-white"><span className="text-emerald-200">MSR</span> <span>kjd_banjir</span></li>
          </ul>
        </div>
      </div>

      {/* Right Dimensions */}
      <div className="space-y-6 z-10 flex flex-col md:block">
        {/* Mobile-only Top/Bottom Dim_Waktu indicator - optional, but let's keep it clean */}
        
        <div className="bg-slate-800 border-2 border-slate-700 p-4 rounded-xl shadow-xl hover:border-brand-500 hover:scale-105 transition-all w-full">
          <div className="flex items-center gap-3 mb-3 pb-2 border-b border-slate-700">
            <div className="bg-brand-500/20 p-2 rounded-lg"><MapPin className="h-5 w-5 text-brand-400" /></div>
            <span className="font-bold text-white text-sm">Dim_Lokasi</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li><span className="text-yellow-500">PK</span> id_lokasi</li>
            <li>kecamatan</li>
            <li>koordinat</li>
          </ul>
        </div>

        <div className="bg-slate-800 border-2 border-slate-700 p-4 rounded-xl shadow-xl hover:border-brand-500 hover:scale-105 transition-all w-full">
          <div className="flex items-center gap-3 mb-3 pb-2 border-b border-slate-700">
            <div className="bg-brand-500/20 p-2 rounded-lg"><Tag className="h-5 w-5 text-brand-400" /></div>
            <span className="font-bold text-white text-sm">Dim_Kategori</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li><span className="text-yellow-500">PK</span> id_kategori</li>
            <li>nama_kategori</li>
            <li>jenis_masalah</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
