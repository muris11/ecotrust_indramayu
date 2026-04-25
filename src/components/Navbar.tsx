import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database,
  Trophy,
  Box,
  CheckCircle2,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="bg-brand-600 p-0.5 rounded-full shadow-lg shadow-brand-200 group-hover:rotate-6 transition-transform overflow-hidden border-2 border-white">
              <img src="/favicon.png" alt="EcoTrust Logo" className="h-9 w-9 rounded-full object-cover" />
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
             <a 
                href="/laporan.pdf" 
                download="2307046_Muhammad Rifqy Saputra_SIKC 3B_Tugas Individu 2.pdf"
                className="hidden sm:block text-[11px] font-extrabold text-brand-700 bg-brand-50 px-5 py-2.5 rounded-full border border-brand-100 hover:bg-brand-100 transition-colors"
             >
                Download Laporan
             </a>
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
