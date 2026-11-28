export interface Collaborator {
  name: string;
  url?: string;
  logo?: string;
}

export const club = {
  name: 'Universitario Cantabria Rugby',
  short: 'URC',
  shield: 'UNIVERSITARIO RUGBY CLUB',
  motto: 'Rugby en Santander desde la universidad',
  url: 'https://universitariocantabriarugby.com',
  instagram: 'https://www.instagram.com/universitariocantabriarugby/',
  instagramHandle: '@universitariocantabriarugby',
  instagramDm: 'https://ig.me/m/universitariocantabriarugby',
  email: 'universitariocantabriarugby@gmail.com',
  campo: 'Campo de Rugby J.M. Samperio',
  zona: 'Peñacastillo, Santander (Cantabria)',
  address: {
    street: 'Campo de Rugby José Manuel Samperio, Peñacastillo',
    locality: 'Santander',
    region: 'Cantabria',
    postalCode: '39011',
    country: 'ES',
  },
  foundingYear: 1983,
  federation: {
    name: 'Federación Cántabra de Rugby',
    url: 'https://rugbycantabria.com',
  },
  collaborators: [
    { name: 'IMD Santander', url: 'https://imd.santander.es' },
    { name: 'Gobierno de Cantabria – Consejería de Deportes' },
  ] as Collaborator[],
  mapsQuery: 'Campo de Rugby José Manuel Samperio, Peñacastillo, Santander',
  about:
    'Club de rugby en Santander nacido en el entorno universitario en los años 70 y fundado oficialmente en 1983. Formamos parte del rugby en Cantabria con equipo Senior y escuela de rugby desde M8 hasta M18, y estamos abiertos a cualquiera que quiera probar este deporte.',
  categoriesIntro:
    'Nuestra escuela de rugby para niños y niñas abarca desde M8 hasta M18, junto con el equipo Senior para mayores de 18 años.',
  training: {
    days: 'Martes y jueves',
    hours: '20:00 – 22:00',
  },
  categories: [
    { name: 'Senior', detail: 'Mayores de 18 años' },
    { name: 'Escuela', detail: 'M8, M10, M12, M14, M16 y M18 (hasta 18 años)' },
  ],
  calendarUrl: 'https://rugbycantabria.matchready.es/es/public/calendar/11/1/combined/',
  calendarSourceUrl: 'https://rugbycantabria.com/calendario-senior-masculino/',
  calendarTeamName: 'Universitario R.C.',
} as const;
