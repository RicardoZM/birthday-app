import { X} from 'lucide-react';
import MatchScore from './MatchScore';

const DetailsModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start pt-10 md:pt-20 bg-black/80 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-zinc-900 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden relative mb-10 animate-in fade-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-zinc-950/50 hover:bg-zinc-800 p-2 rounded-full text-white transition-colors backdrop-blur-md">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="relative h-[250px] md:h-[400px]">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          <h2 className="absolute bottom-4 left-4 md:bottom-6 md:left-8 text-2xl md:text-5xl font-bold text-white drop-shadow-lg">{item.title}</h2>
        </div>

        {/* Padding reducido en móvil (p-5 md:p-8) */}
        <div className="p-5 md:p-8 md:flex gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <MatchScore score={item.match} />
              <span className="text-gray-400">{item.year}</span>
              <span className="border border-white/20 px-2 py-0.5 rounded text-gray-300 text-xs">HD</span>
            </div>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6">{item.desc}</p>
          </div>
          
          <div className="md:w-1/3 flex flex-col gap-3 text-xs md:text-sm text-gray-400">
            <p><span className="text-gray-500">Elenco:</span> <span className="text-white hover:underline cursor-pointer">Tú</span>, <span className="text-white hover:underline cursor-pointer">Yo</span></p>
            <p><span className="text-gray-500">Géneros:</span> <span className="text-white">{item.tags}</span></p>
            <p><span className="text-gray-500">Clasificación:</span> <span className="text-white">Este recuerdo es inolvidable.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;