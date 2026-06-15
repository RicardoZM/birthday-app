import { Dices, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = ({ time, onOpenGenerator }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-500 ${isScrolled ? 'bg-zinc-950 border-b border-zinc-800' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <a href="#" className="text-red-600 text-2xl font-black tracking-widest hover:scale-105 transition-transform">OURFLIX</a>
          <nav className="hidden md:flex gap-5 text-sm">
            <a href="#" className="text-white font-bold">Inicio</a>
            <a href="#viajes" className="text-gray-300 hover:text-white transition-colors">Viajes</a>
            <button onClick={onOpenGenerator} className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Dices className="w-4 h-4" /> Sorpréndeme
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end bg-black/40 px-3 py-1 rounded border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Tiempo Juntos</span>
            <span className="text-red-500 font-bold text-sm tracking-widest">
              {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
            </span>
          </div>
          <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center text-white cursor-pointer hover:ring-2 ring-white transition-all">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;