
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "", showText = true, theme = 'dark' }) => {
  const textColor = theme === 'light' ? 'text-white' : 'text-slate-900';
  const primaryFill = theme === 'light' ? '#ffffff' : '#4f46e5'; // White or Indigo 600
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* New Logo: 'The Spark' - Sharp, Compact, Memorable */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Upper Spark */}
          <path 
            d="M55 10 L 85 10 C 90 10 92 15 88 20 L 50 65 L 55 45 L 55 10 Z" 
            fill={primaryFill}
          />
          {/* Lower Spark (Offset) */}
          <path 
            d="M45 90 L 15 90 C 10 90 8 85 12 80 L 50 35 L 45 55 L 45 90 Z" 
            fill={theme === 'light' ? '#818cf8' : '#1e293b'} 
          />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center -space-y-1">
          <span className={`text-lg font-extrabold tracking-tighter ${textColor} font-sans`}>
            Skily
          </span>
          <span className={`text-[8px] font-bold uppercase tracking-[0.3em] ${theme === 'light' ? 'text-indigo-200' : 'text-indigo-500'}`}>
            App
          </span>
        </div>
      )}
    </div>
  );
};
