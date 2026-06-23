import { X, PlayCircle, Lock } from 'lucide-react';
import { useState } from 'react';
import MatchScore from './MatchScore';
import isVideoFile from '../hooks/isVideoFile';

const DetailsModal = ({ item, onClose }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  if (!item) return null;

  // Lógica de validación de bloqueo
  const isCurrentlyLocked = item.isLocked && new Date() < item.unlockDate;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/90 p-4" onClick={onClose}>
      <div className="bg-zinc-900 w-full max-w-4xl rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 md:top-4 md:right-4 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black/80"><X className="w-5 h-5 md:w-6 md:h-6" /></button>

        {isCurrentlyLocked ? (
          // PANTALLA CANDADO
          <div className="p-8 md:p-20 text-center flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh]">
            <Lock className="w-16 h-16 md:w-20 md:h-20 text-red-600 mb-6 animate-pulse" />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Episodio Bloqueado</h2>
            <p className="text-sm md:text-lg text-gray-300 max-w-lg mx-auto mb-8">
              Sin spoilers. Este contenido es exclusivo y solo se estrenará el día de tu cumpleaños a las 00:00h. ¡Paciencia!
            </p>
            <div className="bg-black/50 border border-zinc-800 px-6 py-3 rounded-lg">
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest block mb-1">Fecha de estreno programada</span>
              <span className="text-lg md:text-xl font-mono text-red-500 font-bold">
                {item.unlockDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        ) : (
          // PANTALLA NORMAL (Galería)
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 p-1 md:p-2">
              {item.media.map((fileUrl, idx) => {
                const isVid = isVideoFile(fileUrl);
                return (
                  <div key={idx} className={`overflow-hidden rounded cursor-pointer hover:scale-[1.02] transition-transform relative bg-zinc-800 ${idx === 0 ? 'col-span-2 row-span-2' : ''}`} onClick={() => setSelectedMedia(fileUrl)}>
                    {isVid ? (
                      <>
                        <video src={fileUrl} className="w-full h-full object-cover aspect-square opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-white/80 drop-shadow-lg" /></div>
                      </>
                    ) : (
                      <img src={fileUrl} className="w-full h-full object-cover aspect-square opacity-90 hover:opacity-100" />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h2>
              <div className="flex gap-4 mb-4"><MatchScore score={item.match} /><span className="text-gray-400 text-sm">{item.year}</span></div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          </>
        )}
      </div>
      
      {/* Lightbox visor */}
      {selectedMedia && !isCurrentlyLocked && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedMedia(null)}>
          <div onClick={e => e.stopPropagation()} className="relative">
             {isVideoFile(selectedMedia) ? (
              <video src={selectedMedia} controls autoPlay className="max-w-full max-h-[85vh] rounded shadow-2xl" />
            ) : (
              <img src={selectedMedia} className="max-w-full max-h-[85vh] rounded shadow-2xl" />
            )}
            <button onClick={() => setSelectedMedia(null)} className="absolute -top-10 md:-top-12 right-0 text-white hover:text-red-500"><X className="w-8 h-8" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsModal;