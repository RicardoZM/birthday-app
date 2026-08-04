import { useRef, useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// ============================================================================
// 1. COMPONENTE INDIVIDUAL DE TARJETA RASCABLE
// ============================================================================
const ScratchCard = ({ image, title }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false); // Por si queremos mostrarla entera

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Ajustamos la resolución interna del canvas para que sea nítida
    canvas.width = 300;
    canvas.height = 300;

    // Dibujamos la capa "plateada" que cubre la imagen
    ctx.fillStyle = '#27272a'; // zinc-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Añadimos un diseño bonito a la capa superior
    ctx.fillStyle = '#52525b'; // zinc-600
    // Dibujar un patrón de rayas o puntos podría ir aquí, pero pondremos texto:
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Rascar ✨', canvas.width / 2, canvas.height / 2);
  }, []);

  const handleScratchStart = (e) => {
    setIsDrawing(true);
    scratch(e); // Para que marque un punto solo con hacer clic
  };

  const handleScratchEnd = () => {
    setIsDrawing(false);
  };

  const scratch = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Soportar tanto eventos de ratón como eventos táctiles (móviles)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Calcular las proporciones exactas por si el canvas cambia de tamaño en móvil
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    // La "magia": destination-out hace que lo que dibujemos BORRE el canvas
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2); // 35 es el tamaño de la "moneda" virtual para rascar
    ctx.fill();
  };

  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-zinc-800 bg-zinc-900 group">
      
      {/* 1. La imagen o premio que está DEBAJO */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {image ? (
           <img src={image} alt="Premio" className="w-full h-full object-cover rounded-lg opacity-90" />
        ) : (
           <div className="text-center">
             <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
             <p className="text-white font-bold">{title}</p>
           </div>
        )}
      </div>

      {/* 2. El Canvas que cubre la imagen (se oculta si hacemos clic en "Revelar") */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleScratchStart}
          onMouseMove={scratch}
          onMouseUp={handleScratchEnd}
          onMouseLeave={handleScratchEnd}
          onTouchStart={handleScratchStart}
          onTouchMove={scratch}
          onTouchEnd={handleScratchEnd}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          // 'touch-none' es CLAVE para que al rascar en el móvil no se mueva la pantalla
        />
      )}
      
      {/* Botón opcional para revelar todo de golpe y no tener que rascar cada esquina */}
      {!isRevealed && (
        <button 
          onClick={() => setIsRevealed(true)}
          className="absolute bottom-2 right-2 bg-black/60 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Revelar
        </button>
      )}
    </div>
  );
};

// ============================================================================
// 2. COMPONENTE CONTENEDOR (El Grid 3x3)
// ============================================================================
const ScratchGrid = () => {
  // Aquí puedes poner fotos, o dejarlo sin foto y usar el "title" para hacer "Vales"
  const items = [
    { id: 1, title: 'Vale por 1 Masaje', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Cena Pagada', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'Tarde de Cine', image: null }, // Si pones image null, mostrará el texto
    { id: 4, title: 'Paseo por la Naturaleza', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400' },
    { id: 5, title: 'Desayuno en la cama', image: null },
    { id: 6, title: 'Noche de Vinos', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=400' },
    { id: 7, title: 'Beso sorpresa', image: null },
    { id: 8, title: 'Escapada Rural', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=400' },
    { id: 9, title: 'Día de Spa', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Panel de Recompensas</h2>
        <p className="text-gray-400">Pasa el dedo por encima de las tarjetas para rascar y descubrir tus premios sorpresa.</p>
      </div>
      
      {/* El Grid 3x3 responsivo (1 columna en móviles muy peques, 2 en normales, 3 en PC) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {items.map((item) => (
          <ScratchCard key={item.id} image={item.image} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default ScratchGrid;