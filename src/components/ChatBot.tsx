import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Trash2 as TrashIcon, Send, X, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Initialize Groq configuration
const GROQ_CONFIG = {
  // Use a safer access pattern for Vite's defined environment variables
  apiKey: (import.meta.env.VITE_GROQ_API_KEY as string) || (process.env as any).GROQ_API_KEY || '',
  baseUrl: 'https://api.groq.com/openai/v1',
  model: 'llama-3.3-70b-versatile'
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Halo! Saya asisten AI EcoTrust SIKC. Ada yang bisa saya bantu terkait laporan Business Intelligence Indramayu ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!GROQ_CONFIG.apiKey) {
      console.error("CRITICAL: GROQ_API_KEY is missing!");
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!GROQ_CONFIG.apiKey) {
        throw new Error('API Key Groq tidak ditemukan.');
      }

      const response = await fetch(`${GROQ_CONFIG.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: GROQ_CONFIG.model,
          messages: [
            {
              role: "system",
              content: "Anda adalah asisten cerdas EcoTrust SIKC. Bantu user memahami konsep DW and BI dalam konteks pengelolaan lingkungan (Sampah & Banjir) di Indramayu. Jawablah dengan profesional, edukatif, and ramah dalam Bahasa Indonesia. Gunakan format Markdown yang rapi (bold, list, table)."
            },
            {
              role: "user",
              content: `Konteks Aplikasi:
              Penulis: Muhammad Rifqy Saputra (SIKC 3B Polindra).
              Wilayah: Indramayu, Jatibarang, Karangampel.
              
              Pertanyaan User: ${userMessage.content}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Gagal terhubung ke Groq');
      }

      const data = await response.json();
      const aiText = data.choices[0]?.message?.content || 'Maaf, saya menerima respon kosong.';

      const assistantMessage = { role: 'assistant' as const, content: aiText };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat Error Details:', error);
      const errorMsg = error.message?.includes('Key') 
        ? 'API Key Groq tidak valid. Pastikan file .env sudah benar.'
        : 'Terjadi gangguan koneksi ke Groq. Mohon coba lagi beberapa saat lagi.';
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
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
