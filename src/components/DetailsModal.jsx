import { 
  X, 
  PlayCircle, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  Mail, 
  Music, 
  Images, 
  Sparkles, 
  Maximize2 
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import isVideoFile from '../hooks/isVideoFile';
import { SPOTIFY_PLAYLIST_URL, SPOTIFY_URI } from '../data/database';

// Función para calcular la disposición Bento Grid perfecta según el número de fotos
const getBentoLayout = (totalCount) => {
  if (totalCount <= 1) {
    return {
      containerClass: "grid grid-cols-1 gap-4 max-w-3xl mx-auto auto-rows-[280px] sm:auto-rows-[380px]",
      getItemClass: () => "col-span-1 row-span-1"
    };
  }
  if (totalCount === 2) {
    return {
      containerClass: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[260px]",
      getItemClass: () => "col-span-1 row-span-1"
    };
  }
  if (totalCount === 3) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[220px]",
      getItemClass: (idx) => (idx === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1")
    };
  }
  if (totalCount === 4) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]",
      getItemClass: () => "col-span-1 row-span-1"
    };
  }
  if (totalCount === 5) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]",
      getItemClass: (idx) => {
        // En 3 columnas: idx 0 (2x2), idx 1 y 2 (1x1 en col 3), idx 3 (1x1) y idx 4 (2x1) completan la fila 3
        if (idx === 0) return "col-span-2 row-span-2";
        if (idx === 4) return "col-span-1 sm:col-span-2 row-span-1";
        return "col-span-1 row-span-1";
      }
    };
  }
  if (totalCount === 6) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]",
      getItemClass: (idx) => {
        // idx 0 (2x2), los 5 restantes llenan las celdas 1x1 (3x3 = 9 celdas completas)
        if (idx === 0) return "col-span-2 row-span-2";
        return "col-span-1 row-span-1";
      }
    };
  }
  if (totalCount === 7) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]",
      getItemClass: (idx) => {
        if (idx === 0) return "col-span-2 row-span-2";
        if (idx === 6) return "col-span-2 sm:col-span-3 row-span-1";
        return "col-span-1 row-span-1";
      }
    };
  }
  if (totalCount === 8) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[190px]",
      getItemClass: (idx) => {
        if (idx === 0) return "col-span-2 row-span-2";
        if (idx === 7) return "col-span-2 sm:col-span-2 row-span-1";
        return "col-span-1 row-span-1";
      }
    };
  }
  if (totalCount === 9) {
    return {
      containerClass: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[190px]",
      getItemClass: (idx) => {
        if (idx === 0) return "col-span-2 row-span-2";
        return "col-span-1 row-span-1";
      }
    };
  }
  // 10 o más fotos
  return {
    containerClass: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[190px]",
    getItemClass: (idx) => {
      if (idx === 0) return "col-span-2 row-span-2";
      return "col-span-1 row-span-1";
    }
  };
};

