import { useState, useEffect, useMemo } from 'react';
import {
  Gamepad2,
  Dices,
  Lock,
  Ticket,
  Heart,
  Music,
  Sparkles,
  Images,
  ExternalLink,
  ChevronRight,
  Plane
} from 'lucide-react';

import DetailsModal from './components/DetailsModal';
import GeneratorModal from './components/GeneratorModal';
import TrivialModal from './components/TrivialModal';
import GlobalLockScreen from './components/GlobalLockScreen';
import Confetti from './components/Confetti';
import useLiveCounter from './hooks/useLiveCounter';
import useCountDown from './hooks/useCountDown';
import {
  CATEGORIES,
  START_DATE,
  UNLOCK_DATE,
  SPOTIFY_PLAYLIST_URL
} from './data/database';

export default function OurFlixApp() {
  const timeSync = useLiveCounter(START_DATE);
  const countdownToBirthday = useCountDown(UNLOCK_DATE);

  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasWonTrivia, setHasWonTrivia] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Estado del Pase VIP en localStorage
  const [isBypassed, setIsBypassed] = useState(() => {
    try {
      return localStorage.getItem('ourflix_vip_access') === 'true';
    } catch {
      return false;
    }
  });

  const handleBypassUnlock = () => {
    try {
      localStorage.setItem('ourflix_vip_access', 'true');
    } catch {
      // Ignorar errores de almacenamiento
    }
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

  // Obtener todos los items con referencia a su categoría
  const allItems = useMemo(() => {
    const list = [];
    CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        list.push({
          ...item,
          categoryId: cat.id,
          categoryTitle: cat.title,
        });
      });
    });
    return list;
  }, []);

  // Items filtrados según la pestaña seleccionada
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return allItems;
    return allItems.filter((item) => item.categoryId === activeCategory);
  }, [activeCategory, allItems]);

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

  // Items específicos para la vista Bento completa (cuando está en 'all')
  const lpgcItem = allItems.find((i) => i.id === 'v1');
  const oportoItem = allItems.find((i) => i.id === 'v2');
  const budapestItem = allItems.find((i) => i.id === 'v3');
  const familiaItem = allItems.find((i) => i.id === 'fam_1' || i.id === 'r1');
  const nosotrosItem = allItems.find((i) => i.id === 'nos_1');
  const sorpresaItem = allItems.find((i) => i.id === 'regalo_final');

  return (
    <div className="min-h-screen w-full bg-zinc-950 font-sans text-white pb-16 overflow-x-hidden">
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
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4'
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-red-600 text-2xl sm:text-3xl font-black tracking-widest hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>OURFLIX</span>
            </a>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowTrivia(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-purple-950/40 border border-purple-800/50 hover:bg-purple-900/60 hover:text-white transition-all shadow-sm"
            >
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Trivial</span>
            </button>

            <button
              onClick={() => setShowGenerator(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-red-950/40 border border-red-800/50 hover:bg-red-900/60 hover:text-white transition-all shadow-sm"
            >
              <Dices className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Plan Sorpresa</span>
            </button>

            {/* Contador en vivo en navbar */}
            <div className="hidden lg:flex items-center gap-2 bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-800 text-xs shadow-inner">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Sincronizados:</span>
              <span className="text-red-400 font-mono font-bold">
                {timeSync.days}d {timeSync.hours}h {timeSync.minutes}m
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-gradient-to-b from-zinc-900/40 via-zinc-950 to-zinc-950 overflow-hidden">
        {/* Background Image with Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/public/PXL_20250715_175749024.webp"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-25 scale-105 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-zinc-950" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 fill-current text-red-500 animate-pulse" />
            Nuestra Colección de Momentos
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
            Nuestra Historia.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            Un pequeño resumen de los recuerdos, viajes y risas vividos juntos.
            Porque cada capítulo a tu lado merece ser recordado para siempre.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full">
            <button
              onClick={() => setShowTrivia(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-950/50 hover:scale-105 active:scale-95"
            >
              <Gamepad2 className="w-5 h-5" />
              Jugar Trivial
            </button>

            <button
              onClick={() => setShowGenerator(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base hover:from-red-500 hover:to-rose-500 transition-all shadow-lg shadow-red-950/50 hover:scale-105 active:scale-95"
            >
              <Dices className="w-5 h-5" />
              Plan Sorpresa
            </button>

            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-gray-200 hover:text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base border border-zinc-700/60 transition-all backdrop-blur-sm shadow-md hover:scale-105 active:scale-95"
            >
              <Music className="w-5 h-5 text-[#1DB954]" />
              Banda Sonora
            </a>
          </div>
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* BILLETE DORADO GANADO TRAS EL TRIVIAL */}
        {hasWonTrivia && (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-gradient-to-r from-yellow-950/70 via-amber-900/40 to-zinc-900 border-2 border-yellow-500/60 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3.5 rounded-2xl border border-yellow-500/50 text-yellow-400 shrink-0">
                  <Ticket className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                      Premio Reclamado
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg sm:text-xl">
                    Vale por un día de SPA y noche en el Hotel La Caminera
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                    Recuerda enseñarme este código para canjear tu premio oficial.
                  </p>
                </div>
              </div>
              <div className="bg-zinc-950/90 px-5 py-3 rounded-xl border border-yellow-500/40 text-center w-full md:w-auto shrink-0 shadow-inner">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">
                  CÓDIGO DE CANJEO
                </span>
                <span className="text-lg sm:text-xl font-bold text-yellow-400 tracking-widest font-mono">
                  NUESTRA-HISTORIA-21
                </span>
              </div>
            </div>
          </div>
        )}

        {/* FILTROS / PESTAÑAS DE CATEGORÍA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-zinc-800/60">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-red-500" />
              Nuestros Recuerdos
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explora nuestros viajes, momentos familiares y sorpresas especiales.
            </p>
          </div>

          {/* Selector de pestañas */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeCategory === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
            >
              ✨ Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                  }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VISTA 1: BENTO GRID COMPLETO (Cuando está seleccionado "Todos")            */}
        {/* ========================================================================= */}
        {activeCategory === 'all' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px]">

            {/* 1. CARD GRANDE: LPGC (Primer Viaje) - 2 cols x 2 rows */}
            {lpgcItem && (
              <div
                onClick={() => setSelectedMemory(lpgcItem)}
                className="group relative sm:col-span-2 sm:row-span-2 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-red-500/50 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-5 sm:p-6"
              >
                <img
                  src={lpgcItem.media[0]}
                  alt={lpgcItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent" />

                {/* Badges superiores */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold shadow-md">
                    <Plane className="w-3.5 h-3.5" /> Primer Viaje
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                    <Images className="w-3.5 h-3.5" /> {lpgcItem.media.length} fotos
                  </span>
                </div>

                {/* Contenido inferior */}
                <div className="relative z-10">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-widest block mb-1">
                    Las Palmas • {lpgcItem.year}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight group-hover:text-red-400 transition-colors">
                    {lpgcItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-lg mb-4 leading-relaxed">
                    {lpgcItem.desc}
                  </p>

                  {/* Miniaturas de preview */}
                  <div className="flex items-center gap-2 overflow-hidden">
                    {lpgcItem.media.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black/40"
                      >
                        <img src={img} className="w-full h-full object-cover" alt="" />
                      </div>
                    ))}
                    <div className="flex items-center gap-1 text-xs font-bold text-white bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition-colors">
                      Ver álbum <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. WIDGET: Sincronizados en tiempo real (1 col x 1 row) */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/40 border border-zinc-800/80 hover:border-red-500/40 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 bg-red-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/20 transition-all" />

              <div className="flex items-center justify-between z-10">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-800/40">
                  EN VIVO
                </span>
              </div>

              <div className="z-10 my-auto">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider block mb-1">
                  Tiempo Juntos
                </span>
                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                  {timeSync.days}d {timeSync.hours}h {timeSync.minutes}m
                </div>
              </div>

              <div className="text-[11px] text-gray-400 border-t border-zinc-800/60 pt-2 z-10">
                Cada segundo a tu lado cuenta ✨
              </div>
            </div>

            {/* 3. CARD: Oporto (1 col x 2 rows / Alto) */}
            {oportoItem && (
              <div
                onClick={() => setSelectedMemory(oportoItem)}
                className="group relative sm:row-span-2 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-purple-500/50 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-5"
              >
                <img
                  src={oportoItem.media[0]}
                  alt={oportoItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-xs font-bold shadow-md">
                    🇵🇹 Oporto
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                    {oportoItem.media.length} fotos
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest block mb-1">
                    Viaje • {oportoItem.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">
                    {oportoItem.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-3">
                    {oportoItem.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                    Ver fotos <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            )}

            {/* 4. WIDGET: Plan Sorpresa (1 col x 1 row) */}
            <div
              onClick={() => setShowGenerator(true)}
              className="rounded-2xl p-5 bg-gradient-to-br from-zinc-900 via-zinc-900 to-rose-950/40 border border-zinc-800/80 hover:border-rose-500/50 transition-all flex flex-col justify-between shadow-lg cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between z-10">
                <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 group-hover:rotate-12 transition-transform">
                  <Dices className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/40">
                  RULETA
                </span>
              </div>

              <div className="z-10 my-auto">
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                  Plan Sorpresa
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                  ¿Sin plan para hoy? Deja que el destino elija una cita.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-rose-400 group-hover:text-rose-300 z-10">
                <span>Girar ruleta</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 5. CARD: Budapest (2 cols x 1 row / Panorámica) */}
            {budapestItem && (
              <div
                onClick={() => setSelectedMemory(budapestItem)}
                className="group relative sm:col-span-2 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-blue-500/50 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-5"
              >
                <img
                  src={budapestItem.media[0]}
                  alt={budapestItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold shadow-md">
                    🇭🇺 Budapest
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                    <Images className="w-3.5 h-3.5" /> {budapestItem.media.length} fotos
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block mb-0.5">
                    Viaje • {budapestItem.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {budapestItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-1 max-w-lg leading-relaxed">
                    {budapestItem.desc}
                  </p>
                </div>
              </div>
            )}

            {/* 6. WIDGET: Trivial de Amor (1 col x 1 row) */}
            <div
              onClick={() => setShowTrivia(true)}
              className="rounded-2xl p-5 bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950/40 border border-zinc-800/80 hover:border-purple-500/50 transition-all flex flex-col justify-between shadow-lg cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between z-10">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/40">
                  DESAFÍO
                </span>
              </div>

              <div className="z-10 my-auto">
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  Trivial de Pareja
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                  Pon a prueba tus recuerdos y gana el billete VIP.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300 z-10">
                <span>Comenzar juego</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 7. CARD: Familia (2 cols x 2 rows) */}
            {familiaItem && (
              <div
                onClick={() => setSelectedMemory(familiaItem)}
                className="group relative sm:col-span-2 sm:row-span-2 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/50 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-5 sm:p-6"
              >
                <img
                  src={familiaItem.media[0]}
                  alt={familiaItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/90 text-white text-xs font-bold shadow-md">
                    <Heart className="w-3.5 h-3.5 fill-current" /> Familia
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                    <Images className="w-3.5 h-3.5" /> {familiaItem.media.length} fotos
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                    Colección Familiar
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
                    {familiaItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-lg mb-4 leading-relaxed">
                    {familiaItem.desc}
                  </p>

                  <div className="flex items-center gap-2 overflow-hidden">
                    {familiaItem.media.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black/40"
                      >
                        <img src={img} className="w-full h-full object-cover" alt="" />
                      </div>
                    ))}
                    <div className="flex items-center gap-1 text-xs font-bold text-white bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition-colors">
                      Ver galería <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. CARD: Nosotros & Momentos (2 cols x 1 row) */}
            {nosotrosItem && (
              <div
                onClick={() => setSelectedMemory(nosotrosItem)}
                className="group relative sm:col-span-2 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-pink-500/50 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-5"
              >
                <img
                  src={nosotrosItem.media[0]}
                  alt={nosotrosItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-600/90 text-white text-xs font-bold shadow-md">
                    ✨ Nosotros
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                    <Images className="w-3.5 h-3.5" /> {nosotrosItem.media.length} fotos
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest block mb-0.5">
                    Momentos Inolvidables
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1 group-hover:text-pink-400 transition-colors">
                    {nosotrosItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-1 max-w-lg leading-relaxed">
                    {nosotrosItem.desc}
                  </p>
                </div>
              </div>
            )}

            {/* 9. CARD: Próximamente / Sorpresa Final (2 cols x 1 row) */}
            {sorpresaItem && (
              <div
                onClick={() => setSelectedMemory(sorpresaItem)}
                className="group relative sm:col-span-2 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 border-2 border-amber-500/40 hover:border-amber-500 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-between p-5"
              >
                <div className="flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5" /> Estreno Exclusivo
                  </span>
                  <span className="text-xs text-amber-300/80 font-mono font-semibold">
                    Cumpleaños 🎂
                  </span>
                </div>

                <div className="relative z-10 my-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                    {sorpresaItem.title} 🎁
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-1">
                    Carta especial y sorpresa secreta programada para el día de tu cumpleaños.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300 z-10 border-t border-amber-500/20 pt-2">
                  <span>Abrir sorpresa</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {/* 10. WIDGET: Banda Sonora / Spotify (2 cols x 1 row) */}
            <a
              href={SPOTIFY_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group sm:col-span-2 rounded-2xl p-5 bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#1DB954]/20 border border-zinc-800/80 hover:border-[#1DB954]/60 transition-all flex items-center justify-between shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/20 border border-[#1DB954]/40 flex items-center justify-center text-[#1DB954] group-hover:scale-110 transition-transform shrink-0">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-wider block">
                    PLAYLIST DEDICADA
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#1DB954] transition-colors">
                    Nuestra Banda Sonora
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                    Todas nuestras canciones en Spotify para escuchar juntos.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 text-[#1DB954] text-xs font-bold group-hover:bg-[#1DB954] group-hover:text-black transition-all">
                <span>Escuchar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

          </div>
        ) : (
          /* ========================================================================= */
          /* VISTA 2: BENTO GRID FILTRADO POR CATEGORÍA                                */
          /* ========================================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]">
            {filteredItems.map((item, idx) => {
              const isItemLocked = item.isLocked && new Date() < item.unlockDate;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMemory(item)}
                  className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-red-500/50 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-end p-5 ${idx === 0 && filteredItems.length > 1 ? 'sm:col-span-2' : ''
                    }`}
                >
                  <img
                    src={item.media[0]}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ${isItemLocked ? 'blur-md opacity-40 grayscale' : 'opacity-80 group-hover:opacity-90'
                      }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                  {/* Badge de estado o número de fotos */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                      {item.categoryTitle || 'Recuerdo'}
                    </span>
                    {isItemLocked ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" /> Bloqueado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                        <Images className="w-3.5 h-3.5" /> {item.media?.length || 1} fotos
                      </span>
                    )}
                  </div>

                  <div className="relative z-10">
                    {item.year && (
                      <span className="text-xs font-semibold text-red-400 uppercase tracking-widest block mb-1">
                        {item.year}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-xs mt-16 pt-8 border-t border-zinc-900 flex flex-col items-center gap-3">
        {isBypassed && (
          <button
            onClick={() => {
              try {
                localStorage.removeItem('ourflix_vip_access');
              } catch {
                return false;
              }
              setIsBypassed(false);
            }}
            className="text-[11px] text-red-400 hover:text-red-300 font-mono border border-red-500/30 px-3.5 py-1.5 rounded-lg bg-red-950/20 transition-colors"
          >
            Cerrar sesión VIP (Volver a activar bloqueo)
          </button>
        )}
        <p className="flex items-center gap-1 text-gray-400">
          Creado con mucho <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> por un niño rata
        </p>
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