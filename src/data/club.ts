export interface Category {
  name: string;
  group: 'Senior' | 'Escuela';
  description: string;
}

export const club = {
  name: 'Universitario Cantabria Rugby',
  short: 'URC',
  shield: 'UNIVERSITARIO RUGBY CLUB',
  motto: 'Rugby en Santander desde la universidad',
  instagram: 'https://www.instagram.com/universitariocantabriarugby/',
  instagramHandle: '@universitariocantabriarugby',
  instagramDm: 'https://ig.me/m/universitariocantabriarugby',
  email: 'universitariocantabriarugby@gmail.com',
  campo: 'Campo de Rugby J.M. Samperio',
  zona: 'Peñacastillo, Santander (Cantabria)',
  mapsQuery: 'Campo de Rugby José Manuel Samperio, Peñacastillo, Santander',
  about:
    'Club nacido en el entorno universitario de Santander en los años 70 y fundado oficialmente en 1983. Contamos con equipo Senior y escuela de rugby desde M8 hasta M18, y estamos abiertos a cualquiera que quiera probar este deporte.',
  scheduleNote:
    'Los horarios de entrenamiento varían según la categoría y la temporada. Escríbenos por privado en Instagram o por email y te los pasamos.',
  categories: [
    {
      name: 'Senior',
      group: 'Senior',
      description: 'Equipo absoluto para mayores de 18 años.',
    },
    {
      name: 'M8',
      group: 'Escuela',
      description: 'Iniciación lúdica al rugby para los más pequeños.',
    },
    {
      name: 'M10',
      group: 'Escuela',
      description: 'Aprendizaje de habilidades básicas, pase y juego en equipo.',
    },
    {
      name: 'M12',
      group: 'Escuela',
      description: 'Desarrollo técnico y primeros conceptos tácticos.',
    },
    {
      name: 'M14',
      group: 'Escuela',
      description: 'Consolidación del juego colectivo y técnica individual.',
    },
    {
      name: 'M16',
      group: 'Escuela',
      description: 'Etapa cadete de formación competitiva y valores del rugby.',
    },
    {
      name: 'M18',
      group: 'Escuela',
      description: 'Etapa juvenil de transición hacia el equipo Senior.',
    },
  ] satisfies Category[],
} as const;
