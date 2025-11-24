import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { playClickSound, playNotificationSound } from '../services/audioService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export const TutorView: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "¡Hola piloto! Soy Skily AI. Estoy conectada al reglamento general de circulación. Pregúntame sobre señales, velocidades o normativa.", sender: 'ai' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    playClickSound();
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await askTutor(input);
    
    playNotificationSound();
    const aiMsg: Message = { id: Date.now() + 1, text: response, sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 md:p-10 font-sans pb-24 text-white flex justify-center">
      <div className="w-full max-w-5xl h-[85vh] flex flex-col bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden relative">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
             <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white flex items-center gap-2">
              Profesor Virtual
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 uppercase tracking-widest font-bold">
                 Online
              </span>
            </h3>
            <p className="text-slate-400 text-sm">Base de datos DGT actualizada • Gemini 2.5 Flash</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-950/30 relative z-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] p-5 rounded-2xl text-lg leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-900/20'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 opacity-50">
                    <Sparkles size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Skily AI</span>
                  </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-slate-800 px-6 py-4 rounded-2xl rounded-bl-none border border-slate-700 shadow-sm flex items-center gap-3 text-indigo-400">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm font-medium">Analizando normativa...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 md:p-8 bg-slate-900 border-t border-slate-800 z-10">
          <div className="flex gap-4 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pregunta sobre una señal, velocidad o norma..."
              className="flex-1 h-14 pl-6 pr-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-slate-500 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="h-14 w-14 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};