
import React, { useState } from 'react';
import { 
  CheckCircle2, Brain, Zap, Smartphone, Crown, Star, 
  Car, Bike, Bus, Timer, Trophy, Swords, Target, Bookmark, 
  XCircle, CheckCircle, ArrowRight
} from 'lucide-react';
import { Logo } from './Logo';
import { playClickSound, playHoverSound, playEngineSound } from '../services/audioService';
import { StartEngineButton } from './StartEngineButton';

interface LandingViewProps {
  onEnterApp: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnterApp }) => {
  const [isStarting, setIsStarting] = useState(false);
  
  const handleStartEngine = () => {
    if (isStarting) return;
    setIsStarting(true);
    playEngineSound();
    setTimeout(() => {
       onEnterApp();
    }, 1500);
  };

  const handleEnter = () => {
    playClickSound();
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* Background Noise & Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      
      {/* Decorative Glows */}
      <div className="fixed top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 md:px-10 py-6 flex items-center justify-between max-w-[1400px] mx-auto">
        <Logo theme="dark" className="scale-90 origin-left" />
        <div className="flex items-center gap-4">
          <button 
            className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
            onClick={() => window.open('https://t.me/skilyapp', '_blank')}
          >
            <Smartphone size={16} /> Telegram App
          </button>
          <button 
            onClick={handleEnter}
            className="px-6 py-2.5 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-bold text-slate-300 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105"
          >
            Acceso Alumnos
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 px-6 pt-12 pb-20 md:pt-20 md:pb-32 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 animate-fade-in relative z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Skily AI Global Edition v2.5
        </div>

        {/* BIG TYPOGRAPHY - DOMINA EL ASFALTO */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] animate-slide-up select-none drop-shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400 block pb-2">
            DOMINA EL
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 via-violet-400 to-indigo-600 block pb-4">
            ASFALTO.
          </span>
        </h1>

        {/* Copy */}
        <p className="max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed mb-12 animate-slide-up font-medium" style={{ animationDelay: '0.1s' }}>
          La primera autoescuela potenciada por <span className="text-white font-bold">Inteligencia Artificial Cuántica</span>. Predicción de examen, música generativa y gamificación de alto nivel.
        </p>

        {/* Start Engine Button */}
        <div className="flex flex-col items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="scale-75 md:scale-90">
            <StartEngineButton onClick={handleStartEngine} isIgniting={isStarting} />
          </div>
          
          <div className="flex items-center gap-4 opacity-60">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-500"></div>
             <span className="text-[10px] uppercase tracking-widest text-slate-500">Press Start</span>
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-500"></div>
          </div>
        </div>

      </section>

      {/* 2. CORE ECOSYSTEM (TESTS) */}
      <section className="relative z-10 px-6 py-20 max-w-[1400px] mx-auto border-t border-slate-800/50">
        <div className="mb-12">
           <h2 className="text-3xl md:text-5xl font-black mb-4">Ecosistema DGT</h2>
           <p className="text-slate-400 max-w-xl">Base de datos oficial actualizada en tiempo real con más de 4,000 preguntas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Stat Card */}
           <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all">
              <div className="text-5xl font-black text-white mb-2">4012+</div>
              <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Preguntas Oficiales</p>
           </div>
           {/* Categories */}
           <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all">
              <div className="flex gap-4 mb-4">
                 <Car size={32} className="text-indigo-400" />
                 <Bike size={32} className="text-emerald-400" />
                 <Bus size={32} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-lg mb-1">Todas las Categorías</h3>
              <p className="text-slate-500 text-sm">Permisos B, A1/A2 y D incluidos.</p>
           </div>
           {/* Simulation */}
           <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-8 rounded-[2rem] relative overflow-hidden flex items-center justify-between">
              <div>
                 <div className="flex items-center gap-2 mb-2 text-indigo-300 font-mono text-xs uppercase tracking-widest">
                    <Timer size={14} /> 30 Minutos
                 </div>
                 <h3 className="font-bold text-2xl text-white mb-2">Simulación de Examen Real</h3>
                 <p className="text-slate-400 text-sm max-w-xs">Algoritmo 1:1 con el examen de la DGT. 30 preguntas, máximo 3 fallos.</p>
              </div>
              <div className="hidden md:block">
                 <div className="w-20 h-20 rounded-full border-4 border-indigo-500 flex items-center justify-center text-xl font-bold bg-indigo-900/20">
                    90%
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. AI & TECH */}
      <section className="relative z-10 px-6 py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
           {/* SKILY AI */}
           <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                 <Brain size={300} />
              </div>
              <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-bold uppercase mb-6">
                    <Zap size={12} /> Powered by Gemini API
                 </div>
                 <h2 className="text-4xl font-bold mb-4">Skily & Lumi AI™</h2>
                 <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                    Tu copiloto inteligente. Skily te explica la normativa técnica, mientras que Lumi te guía emocionalmente.
                 </p>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-300">
                       <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><CheckCircle2 size={14} /></div>
                       <span>Explicaciones contextuales de fallos</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                       <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><CheckCircle2 size={14} /></div>
                       <span>Chatbot con soporte de voz</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                       <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><CheckCircle2 size={14} /></div>
                       <span>Banco de Retos (Challenge Bank)</span>
                    </li>
                 </ul>
              </div>
           </div>

           {/* CHALLENGE BANK */}
           <div className="grid grid-rows-2 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center">
                 <div className="flex items-center gap-3 mb-4">
                    <Bookmark className="text-orange-400" size={24} />
                    <h3 className="font-bold text-xl">Challenge Bank™</h3>
                 </div>
                 <p className="text-slate-400">
                    Sistema automático que guarda tus errores. Repite las preguntas difíciles hasta dominarlas.
                 </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-between">
                 <div>
                    <h3 className="font-bold text-xl mb-1">Telegram Mini App</h3>
                    <p className="text-slate-400 text-sm">Estudia sin salir de Telegram.</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-[#229ED9]/20 flex items-center justify-center text-[#229ED9]">
                    <Smartphone size={24} />
                 </div>
              </div>
           </div>

        </div>
      </section>

      {/* 4. COMPARISON TABLE (WHY SKILY) */}
      <section className="relative z-10 px-6 py-20 max-w-[1400px] mx-auto border-t border-slate-800/50">
         <div className="text-center mb-16">
            <p className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">EVOLUCIÓN VS TRADICIÓN</p>
            <h2 className="text-4xl md:text-6xl font-black text-white">¿Por qué Skily?</h2>
         </div>

         <div className="relative overflow-x-auto rounded-[2.5rem] border border-slate-800 shadow-2xl">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"></div>
           
           <table className="w-full relative text-left border-collapse">
             <thead>
               <tr className="border-b border-slate-800">
                 <th className="py-6 px-8 text-xs font-bold uppercase tracking-widest text-slate-500 w-1/3">Característica</th>
                 <th className="py-6 px-8 text-xs font-bold uppercase tracking-widest text-rose-400 w-1/3 text-center">Autoescuela Tradicional</th>
                 <th className="py-6 px-8 text-xs font-bold uppercase tracking-widest text-indigo-400 w-1/3 text-center bg-indigo-500/5">Skily App</th>
               </tr>
             </thead>
             <tbody className="text-sm font-medium">
                {[
                  { feature: 'Precio Medio', trad: '€300 - €600', skily: '€0 - €60' },
                  { feature: 'Actualización Preguntas', trad: 'Libros (Anual)', skily: 'Diaria (AI Cloud)' },
                  { feature: 'Explicación de Fallos', trad: 'Preguntar al profe', skily: 'Instantánea (Skily AI)' },
                  { feature: 'Disponibilidad', trad: 'Horario clases', skily: '24/7 Offline & Online' },
                  { feature: 'Factor Diversión', trad: 'Aburrido', skily: 'Gamificación (The Arena)' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="py-6 px-8 text-white font-bold">{row.feature}</td>
                    <td className="py-6 px-8 text-slate-400 text-center">
                       <div className="inline-flex items-center gap-2 justify-center">
                          <XCircle size={16} className="text-rose-500" />
                          {row.trad}
                       </div>
                    </td>
                    <td className="py-6 px-8 text-white text-center bg-indigo-500/5 relative">
                       {i === 0 && <div className="absolute inset-0 bg-indigo-500/10 animate-pulse pointer-events-none"></div>}
                       <div className="inline-flex items-center gap-2 justify-center relative z-10">
                          <CheckCircle size={16} className="text-indigo-400" />
                          {row.skily}
                       </div>
                    </td>
                  </tr>
                ))}
             </tbody>
           </table>
         </div>
      </section>

      {/* 5. THE ARENA (GAMIFICATION) */}
      <section className="relative z-10 px-6 py-20 max-w-[1400px] mx-auto">
         
         {/* SEASON PASS BANNER */}
         <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl mb-10 group">
            {/* Top Bar Gradient */}
            <div className="h-24 bg-gradient-to-r from-orange-500 to-red-600 relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>
            
            {/* Body */}
            <div className="bg-[#0f172a] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
               <div>
                  <div className="flex items-center gap-2 mb-1 text-orange-500 font-bold uppercase tracking-widest text-xs">
                     <Crown size={14} /> Season 1
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">Duel Pass Premium</h3>
                  <p className="text-slate-400 text-sm">Desbloquea skins exclusivos, multiplicadores de XP y monedas extra.</p>
               </div>
               
               <div className="flex gap-8 md:gap-12">
                  <div className="text-center">
                     <div className="text-3xl font-black text-white">90</div>
                     <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Niveles</div>
                  </div>
                  <div className="text-center">
                     <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Epic</div>
                     <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Recompensas</div>
                  </div>
               </div>
            </div>
         </div>

         {/* GAMES GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { icon: Trophy, title: 'RaceGame', desc: 'Carrera contrarreloj', color: 'text-yellow-400' },
               { icon: Swords, title: 'Duel PvP', desc: 'Apuestas de monedas', color: 'text-red-400' },
               { icon: Target, title: 'GuessSign', desc: 'Adivina la señal', color: 'text-blue-400' },
               { icon: Brain, title: 'Matching', desc: 'Memoria visual', color: 'text-purple-400' }
            ].map((game, i) => (
               <div key={i} className="bg-[#0f172a] border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/30 transition-all cursor-pointer group">
                  <game.icon size={32} className={`${game.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-bold text-white text-lg mb-1">{game.title}</h3>
                  <p className="text-xs text-slate-500">{game.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 6. PRICING (THE HANGAR STORE) */}
      <section className="relative z-10 px-6 py-20 pb-40 max-w-[1400px] mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Elige tu Vehículo</h2>
            <p className="text-slate-400">Planes flexibles para cada tipo de piloto.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            
            {/* FREE */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
               <h3 className="font-bold text-xl text-slate-300 mb-2">Cadete</h3>
               <div className="text-3xl font-black text-white mb-6">Gratis</div>
               <ul className="space-y-3 mb-8 text-sm text-slate-400">
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Tests Básicos</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Skily Lite</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Juegos con publicidad</li>
               </ul>
               <button onClick={handleEnter} className="w-full py-3 rounded-xl border border-slate-700 font-bold text-slate-300 hover:bg-slate-800 transition-colors">Comenzar</button>
            </div>

            {/* MONTHLY */}
            <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-[2rem] relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</div>
               <h3 className="font-bold text-xl text-indigo-300 mb-2">Pro Monthly</h3>
               <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white">€9.99</span>
                  <span className="text-slate-400 text-sm">/mes</span>
               </div>
               <ul className="space-y-3 mb-8 text-sm text-indigo-100/80">
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Tests Ilimitados</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Skily AI Full</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Sin Publicidad</li>
               </ul>
               <button onClick={handleEnter} className="w-full py-3 rounded-xl bg-indigo-600 font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">Suscribirse</button>
            </div>

            {/* YEARLY */}
            <div className="bg-purple-900/20 border border-purple-500/30 p-8 rounded-[2rem]">
               <div className="inline-block bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded mb-2">-50% OFF</div>
               <h3 className="font-bold text-xl text-purple-300 mb-2">Pro Yearly</h3>
               <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white">€59.99</span>
                  <span className="text-slate-400 text-sm">/año</span>
               </div>
               <ul className="space-y-3 mb-8 text-sm text-purple-100/80">
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Todo lo de Monthly</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} /> 2 Meses Gratis</li>
                  <li className="flex gap-2"><CheckCircle2 size={16} /> Prioridad en Duels</li>
               </ul>
               <button onClick={handleEnter} className="w-full py-3 rounded-xl bg-purple-600 font-bold text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20">Ahorrar Ahora</button>
            </div>

         </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-slate-800/50 text-center text-slate-600 text-xs font-mono uppercase tracking-widest">
         <div className="flex justify-center gap-6 mb-8">
            <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-white cursor-pointer transition-colors">Soporte</span>
            <span className="hover:text-white cursor-pointer transition-colors">Afiliados</span>
         </div>
         <p>© 2024 Skily Global Inc. // The Future of Driving Education.</p>
      </footer>

    </div>
  );
};
