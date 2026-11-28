# Universitario Cantabria Rugby — web

Web estática (Astro) del club, publicada en https://urc.xvdelcorzo.com.

Todo el contenido (textos, categorías, contacto, ubicación) está en `src/data/club.ts`.

```sh
npm install
npm run dev     # desarrollo
npm run build   # genera dist/
```

## Calendario

`src/lib/calendar.ts` lee al compilar el calendario de la Federación (MatchReady, `club.calendarUrl`)
y se queda con los partidos de `club.calendarTeamName`. **Cada temporada** hay que actualizar
`calendarUrl` y `calendarSourceUrl` en `src/data/club.ts`. Si falla, la web compila igual y enlaza a la Federación.

La web se recompila a diario con `.github/workflows/rebuild.yml`: necesita el secret
`VERCEL_DEPLOY_HOOK` en GitHub (Vercel → Settings → Git → Deploy Hooks, rama `main`).

## SEO fuera de la web (pendiente)

1. Google Search Console: verificar `universitariocantabriarugby.com` (TXT en DNS) y enviar `/sitemap-index.xml`.
2. Perfil de Empresa en Google: categoría "Club de rugby", dirección del campo, web, horario y fotos.
3. Pedir enlace a la web a la Federación, IMD Santander y Consejería de Deportes; ponerla en la bio de Instagram.
4. Mismo nombre, dirección y email en todas partes.
5. Vercel → Domains: `www` y el antiguo `urc.xvdelcorzo.com` con redirección permanente (308) al dominio principal.
