import React from 'react';

export const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
    <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '12s' }} />
    <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px]" />
  </div>
);
