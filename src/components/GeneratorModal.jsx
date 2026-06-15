import { Sparkles, X} from 'lucide-react';
import { useState } from 'react';
import { DATE_IDEAS } from './../data/database';

const GeneratorModal = ({ onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [spinIndex, setSpinIndex] = useState(0);

  const texts = ["Calculando cursilería...", "Buscando en la nevera...", "Revisando el clima...", "Consultando a Cupido..."];

  const handleGenerate = () => {
    setIsGenerating(true);
    setSelectedPlan(null);
    let textIdx = 0;
    
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIdx]);
      textIdx = (textIdx + 1) % texts.length;
    }, 600);

    const spinInterval = setInterval(() => {
      setSpinIndex(prev => (prev + 1) % DATE_IDEAS.length);
    }, 100);

    setTimeout(() => {
      clearInterval(textInterval);
      clearInterval(spinInterval);
      setIsGenerating(false);
      setSelectedPlan(DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)]);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      {/* Padding reducido en móvil (p-6 md:p-8) */}
      <div 
        className="bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl p-6 md:p-8 border border-white/10 text-center relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="mb-4 md:mb-6 flex justify-center">
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">¿No sabéis qué hacer hoy?</h2>
        <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">Deja que el algoritmo de nuestra relación decida el plan perfecto por vosotros.</p>

        {isGenerating && (
          <div className="py-6 md:py-8 flex flex-col items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-white/10 border-t-red-600 rounded-full animate-spin" />
            <p className="text-sm md:text-base text-gray-300 italic">{loadingText}</p>
            <div className="h-8 text-lg md:text-xl font-bold text-gray-500 overflow-hidden mt-4">
              {DATE_IDEAS[spinIndex].title}
            </div>
          </div>
        )}

        {!isGenerating && selectedPlan && (
          <div className="bg-black/30 rounded-lg p-4 md:p-6 border-l-4 border-red-600 text-left mb-6 md:mb-8 animate-in slide-in-from-bottom-4 fade-in">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              {selectedPlan.icon}
              <span className="text-green-500 font-bold text-[10px] md:text-xs tracking-wider uppercase">¡Coincidencia Ideal!</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedPlan.title}</h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">{selectedPlan.desc}</p>
            <div className="pt-3 md:pt-4 border-t border-white/10 text-[10px] md:text-xs text-gray-400 flex flex-col gap-1">
              <p>Tipo: <span className="text-white">{selectedPlan.type}</span></p>
              <p>Preparación: <span className="text-white">{selectedPlan.prep}</span></p>
            </div>
          </div>
        )}

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full py-3 md:py-4 rounded font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all ${
            isGenerating ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02]'
          }`}
        >
          {isGenerating ? 'Analizando...' : (selectedPlan ? '🎲 Volver a tirar' : '🎲 ¡Sorpréndeme!')}
        </button>
      </div>
    </div>
  );
};

export default GeneratorModal;