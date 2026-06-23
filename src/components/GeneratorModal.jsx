import { X, Dices} from 'lucide-react';
import { useState } from 'react';
import { DATE_IDEAS } from './../data/database';

const GeneratorModal = ({ onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [spinIndex, setSpinIndex] = useState(0);

  const texts = ["Calculando cursilería...", "Buscando en la nevera...", "Revisando el clima...", "Consultando a Cupido..."];

  const handleGenerate = () => {
    setIsGenerating(true); setSelectedPlan(null);
    let textIdx = 0;
    
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIdx]);
      textIdx = (textIdx + 1) % texts.length;
    }, 600);
    const spinInterval = setInterval(() => setSpinIndex(prev => (prev + 1) % DATE_IDEAS.length), 100);

    setTimeout(() => {
      clearInterval(textInterval); clearInterval(spinInterval);
      setIsGenerating(false);
      setSelectedPlan(DATE_IDEAS[Math.floor(Math.random() * DATE_IDEAS.length)]);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl p-6 md:p-8 border border-white/10 text-center relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        <Dices className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Plan Sorpresa</h2>
        <p className="text-sm md:text-base text-gray-400 mb-8">Deja que el algoritmo de nuestra relación decida el plan perfecto por vosotros hoy.</p>

        {isGenerating && (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-white/10 border-t-red-600 rounded-full animate-spin" />
            <p className="text-gray-300 italic text-sm">{loadingText}</p>
            <div className="h-8 text-lg font-bold text-gray-500 overflow-hidden mt-2">{DATE_IDEAS[spinIndex].title}</div>
          </div>
        )}

        {!isGenerating && selectedPlan && (
          <div className="bg-black/30 rounded-lg p-5 border-l-4 border-red-600 text-left mb-8 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-2">
              {selectedPlan.icon} <span className="text-green-500 font-bold text-[10px] md:text-xs tracking-wider uppercase">¡Coincidencia Ideal!</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedPlan.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{selectedPlan.desc}</p>
          </div>
        )}

        <button onClick={handleGenerate} disabled={isGenerating} className={`w-full py-3 md:py-4 rounded font-bold text-base md:text-lg transition-all ${isGenerating ? 'bg-zinc-800 text-gray-500' : 'bg-red-600 text-white hover:bg-red-700'}`}>
          {isGenerating ? 'Analizando...' : (selectedPlan ? 'Volver a tirar la ruleta' : '¡Decidir plan!')}
        </button>
      </div>
    </div>
  );
};

export default GeneratorModal;