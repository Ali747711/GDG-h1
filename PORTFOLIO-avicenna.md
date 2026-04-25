# Avicenna — Symptom Insight AI

> **AI-powered medical symptom analysis for foreigners in South Korea, delivered in English, Korean, and Uzbek.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=flat&logo=vercel)](https://avicenna-webapp.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-v11-FFCA28?style=flat&logo=firebase)](https://firebase.google.com)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=flat&logo=google)](https://ai.google.dev)

---

## The Problem

Navigating healthcare in a foreign country is genuinely hard — but doing it without speaking the local language is harder still. Foreigners living in South Korea often can't communicate symptoms clearly to doctors, can't read medication labels, and don't know whether their situation warrants a clinic visit, an ER trip, or self-care at home.

**Avicenna** solves this by acting as a multilingual medical first-responder: describe your symptoms in plain language (English, Korean, or Uzbek), and receive structured medical guidance — including possible conditions, urgency level, and next steps — in seconds.

---

## Tech Stack

### Frontend
| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 12 | Animations & transitions |
| React Router DOM | 7 | Client-side routing (SPA) |
| React Hook Form | 7 | Form state management |
| Radix UI | Latest | Accessible primitives (Dialog, Tooltip) |
| Lucide React | 0.525 | Icon system |

### Backend & Infrastructure
| Technology | Version | Role |
|---|---|---|
| Vercel Functions | — | Serverless API (Node.js runtime) |
| Google Gemini API | 2.5 Flash | AI symptom analysis |
| Firebase Auth | v11 | User authentication |
| Firebase Firestore | v11 | NoSQL document database |

### Libraries & Utilities
| Library | Role |
|---|---|
| i18next + react-i18next | Internationalization framework |
| i18next-browser-languagedetector | Auto language detection |
| jsPDF | Client-side PDF generation |
| html2canvas | DOM-to-canvas rendering for exports |

### Developer Tooling
| Tool | Role |
|---|---|
| ESLint 9 | Linting (flat config) |
| Vite | HMR, tree-shaking, optimized builds |
| Vercel CLI | Local full-stack development |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Browser (React SPA)             │
│                                                  │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐  │
│  │  Home    │  │  Chat      │  │  Medical    │  │
│  │  Page    │  │  Interface │  │  History    │  │
│  └──────────┘  └─────┬──────┘  └──────┬──────┘  │
│                       │                │         │
│         ┌─────────────┘                │         │
│         ▼                              ▼         │
│  ┌─────────────────┐     ┌─────────────────────┐ │
│  │  FirebaseAuth   │     │  Firebase Firestore  │ │
│  │  Context (30min │     │  users/{uid}/        │ │
│  │  session mgmt)  │     │  medicalHistory/{doc}│ │
│  └─────────────────┘     └─────────────────────┘ │
└────────────────────┬────────────────────────────┘
                     │ POST /api/analyze-symptoms
                     ▼
        ┌────────────────────────┐
        │  Vercel Serverless Fn  │
        │  (Node.js, 30s limit)  │
        └────────────┬───────────┘
                     │  Gemini API (with fallback)
                     ▼
        ┌────────────────────────┐
        │  gemini-2.5-flash  (1) │
        │  gemini-2.0-flash  (2) │
        │  gemini-2.0-flash-lite (3) │
        └────────────────────────┘
```

---

## Feature Breakdown

### 1. AI-Powered Symptom Analysis

The core feature routes user input through a serverless Vercel Function to the Google Gemini API. The AI is prompted with a carefully engineered clinical reasoning framework:

**Prompt Design:**
- Language-specific system personas (English, Korean, Uzbek)
- Differential diagnosis methodology instruction
- Colloquial-to-medical term translation (e.g., "fell on my butt" → coccyx trauma)
- Strict JSON output schema enforcement
- Low temperature (0.3) for consistent, factual output
- 8192 max output tokens for comprehensive responses

**Response Schema:**
```json
{
  "primaryAnalysis": {
    "presentingSymptoms": ["..."],
    "clinicalImpression": "..."
  },
  "differentialDiagnosis": [
    {
      "condition": "...",
      "likelihood": "high|moderate|low",
      "explanation": "...",
      "keyFeatures": ["..."]
    }
  ],
  "urgencyAssessment": {
    "level": "monitor_at_home|see_doctor_soon|emergency_care",
    "reasoning": "...",
    "redFlags": ["..."],
    "timeframe": "..."
  },
  "recommendations": {
    "immediate": ["..."],
    "monitoring": ["..."],
    "lifestyle": ["..."],
    "followUp": ["..."]
  },
  "specialistReferral": { "recommended": true, "specialty": "...", ... },
  "educationalContent": { "overview": "...", "whatToExpect": "...", "prevention": "..." },
  "disclaimer": "..."
}
```

**Multi-Model Fallback Chain:**

Requests try models in order with graceful degradation on 503 (overload) errors:
1. `gemini-2.5-flash` (primary)
2. `gemini-2.0-flash` (fallback)
3. `gemini-2.0-flash-lite` (final fallback)

A 25-second `AbortController` timeout prevents hanging requests.

**Robust JSON Parsing (3 strategies):**
1. Direct `JSON.parse()` of the AI response
2. Extract JSON from markdown code blocks (` ```json ... ``` `)
3. Regex match any `{...}` block in the response
4. Fully localized fallback structure if all parsing fails

---

### 2. Internationalization (i18n)

Full three-language support across every UI surface and AI response:

**Language Support:** English (`en`), Korean (`ko`), Uzbek (`uz`)

**Implementation:**
- `i18next` with `react-i18next` for component-level translations
- `i18next-browser-languagedetector` for auto-detection from browser settings
- Language preference persisted to `localStorage`
- 750+ translation keys organized by page/feature namespace

**Language Selection UX:**
- Global `LanguageSelector` component in the navbar
- Inline language pills directly in the chat input bar (EN / 한국어 / O'zbek)
- Changing language in chat updates both the UI and the AI response language in real time

**AI Multilingual Handling:**
- Separate system prompt instructions per language
- Complete localized fallback messages for all three languages (shown when AI parsing fails)
- AI responses rendered directly in the selected language — no client-side translation of medical content

---

### 3. Firebase Authentication & Session Management

**Auth Features:**
- Email/password sign-up and sign-in via `firebase/auth`
- `updateProfile` on registration (display name)
- Password reset email via `sendPasswordResetEmail`
- Password change via `updatePassword`
- Automatic Firestore user profile creation on first sign-in

**Session Timeout System:**
- 30-minute inactivity timeout with 5-minute pre-warning
- Activity tracked across: `mousedown`, `mousemove`, `keypress`, `scroll`, `touchstart`, `click`
- `SessionWarning` component with countdown and "Stay Signed In" option
- `SessionTimeoutNotification` banner shown after forced logout
- Timers implemented with `useRef` to avoid stale closure issues

**Auth Context (`FirebaseAuthContext.jsx`):**
Exposes: `user`, `userProfile`, `isAuthenticated`, `signUp`, `signIn`, `signOut`, `updateProfile`, `resetPassword`, `changePassword`, `saveMedicalEntry`, `getMedicalHistory`, `deleteMedicalEntry`, `sessionWarning`, `extendSession`

---

### 4. Medical History (Firebase Firestore)

**Data Model:**
```
users/{uid}                    ← User profile document
  stats.totalConversations     ← Counter (using Firestore increment)
  stats.lastConversation       ← Timestamp

users/{uid}/medicalHistory/{docId}  ← Subcollection (scalable)
  conversationId
  userMessage
  aiResponse.analysis
  language
  timestamp
  savedAt
```

Using a subcollection (rather than an array field) avoids Firestore's 1MB document limit, enabling unlimited history entries per user.

**Pagination:**
- 20 entries per page with `orderBy('timestamp', 'desc')`
- Cursor-based pagination using `startAfter(lastDoc)`
- "Load More" UI with loading state

**Filtering (client-side):**
- All entries
- Last 7 days
- Urgent only (`emergency_care` or `see_doctor_soon`)

---

### 5. Data Export

Users can export their medical data in two formats:

**PDF Export (`jsPDF`):**
- Patient information header (name, email, report date, conversation count)
- Per-entry: date, language, symptoms, urgency level (color-coded: red/orange/green), conditions, specialist recommendation, recommendations
- Automatic page breaks with `checkPageBreak()`
- Filename: `Avicenna-Medical-History-YYYY-MM-DD.pdf`
- Medical disclaimer footer

**JSON Export:**
- Direct blob download via `URL.createObjectURL()`
- Full raw Firestore data for portability
- Filename: `avicenna-history-YYYY-MM-DD.json`

---

### 6. Chat UI Component (`AiInput.jsx`)

A polished, feature-rich chat input built from composable React primitives:

**Input Features:**
- Auto-resizing textarea (up to 240px, then scrollable)
- 1,000-character limit with live counter
- `Enter` to submit, `Shift+Enter` for newline

**Language Selector (inline):**
- EN / 한국어 / O'zbek pills within the input bar
- Synced with global i18n state

**Image Attachment:**
- File picker (accept: image/*)
- Drag-and-drop on the input container
- Paste from clipboard (detects `image/*` items)
- Max 10MB file size
- Preview thumbnails with remove button
- Full-image modal via Radix UI Dialog + Framer Motion

**Voice UI:**
- Microphone button (toggles when no text is typed)
- Animated waveform visualizer (28 bars with random heights)
- Real-time timer display (`MM:SS`)

**Action Button States:**
- Microphone icon → when empty
- Send (amber) → when text/image present
- Stop circle → when recording
- Spinner → when AI is loading

---

### 7. Healthcare Provider Recommendations

After receiving AI analysis, the `HealthcareProviders` component surfaces relevant Korean healthcare facilities:

- Matched by symptom keywords and diagnosed conditions
- Tabbed by category: emergency (응급실), specialists (전문의), primary care (가정의학과), urgent care
- Provider cards show: name, English name, type, star rating, distance, address (Korean + English), hours, wait time
- **Call integration:** `tel:` protocol link
- **Directions:** Opens Google Maps query
- Expandable card details: medical specialties, accepted insurance, spoken languages, education/experience

---

### 8. Routing & Pages

| Route | Component | Access |
|---|---|---|
| `/` | `Home.jsx` | Public |
| `/chat` | `Chat.jsx` | Public (save requires auth) |
| `/about` | `About.jsx` | Public |
| `/auth` | `Auth.jsx` | Public (redirects if authed) |
| `/profile` | `Profile.jsx` | Protected |
| `/medical-history` | `MedicalHistory.jsx` | Protected |

The SPA is configured in `vercel.json` to rewrite all non-API paths to `index.html`, enabling client-side navigation on Vercel.

---

### 9. UI/UX Design

**Design Language:**
- Dark-first aesthetic with `slate-950` base
- Amber (`#F59E0B`) as the primary accent color (matches the SunIcon logo)
- Teal and emerald for secondary feature highlights
- Glassmorphism navbar with `backdrop-blur-sm` and `bg-white/10`

**Motion:**
- Framer Motion `AnimatePresence` for message entry animations
- CSS keyframe animations for loading dots (3-dot bounce with staggered delays)
- Animated scroll indicator on the hero section
- Hover scale transforms on interactive elements

**Responsive Design:**
- Mobile-first breakpoints (`md:` for desktop)
- Touch-friendly tap targets (min 48px height)
- `touch-manipulation` CSS for better mobile responsiveness
- Hamburger menu for mobile navigation
- Grid layouts collapse to stacked on small screens

**Accessibility:**
- Radix UI primitives for keyboard-navigable Dialog and Tooltip
- `sr-only` labels on icon-only buttons
- ARIA-compliant Radix component outputs

---

## Project Structure

```
avicenna-webapp/
├── api/
│   └── analyze-symptoms.js     # Vercel serverless function (Gemini API)
├── public/
│   └── icon.png
├── src/
│   ├── assets/
│   │   └── icons/
│   │       └── mind-hero.jpg   # Hero background image
│   ├── components/
│   │   ├── AiInput.jsx         # Custom chat input (language selector, image, voice)
│   │   ├── ChatMessage.jsx     # Renders AI analysis with all sections
│   │   ├── HealthcareProviders.jsx # Post-analysis provider recommendations
│   │   ├── LanguageSelector.jsx    # Navbar language switcher
│   │   ├── SessionTimeoutNotification.jsx
│   │   ├── SessionWarning.jsx      # 5-min pre-logout warning
│   │   └── SunIcon.jsx             # SVG logo component
│   ├── config/
│   │   └── firebase.js         # Firebase app initialization
│   ├── contexts/
│   │   └── FirebaseAuthContext.jsx # Auth + Firestore state + session management
│   ├── data/
│   │   └── healthcareProviders.js  # Curated Korean healthcare provider data
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Auth.jsx
│   │   ├── Chat.jsx            # Main chat interface
│   │   ├── Home.jsx            # Landing page
│   │   ├── MedicalHistory.jsx  # Paginated history + export
│   │   └── Profile.jsx
│   ├── styles/
│   │   ├── App.css             # Global animations and glassmorphism
│   │   └── index.css           # Tailwind directives
│   ├── utils/
│   │   ├── api.js              # analyzeSymptoms(), urgency helpers
│   │   ├── auth.js
│   │   ├── firebase.js
│   │   ├── firestore.js
│   │   ├── i18n.js             # i18next config + all 3 language translations
│   │   └── pdfExport.js        # jsPDF report generation
│   ├── App.jsx                 # Router + AuthProvider wrapper
│   └── main.jsx                # React DOM entry point
├── vercel.json                 # SPA rewrites + function config
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
- Firebase project (optional — for auth and database features)

### Install & Run

```bash
git clone <repo-url>
cd avicenna-webapp
npm install

# Create environment file
cp .env.example .env.local
# Add GEMINI_API_KEY and Firebase config values

# Frontend only
npm run dev

# Full-stack (with serverless functions)
npx vercel dev
```

### Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key

# Firebase (optional)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## API Reference

### `POST /api/analyze-symptoms`

Proxied through a Vercel serverless function to keep the Gemini API key server-side.

**Request:**
```json
{
  "symptoms": "I have a bad headache and my vision is blurry",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "primaryAnalysis": { "presentingSymptoms": [...], "clinicalImpression": "..." },
    "differentialDiagnosis": [{ "condition": "...", "likelihood": "high", ... }],
    "urgencyAssessment": { "level": "see_doctor_soon", "reasoning": "...", "redFlags": [...] },
    "recommendations": { "immediate": [...], "monitoring": [...], "lifestyle": [...], "followUp": [...] },
    "specialistReferral": { "recommended": true, "specialty": "Neurologist", ... },
    "educationalContent": { "overview": "...", "whatToExpect": "...", "prevention": "..." },
    "disclaimer": "..."
  },
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

**Error Handling:**
- `400` — Missing or empty symptoms
- `504` — Request timeout (25s limit exceeded)
- `503` — All Gemini models overloaded (includes fallback response)
- `500` — General server error

---

## Skills Demonstrated

### Software Engineering
- **React 19** with functional components, hooks, Context API, and `forwardRef`
- **State management** at multiple levels: local state, context, and persistent storage
- **Custom hooks** (`useAuth`, `usePromptInput`, `useStyleInjection`)
- **Serverless architecture** with Vercel Functions and environment variable security
- **Error handling** at multiple layers: network timeouts, JSON parsing fallbacks, Firebase errors
- **Pagination** with Firestore cursor-based queries

### AI / LLM Engineering
- **Prompt engineering** for structured medical reasoning output
- **JSON schema enforcement** via prompting + robust parsing fallbacks
- **Multi-model fallback chains** for high availability
- **Controlled generation parameters** (temperature, topK, topP, maxTokens)
- **Domain adaptation** of general LLM for clinical reasoning context

### Frontend Engineering
- **Composable component design** (PromptInput context pattern with compound components)
- **Accessible UI** via Radix UI primitives
- **Responsive, mobile-first design** with Tailwind CSS
- **Animation** with Framer Motion (presence animations, gesture feedback)
- **File handling** (drag-and-drop, clipboard paste, FileReader API)
- **Client-side PDF generation** with jsPDF

### Backend & DevOps
- **Firebase Auth** with full CRUD user management
- **Firestore data modeling** (subcollections for scalability, server timestamps, increment)
- **Session management** with timer-based auto-logout
- **CI/CD** via Vercel GitHub integration
- **CORS handling** in serverless functions

### Internationalization
- **Full i18n** across UI and AI-generated content
- **Auto language detection** from browser preferences
- **Locale-aware date formatting**
- **Localized fallback error states**

---

## Medical Disclaimer

Avicenna provides general health information for educational and navigational purposes only. It does not constitute medical advice, diagnosis, or treatment. Users are advised to consult qualified healthcare professionals for all medical decisions. In emergencies, contact local emergency services immediately.

---

*Built with React, Firebase, Google Gemini, and Vercel. Designed for foreigners navigating healthcare in South Korea.*
