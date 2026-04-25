# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Avicenna — a multilingual (English, Korean, Uzbek) AI symptom-analysis web app for foreigners in South Korea. React 19 SPA + Vercel Functions backend + Google Gemini for clinical reasoning + Firebase for auth and medical history.

## Commands

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server (frontend + local API middleware) | `npm run dev` |
| Dev server (full Vercel runtime) | `npx vercel dev` |
| Production build | `npm run build` |
| Preview built bundle | `npm run preview` |
| Lint | `npm run lint` |
| Lint a single file | `npx eslint <path>` |
| Smoke-test prod API | `bash test.sh` |

There is no configured unit-test framework or `test` script. Don't claim test coverage without first wiring one up.

## Environment

Required in `.env.local` (see [README.md](README.md) for full list):
- `GEMINI_API_KEY` — server-side, consumed by [api/analyze-symptoms.js](api/analyze-symptoms.js). NOT prefixed with `VITE_` and not exposed to the client.
- `VITE_FIREBASE_*` — client-side Firebase config, read by [src/config/firebase.js](src/config/firebase.js).

[vite.config.js](vite.config.js) loads ALL env vars (including non-`VITE_` ones) into `process.env` at dev time so the local API middleware can read `GEMINI_API_KEY` — this is the reason `loadEnv(mode, cwd, '')` uses an empty prefix. Do not change that without understanding the local-dev impact.

## Architecture

### Two-runtime layout
- **Client**: React SPA in [src/](src/), bundled by Vite, deployed as static assets.
- **Server**: a single Vercel Function at [api/analyze-symptoms.js](api/analyze-symptoms.js) (`maxDuration: 30` per [vercel.json](vercel.json)). It builds a language-aware Gemini prompt, calls `gemini-1.5-flash`, parses JSON, and returns the analysis envelope.

### Local dev replicates the Vercel Function
[vite.config.js](vite.config.js) registers an `api-middleware` plugin that intercepts `/api/analyze-symptoms` in the Vite dev server, wraps Node's req/res into a Vercel-compatible `(req, res)` shape (with `status().json()`), and dynamically imports the same handler. **Edit the handler in one place — `api/analyze-symptoms.js` — and both `npm run dev` and prod will use it.** If you add new API routes, you must mirror them in the Vite middleware OR run `npx vercel dev` instead.

### Frontend structure
- [src/App.jsx](src/App.jsx) — `AuthProvider` wraps `BrowserRouter` with routes: `/`, `/chat`, `/about`, `/auth`, `/profile`, `/medical-history`.
- [src/contexts/FirebaseAuthContext.jsx](src/contexts/FirebaseAuthContext.jsx) — single source of truth for auth state, user profile, medical-history CRUD, AND a 30-min idle session timeout (5-min warning). Components consume it via `useAuth()`.
- [src/components/SessionWarning.jsx](src/components/SessionWarning.jsx) and `SessionTimeoutNotification.jsx` are mounted globally in `App.jsx` — don't remove them when refactoring routing.
- [src/utils/api.js](src/utils/api.js) — `analyzeSymptoms(symptoms, language)` is the only client-side API caller. 30s `AbortController` timeout, 503 fallback handling, returns `data.data` from the response envelope.
- [src/utils/i18n.js](src/utils/i18n.js) — i18next setup with all three languages bundled inline (no JSON files). Add new strings to all three `en`/`ko`/`uz` blocks together.
- [src/utils/pdfExport.js](src/utils/pdfExport.js) — `jspdf` + `html2canvas` for exporting analyses.

### Data model & access control
[firestore.rules](firestore.rules) restricts every read/write to `request.auth.uid == userId`. The data lives at `users/{uid}` with a `medicalHistory/{entryId}` subcollection. Default-deny on everything else. When adding new collections, you must add explicit rules — the catch-all denies them.

### API response envelope
`POST /api/analyze-symptoms` returns either:
- `{ success: true, data: { primaryAnalysis, differentialDiagnosis, urgency, recommendations, ... } }` on success.
- `{ success: false, error, fallback? }` on failure. A 503 with `fallback` is treated as a soft success by the client (see `analyzeSymptoms`).

The handler builds a different intro/`languageNote` string per language — when adding a 4th language, update the `getLanguageInstructions` switch in the handler AND the `urgencyText` map in [src/utils/api.js](src/utils/api.js) AND the i18n bundle.

## Conventions specific to this repo

- **Files are `.jsx`, not `.tsx`.** No TypeScript is configured. Don't introduce `.ts` files without adding a tsconfig and Vite config update.
- ESLint flat config with `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` — uppercase-prefixed unused vars (e.g. unused React imports, constants) are intentionally allowed.
- Tailwind-based styling. Global CSS lives in [src/styles/](src/styles/); component-level styling is utility classes.
- `console.log` is used liberally inside [api/analyze-symptoms.js](api/analyze-symptoms.js) for Vercel log inspection — keep it concise but don't strip it without coordinating with whoever debugs production.
- `dist/` is the build output (deployed by Vercel and Firebase Hosting per [firebase.json](firebase.json)). Don't commit changes inside it.

## Deployment

Vercel deploys on push to `main` (see [vercel.json](vercel.json)). Set `GEMINI_API_KEY` and `VITE_FIREBASE_*` in the Vercel dashboard. [firebase.json](firebase.json) also defines a Firebase Hosting target pointing at `dist/` — only one of the two should be the active deploy target at a time.
