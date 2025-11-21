import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, HelpCircle, Play, ArrowRight } from 'lucide-react';
import { Question, Topic } from '../types';
import { getExplanation, generateQuizQuestion } from '../services/geminiService';

interface QuizViewProps {
  onComplete: (score: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [selectedTopic, setSelectedTopic] = useState<Topic>(Topic.GENERAL);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  
  const MAX_QUESTIONS = 5;

  const startQuiz = () => {
    setGameState('playing');
    setQuestionCount(0);
    setScore(0);
    loadNextQuestion();
  };

  const loadNextQuestion = async () => {
    setIsLoadingQuestion(true);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setIsConfirmed(false);
    setAiExplanation(null);

    const question = await generateQuizQuestion(selectedTopic);
    
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

  if (gameState === 'menu') {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Simulacro de Examen</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Selecciona un tema específico o practica con preguntas generales. 
            Nuestra IA genera preguntas únicas basadas en la normativa vigente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {Object.values(Topic).map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedTopic === topic
                  ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-slate-50'
              }`}
            >
              <span className="font-semibold block">{topic}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
           <button 
              onClick={startQuiz}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-lg shadow-xl transition-all flex items-center gap-3"
            >
              <Play size={20} fill="currentColor" />
              <span>Comenzar Simulación</span>
            </button>
        </div>
      </div>
    );
  }

  if (isLoadingQuestion) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin mb-6"></div>
        <h3 className="text-lg font-medium text-slate-900">Generando pregunta...</h3>
        <p className="text-slate-500 text-sm">Consultando base de datos DGT</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="text-xl font-bold text-slate-900 mb-2">Error de Carga</h3>
           <p className="text-slate-500 mb-6">No se pudo generar la pregunta. Inténtalo de nuevo.</p>
           <button onClick={() => setGameState('menu')} className="px-6 py-2 bg-slate-900 text-white rounded-lg">Volver al Menú</button>
        </div>
      </div>
    );
  }

  const progress = ((questionCount + 1) / MAX_QUESTIONS) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 pb-24">
      
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pregunta {questionCount + 1} de {MAX_QUESTIONS}</span>
        <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">{currentQuestion.topic}</span>
      </div>
      
      <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
        <div className="bg-brand-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="p-8 space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let buttonClass = "border-slate-200 hover:bg-slate-50 text-slate-700";
            
            if (selectedOption === idx && !isConfirmed) {
              buttonClass = "border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500";
            }

            if (isConfirmed) {
              if (idx === currentQuestion.correctIndex) {
                buttonClass = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500";
              } else if (idx === selectedOption) {
                buttonClass = "border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-500";
              } else {
                buttonClass = "border-slate-100 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !isConfirmed && setSelectedOption(idx)}
                disabled={isConfirmed}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${buttonClass}`}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                   isConfirmed && idx === currentQuestion.correctIndex ? 'border-emerald-500 bg-emerald-500 text-white' :
                   isConfirmed && idx === selectedOption ? 'border-rose-500 bg-rose-500 text-white' :
                   'border-current'
                }`}>
                   {String.fromCharCode(65 + idx)}
                </div>
                <span className="font-medium">{option}</span>
                
                {isConfirmed && idx === currentQuestion.correctIndex && <CheckCircle size={20} className="ml-auto text-emerald-600" />}
                {isConfirmed && idx === selectedOption && idx !== currentQuestion.correctIndex && <XCircle size={20} className="ml-auto text-rose-600" />}
              </button>
            );
          })}
        </div>
        
        {/* Feedback Section */}
        {isConfirmed && (
          <div className="bg-slate-50 p-8 border-t border-slate-100 animate-fade-in">
             
             {/* Official Explanation */}
             {currentQuestion.explanation && !aiExplanation && !isLoadingExplanation && (
                <div className="mb-6">
                   <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold">
                     <HelpCircle size={18} />
                     <h4>Explicación</h4>
                   </div>
                   <p className="text-slate-600 text-sm leading-relaxed">{currentQuestion.explanation}</p>
                </div>
             )}

             {/* AI Explanation */}
             {isLoadingExplanation && (
                <div className="flex items-center gap-3 text-brand-600 mb-6">
                   <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                   <span className="text-sm font-medium">El tutor IA está ampliando la respuesta...</span>
                </div>
             )}

             {aiExplanation && (
               <div className="bg-white p-5 rounded-xl border border-brand-100 shadow-sm mb-6">
                  <div className="flex items-center gap-2 mb-2 text-brand-700 font-bold text-sm uppercase tracking-wide">
                     <span>Tutor IA</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{aiExplanation}</p>
               </div>
             )}

             <div className="flex justify-end">
               <button
                 onClick={handleNext}
                 className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2"
               >
                 <span>{questionCount < MAX_QUESTIONS - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                 <ArrowRight size={18} />
               </button>
             </div>
          </div>
        )}

        {/* Confirm Button (Before Confirmation) */}
        {!isConfirmed && (
          <div className="p-8 pt-0 flex justify-end">
            <button
              onClick={handleConfirm}
              disabled={selectedOption === null}
              className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
                selectedOption === null 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-700 shadow-md'
              }`}
            >
              Confirmar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};