const DetailsModal = ({ item, onClose }) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  const mediaCount = item?.media?.length || 0;
  const layout = useMemo(() => getBentoLayout(mediaCount), [mediaCount]);

  // Navegación con el teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedMediaIndex === null) {
        if (e.key === 'Escape') onClose();
        return;
      }
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
  }, [selectedMediaIndex, item?.media?.length, onClose]);

  if (!item) return null;

  const isCurrentlyLocked = Boolean(
    item.isLocked && item.unlockDate && new Date() < new Date(item.unlockDate)
  );

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
    <div 
      className="fixed inset-0 z-[100] flex justify-center items-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border border-zinc-800/90 w-full max-w-5xl rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto relative shadow-2xl shadow-black/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-red-600 transition-all shadow-lg cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isCurrentlyLocked ? (
          <div className="p-8 md:p-16 text-center flex flex-col items-center justify-center min-h-[45vh]">
            <div className="w-20 h-20 bg-red-600/10 border border-red-500/30 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <Lock className="w-10 h-10 text-red-500" />
            </div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40 mb-3">
              Contenido Exclusivo
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
              Recuerdo Bloqueado
            </h2>
            <p className="text-sm md:text-base text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
              Sin spoilers. Este contenido es exclusivo y solo se estrenará automáticamente el día de tu cumpleaños a las 00:00h. ¡Paciencia!
            </p>
            <div className="bg-zinc-900/90 border border-zinc-800 px-6 py-4 rounded-2xl shadow-inner">
              <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest block mb-1">
                Fecha de estreno programada
              </span>
              <span className="text-lg md:text-2xl font-mono text-red-500 font-bold">
                {item.unlockDate?.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        ) : item.letterText ? (
          <div className="p-6 md:p-10 flex flex-col gap-6 pt-12 md:pt-14">
            {/* CARTA DE CUMPLEAÑOS CON FUENTE TIPO MANUSCRITO */}
            <div className="bg-[#fdfbf7] border border-[#e8dfc8] rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] text-zinc-800 transform rotate-[-0.5deg]">
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 pb-4">
                <Mail className="w-6 h-6 text-red-700" />
                <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-widest text-xs">Esta carta es para ti</h3>
              </div>
              <div className="font-handwriting text-2xl md:text-3xl text-zinc-800/90 leading-relaxed whitespace-pre-line">
                {item.letterText}
              </div>

              {/* Sello o firma visual */}
              <div className="mt-8 flex justify-end opacity-80">
                <span className="font-handwriting text-3xl text-red-700 font-bold -rotate-3">Con amor de un niño rata ❤️</span>
              </div>
            </div>

            {/* BOTÓN SPOTIFY Y CÓDIGO ESCANEABLE */}
            {item.id === 'regalo_final' && (
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#1DB954]/20 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6 text-center shadow-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-[#1DB954]/20 p-4 rounded-2xl border border-[#1DB954]/40">
                    <Music className="w-8 h-8 text-[#1DB954]" />
                  </div>
                  <h4 className="text-white font-bold text-xl md:text-2xl mt-1">Nuestra Banda Sonora</h4>
                  <p className="text-sm text-gray-300 max-w-md">
                    Escanea este código de barras desde la cámara de tu app de Spotify, o pulsa sobre él para escuchar la playlist que he creado para ti.
                  </p>
                </div>

                <a
                  href={SPOTIFY_PLAYLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl hover:ring-4 ring-[#1DB954]/50 transition-all duration-300 bg-black p-3 md:p-5 shadow-xl shadow-[#1DB954]/10 cursor-pointer"
                >
                  <img
                    src={`https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/${SPOTIFY_URI}`}
                    alt="Código Escaneable de Spotify"
                    className="h-12 md:h-16 object-contain"
                  />

                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                    <PlayCircle className="w-8 h-8 text-[#1DB954] mb-1" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">Abrir en Spotify</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col p-5 sm:p-8">
            {/* CABECERA DEL RECUERDO ESTILO BENTO */}
            <div className="mb-6 pb-6 border-b border-zinc-800/80">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {item.title}
                </span>
                {item.year && (
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-gray-300 text-xs font-semibold">
                    {item.year}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-gray-400 text-xs flex items-center gap-1">
                  <Images className="w-3.5 h-3.5" /> {item.media?.length || 0} fotos
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {item.title}
              </h2>
              {item.desc && (
                <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-3xl leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>

            {/* BENTO GRID DE FOTOS PERFECTAMENTE ALINEADO */}
            <div className={layout.containerClass}>
              {item.media?.map((fileUrl, idx) => {
                const isVid = isVideoFile(fileUrl);
                const itemClass = layout.getItemClass(idx);

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedMediaIndex(idx)}
                    className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-red-500/50 transition-all duration-300 cursor-pointer shadow-md ${itemClass}`}
                  >
                    {isVid ? (
                      <>
                        <video 
                          src={fileUrl} 
                          className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                          <PlayCircle className="w-10 h-10 sm:w-14 sm:h-14 text-white/90 drop-shadow-xl group-hover:scale-110 transition-transform" />
                        </div>
                      </>
                    ) : (
                      <img
                        src={fileUrl}
                        alt={`${item.title} - foto ${idx + 1}`}
                        className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    )}

                    {/* Gradient Overlay & Indicator on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-[11px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                        {idx + 1} / {item.media.length}
                      </span>
                      <div className="bg-red-600/80 p-1.5 rounded-lg text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* VISOR AMPLIADO (LIGHTBOX) CON NAVEGACIÓN */}
      {selectedMediaIndex !== null && !isCurrentlyLocked && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 select-none animate-in fade-in duration-200"
          onClick={() => setSelectedMediaIndex(null)}
        >
          {/* Botón ANTERIOR */}
          {item.media.length > 1 && (
            <button
              onClick={handlePrevMedia}
              className="absolute left-3 sm:left-6 z-[210] bg-black/70 hover:bg-red-600 p-3 sm:p-4 rounded-full text-white transition-all border border-white/20 hover:scale-110 shadow-2xl cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Imagen o vídeo ampliado */}
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-5xl max-h-[85vh] flex flex-col items-center">
            {isVideoFile(item.media[selectedMediaIndex]) ? (
              <video
                key={selectedMediaIndex}
                src={item.media[selectedMediaIndex]}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border border-white/10"
              />
            ) : (
              <img
                src={item.media[selectedMediaIndex]}
                alt={`Imagen ${selectedMediaIndex + 1} de ${item.media.length}`}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain border border-white/10"
              />
            )}

            {/* Indicador de posición y título */}
            <div className="mt-3 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-800 text-xs">
              <span className="text-gray-300 font-medium">{item.title}</span>
              <span className="text-gray-500">•</span>
              <span className="text-red-400 font-mono font-bold">
                {selectedMediaIndex + 1} de {item.media.length}
              </span>
            </div>
          </div>

          {/* Botón SIGUIENTE */}
          {item.media.length > 1 && (
            <button
              onClick={handleNextMedia}
              className="absolute right-3 sm:right-6 z-[210] bg-black/70 hover:bg-red-600 p-3 sm:p-4 rounded-full text-white transition-all border border-white/20 hover:scale-110 shadow-2xl cursor-pointer"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Botón CERRAR VISOR */}
          <button
            onClick={() => setSelectedMediaIndex(null)}
            className="absolute top-4 right-4 z-[210] bg-black/70 hover:bg-red-600 p-2.5 rounded-full text-white transition-all border border-white/20 shadow-lg cursor-pointer"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailsModal;