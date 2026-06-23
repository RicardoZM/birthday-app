import { useState, useEffect } from 'react';
import { Gamepad2, Dices, Lock  } from 'lucide-react';

// Importamos nuestros componentes separados
// import TrivialModal from './components/TrivialModal';
import DetailsModal  from './components/DetailsModal';
import GeneratorModal from './components/GeneratorModal';
import TrivialModal from './components/TrivialModal'
import MatchScore from './components/MatchScore'
import GlobalLockScreen from './components/GlobalLockScreen'
import useLiveCounter from './hooks/useLiveCounter';
import useCountDown from './hooks/useCountDown';
// Importamos los datos y hooks
import {  CATEGORIES, START_DATE, BIRTHDAY_DATE } from './data/database';

export default function OurFlixApp() {
 const timeSync = useLiveCounter(START_DATE);
  const countdownToBirthday = useCountDown(BIRTHDAY_DATE);
  
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Estado del Pase de Prensa VIP para saltarse el candado
  const [isBypassed, setIsBypassed] = useState(() => {
    return localStorage.getItem('ourflix_vip_access') === 'true';
  });

  // Forzar que el VIP persista
  const handleBypassUnlock = () => {
    localStorage.setItem('ourflix_vip_access', 'true');
    setIsBypassed(true);
  };

  useEffect(() => {
    document.body.style.overflow = (selectedMemory || showTrivia || showGenerator) ? 'hidden' : 'auto';
  }, [selectedMemory, showTrivia, showGenerator]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar si el sitio entero está bajo candado de cumpleaños
  const isGlobalLocked = !countdownToBirthday.isFinished && !isBypassed;

  // Si está bloqueado de forma global, renderizamos la pantalla de bloqueo
  if (isGlobalLocked) {
    return <GlobalLockScreen countdown={countdownToBirthday} onBypass={handleBypassUnlock} />;
  }

  // Si está desbloqueado (o se usó el Pase VIP), cargamos la aplicación normal
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white pb-20 overflow-x-hidden animate-in fade-in duration-700">
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      {/* NAVBAR */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-zinc-950 border-b border-zinc-900' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-12 py-3 md:py-4 gap-3 md:gap-0">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-xl md:text-2xl font-black tracking-widest">OURFLIX</div>
            {/* Reloj versión móvil */}
            {/* <div className="md:hidden text-xs text-gray-400 font-mono">{timeSync.days}d {timeSync.hours}h</div> */}
          </div>
          
          <nav className="flex gap-3 md:gap-6 text-xs md:text-sm font-bold">
            <button onClick={() => setShowTrivia(true)} className="flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 bg-zinc-900 md:bg-transparent py-2 md:py-0 rounded text-gray-300 hover:text-white border border-zinc-800 md:border-none">
              <Gamepad2 className="w-4 h-4 text-purple-500" /> Trivial
            </button>
            <button onClick={() => setShowGenerator(true)} className="flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 bg-zinc-900 md:bg-transparent py-2 md:py-0 rounded text-gray-300 hover:text-white border border-zinc-800 md:border-none">
              <Dices className="w-4 h-4 text-red-500" /> Plan Sorpresa
            </button>
            {/* Reloj versión Desktop */}
            <div className="hidden md:flex flex-col items-end bg-black/40 px-3 py-1 rounded border border-white/10 ml-4">
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">Sincronizados</span>
              <span className="text-red-500 font-bold text-xs tracking-widest">{timeSync.days}d {timeSync.hours}h {timeSync.minutes}m</span>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO HEROICO */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-12 flex flex-col justify-end min-h-[55vh] md:min-h-[70vh] border-b border-zinc-800/50 mb-8 overflow-hidden">
        {/* Fondo del Hero (Imagen + Degradados oscuros para Netflix-vibe) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 animate-pulse duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-2xl text-center md:text-left mt-16 md:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-white drop-shadow-lg">Tu Historia.</h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 drop-shadow-md leading-relaxed">
            Una temporada interactiva exclusiva de nuestra vida. Explora nuestros mejores recuerdos, demuestra cuánto nos conoces y deja que el algoritmo decida nuestro próximo plan juntos.
          </p>
          
          {/* BOTONES DE ACCIÓN EN GRANDE */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => setShowTrivia(true)} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-gray-200 transition-colors shadow-lg"
            >
              <Gamepad2 className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
              Jugar Trivial
            </button>
            
            <button 
              onClick={() => setShowGenerator(true)} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-500/60 text-white px-6 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-zinc-500/80 transition-colors backdrop-blur-sm shadow-lg"
            >
              <Dices className="w-6 h-6 md:w-7 md:h-7 text-red-500" />
              Plan Sorpresa
            </button>
          </div>
        </div>
      </div>

      {/* CARRUSELES */}
      <main>
        {CATEGORIES.map(category => (
          <div key={category.id} className="mb-8 md:mb-12 px-4 md:px-12">
            <h2 className="text-lg md:text-2xl font-bold text-gray-200 mb-3 md:mb-4">{category.title}</h2>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {category.items.map(item => {
                const isLocked = item.isLocked && new Date() < item.unlockDate;
                return (
                  <div key={item.id} onClick={() => setSelectedMemory(item)} className="snap-center relative flex-none w-[160px] md:w-[280px] aspect-[2/3] md:aspect-video rounded-md overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform bg-zinc-900 shadow-lg border border-zinc-800/50">
                    <img src={item.media[0]} className={`w-full h-full object-cover ${isLocked ? 'blur-md opacity-40 grayscale' : 'opacity-90'}`} />
                    
                    {isLocked ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                        <Lock className="w-6 h-6 md:w-8 md:h-8 text-red-500 mb-2 drop-shadow-lg animate-pulse" />
                        <span className="text-[9px] md:text-xs font-bold tracking-widest text-white bg-black/80 px-2 py-1 rounded">PRÓXIMAMENTE</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-4">
                        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1">{item.title}</h3>
                        <div className="hidden md:block"><MatchScore score={item.match} /></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER PARA SESIONES VIP */}
      <footer className="text-center text-gray-600 text-xs md:text-sm mt-12 pb-8 flex flex-col items-center gap-3">
        {isBypassed && (
          <button 
            onClick={() => { localStorage.removeItem('ourflix_vip_access'); setIsBypassed(false); }}
            className="text-[10px] text-red-500/80 hover:text-red-500 font-mono border border-red-500/30 px-3 py-1 rounded"
          >
            Cerrar sesión VIP (Volver a bloquear)
          </button>
        )}
        <p>Una idea creada con ❤️ por un niño rata</p>
      </footer>

      {/* MODALES ENCAPSULADOS */}
      {selectedMemory && <DetailsModal item={selectedMemory} onClose={() => setSelectedMemory(null)} />}
      {showTrivia && <TrivialModal onClose={() => setShowTrivia(false)} />}
      {showGenerator && <GeneratorModal onClose={() => setShowGenerator(false)} />}
    </div>
  );
}