import { Gamepad2,  AlertCircle,Sparkles, Ticket, X } from 'lucide-react';
import { useState } from 'react';
import { TRIVIA_QUESTIONS } from './../data/database';


const TrivialModal = ({ onClose, onWin }) => {
  const [step, setStep] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (index) => {
    setSelectedOpt(index);
    setShowExplanation(true);
    if (index === TRIVIA_QUESTIONS[currentQ].correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQ < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      if (score === TRIVIA_QUESTIONS.length) {
        setStep('reward');
      } else {
        setStep('result');
      }
    }
  };

  const handleClaimReward = () => {
    onWin(); // Esto dispara el confeti en la app principal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/95 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl p-6 md:p-8 text-center relative border border-zinc-800" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>

        {step === 'intro' && (
          <div className="animate-in fade-in">
            <Gamepad2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Trivial de Pareja</h2>
            <p className="text-sm md:text-base text-gray-400 mb-6">Si aciertas todas las preguntas sin fallar, desbloquearás un premio instantáneo.</p>
            <button onClick={() => setStep('playing')} className="bg-purple-600 text-white w-full py-3 rounded font-bold hover:bg-purple-700 transition-colors">Comenzar Juego</button>
          </div>
        )}

        {step === 'playing' && (
          <div className="animate-in slide-in-from-right">
            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Pregunta {currentQ + 1} de {TRIVIA_QUESTIONS.length}</span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-2 mb-6 leading-tight">{TRIVIA_QUESTIONS[currentQ].question}</h2>
            
            <div className="flex flex-col gap-3">
              {TRIVIA_QUESTIONS[currentQ].options.map((opt, idx) => {
                let btnClass = "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white";
                if (showExplanation) {
                  if (idx === TRIVIA_QUESTIONS[currentQ].correct) btnClass = "bg-green-600/20 border-green-500 text-white";
                  else if (idx === selectedOpt) btnClass = "bg-red-600/20 border-red-500 text-white opacity-50";
                  else btnClass = "bg-zinc-800 border-zinc-800 text-gray-500 opacity-50";
                }
                return (
                  <button key={idx} disabled={showExplanation} onClick={() => handleAnswer(idx)} className={`w-full py-3 px-4 rounded-lg font-medium text-left transition-all text-sm md:text-base ${btnClass}`}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-zinc-950 rounded-lg text-left animate-in fade-in">
                <p className="text-sm text-gray-300"><strong>💡 Dato curioso:</strong> {TRIVIA_QUESTIONS[currentQ].funFact}</p>
                <button onClick={nextQuestion} className="mt-4 bg-white text-black font-bold py-2 px-4 rounded w-full hover:bg-gray-200">
                  {currentQ < TRIVIA_QUESTIONS.length - 1 ? "Siguiente Pregunta ➔" : "Ver Resultados"}
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'result' && (
          <div className="animate-in zoom-in">
             <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">¡Casi! ({score}/{TRIVIA_QUESTIONS.length})</h2>
             <p className="text-gray-300 mb-6 text-sm md:text-base">Solo quienes me conocen al 100% consiguen desbloquear el premio secreto. ¡Vuelve a intentarlo!</p>
             <button onClick={onClose} className="bg-zinc-800 text-white w-full py-3 rounded font-bold hover:bg-zinc-700">Cerrar</button>
          </div>
        )}

        {step === 'reward' && (
          <div className="animate-in zoom-in duration-500">
            <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-white mb-2">¡Puntuación Perfecta!</h2>
            <p className="text-gray-300 mb-6 text-sm">Me conoces a la perfección. Aquí tienes tu merecida recompensa:</p>

            <div className="bg-gradient-to-r from-yellow-900/60 via-yellow-700/30 to-yellow-900/60 border border-yellow-600/50 rounded-xl p-5 text-left relative overflow-hidden mb-6 shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:scale-105 transition-transform cursor-pointer">
               <div className="flex items-center gap-4 mb-4">
                 <div className="bg-yellow-500/10 p-3 rounded-full border border-yellow-500/30 shrink-0">
                   <Ticket className="w-8 h-8 text-yellow-500" />
                 </div>
                 <div>
                   <span className="text-yellow-500 font-bold tracking-widest text-[10px] uppercase block">Billete Dorado</span>
                   <h3 className="text-xl font-black text-white leading-tight">Escapada de Fin de Semana</h3>
                 </div>
               </div>
               
               <div className="bg-zinc-950/80 border border-yellow-600/30 rounded-lg overflow-hidden">
                  <div className="bg-yellow-600 px-4 py-1.5 flex justify-between items-center text-zinc-950 font-bold text-[10px] md:text-xs tracking-wider">
                    <span>VÁLIDO PARA 2 PERSONAS</span>
                    <span>ID: LOVE-2026</span>
                  </div>
                  <div className="px-4 py-3 flex flex-col items-center justify-between gap-1 font-mono text-center">
                    <span className="text-gray-500 text-xs">CÓDIGO DE CANJEO:</span>
                    <span className="text-lg md:text-xl font-bold text-white tracking-widest bg-zinc-900 px-4 py-1 rounded border border-white/5">OURFLIX-TRIP-100</span>
                  </div>
               </div>
            </div>

            <button onClick={handleClaimReward} className="bg-yellow-600 text-zinc-950 w-full py-3.5 rounded font-black tracking-wide hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              GUARDAR BILLETE Y RECLAMAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrivialModal;