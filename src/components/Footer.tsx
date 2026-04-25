import React from 'react';

export const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="bg-brand-600 p-0.5 rounded-full shadow-lg shadow-brand-200 overflow-hidden border-2 border-white">
          <img src="/favicon.png" alt="EcoTrust Logo" className="h-8 w-8 rounded-full object-cover" />
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
);
