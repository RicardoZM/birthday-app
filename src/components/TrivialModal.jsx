import { Gamepad2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { TRIVIA_QUESTIONS } from './../data/database';


const TrivialModal = ({ onClose }) => {
  const [step, setStep] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (index) => {
    setSelectedOpt(index);
    setShowExplanation(true);
    if (index === TRIVIA_QUESTIONS[currentQ].correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQ < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setStep('result');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/90 p-4" onClick={onClose}>
      <div className="bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl p-6 md:p-8 text-center relative border border-zinc-800" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>

        {step === 'intro' && (
          <div className="animate-in fade-in">
            <Gamepad2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Trivial de Pareja</h2>
            <p className="text-sm md:text-base text-gray-400 mb-6">Un episodio interactivo. ¿Recuerdas bien los detalles de nuestra relación? Demuéstralo.</p>
            <button onClick={() => setStep('playing')} className="bg-purple-600 text-white w-full py-3 rounded font-bold hover:bg-purple-700">Comenzar Juego</button>
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
            {score === TRIVIA_QUESTIONS.length ? <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" /> : <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">¡Puntuación Final!</h2>
            <p className="text-5xl md:text-6xl font-black text-purple-500 my-4">{score} / {TRIVIA_QUESTIONS.length}</p>
            <p className="text-gray-300 mb-8 text-sm md:text-base">
              {score === TRIVIA_QUESTIONS.length ? "¡Increíble! Eres la persona que mejor me conoce en el mundo." : "Bueno... tendremos que repasar algunos episodios pasados esta noche."}
            </p>
            <button onClick={onClose} className="bg-purple-600 text-white w-full py-3 rounded font-bold hover:bg-purple-700">Volver al catálogo</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrivialModal;