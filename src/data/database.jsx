import { Beer, Car, Clapperboard, Clover, Map, Pizza, Popcorn,ChefHat, Camera, Cast, Castle, Bubbles, Beef, Grape, Briefcase } from 'lucide-react';
// ============================================================================
// 1. BASES DE DATOS 
// ============================================================================

const START_DATE = new Date(2026, 8, 30); 

const BIRTHDAY_DATE = new Date(2026, 8, 30); 

const DATE_IDEAS = [
  {
    id: 1,
    title: "Noche de juegos & Pizza Casera 🍕",
    desc: "Sesión intensiva de videojuegos cooperativos (o juegos de mesa) con pizza hecha desde cero. El que pierda la partida limpia los platos.",
    icon: <Pizza className="w-5 h-5 text-red-500" />,
  },
  {
    id: 2,
    title: "Maratón y Palomitas Caseras 🍿",
    desc: "Apagar las luces, manta gigante y bol de palomitas. El que se quede dormido primero, hace el desayuno mañana.",
    icon: <Popcorn className="w-5 h-5 text-red-500" />,
  },
  {
    id: 3,
    title: "Ruta y Pícnic Sorpresa 🌲",
    desc: "Mochilas con bocadillos, aguinchi bien fresquinchi y ruta de naturaleza que no conozcamos. Desconexión total garantizada.",
    icon: <Map className="w-5 h-5 text-red-500" />,
  },
  {
    id: 4,
    title: "Maratón de Cine + Cena Temática",
    desc: "Elegir una saga o país, preparar comida típica ambientada en la temática y ver las películas con palomitas.",
    icon: <Clapperboard className="w-5 h-5 text-red-500" />,
  },
  {
    id: 5,
    title: "Cata a Ciegas en el Salón 👀",
    desc: "Comprar 5 variedades de un mismo alimento (chocolates, quesos, cervezas artesanales o vinos) y adivinar a ciegas cuál es el más caro o la marca exacta.",
    icon: <Beer className="w-5 h-5 text-red-500" />,
  },
  {
    id: 6,
    title: "Taller de Repostería o Cocina de Autor ",
    desc: "Elegir una receta compleja que ninguno hayamos probado hacer antes (como macarons, sushi o ramen casero) y prepararla juntos.",
    icon: <ChefHat className="w-5 h-5 text-red-500" />,
  },
  {
    id: 7,
    title: "Ruta de Tapeo 'A la Suerte' 🍀 ",
    desc: "Salir a tapear por el centro histórico y decidir en cada esquina la dirección tirando una moneda al aire hasta descubrir un sitio nuevo.",
    icon: <Clover className="w-5 h-5 text-red-500" />,
  },
  {
    id: 8,
    title: "Coche, Estrellas y Chocolate Caliente 🚗",
    desc: "Conducir hacia una zona sin contaminación lumínica, acomodar mantas en el maletero y contemplar las estrellas con un termo de bebida caliente.",
    icon: <Car className="w-5 h-5 text-red-500" />,
  },
  {
    id: 9,
    title: "Caza del Tesoro Fotográfica 🪙",
    desc: "Visitar 3 lugares donde tengáis una foto especial de los primeros tiempos e intentar recrear exactamente la misma pose. (Este podemos empezar con el cuando quieras)",
    icon: <Camera className="w-5 h-5 text-red-500" />,
  },
  {
    id: 10,
    title: "Sesión de Fotos con Cámara Desechable 📷",
    desc: "Comprar una cámara analógica desechable, salir a pasear tomándoos fotos espontáneas y esperar juntos el día del revelado.",
    icon: <Camera className="w-5 h-5 text-red-500" />,
  },
  {
    id: 11,
    title: "Pueblo Medieval Sorpresa",
    desc: "Subir al coche por la mañana con una lista de 3 pueblos históricos cercanos y elegir el destino sacando un papel al azar.",
    icon: <Castle className="w-5 h-5 text-red-500" />,
  },
  {
    id: 12,
    title: "Día de Spa & Desconexión 🫧",
    desc: "Ruta de senderismo suave por la mañana y sesión de termas o circuito de agua por la tarde para recargar energías.",
    icon: <Bubbles className="w-5 h-5 text-red-500" />,
  },
  {
    id: 13,
    titlec: "Ruta Gastronómica de Carretera 🥩",
    desc: "Conducir hasta un pueblo famoso por un plato o dulce tradicional concreto con la única misión de comer allí y volver relajadamente.",
    icon: <Beef className="w-5 h-5 text-red-500" />,
  },
  {
    id: 14,
    title: "Visita a Bodega y Viñedos 🍇",
    desc: "Realizar una excursión a una bodega local, pasear por los viñedos y disfrutar de una cata guiada de vinos regionales.",
    icon: <Grape className="w-5 h-5 text-red-500" />,
  },
  {
    id: 15,
    title: "Escapada Flash 'Maleta Preparada' 🧳",
    desc: "Preparar el equipaje el viernes por la noche sin saber la ruta exacta y desvelar la reserva de hotel o billete justo al empezar el viaje el sábado.",
    icon: <Briefcase className="w-5 h-5 text-red-500" />,
  },
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
    title: 'Viajes',
    items: [
      { 
        id: 'v1', 
        title: 'Nuestra Primera Playa', 
        media: [
            '/src/assets/000049.webp',
            '/src/assets/000049.webp',
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
  { question: "¿Dónde fue nuestra primera cita?", options: ["La Rollerie", "100 montaditos", "McDonald's", "Pasta fresca"], correct: 1, funFact: "Casi me atraganto con el wasabi por hacerme el valiente." },
  { question: "¿Quién es más probable que se quede dormido viendo una peli?", options: ["Tú, a los 10 minutos", "Yo, a los 10 minutos", "Los dos a la vez", "La mascota"], correct: 0, funFact: "Y siempre te despiertas diciendo: 'No estoy dormida, estoy descansando los ojos'." },
  { question: "¿Cuál fue nuestro primer viaje oficial juntos?", options: ["A la montaña", "A la playa", "Una escapada rural", "A París"], correct: 1, funFact: "Aún guardo la entrada del chiringuito en la cartera porque fue un día perfecto." }
];

const pseudoRandom = (seed) => {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
};

const CONFETTI_PIECES = Array.from({ length: 120 }).map((_, i) => {
  const colors = ['#eab308', '#ef4444', '#a855f7', '#ffffff', '#f97316'];
  const r1 = pseudoRandom(i * 1.3);
  const r2 = pseudoRandom(i * 2.7);
  const r3 = pseudoRandom(i * 3.9);
  const r4 = pseudoRandom(i * 4.1);

  return {
    id: i,
    left: `${(r1 * 100).toFixed(2)}%`,
    color: colors[Math.floor(r2 * colors.length)],
    animationDuration: `${(r3 * 3 + 2).toFixed(2)}s`,
    animationDelay: `${(r4 * 1.5).toFixed(2)}s`,
    width: `${(r1 * 10 + 6).toFixed(1)}px`,
    height: `${(r2 * 18 + 8).toFixed(1)}px`,
    shape: r3 > 0.5 ? '50%' : '0%',
  };
});


export { BIRTHDAY_DATE, CATEGORIES, CONFETTI_PIECES, DATE_IDEAS, START_DATE, TRIVIA_QUESTIONS };
