import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

// Importamos nuestros componentes separados
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryRow from './components/CategoryRow';
import DetailsModal from './components/DetailModal';
import GeneratorModal from './components/GeneratorModal';

// Importamos los datos y hooks
import { START_DATE, CATEGORIES } from './data/database';
import { useLiveCounter } from './hooks/useLiveConter';

export default function OurFlixApp() {
  const timeSync = useLiveCounter(START_DATE);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  useEffect(() => {
    if (selectedMemory || isGeneratorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedMemory, isGeneratorOpen]);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white pb-20 overflow-x-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar time={timeSync} onOpenGenerator={() => setIsGeneratorOpen(true)} />
      <Hero onOpenDetails={setSelectedMemory} />

      <main className="relative z-20 -mt-10 md:-mt-20">
        {CATEGORIES.map(category => (
          <CategoryRow 
            key={category.id} 
            category={category} 
            onOpenDetails={setSelectedMemory} 
          />
        ))}
      </main>

      <footer className="text-center text-gray-500 text-sm mt-20 border-t border-zinc-900 pt-8">
        <p>Producido con muchísimo amor para el amor de mi vida.</p>
        <p className="mt-2">© {new Date().getFullYear()} OurFlix Entertainment. Hecho con <Heart className="w-4 h-4 inline fill-red-600 text-red-600" /> por ti.</p>
      </footer>

      {selectedMemory && (
        <DetailsModal item={selectedMemory} onClose={() => setSelectedMemory(null)} />
      )}
      
      {isGeneratorOpen && (
        <GeneratorModal onClose={() => setIsGeneratorOpen(false)} />
      )}
    </div>
  );
}