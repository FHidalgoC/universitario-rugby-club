import { club } from '../data/club';

export interface Match {
  jornada: number;
  /** ISO yyyy-mm-dd */
  date: string;
  /** HH:mm (la fuente usa 00:00 cuando no hay hora asignada) */
  time: string;
  home: string;
  away: string;
  homeScore?: number;
  awayScore?: number;
  venue: string;
  ended: boolean;
  isHome: boolean;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', uuml: 'ü', ntilde: 'ñ',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Uuml: 'Ü', Ntilde: 'Ñ',
  ordm: 'º', ordf: 'ª',
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (entity, code: string) => {
    if (code[0] !== '#') return NAMED_ENTITIES[code] ?? entity;
    const hex = code[1].toLowerCase() === 'x';
    const point = parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10);
    return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  });
}

function clean(html = ''): string {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

const fontText = (cell: string) => clean(cell.match(/<font[^>]*>([\s\S]*?)<\/font>/i)?.[1]);

function parseRow(jornada: number, classes: string, row: string): Match {
  const cells = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
  const when = clean(cells[0]).match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{1,2}:\d{2}))?/);
  const home = fontText(cells[1] ?? '');
  const away = fontText(cells[5] ?? '');
  if (!when || !home || !away) throw new Error(`fila no reconocida en la jornada ${jornada}`);

  const [, day, month, year, time = '00:00'] = when;
  const score = fontText(cells[3]).match(/^(\d+)\s*-\s*(\d+)$/);
  const venue = clean(cells[5].match(/Campo:[\s\S]*?<small[^>]*text-success[^>]*>([\s\S]*?)<\/small>/i)?.[1]);

  return {
    jornada,
    date: `${year}-${month}-${day}`,
    time: time.padStart(5, '0'),
    home,
    away,
    ...(score && { homeScore: Number(score[1]), awayScore: Number(score[2]) }),
    venue,
    ended: /\beventEnded\b/.test(classes),
    isHome: home === club.calendarTeamName,
  };
}

function parseCalendar(html: string): Match[] {
  // [prólogo, nº jornada, contenido, nº jornada, contenido, ...]
  const parts = html.split(/<h4\b[^>]*>(?:\s|<[^>]+>)*Jornada\s+(\d+)/i);
  const matches: Match[] = [];

  for (let i = 1; i < parts.length; i += 2) {
    const rows = parts[i + 1].matchAll(/<tr\b[^>]*class="([^"]*\beventRow\b[^"]*)"[^>]*>([\s\S]*?)<\/tr>/gi);
    for (const [, classes, row] of rows) {
      // Solo se valida (y se parsea) lo que menciona a nuestro equipo.
      if (!decodeEntities(row).includes(club.calendarTeamName)) continue;
      const match = parseRow(Number(parts[i]), classes, row);
      if (match.home === club.calendarTeamName || match.away === club.calendarTeamName) {
        matches.push(match);
      }
    }
  }

  return matches.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

async function fetchMatches(): Promise<Match[]> {
  try {
    const response = await fetch(club.calendarUrl, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const matches = parseCalendar(await response.text());
    if (matches.length === 0) throw new Error('no se ha encontrado ningún partido');
    return matches;
  } catch (error) {
    console.warn('[calendar] No se pudo obtener el calendario:', error);
    return [];
  }
}

let cache: Promise<Match[]> | undefined;

/** Partidos del club. Hace una sola petición por build. */
export function getMatches(): Promise<Match[]> {
  return (cache ??= fetchMatches());
}

/** Las jornadas de descanso aparecen en la fuente como un partido contra "Descansa". */
export const isBye = (m: Match) => m.home === 'Descansa' || m.away === 'Descansa';

const todayInMadrid = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());

/** Primer partido sin terminar de hoy en adelante (se asume la lista ordenada por fecha). */
export function getNextMatch(matches: Match[]): Match | undefined {
  const today = todayInMadrid();
  return matches.find((m) => !m.ended && !isBye(m) && m.date >= today);
}

/** Último partido terminado con resultado (se asume la lista ordenada por fecha). */
export function getLastResult(matches: Match[]): Match | undefined {
  return matches.findLast((m) => m.ended && m.homeScore !== undefined && m.awayScore !== undefined);
}
