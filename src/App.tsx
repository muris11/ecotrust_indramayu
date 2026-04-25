import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';

// Pages
import { HomePage } from './pages/HomePage';
import { WarehousePage } from './pages/WarehousePage';
import { KPIPage } from './pages/KPIPage';
import { CubePage } from './pages/CubePage';
import { DecisionPage } from './pages/DecisionPage';

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
      
      <Footer />
      <ChatBot />
    </div>
  );
}
