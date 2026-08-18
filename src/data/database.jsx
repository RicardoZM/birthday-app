import { Beer, Car, Clapperboard, Clover, Map, Pizza, Popcorn, ChefHat, Camera, Castle, Bubbles, Beef, Grape, Briefcase } from 'lucide-react';
// ============================================================================
// 1. BASES DE DATOS 
// ============================================================================

const START_DATE = new Date(2026, 8, 30);

const BIRTHDAY_DATE = new Date(2026, 8, 30);

const UNLOCK_DATE = new Date(2026, 7, 23);

// Enlace de tu lista de Spotify dedicada
const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";
// URI de Spotify (se usa para generar el código de barras escaneable)
const SPOTIFY_URI = "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M";

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
        title: 'Tu Regalo de Cumpleaños & Carta Especial',
        media: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'],
        match: 100,
        year: '',
        desc: '',
        isLocked: true,
        unlockDate: BIRTHDAY_DATE,
        letterText: `¡Feliz Cumpleaños, mi amor! ❤️

        Si estás leyendo esto, significa que por fin ha llegado el día exacto de tu cumpleaños y que la cuenta atrás de OurFlix ha llegado a cero.

        Quería prepararte algo diferente, algo único que pudiéramos conservar para siempre como un cofre interactivo de nuestros mejores momentos. Gracias por cada risa, por cada viaje, por cada tarde de películas y por hacer que cada día a tu lado sea único.

        Te he preparado una lista de reproducción en Spotify con todas las canciones que me recuerdan a nosotros. Es nuestra banda sonora particular.

        Espero que te encante todo lo que he preparado para hoy. ¡A disfrutar de tu día!

        Te quiero con todo mi corazón. ✨`
      }
    ]
  },
  {
    id: 'viajes',
    title: 'Viajes 🛩️',
    items: [
      {
        id: 'v1',
        title: 'Nuestra primer viajecinchi',
        media: [
          '/lpgc/IMG-20250823-WA00812.webp',
          '/lpgc/PXL_20250826_115002455.webp',
          '/lpgc/IMG-20250825-WA0187.webp',
          '/lpgc/IMG-20250823-WA0078.webp',
          '/lpgc/IMG-20250825-WA0308.webp',
          '/lpgc/PXL_20250825_164455781.MP.webp',

        ],
        year: '2025', desc: 'Nuestro primer viajecinchi, como buenos fans de Quevedo no podia ser a otro lugar que LPGC'
      },
      {
        id: 'v2',
        title: 'Aventura en Oporto',
        media: [
          '/oporto/PXL_20251130_131442357.RAW-01.COVER.webp',
          '/oporto/PXL_20251201_173246728.RAW-01.COVER.webp',
          '/oporto/PXL_20251130_122843811.RAW-01.COVER.webp',
          '/oporto/PXL_20251130_130839262.RAW-01.COVER.webp',
          '/oporto/PXL_20251201_143006140.RAW-01.COVER.webp',
          '/oporto/IMG-20251202-WA0016.webp',
        ],
        year: '2025', desc: 'Menuda odisea para encontrar el Uber y bueno... luego para llegar vivos al hotel.'
      },
      {
        id: 'v3',
        title: 'Budapest',
        media: [
          '/oporto/PXL_20251130_131442357.RAW-01.COVER.webp',
          '/oporto/PXL_20251201_173246728.RAW-01.COVER.webp',
          '/oporto/PXL_20251130_122843811.RAW-01.COVER.webp',
          '/oporto/PXL_20251130_130839262.RAW-01.COVER.webp',
          '/oporto/PXL_20251201_143006140.RAW-01.COVER.webp',
          '/oporto/IMG-20251202-WA0016.webp',
        ],
        year: '2025', desc: 'Menuda odisea para encontrar el Uber y bueno luego para llegar vivos al hotel.'
      }
    ]
  },
  {
    id: 'risas',
    title: 'Familia ♥️',
    items: [
      {
        id: 'r1',
        title: 'Desastre Chef',
        media: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600'],
        year: '2025', desc: 'Intentamos hacer pasta fresca y terminamos pidiendo pizza a domicilio con la cocina destrozada.'
      }
    ]
  }
  ,
  {
    id: 'risas2',
    title: 'Familia ♥️',
    items: [
      {
        id: 'r1',
        title: 'Desastre Chef',
        media: [
          '/familia/IMG-20250729-WA0004.webp',
          '/familia/IMG-20251001-WA0025.webp',
          '/familia/IMG-20260703-WA0023.webp',
          '/familia/IMG-20260703-WA0030.webp',
          '/familia/PXL_20251219_200407465.webp',
          '/familia/PXL_20251219_200502012.webp',
          '/familia/PXL_20260523_123438970.MP.webp',
        ],
        year: '2025', desc: 'Intentamos hacer pasta fresca y terminamos pidiendo pizza a domicilio con la cocina destrozada.'
      }
    ]
  }
];

const TRIVIA_QUESTIONS = [
  {
    question: "¿Dónde fue nuestra primera cita?",
    options: ["La Rollerie", "100 montaditos", "McDonald's", "Santo"],
    correct: 0,
    funFact: "Menuda caca de cita... Yo preguntando si eras enfermera"
  },
  {
    question: "¿En qué aplicación cruzamos nuestro primer 'match'?",
    options: ["Instagram", "Tinder", "Bumble", "WhatsApp"],
    correct: 1,
    funFact: "Bendito Tinder (y bendito swipe a la derecha)."
  },
  {
    question: "¿Cuál fue nuestro primer gran viaje internacional juntos?",
    options: ["Oporto", "Budapest", "Lisboa", "Roma"],
    correct: 0,
    funFact: "Menuda matada a andar y menuda odisea para volver del concierto de Quevedo."
  },
  {
    question: "¿A dónde nos fuimos de escapada para desconectar un fin de semana de verano?",
    options: ["A la playa en Alicante", "A Asturias", "A la sierra de Madrid", "A Portugal"],
    correct: 2,
    funFact: "Menudo Airbnb nos toco..."
  },
  {
    question: "¿Qué souvenir no puede faltar nunca cuando viajamos a una ciudad nueva?",
    options: ["Un imán para la nevera", "Una taza", "Un dedal de colección", "Una postal"],
    correct: 3,
    funFact: "Siempre no tenemos que llevar una postal para que nene se la dedice a nena."
  },
  {
    question: "¿Cuál es mi mayor obsesión antes de cerrar la maleta para un viaje en avión?",
    options: [
      "Pesarla tres veces en la báscula de baño",
      "Meter ropa para dos semanas aunque vayamos tres días",
      "Comprobar que mida exactamente 40x25x20 cm",
      "Revisar que no se me olvide el paraguas"
    ],
    correct: 2,
    funFact: "Medir la maleta con cinta métrica por si milagrosamente ha crecido en el armario es ya una tradición."
  },
  {
    question: "¿Qué misión 'imposible' tuvimos durante nuestra escapada a Budapest?",
    options: [
      "Aprender a pronunciar tres palabras en húngaro",
      "Llegar a tiempo a los freetour",
      "Probar el goulash en el sitio más escondido",
      "Encontrar un dedal para llevar a casa"
    ],
    correct: 3,
    funFact: "Si no encontramos el dedal para la coleccion, el viaje puede que no quede registrado."
  },
  {
    question: "¿Qué es lo que más ilusión me hace de empezar nuestro camino en el piso nuevo?",
    options: [
      "Elegir el modelo de la televisión",
      "Construir un hogar juntos y ver cómo cobra vida cada rincón",
      "Tener espacio infinito para guardar cosas",
      "Tener la excusa perfecta para comprar más domótica"
    ],
    correct: 1,
    funFact: "Los materiales y las paredes son lo de menos; lo importante es que lo quiero compartir contigo ♥️."
  },
  {
    question: "¿Cuál fue el motivo real de dedicarle tantas horas de código a esta aplicación?",
    options: [
      "Ver tu sonrisa al verla y recordarte lo mucho que te quiero y por supuesto te amo",
      "Prácticar mi lógica de programación",
      "No saber qué regalarte a última hora",
      "Tener una excusa para estar con el ordenador"
    ],
    correct: 0,
    funFact: "Cada línea de código y cada detalle están pensados únicamente para hacerte feliz en tu día."
  },
  {
    question: "De todos los lugares del mundo que hemos visitado o nos quedan por descubrir, ¿cuál es mi sitio favorito? (Cuidado que lleva trampa)",
    options: [
      "El mirador al atardecer en Oporto",
      "Las calles iluminadas de Budapest",
      "Cualquiera, siempre que esté tú al lado",
      "Japón 🍙"
    ],
    correct: 2,
    funFact: "Es la verdad: mi sitio favorito en el mundo no es una ciudad, es estar contigo."
  },
  {
    question: "¿Qué es lo primero que está prometido hacer la primera noche oficial en el piso nuevo?",
    options: [
      "Pedir cena a domicilio y comer en el suelo rodeados de cajas",
      "Dejar configurada toda la domótica y las luces",
      "Desembalar toda la ropa y colocar los armarios",
      "Hacer un tour en directo para la familia"
    ],
    correct: 0,
    funFact: "No hay inauguración oficial de un hogar sin cenar en el suelo entre cajas de mudanza."
  },
  {
    question: "¿Qué es lo que verdaderamente más me impresiona y admiro de verte ejercer tu profesión?",
    options: [
      "Tu capacidad para memorizar nombres de fármacos imposibles",
      "La empatía, la fuerza y las ganas que transmites a cada paciente",
      "Que aguantes días tan intensos sin perder nunca la compostura",
      "Tu habilidad para gestionar mil cosas a la vez sin despeinarte"
    ],
    correct: 1,
    funFact: "Tu brillantez profesional es increible, pero ese corasonsito que pones en lo que haces me enamoran cada día."
  },
  {
    question: "Según la oncóloga de la casa, ¿cuál es el 'diagnóstico oficial' cuando me quejo de un leve dolor muscular?",
    options: [
      "Dramatización aguda severa",
      "Síndrome de exageración de fin de semana",
      "Necesidad urgente de mimos",
      "Cuadro leve con pronóstico reservado"
    ],
    correct: 2,
    funFact: "Si soy el dramas de la relación..."
  },
  {
    question: "¿Cuál es nuestra respuesta universal cuando nos preguntan por el 'plan perfecto' de fin de semana?",
    options: [
      "Madrugar a las 6:00 AM para hacer una ruta de 20 kilómetros",
      "Irnos de compras al centro comercial en hora punta",
      "Limpiar la casa a fondo escuchando música clásica",
      "Manta, peli, buena comida y cero alarmas puestas por la mañana"
    ],
    correct: 3,
    funFact: "La desconexión total en buena compañía no se cambia absolutamente por nada."
  },
  {
    question: "¿Quién es el 'director de orquesta' del GPS y las rutas cuando nos vamos a cualquier lugar?",
    options: [
      "Yo (aunque me ponga nervioso a la minima)",
      "Tú, porque eres la mas sensata de la relación",
      "El azar, según hacia dónde sople el viento en ese momento",
      "No se sabe"
    ],
    correct: 0,
    funFact: "La fe en el mapa del móvil es ciega, aunque nos termine metiendo por la calle más insólita de la ciudad."
  },
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


export { BIRTHDAY_DATE, UNLOCK_DATE, CATEGORIES, CONFETTI_PIECES, DATE_IDEAS, START_DATE, TRIVIA_QUESTIONS, SPOTIFY_PLAYLIST_URL, SPOTIFY_URI };
