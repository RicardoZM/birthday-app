import {Popcorn, Map, Wine } from 'lucide-react';

// ============================================================================
// 1. DATOS (Mover esto a src/data/database.js en tu proyecto local)
// ============================================================================

const START_DATE = new Date(2025, 2, 22); // 22 de Marzo de 2025

const DATE_IDEAS = [
  {
    id: 1,
    title: "Cena Temática a Ciegas 🍕",
    desc: "Uno elige la comida en secreto y el otro ambienta el salón con música y velas acorde al país. ¡Prohibido chivarse!",
    type: "Culinario",
    prep: "Baja",
    match: 99,
    icon: <Wine className="w-5 h-5 text-red-500" />
  },
  {
    id: 2,
    title: "Maratón y Palomitas Caseras 🍿",
    desc: "Apagad las luces, manta gigante y bol de palomitas. El que se quede dormido primero, hace el desayuno mañana.",
    type: "Sofá y Manta",
    prep: "Ninguna",
    match: 96,
    icon: <Popcorn className="w-5 h-5 text-yellow-500" />
  },
  {
    id: 3,
    title: "Ruta y Pícnic Sorpresa 🌲",
    desc: "Mochilas con bocadillos, fruta y ruta de naturaleza que no conozcamos. Desconexión total garantizada.",
    type: "Aventura",
    prep: "Media",
    match: 94,
    icon: <Map className="w-5 h-5 text-green-500" />
  }
];

const CATEGORIES = [
  {
    id: 'viajes',
    title: 'Documentales de Viajes',
    items: [
      { id: 'v1', title: 'Nuestra Primera Playa', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600', match: 98, year: '2025', tags: 'Playa, Atardeceres', desc: 'Nuestra primera escapada juntos frente al océano. El clima nos acompañó y pasamos horas enteras caminando.' },
      { id: 'v2', title: 'Subida a la Cima', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600', match: 95, year: '2025', tags: 'Montaña, Senderismo', desc: 'Aquel día en el que decidimos subir hasta la cima. No estábamos preparados pero valió la pena.' },
      { id: 'v3', title: 'Escapada de Ensueño', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600', match: 100, year: '2025', tags: 'Ciudad, Invierno', desc: 'Perderse por las callejuelas. El olor a cruasán caliente y las luces brillando.' }
    ]
  },
  {
    id: 'risas',
    title: 'Comedias y Tomas Falsas',
    items: [
      { id: 'r1', title: 'Desastre Chef', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', match: 99, year: '2025', tags: 'Cocina, Desastre', desc: 'Intentamos hacer pasta fresca y terminamos pidiendo pizza con harina hasta en las pestañas.' },
      { id: 'r2', title: 'Dúo de Estrellas', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600', match: 94, year: '2025', tags: 'Coche, Karaoke', desc: 'Cantando a todo pulmón en un atasco. Desafinamos espectacularmente.' }
    ]
  }
];

export { START_DATE, CATEGORIES, DATE_IDEAS };