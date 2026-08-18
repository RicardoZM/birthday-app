import { X, PlayCircle, Lock, ChevronRight,ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import isVideoFile from '../hooks/isVideoFile';

const DetailsModal = ({ item, onClose }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

    // Navegación con el teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedMediaIndex === null) return;
      if (e.key === 'ArrowLeft') {
        setSelectedMediaIndex((prev) => (prev > 0 ? prev - 1 : item.media.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedMediaIndex((prev) => (prev < item.media.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        setSelectedMediaIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMediaIndex, item.media.length]);
  
  if (!item) return null;

  const isCurrentlyLocked = item.isLocked && new Date() < item.unlockDate;

  // Funciones para avanzar/retroceder en la galería
  const handlePrevMedia = (e) => {
    e.stopPropagation();
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex((prev) => (prev > 0 ? prev - 1 : item.media.length - 1));
  };

  const handleNextMedia = (e) => {
    e.stopPropagation();
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex((prev) => (prev < item.media.length - 1 ? prev + 1 : 0));
  };



  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/90 p-4" onClick={onClose}>
      <div 
        className="bg-zinc-900 w-full max-w-4xl rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 md:top-4 md:right-4 z-50 bg-black/60 p-2 rounded-full text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {isCurrentlyLocked ? (
          <div className="p-8 md:p-20 text-center flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh]">
            <Lock className="w-16 h-16 md:w-20 md:h-20 text-red-600 mb-6 animate-pulse" />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Episodio Bloqueado</h2>
            <p className="text-sm md:text-lg text-gray-300 max-w-lg mx-auto mb-8">
              Sin spoilers. Este contenido es exclusivo y solo se estrenará el día de tu cumpleaños a las 00:00h. ¡Paciencia!
            </p>
            <div className="bg-black/50 border border-zinc-800 px-6 py-3 rounded-lg">
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest block mb-1">
                Fecha de estreno programada
              </span>
              <span className="text-lg md:text-xl font-mono text-red-500 font-bold">
                {item.unlockDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Galería de cuadrícula */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 p-1 md:p-2">
              {item.media.map((fileUrl, idx) => {
                const isVid = isVideoFile(fileUrl);
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded cursor-pointer hover:scale-[1.02] transition-transform relative bg-zinc-800 ${
                      idx === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                    onClick={() => setSelectedMediaIndex(idx)}
                  >
                    {isVid ? (
                      <>
                        <video src={fileUrl} className="w-full h-full object-cover aspect-square opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-white/80 drop-shadow-lg" />
                        </div>
                      </>
                    ) : (
                      <img 
                        src={fileUrl} 
                        alt={`${item.title} - imagen ${idx + 1}`}
                        className="w-full h-full object-cover aspect-square opacity-90 hover:opacity-100" 
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h2>
              <div className="flex gap-4 mb-4">
                <span className="text-gray-400 text-sm">{item.year}</span>
              </div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          </>
        )}
      </div>

      {/* Visor ampliado con botones de navegación (Anterior / Siguiente) */}
      {selectedMediaIndex !== null && !isCurrentlyLocked && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 select-none" 
          onClick={() => setSelectedMediaIndex(null)}
        >
          {/* Botón ANTERIOR */}
          {item.media.length > 1 && (
            <button
              onClick={handlePrevMedia}
              className="absolute left-2 md:left-6 z-[210] bg-black/60 hover:bg-black/90 p-3 rounded-full text-white transition-colors border border-white/20"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Imagen o vídeo ampliado */}
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-full max-h-[85vh]">
            {isVideoFile(item.media[selectedMediaIndex]) ? (
              <video
                key={selectedMediaIndex}
                src={item.media[selectedMediaIndex]}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded shadow-2xl"
              />
            ) : (
              <img
                src={item.media[selectedMediaIndex]}
                alt={`Imagen ${selectedMediaIndex + 1} de ${item.media.length}`}
                className="max-w-full max-h-[85vh] rounded shadow-2xl object-contain"
              />
            )}

            {/* Indicador de posición (ej: 2 / 5) */}
            {item.media.length > 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-mono">
                {selectedMediaIndex + 1} / {item.media.length}
              </div>
            )}
          </div>

          {/* Botón SIGUIENTE */}
          {item.media.length > 1 && (
            <button
              onClick={handleNextMedia}
              className="absolute right-2 md:right-6 z-[210] bg-black/60 hover:bg-black/90 p-3 rounded-full text-white transition-colors border border-white/20"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          <button
            onClick={() => setSelectedMediaIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailsModal;