# Parti Jouvence — site officiel

Next.js 16 (App Router) + Postgres + Tailwind v4. Site public bilingue (FR/EN), espace d'administration protégé, gestion d'articles (Tiptap + Vercel Blob), de membres, témoignages, soumissions de formulaires et abonnés newsletter.

## Stack

- Next.js 16 / React 19, App Router
- Postgres via Prisma 7 (`@prisma/adapter-pg`)
- NextAuth v5 (credentials provider) + bcrypt
- Tailwind CSS v4, lucide-react, motion (Framer)
- Tiptap éditeur WYSIWYG avec upload d'images sur Vercel Blob
- i18n FR/EN par segment dynamique `[locale]`

## Mise en route locale

1. **Variables d'environnement** — copier `.env.example` vers `.env.local` puis remplir :
   ```bash
   cp .env.example .env.local
   ```
   Variables requises :
   - `DATABASE_URL` — connexion Postgres (Neon, Vercel Postgres, Supabase…)
   - `AUTH_SECRET` — `openssl rand -base64 32`
   - `NEXT_PUBLIC_SITE_URL` — URL publique (sans slash final)
   - `BLOB_READ_WRITE_TOKEN` — token Vercel Blob (Storage → Blob → Create Token)
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` — pour le seed initial

   ⚠️ Prisma CLI lit `.env`, pas `.env.local`. Mettez `DATABASE_URL` dans `.env` à la racine (déjà ignoré par git) pour pouvoir exécuter `prisma migrate` / `db:push` localement.

2. **Dépendances**
   ```bash
   npm install
   ```

3. **Initialiser la base**
   ```bash
   npm run db:push      # Pousse le schéma Prisma vers Postgres
   npm run db:seed      # Crée l'utilisateur admin et du contenu d'exemple
   ```

4. **Lancer le dev server**
   ```bash
   npm run dev
   ```
   - Site public : http://localhost:3000 (redirige vers `/fr`)
   - Admin : http://localhost:3000/admin (connexion avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (`prisma generate` puis `next build`) |
| `npm run start` | Serveur de production |
| `npm run db:push` | Synchronise le schéma Prisma sans migration |
| `npm run db:migrate` | Crée et applique une migration Prisma |
| `npm run db:seed` | Insère l'admin et le contenu de seed |
| `npm run db:studio` | Ouvre Prisma Studio |
| `npm run lint` | Lint ESLint |

## Déploiement sur Vercel

1. Importer le repo sur Vercel.
2. Provisionner Postgres (Vercel Postgres ou Neon) → coller la `DATABASE_URL` (pooled) dans les variables Vercel.
3. Créer un store Vercel Blob → coller `BLOB_READ_WRITE_TOKEN`.
4. Définir `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` (URL de production sans slash final), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`.
5. Au premier déploiement, ouvrir un terminal Vercel CLI (ou la console des Functions) et exécuter :
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## Arborescence

```
app/
  [locale]/                  # site public bilingue (FR/EN)
  admin/
    login/                   # page de connexion
    (dashboard)/             # back-office protégé
  api/
    auth/[...nextauth]/      # NextAuth handler
    contact, membership, newsletter, upload
components/
  ui/                        # primitives (Button, Card, Input…)
  site/                      # composants du site public
  admin/                     # composants du back-office
lib/
  db.ts, auth.ts, i18n.ts, utils.ts, program-data.ts
  validations/               # schémas Zod
messages/                    # dictionnaires FR/EN
prisma/                      # schema + seed
```

## Identifiants par défaut

Les valeurs définies dans `ADMIN_EMAIL` / `ADMIN_PASSWORD` sont utilisées par le seed. **Changez-les avant la mise en production.**
