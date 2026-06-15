import { Dices, Heart,X,Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = ({ time, onOpenGenerator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Nuevo estado para el menú móvil

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-zinc-950 border-b border-zinc-800' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        
        {/* Izquierda: Logo y Enlaces de Escritorio */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-red-600 text-xl md:text-2xl font-black tracking-widest hover:scale-105 transition-transform">OURFLIX</a>
          <nav className="hidden md:flex gap-5 text-sm">
            <a href="#" className="text-white font-bold">Inicio</a>
            <a href="#viajes" className="text-gray-300 hover:text-white transition-colors">Viajes</a>
            <a href="#risas" className="text-gray-300 hover:text-white transition-colors">Risas</a>
            <button onClick={onOpenGenerator} className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Dices className="w-4 h-4" /> Sorpréndeme
            </button>
          </nav>
        </div>

        {/* Derecha: Contador, Perfil y Menú Hamburguesa */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Contador (Oculto en móviles muy pequeños, visible a partir de tamaño "sm") */}
          <div className="hidden sm:flex flex-col items-end bg-black/40 px-3 py-1 rounded border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Tiempo Sincronizados</span>
            <span className="text-red-500 font-bold text-sm tracking-widest">
              {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
            </span>
          </div>
          
          <div className="w-8 h-8 md:w-9 md:h-9 rounded bg-red-600 flex items-center justify-center text-white cursor-pointer hover:ring-2 ring-white transition-all">
            <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          </div>

          {/* Botón Menú Móvil */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable para Móviles */}
      <div className={`md:hidden absolute w-full bg-zinc-950 border-b border-zinc-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col p-4 gap-4 text-center">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-bold">Inicio</a>
          <a href="#viajes" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">Viajes</a>
          <a href="#risas" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">Risas</a>
          
          {/* Botón de Generador de citas destacado en móvil */}
          <button 
            onClick={() => { onOpenGenerator(); setIsMobileMenuOpen(false); }} 
            className="flex items-center justify-center gap-2 bg-zinc-900 text-white p-3 rounded font-bold hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <Dices className="w-5 h-5 text-red-500" /> ¡Sorpréndeme!
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;