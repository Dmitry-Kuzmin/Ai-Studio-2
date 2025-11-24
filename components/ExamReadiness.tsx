
import React, { useState, useMemo } from 'react';
import { UserStats, Topic } from '../types';
import { X, TrendingUp, AlertTriangle, CheckCircle2, BarChart2, ChevronRight, Target, Zap, Brain, History } from 'lucide-react';
import { playClickSound, playHoverSound } from '../services/audioService';

interface ExamReadinessProps {
  stats: UserStats;
}

export const ExamReadiness: React.FC<ExamReadinessProps> = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const score = stats.averageScore;

  // --- LOGIC CALCULATION ---
  const analytics = useMemo(() => {
    // 1. Status Determination
    let status = { label: 'INSUFICIENTE', color: 'text-rose-500', bg: 'bg-rose-500', gradient: 'from-rose-500 to-orange-600' };
    if (score >= 50) status = { label: 'EN PROGRESO', color: 'text-orange-500', bg: 'bg-orange-500', gradient: 'from-orange-500 to-yellow-500' };
    if (score >= 80) status = { label: 'BUEN NIVEL', color: 'text-emerald-400', bg: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-400' };
    if (score >= 95) status = { label: 'EXCELENTE', color: 'text-cyan-400', bg: 'bg-cyan-500', gradient: 'from-cyan-500 to-blue-500' };

    // 2. Topic Breakdown (Sorted by weakness)
    const topics = Object.entries(stats.topicMastery)
      .filter(([, val]) => typeof val === 'number')
      .sort(([, a], [, b]) => (a as number) - (b as number))
      .map(([name, val]) => ({ name, val: val as number }));

    // 3. Weakest Link
    const weakest = topics[0];

    // 4. Simulated History (for Graph)
    const historyData = [
        score - 15, score - 10, score - 12, score - 5, score - 2, score
    ].map(v => Math.max(0, Math.min(100, v)));

    return { status, topics, weakest, historyData };
  }, [stats]);

  const toggleOpen = () => {
    playClickSound();
    setIsOpen(!isOpen);
  };

  // SVG Arc Calculation for Speedometer
  const radius = 80;
  const circumference = Math.PI * radius; // Half circle
  const progress = (score / 100) * circumference;

  return (
    <>
      {/* === WIDGET: SPEEDOMETER STYLE === */}
      <div 
        onClick={toggleOpen}
        onMouseEnter={playHoverSound}
        className="h-full bg-slate-900 rounded-[2.5rem] p-1 relative overflow-hidden cursor-pointer group shadow-xl border border-slate-800 hover:border-slate-600 transition-all"
      >
        <div className="absolute inset-0 bg-[#0b1120] rounded-[2.4rem]"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
               <div className="p-1.5 bg-slate-800 rounded-lg text-indigo-400">
                 <Target size={14} />
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Probabilidad</span>
             </div>
             <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
          </div>

          {/* Speedometer Graphic */}
          <div className="flex-1 flex flex-col items-center justify-center relative mt-2">
             <div className="relative w-40 h-24 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 110">
                   {/* Track */}
                   <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
                   
                   {/* Progress */}
                   <path 
                     d="M 20 100 A 80 80 0 0 1 180 100" 
                     fill="none" 
                     stroke={`url(#gaugeGradient-${score})`} 
                     strokeWidth="12" 
                     strokeLinecap="round"
                     strokeDasharray={circumference} // 251
                     strokeDashoffset={circumference - progress}
                     className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                   />
                   <defs>
                      <linearGradient id={`gaugeGradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor={score < 50 ? '#ef4444' : '#6366f1'} />
                         <stop offset="100%" stopColor={score < 50 ? '#f97316' : '#06b6d4'} />
                      </linearGradient>
                   </defs>
                </svg>
                
                {/* Needle/Value */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                   <span className="text-4xl font-black text-white tracking-tighter leading-none">{score}%</span>
                </div>
             </div>
             
             {/* Status Badge */}
             <div className={`mt-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold ${analytics.status.color} uppercase tracking-wider shadow-lg`}>
                {analytics.status.label}
             </div>
          </div>
        </div>
      </div>

      {/* === OVERLAY: TELEMETRY DASHBOARD === */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-in" onClick={toggleOpen}>
           <div 
             className="w-full max-w-5xl bg-[#0f172a] rounded-[2rem] border border-slate-700 shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]"
             onClick={(e) => e.stopPropagation()}
           >
              {/* Header */}
              <div className="h-20 px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                       <BarChart2 size={20} />
                    </div>
                    <div>
                       <h2 className="text-xl font-bold text-white tracking-tight">Analítica de Rendimiento</h2>
                       <p className="text-xs text-slate-400 font-mono">PILOT TELEMETRY // DGT STANDARDS</p>
                    </div>
                 </div>
                 <button onClick={toggleOpen} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                    <X size={20} />
                 </button>
              </div>

              {/* Dashboard Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* COL 1: MAIN METRIC */}
                    <div className="lg:col-span-1 space-y-6">
                       {/* Score Card */}
                       <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${analytics.status.gradient} blur-[60px] opacity-20`}></div>
                          
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Probabilidad Apto</h3>
                          <div className="flex items-end gap-2 mb-2">
                             <span className="text-6xl font-black text-white tracking-tighter">{score}</span>
                             <span className="text-xl font-bold text-slate-500 mb-2">/100</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                             <div className={`h-full bg-gradient-to-r ${analytics.status.gradient} rounded-full`} style={{ width: `${score}%` }}></div>
                          </div>
                          <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                             {score >= 90 ? 'Estás en zona de excelencia. Mantén el ritmo.' : 
                              score >= 80 ? 'Muy cerca. Unos pocos ajustes y estarás listo.' :
                              'Aún necesitas rodaje. Concéntrate en tus fallos.'}
                          </p>
                       </div>

                       {/* Weakest Link Alert */}
                       {analytics.weakest && (
                         <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 flex items-start gap-4">
                            <div className="p-3 bg-rose-500/20 rounded-xl text-rose-500 shrink-0">
                               <AlertTriangle size={24} />
                            </div>
                            <div>
                               <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-1">Atención Requerida</h4>
                               <p className="text-white font-bold text-lg mb-1">{analytics.weakest.name}</p>
                               <p className="text-xs text-rose-200/60">Tu tasa de acierto es solo del {analytics.weakest.val}%. Se recomienda repasar este módulo.</p>
                            </div>
                         </div>
                       )}
                    </div>

                    {/* COL 2: PROGRESS HISTORY */}
                    <div className="lg:col-span-2 grid grid-rows-2 gap-6">
                       
                       {/* Graph */}
                       <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
                          <div className="flex items-center justify-between mb-6">
                             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <History size={14} />
                                Tendencia (Últimos Tests)
                             </h3>
                             <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                                <TrendingUp size={12} />
                                +15% Mejora
                             </div>
                          </div>
                          
                          <div className="h-32 flex items-end justify-between gap-2">
                             {analytics.historyData.map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end group relative">
                                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono border border-slate-700">
                                      {val}%
                                   </div>
                                   <div 
                                     className="w-full bg-indigo-600/50 hover:bg-indigo-500 rounded-t-lg transition-all duration-500 relative overflow-hidden"
                                     style={{ height: `${val}%` }}
                                   >
                                     <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400"></div>
                                   </div>
                                </div>
                             ))}
                          </div>
                          <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-600 uppercase">
                             <span>Start</span>
                             <span>Now</span>
                          </div>
                       </div>

                       {/* Topics Grid */}
                       <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 overflow-y-auto">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Brain size={14} />
                            Desglose por Temas
                          </h3>
                          <div className="space-y-4">
                             {analytics.topics.slice(0, 3).map((topic, i) => (
                                <div key={i}>
                                   <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
                                      <span>{topic.name}</span>
                                      <span className={topic.val < 50 ? 'text-rose-400' : 'text-emerald-400'}>{topic.val}%</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${topic.val < 50 ? 'bg-rose-500' : topic.val < 80 ? 'bg-orange-500' : 'bg-emerald-500'}`} 
                                        style={{ width: `${topic.val}%` }}
                                      ></div>
                                   </div>
                                </div>
                             ))}
                             {analytics.topics.length > 3 && (
                                <div className="pt-2 text-center">
                                   <span className="text-[10px] text-slate-500 font-medium cursor-pointer hover:text-white transition-colors">
                                      + {analytics.topics.length - 3} temas adicionales
                                   </span>
                                </div>
                             )}
                          </div>
                       </div>

                    </div>
                 </div>
                 
                 {/* Recommendation Footer */}
                 <div className="mt-6 p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Zap size={18} className="text-indigo-400" />
                       <span className="text-sm font-medium text-indigo-200">
                          IA Sugerencia: <span className="text-white font-bold">Realizar Test de Velocidad (30 preguntas)</span>
                       </span>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors">
                       INICIAR AHORA
                    </button>
                 </div>

              </div>
           </div>
        </div>
      )}
    </>
  );
};
