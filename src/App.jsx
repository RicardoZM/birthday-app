import { useState, useEffect } from 'react';

// Importamos nuestros componentes separados
// import TrivialModal from './components/TrivialModal';
import DetailsModal from './components/DetailsModal';
import { Gamepad2, Dices, Lock, Ticket } from 'lucide-react';

// Importamos nuestros componentes separados
import GeneratorModal from './components/GeneratorModal';
import TrivialModal from './components/TrivialModal'
import GlobalLockScreen from './components/GlobalLockScreen'
import useLiveCounter from './hooks/useLiveCounter';
import useCountDown from './hooks/useCountDown';
import Confetti from './components/Confetti'
// Importamos los datos y hooks
import { CATEGORIES, START_DATE, BIRTHDAY_DATE, UNLOCK_DATE } from './data/database';

export default function OurFlixApp() {
  const timeSync = useLiveCounter(START_DATE);
  const countdownToBirthday = useCountDown(UNLOCK_DATE);

  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasWonTrivia, setHasWonTrivia] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Estado del Pase VIP en localStorage para recordar si fue desbloqueado por contraseña
  const [isBypassed, setIsBypassed] = useState(() => {
    try {
      return localStorage.getItem('ourflix_vip_access') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleBypassUnlock = () => {
    try {
      localStorage.setItem('ourflix_vip_access', 'true');
    } catch (e) { }
    setIsBypassed(true);
  };

  const handleWinTrivia = () => {
    setHasWonTrivia(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar si el sitio está en bloqueo global por fecha y no tiene pase VIP
  const isGlobalLocked = !countdownToBirthday.isFinished && !isBypassed;

  if (isGlobalLocked) {
    return (
      <GlobalLockScreen
        countdown={countdownToBirthday}
        onBypass={handleBypassUnlock}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white pb-20 overflow-x-hidden animate-in fade-in duration-500">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
      `}</style>

      {/* CAPA DE CONFETI */}
      {showConfetti && <Confetti />}

      {/* NAVBAR */}
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-zinc-950 border-b border-zinc-900" : "bg-gradient-to-b from-black/80 to-transparent"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-12 py-3 md:py-4 gap-3 md:gap-0">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-xl md:text-2xl font-black tracking-widest">
              OURFLIX
            </div>
            <div className="md:hidden text-xs text-gray-400 font-mono">
              {timeSync.days}d {timeSync.hours}h
            </div>
          </div>

          <nav className="flex gap-3 md:gap-6 text-xs md:text-sm font-bold">
            <button
              onClick={() => setShowTrivia(true)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-purple-500" /> Trivial
            </button>
            <button
              onClick={() => setShowGenerator(true)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Dices className="w-4 h-4 text-red-500" /> Plan Sorpresa
            </button>
            <div className="hidden md:flex flex-col items-end bg-black/40 px-3 py-1 rounded border border-white/10 ml-4">
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                Sincronizados
              </span>
              <span className="text-red-500 font-bold text-xs tracking-widest">
                {timeSync.days}d {timeSync.hours}h {timeSync.minutes}m
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <div className="relative pt-32 pb-12 px-4 md:px-12 text-center flex flex-col items-center border-b border-zinc-800/50 mb-8 bg-gradient-to-b from-transparent to-zinc-900/20">
        <div className="absolute inset-0 z-0">
          <img
            src="/public/PXL_20250715_175749024.webp"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40 animate-pulse duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
          Nuestra Historia.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 drop-shadow-md leading-relaxed">
          Esto es un pequeño resumen de nuestra historia vivida de momento.
          Espero y deseo con toda mi alma que podamos seguir sumando momentos juntos y que bueno los podamos plasmar aquí.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start p-4">
          <button
            onClick={() => setShowTrivia(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-500/60 text-white px-6 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-zinc-500/80 transition-colors backdrop-blur-sm shadow-lg"
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

      <main>
        {/* BILLETE GANADO TRAS EL TRIVIAL */}
        {/* {hasWonTrivia && ( */}
        <div className="mb-10 px-4 md:px-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-gradient-to-r from-yellow-900/40 to-transparent border border-yellow-600/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/20 p-2 rounded-full border border-yellow-500/50">
                <Ticket className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  Vale por un día de SPA y una noche en el Hotel La Caminera Club de Campo (Reclamado)
                </h3>
                <p className="text-sm text-gray-400">
                  Recuerda enseñarme este código para canjear tu premio, si no, no tendrá validez.
                </p>
              </div>
            </div>
            <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-yellow-600/30">
              <span className="text-xs text-gray-500 block mb-1 font-mono">
                CÓDIGO:
              </span>
              <span className="text-lg font-bold text-yellow-500 tracking-widest font-mono">
                NUESTRA-HISTORIA-21
              </span>
            </div>
          </div>
        </div>
        {/* )} */}

        {/* CATÁLOGOS Y GALERÍAS */}
        {CATEGORIES.map((category) => (
          <div key={category.id} className="mb-8 px-4 md:px-12">
            <h2 className="text-lg font-bold text-gray-200 mb-3">
              {category.title}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x">
              {category.items.map((item) => {
                const isItemLocked =
                  item.isLocked && new Date() < item.unlockDate;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMemory(item)}
                    className="snap-center relative flex-none w-[160px] aspect-[2/3] rounded-md overflow-hidden bg-zinc-900 border border-zinc-800/50 cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <img
                      src={item.media[0]}
                      className={`w-full h-full object-cover ${isItemLocked ? "blur-md opacity-40 grayscale" : "opacity-90"}`}
                    />

                    {isItemLocked ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                        <Lock className="w-6 h-6 text-red-500 mb-2" />
                        <span className="text-[9px] font-bold tracking-widest text-white bg-black/80 px-2 py-1 rounded">
                          PRÓXIMAMENTE
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-3">
                        <h3 className="text-white font-bold text-sm leading-tight mb-1">
                          {item.title}
                        </h3>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-xs mt-12 pb-8 flex flex-col items-center gap-3">
        {isBypassed && (
          <button
            onClick={() => {
              try {
                localStorage.removeItem("ourflix_vip_access");
              } catch (e) {
                return false;
              }
              setIsBypassed(false);
            }}
            className="text-[10px] text-red-500/80 hover:text-red-500 font-mono border border-red-500/30 px-3 py-1 rounded"
          >
            Cerrar sesión VIP (Volver a activar bloqueo)
          </button>
        )}
        <p>Creado con mucho ❤️ por un niño rata</p>
      </footer>

      {/* MODALES ENCAPSULADOS */}
      {selectedMemory && (
        <DetailsModal
          item={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
      {showTrivia && (
        <TrivialModal
          onClose={() => setShowTrivia(false)}
          onWin={handleWinTrivia}
        />
      )}
      {showGenerator && (
        <GeneratorModal onClose={() => setShowGenerator(false)} />
      )}
    </div>
  );
}