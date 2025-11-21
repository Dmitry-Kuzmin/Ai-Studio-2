
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Question, Topic } from '../types';
import { getExplanation, generateQuizQuestion } from '../services/geminiService';

interface QuizViewProps {
  onComplete: (score: number) => void;
  topic: Topic;
}

export const QuizView: React.FC<QuizViewProps> = ({ onComplete, topic }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  
  const MAX_QUESTIONS = 5;

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = async () => {
    setIsLoadingQuestion(true);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setIsConfirmed(false);
    setAiExplanation(null);

    const question = await generateQuizQuestion(topic);
    
    if (question) {
      setCurrentQuestion(question);
    }
    setIsLoadingQuestion(false);
  };

  const handleConfirm = async () => {
    if (!currentQuestion) return;
    
    setIsConfirmed(true);
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setIsLoadingExplanation(true);
      const explanation = await getExplanation(
        currentQuestion.text,
        currentQuestion.options,
        currentQuestion.options[currentQuestion.correctIndex],
        currentQuestion.options[selectedOption!]
      );
      setAiExplanation(explanation);
      setIsLoadingExplanation(false);
    }
  };

  const handleNext = () => {
    if (questionCount < MAX_QUESTIONS - 1) {
      setQuestionCount(prev => prev + 1);
      loadNextQuestion();
    } else {
      onComplete((score + (selectedOption === currentQuestion?.correctIndex ? 1 : 0)) / MAX_QUESTIONS * 100);
    }
  };

  if (isLoadingQuestion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-slate-900">Cargando pregunta...</h3>
        <p className="text-slate-500">Generando contenido oficial DGT</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center max-w-md">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Error de Conexión</h3>
           <p className="text-slate-500 mb-6">No se pudo conectar con el servidor de preguntas.</p>
           <button onClick={() => onComplete(0)} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Volver</button>
        </div>
      </div>
    );
  }

  const progress = ((questionCount + 1) / MAX_QUESTIONS) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 flex justify-center">
      <div className="w-full max-w-3xl pt-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
             <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Modo Examen</span>
             <h2 className="text-2xl font-bold text-slate-900">{topic}</h2>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
            <span>{questionCount + 1}</span>
            <span className="opacity-30">/</span>
            <span>{MAX_QUESTIONS}</span>
          </div>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-1.5 mb-10 overflow-hidden">
          <div className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-slate-100 overflow-hidden relative">
          
          <div className="p-8 md:p-10 border-b border-slate-50">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
              {currentQuestion.text}
            </h3>
          </div>

          <div className="p-8 md:p-10 space-y-4">
            {currentQuestion.options.map((option, idx) => {
              let stateClass = "border-slate-100 hover:bg-slate-50 hover:border-indigo-200";
              
              if (selectedOption === idx && !isConfirmed) {
                stateClass = "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500";
              }

              if (isConfirmed) {
                if (idx === currentQuestion.correctIndex) {
                  stateClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                } else if (idx === selectedOption) {
                  stateClass = "border-rose-500 bg-rose-50 ring-1 ring-rose-500";
                } else {
                  stateClass = "border-slate-100 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isConfirmed && setSelectedOption(idx)}
                  disabled={isConfirmed}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group ${stateClass}`}
                >
                  <div className={`w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-bold transition-colors ${
                     isConfirmed && idx === currentQuestion.correctIndex ? 'border-emerald-500 bg-emerald-500 text-white' :
                     isConfirmed && idx === selectedOption ? 'border-rose-500 bg-rose-500 text-white' :
                     selectedOption === idx ? 'border-indigo-500 text-indigo-600' : 'border-slate-300 text-slate-400'
                  }`}>
                     {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`font-medium text-lg ${isConfirmed && idx === currentQuestion.correctIndex ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                  
                  {isConfirmed && idx === currentQuestion.correctIndex && <CheckCircle size={24} className="ml-auto text-emerald-500" />}
                  {isConfirmed && idx === selectedOption && idx !== currentQuestion.correctIndex && <XCircle size={24} className="ml-auto text-rose-500" />}
                </button>
              );
            })}
          </div>
          
          {/* Explanation Footer */}
          {isConfirmed && (
            <div className="bg-slate-50 p-8 md:p-10 animate-fade-in border-t border-slate-100">
               
               {currentQuestion.explanation && !aiExplanation && !isLoadingExplanation && (
                  <div className="mb-6">
                     <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold uppercase text-xs tracking-wider">
                       <HelpCircle size={14} />
                       <span>Explicación Oficial</span>
                     </div>
                     <p className="text-slate-600 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
               )}

               {isLoadingExplanation && (
                  <div className="flex items-center gap-3 text-indigo-600 mb-6 bg-indigo-50 p-4 rounded-xl">
                     <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                     <span className="text-sm font-medium">Skily AI está analizando tu respuesta...</span>
                  </div>
               )}

               {aiExplanation && (
                 <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div className="flex items-center gap-2 mb-3 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                       <span>Skily Tutor</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{aiExplanation}</p>
                 </div>
               )}

               <div className="flex justify-end">
                 <button
                   onClick={handleNext}
                   className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 transition-all hover:-translate-y-1 flex items-center gap-3"
                 >
                   <span>{questionCount < MAX_QUESTIONS - 1 ? 'Siguiente' : 'Finalizar'}</span>
                   <ArrowRight size={20} />
                 </button>
               </div>
            </div>
          )}

          {/* Floating Confirm Action */}
          {!isConfirmed && (
            <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10">
              <button
                onClick={handleConfirm}
                disabled={selectedOption === null}
                className={`px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
                  selectedOption === null 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed translate-y-2 opacity-0' 
                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30 translate-y-0 opacity-100'
                }`}
              >
                Confirmar Respuesta
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
