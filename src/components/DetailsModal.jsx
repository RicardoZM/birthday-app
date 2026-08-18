import { X, PlayCircle, Lock, ChevronRight, ChevronLeft, Mail, Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import isVideoFile from '../hooks/isVideoFile';
import { SPOTIFY_PLAYLIST_URL, SPOTIFY_URI } from '../data/database';

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
  }, [selectedMediaIndex, item.media?.length]);

  if (!item) return null;

  const isCurrentlyLocked = Boolean(item.isLocked && item.unlockDate && new Date() < new Date(item.unlockDate));

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
        ) : item.letterText ? (
          <div className="p-6 md:p-10 flex flex-col gap-6 pt-12 md:pt-14">
            {/* CARTA DE CUMPLEAÑOS CON FUENTE TIPO MANUSCRITO */}
            <div className="bg-[#fdfbf7] border border-[#e8dfc8] rounded-xl p-8 md:p-12 relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] text-zinc-800 transform rotate-[-0.5deg]">
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 pb-4">
                <Mail className="w-6 h-6 text-red-700" />
                <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-widest text-xs">Una Carta para Ti</h3>
              </div>
              {/* Aplicando la clase font-handwriting configurada arriba */}
              <div className="font-handwriting text-2xl md:text-3xl text-zinc-800/90 leading-relaxed whitespace-pre-line">
                {item.letterText}
              </div>

              {/* Sello o firma visual */}
              <div className="mt-8 flex justify-end opacity-70">
                <span className="font-handwriting text-3xl text-red-700 font-bold -rotate-3">Con amor.</span>
              </div>
            </div>

            {/* BOTÓN SPOTIFY Y CÓDIGO ESCANEABLE */}
            {item.id === 'regalo_final' && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8 flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-[#1DB954]/20 p-4 rounded-full">
                    <Music className="w-8 h-8 text-[#1DB954]" />
                  </div>
                  <h4 className="text-white font-bold text-xl mt-2">Nuestra Banda Sonora</h4>
                  <p className="text-sm text-gray-400 max-w-md">
                    Escanea este código de barras desde la cámara de tu app de Spotify, o pulsa sobre él para escuchar la playlist que he creado para ti.
                  </p>
                </div>

                <a
                  href={SPOTIFY_PLAYLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg hover:ring-4 ring-[#1DB954]/50 transition-all duration-300 bg-black p-2 md:p-4 shadow-lg shadow-[#1DB954]/10 cursor-pointer"
                >
                  {/* Código Escaneable generado dinámicamente por la API de Spotify */}
                  <img
                    src={`https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/${SPOTIFY_URI}`}
                    alt="Código Escaneable de Spotify"
                    className="h-12 md:h-16 object-contain"
                  />

                  {/* Overlay que aparece al pasar el ratón indicando que se puede clicar */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                    <PlayCircle className="w-8 h-8 text-[#1DB954] mb-1" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">Abrir en Spotify</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Galería de cuadrícula */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 p-1 md:p-2">
              {item.media?.map((fileUrl, idx) => {
                const isVid = isVideoFile(fileUrl);
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded cursor-pointer hover:scale-[1.02] transition-transform relative bg-zinc-800 ${idx === 0 ? 'col-span-2 row-span-2' : ''
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
              {item.year && (
                <div className="flex gap-4 mb-4">
                  <span className="text-gray-400 text-sm">{item.year}</span>
                </div>
              )}
              {item.desc && (
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{item.desc}</p>
              )}
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