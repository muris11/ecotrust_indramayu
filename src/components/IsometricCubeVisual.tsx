import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Trash2, Droplets } from 'lucide-react';
import { cn } from '../lib/utils';
import { Box } from 'lucide-react'; // if needed, although it's used in App.tsx

export const IsometricCubeVisual = () => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start justify-center">
    {/* Cube with Axes */}
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center mx-auto">
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
    <div className="flex-1 w-full space-y-6 overflow-hidden">
       <div className="bg-slate-900 text-white rounded-2xl overflow-x-auto shadow-lg border border-slate-700">
          <table className="w-full min-w-[300px] text-[11px] leading-tight">
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
