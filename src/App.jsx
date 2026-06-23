import { useState, useEffect } from 'react';
import { Gamepad2, Dices, Lock  } from 'lucide-react';

// Importamos nuestros componentes separados
import TrivialModal from './components/TrivialModal';
import DetailsModal  from './components/DetailsModal';
import  GeneratorModal from './components/GeneratorModal';

// Importamos los datos y hooks
import {  CATEGORIES } from './data/database';

export default function OurFlixApp() {
 const [selectedMemory, setSelectedMemory] = useState(null);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white pb-20 overflow-x-hidden">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <div className="text-red-600 text-2xl font-black tracking-widest drop-shadow-md">OURFLIX</div>
          <nav className="flex gap-4 md:gap-6 text-sm font-bold">
            <button onClick={() => setShowTrivia(true)} className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
              <Gamepad2 className="w-4 h-4 text-purple-500" /> <span className="hidden md:inline">Jugar Trivial</span>
            </button>
            <button onClick={() => setShowGenerator(true)} className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
              <Dices className="w-4 h-4 text-red-500" /> <span className="hidden md:inline">Plan Sorpresa</span>
            </button>
          </nav>
        </div>
      </header>

      {/* HERO COMPLETO */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-12 flex flex-col justify-end min-h-[55vh] md:min-h-[70vh] border-b border-zinc-800/50 mb-8 overflow-hidden">
        {/* Fondo del Hero (Imagen + Degradados) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-2xl text-center md:text-left mt-16 md:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-white drop-shadow-lg">Tu Historia.</h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 drop-shadow-md leading-relaxed">
            Una temporada interactiva exclusiva. Explora nuestros mejores recuerdos, demuestra cuánto nos conoces y deja que el algoritmo decida nuestro próximo plan juntos.
          </p>
          
          {/* BOTONES DE ACCIÓN */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              onClick={() => setShowTrivia(true)} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-gray-200 transition-colors shadow-lg"
            >
              <Gamepad2 className="w-6 h-6 md:w-7 md:h-7" />
              Jugar Trivial
            </button>
            
            <button 
              onClick={() => setShowGenerator(true)} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-500/60 text-white px-6 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-zinc-500/80 transition-colors backdrop-blur-sm shadow-lg"
            >
              <Dices className="w-6 h-6 md:w-7 md:h-7" />
              Plan Sorpresa
            </button>
          </div>
        </div>
      </div>

      {/* CATÁLOGO */}
      <main>
        {CATEGORIES.map(category => (
          <div key={category.id} className="mb-10 px-4 md:px-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-200 mb-4">{category.title}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {category.items.map(item => {
                const isLocked = item.isLocked && new Date() < item.unlockDate;
                return (
                  <div key={item.id} onClick={() => setSelectedMemory(item)} className="relative flex-none w-[220px] md:w-[280px] aspect-video rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-all bg-zinc-800">
                    <img src={item.media[0]} className={`w-full h-full object-cover ${isLocked ? 'blur-md opacity-50 grayscale' : ''}`} />
                    
                    {/* Overlay si está bloqueado en la miniatura */}
                    {isLocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                        <Lock className="w-8 h-8 text-red-500 mb-2" />
                        <span className="text-xs font-bold tracking-widest text-white bg-black/80 px-2 py-1 rounded">ESTRENO PRONTO</span>
                      </div>
                    )}
                    
                    {!isLocked && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold">{item.title}</h3>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </main>

      {/* RENDERIZADO DE MODALES */}
      {selectedMemory && <DetailsModal item={selectedMemory} onClose={() => setSelectedMemory(null)} />}
      {showTrivia && <TrivialModal onClose={() => setShowTrivia(false)} />}
      {showGenerator && <GeneratorModal onClose={() => setShowGenerator(false)} />}
    </div>
  );
}