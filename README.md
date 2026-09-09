# Institución Educativa Lazarillo de Tormes — Landing

Sitio de la Institución Educativa Lazarillo de Tormes (Puerto Carreño, Vichada), con panel de
administración para editar contenido y noticias sin tocar código.

Construido con Next.js (App Router) + TypeScript + Tailwind CSS + Prisma 7 + NextAuth, a partir del
diseño `Landing Lazarillo de Tormes.dc.html`.

## Cómo correr el proyecto

1. Copia `.env` (ya incluye `DATABASE_URL` de Railway y `NEXTAUTH_SECRET`) o crea el tuyo — ver
   [Variables de entorno](#variables-de-entorno).
2. Instala dependencias y genera el cliente de Prisma:
   ```bash
   npm install
   ```
3. Aplica el schema y crea el usuario admin + contenido inicial (solo la primera vez, o tras un
   `prisma migrate reset`):
   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```
   El seed imprime el correo y una contraseña temporal para `/admin/login`.
4. Levanta el servidor:
   ```bash
   npm run dev
   ```

Abre http://localhost:3000 (sitio) y http://localhost:3000/admin/login (panel).

## Variables de entorno

| Variable | Para qué | Notas |
|---|---|---|
| `DATABASE_URL` | Postgres (Prisma) | Railway → proyecto `lazarillo-tormes`, servicio `Postgres-HUeR`. En local se usa la URL pública del TCP proxy; en producción, la interna (`*.railway.internal`) que Railway inyecta automáticamente si la app corre en el mismo proyecto. |
| `NEXTAUTH_SECRET` | Firma de sesión (JWT) | Generado con `crypto.randomBytes`. Usa uno distinto en producción. |
| `NEXTAUTH_URL` | Callback URLs de NextAuth | `http://localhost:3000` en dev; la URL pública del sitio en producción. |
| `RAILWAY_VOLUME_MOUNT_PATH` | Carpeta de imágenes subidas desde `/admin` | La setea Railway automáticamente al adjuntar un Volume al servicio (ver abajo). En local no hace falta: cae a `.uploads/` en la raíz del proyecto. |

## Imágenes subidas desde el admin (Railway Volume)

Los contenedores de Railway son efímeros — cualquier archivo escrito en el filesystem (incluido
`public/`) se pierde en el siguiente deploy. Por eso las imágenes que se suben desde `/admin` se
guardan en un **Volume** y se sirven con una ruta dedicada:

- `POST /api/upload` (protegida) escribe el archivo en `UPLOAD_DIR` (`src/lib/uploads.ts`).
- `GET /api/uploads/[filename]` lo sirve de vuelta.
- El rewrite `/uploads/:path* → /api/uploads/:path*` en `next.config.ts` deja URLs limpias.

Una vez creado el servicio de la app en Railway, adjúntale un volume:

```bash
railway volume add --service <nombre-del-servicio-de-la-app> --mount-path /data
```

Railway inyecta `RAILWAY_VOLUME_MOUNT_PATH=/data` automáticamente; `src/lib/uploads.ts` ya lo usa.

## Estructura de carpetas

```
src/
  app/
    layout.tsx      # Fuentes (Poppins + Work Sans), metadata del sitio
    page.tsx         # Ensambla todas las secciones en orden
    globals.css       # Paleta de colores y tokens de Tailwind (@theme)
  components/
    Header.tsx           # Nav + logo
    Hero.tsx              # Sección principal con foto y estadísticas rápidas
    AboutSection.tsx      # Envuelve "Sobre nosotros" (agrupa los siguientes 5)
      MissionVision.tsx     # Misión y visión
      History.tsx            # Nuestra historia + línea de tiempo
      Values.tsx              # Valores institucionales
      OriginName.tsx           # Origen del nombre "Lazarillo de Tormes"
      RectorMessage.tsx         # Mensaje de la rectora
    Stats.tsx              # "Lazarillo en cifras"
    EducationalOffer.tsx    # Oferta educativa por nivel + bloque inglés/tecnología
    WhyChooseUs.tsx          # "Por qué elegirnos"
    Gallery.tsx               # "Momentos Lazarillo" (galería de fotos)
    News.tsx                   # Noticias: lee Noticia (Prisma); si la tabla está vacía, usa site-data.ts
    Admissions.tsx              # Admisiones: pasos, documentos por nivel (tabs), uniformes
    Contact.tsx                  # Formulario de contacto + datos + mapa (Google Maps embed)
      ContactForm.tsx              # Formulario (aún no envía a ningún backend)
    Footer.tsx                     # Pie de página con redes sociales
    SectionHeading.tsx              # Encabezado reutilizable (eyebrow + título)
    SocialIcons.tsx                  # Iconos SVG de redes sociales
    admin/                            # Componentes del panel (formularios, ImageField, logout, etc.)
  lib/
    site-data.ts        # Contenido de fallback (si Prisma no responde o el campo está vacío)
    content.ts           # getSection()/pick() — helpers para leer SiteContent con fallback
    content-schema.ts     # Registro único de secciones/campos editables (alimenta el seed y /admin/contenido)
    prisma.ts               # PrismaClient singleton (driver adapter @prisma/adapter-pg)
    auth.ts                  # Config de NextAuth (Credentials contra AdminUser)
    uploads.ts                 # Resuelve dónde viven las imágenes subidas (Volume o .uploads/ local)
    youtube.ts                   # Normaliza links de YouTube a formato /embed/
  app/
    admin/
      login/            # Login (público)
      (dashboard)/        # Protegido por src/proxy.ts — contenido y noticias
        contenido/           # Formularios por sección (SiteContent)
        noticias/              # CRUD de noticias
    api/
      auth/[...nextauth]/  # Route handler de NextAuth
      upload/                # Sube una imagen (admin) al Volume/.uploads
      uploads/[filename]/     # Sirve una imagen subida
  proxy.ts            # Protege /admin/* (redirige a /admin/login sin sesión)
prisma/
  schema.prisma     # AdminUser, Noticia, SiteContent
  seed.ts            # Crea el admin inicial + migra site-data.ts a SiteContent
public/
  images/           # Fotos del colegio — ver public/images/README.txt para los nombres exactos esperados
```

## Sobre las imágenes

Las fotos reales del colegio (logo, hero, galería, uniformes, rectora, etc.) todavía no están incluidas.
Colócalas en `public/images/` con los nombres indicados en `public/images/README.txt`. El código ya
apunta a esas rutas, así que basta con copiar los archivos. Las imágenes que se editen desde `/admin`
en cambio se suben y sirven dinámicamente — ver [Imágenes subidas desde el admin](#imágenes-subidas-desde-el-admin-railway-volume).

## Panel de administración

- `/admin/login` — un solo usuario (la rectora), sin registro ni roles.
- `/admin/contenido` — edita lema, cifras, textos de "Nuestros símbolos" (incluye el link de YouTube
  del himno) y "Oferta educativa". Los cambios se publican de inmediato (`revalidatePath`).
- `/admin/noticias` — CRUD completo de noticias (título, fecha, imagen).

## Pendiente para producción

- Adjuntar el Railway Volume al servicio de la app (ver arriba) antes del primer deploy con subida de imágenes.
- Configurar `NEXTAUTH_URL` y un `NEXTAUTH_SECRET` propio en las variables de entorno de Railway.
- Envío real del formulario de contacto (`ContactForm.tsx` sigue sin backend).
