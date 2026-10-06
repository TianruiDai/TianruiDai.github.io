# Personal webpage

Single-page academic homepage built with Next.js.

## Project layout

- `data/` — profile and publications (edit these to update content)
- `components/` — page sections
- `css/` — site styles (imported from `app/globals.css`)
- `app/` — Next.js App Router entry

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

- Edit [`data/profile.ts`](data/profile.ts) for name, role, email, photo path, and bio.
- Edit [`data/publications.ts`](data/publications.ts) for the publication list.
- Replace `public/photo.jpg` with your headshot (path set in `profile.ts` as `/photo.jpg`).
