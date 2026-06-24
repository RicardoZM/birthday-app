import { Sparkles, Timer,KeyRound, Lock} from 'lucide-react';
import { useState } from 'react';

const GlobalLockScreen = ({ countdown, onBypass }) => {
  const [showBypassInput, setShowBypassInput] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    // Vuestro código de aniversario secreto (22 de marzo -> 2203)
    if (passcode === '2203') {
      onBypass();
    } else {
      setError('Código incorrecto. 🚫');
      setPasscode('');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none">
      {/* Luces decorativas de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="w-full max-w-5xl flex justify-between items-center z-10 py-4">
        {/* <div className="text-red-600 text-2xl font-black tracking-widest ">OURFLIX</div> */}
        <div className="text-red-600 text-2xl font-black tracking-widest "></div>
        <div className="bg-zinc-900/60 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-gray-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Estreno Exclusivo
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-2xl flex flex-col items-center text-center my-auto z-10 gap-8">
        <div className="relative">
          <div className="w-24 h-24 bg-red-600/10 border border-red-500/30 rounded-full flex items-center justify-center animate-bounce duration-1000 shadow-2xl">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3">Algo va a pasar</h1>
          <p className="text-base md:text-lg text-gray-400 max-w-lg mx-auto">
            He preparado una sorpresinchi para ti, pero las cosas buenas se hacen esperar. Se desbloqueará dentro de:
          </p>
        </div>

        {/* CONTADOR DE ESTRENO */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-lg mt-2">
          {[
            { label: 'DÍAS', value: countdown.days },
            { label: 'HORAS', value: countdown.hours },
            { label: 'MINUTOS', value: countdown.minutes },
            { label: 'SEGUNDOS', value: countdown.seconds },
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/80 border border-white/5 rounded-xl p-4 md:p-5 flex flex-col items-center justify-center shadow-xl hover:border-red-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <span className="text-3xl md:text-5xl font-black tracking-tight text-white font-mono">{String(item.value).padStart(2, '0')}</span>
              <span className="text-[9px] md:text-xs text-gray-500 font-bold tracking-widest mt-1">{item.label}</span>
            </div>
          ))}
        </div>

        {/* NOTIFICACIÓN ESTILO NETFLIX */}
        <div className="bg-red-950/20 border border-red-900/40 rounded-lg py-3 px-5 text-red-400 text-xs font-semibold tracking-wide flex items-center gap-2 max-w-md animate-pulse">
          <Timer className="w-4 h-4 shrink-0" />
          Estreno automático a las 00:00h del día de tu cumple.
        </div>
      </main>

      {/* FOOTER & ACCESO VIP */}
      <footer className="w-full max-w-5xl flex flex-col items-center justify-center gap-4 z-10 py-6 border-t border-zinc-900">
        {!showBypassInput ? (
          <button 
            onClick={() => setShowBypassInput(true)} 
            className="text-[10px] text-gray-600 hover:text-red-500 font-mono transition-colors flex items-center gap-1.5 group uppercase tracking-widest"
          >
            <KeyRound className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" /> Opción bloqueada
          </button>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-2 duration-300 w-full max-w-xs">
            <div className="flex gap-2 w-full">
              <input 
                type="password" 
                maxLength={4}
                value={passcode}
                onChange={e => setPasscode(e.target.value.replace(/\D/g, ''))}
                placeholder="Código de 4 cifras" 
                className="bg-zinc-900 border border-zinc-800 text-white rounded px-3 py-2 text-sm w-full font-mono text-center focus:outline-none focus:border-red-600 transition-colors"
              />
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 rounded transition-colors whitespace-nowrap">
                Entrar
              </button>
            </div>
            {error && <p className="text-red-500 text-[10px] font-semibold tracking-wide animate-bounce">{error}</p>}
            <button 
              type="button" 
              onClick={() => { setShowBypassInput(false); setPasscode(''); }} 
              className="text-[10px] text-gray-500 hover:text-white font-mono mt-1"
            >
              Cancelar
            </button>
          </form>
        )}
        <p className="text-gray-600 text-[11px]">Creado con mucho ❤️ por un niño rata</p>
      </footer>
    </div>
  );
};

export default GlobalLockScreen;