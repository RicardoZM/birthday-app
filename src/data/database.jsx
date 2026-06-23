import { Popcorn, Map, Wine } from 'lucide-react';
import ima from './../assets/000049.webp';
// ============================================================================
// 1. BASES DE DATOS 
// ============================================================================

const START_DATE = new Date(2026, 8, 30); 

const BIRTHDAY_DATE = new Date(2026, 8, 30); 

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
    id: 'proximamente',
    title: 'Próximamente (Estrenos)',
    items: [
      { 
        id: 'regalo_final', 
        title: 'Tu Regalo de Cumpleaños', 
        media: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'], 
        match: 100, 
        year: '2026', 
        desc: 'Este episodio contiene tu regalo final y un mensaje muy especial. Se desbloqueará automáticamente el día exacto de tu cumpleaños. ¡La paciencia es una virtud!',
        isLocked: true, 
        unlockDate: BIRTHDAY_DATE 
      }
    ]
  },
  {
    id: 'viajes',
    title: 'Documentales de Viajes',
    items: [
      { 
        id: 'v1', 
        title: 'Nuestra Primera Playa', 
        media: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=600'
        ], 
        match: 98, year: '2025', desc: 'Una escapada perfecta al mar. El clima nos acompañó y pasamos horas enteras caminando por la orilla.' 
      },
      { 
        id: 'v2', 
        title: 'Aventura en la Montaña', 
        media: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'], 
        match: 95, year: '2025', desc: 'Casi no llegamos a la cima, pero las vistas merecieron totalmente la pena.' 
      }
    ]
  },
  {
    id: 'risas',
    title: 'Comedias y Tomas Falsas',
    items: [
      { 
        id: 'r1', 
        title: 'Desastre Chef', 
        media: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600'], 
        match: 99, year: '2025', desc: 'Intentamos hacer pasta fresca y terminamos pidiendo pizza a domicilio con la cocina destrozada.' 
      }
    ]
  }
];

const TRIVIA_QUESTIONS = [
  {
    question: "¿Qué pedimos para cenar en nuestra primera cita?",
    options: ["Pizza doble queso", "Sushi", "Hamburguesas caseras", "Pasta fresca"],
    correct: 1, 
    funFact: "Casi me atraganto con el wasabi por hacerme el valiente."
  },
  {
    question: "¿Quién es más probable que se quede dormido viendo una peli?",
    options: ["Tú, a los 10 minutos", "Yo, a los 10 minutos", "Los dos a la vez", "La mascota"],
    correct: 0,
    funFact: "Y siempre te despiertas diciendo: 'No estoy dormida, estoy descansando los ojos'."
  },
  {
    question: "¿Cuál fue nuestro primer viaje oficial juntos?",
    options: ["A la montaña", "A la playa", "Una escapada rural", "A París"],
    correct: 1,
    funFact: "Aún guardo la entrada del chiringuito en la cartera porque fue un día perfecto."
  }
];

export { START_DATE, CATEGORIES, DATE_IDEAS, TRIVIA_QUESTIONS, BIRTHDAY_DATE };