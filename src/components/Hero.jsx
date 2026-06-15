import { Info, Play } from 'lucide-react';
import MatchScore from './MatchScore';

const Hero = ({ onOpenDetails }) => {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center px-4 md:px-12 pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center -z-20 transform scale-105 brightness-[0.6]"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200")'}}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent -z-10" />

      <div className="max-w-2xl z-10 mt-10 md:mt-16">
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs md:text-sm tracking-[0.2em] mb-4">
          <span className="text-xl md:text-2xl leading-none">N</span> ORIGINAL DE OURFLIX
        </div>
        
        {/* Tamaño de texto adaptable (text-4xl en móvil) */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
          Nuestra Gran<br/>Historia
        </h1>
        
        <div className="flex items-center gap-4 mb-6 text-sm md:text-base">
          <MatchScore score={99} />
          <span className="text-gray-400">Temporada 1</span>
          <span className="border border-white/40 px-2 py-0.5 rounded text-gray-300 text-xs">+18 Love</span>
        </div>
        
        <p className="text-base md:text-lg text-gray-200 mb-8 max-w-xl drop-shadow-md leading-relaxed">
          Un documental íntimo sobre la maravillosa aventura de estar juntos. Risas incontenibles, viajes increíbles y un amor que se renueva cada segundo.
        </p>
        
        {/* Botones apilables en móvil (flex-col sm:flex-row) */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button 
            onClick={() => onOpenDetails({
              title: "Nuestra Gran Historia",
              image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200",
              desc: "El tráiler del resto de nuestras vidas. Desde el primer minuto supe que serías mi película favorita para siempre.",
              match: 100, year: "En emisión", tags: "Romance, Documental"
            })}
            className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded md:text-lg font-bold hover:bg-white/80 transition-colors w-full sm:w-auto"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Reproducir
          </button>
          <button 
            className="flex items-center justify-center gap-2 bg-zinc-500/70 text-white px-6 py-3 rounded md:text-lg font-bold hover:bg-zinc-500/50 transition-colors w-full sm:w-auto"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6" /> Más info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;