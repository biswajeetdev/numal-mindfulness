# Numal – AI-Guided Mindfulness

Numal is a React Native mindfulness application that delivers AI-guided voice meditation sessions with persistent history and session summaries.

The project focuses on building a maintainable, scalable architecture that combines real-time voice AI, secure authentication, and structured session persistence.

---

## Screenshots

| Home | Session | Summary |
|------|---------|---------|
| ![Home](assets/screenshots/HomeScreen.PNG) | ![Session](assets/screenshots/SessionScreen.PNG) | ![Summary](assets/screenshots/SummaryScreen.PNG) |

---

## Features

### AI-Guided Voice Meditation
- Real-time conversational sessions powered by ElevenLabs  
- Context-aware responses during active sessions  
- Live audio streaming via WebRTC  

### Immersive Session Experiences
- Themed visual meditation environments (Forest View, Sunrise Sky, Mountain Path)  
- Parallax scrolling and animated gradients  
- Calm, distraction-free UX design  

### Session Summaries
- Automatically generated call summaries and transcripts  
- Duration tracking and session metadata  
- Persistent storage per user  

### Authentication
- Secure authentication via Clerk  
- User-scoped session history  

### Session History
- Persisted using Appwrite  
- View previous sessions and summaries inside the app  

---

## Architecture Overview

- **Client (Expo / React Native)**  
  Handles UI, navigation, authentication, and session flow.

- **API Layer (app/api)**  
  Proxies AI requests and isolates server-only environment variables.

- **Persistence (Appwrite)**  
  Stores user sessions and summaries.

- **Voice AI (ElevenLabs + LiveKit)**  
  Handles conversational voice generation and streaming.

The project emphasizes centralized configuration, environment isolation, and clear separation between client and server responsibilities.

---

## Tech Stack

### Frontend
- Expo SDK 54
- React Native
- TypeScript
- Expo Router
- Reanimated

### Backend / Services
- ElevenLabs (Voice AI)
- Appwrite (Database & session persistence)
- Clerk (Authentication)

### Native / Platform
- iOS (Prebuilt Expo project)
- Hermes engine
- LiveKit WebRTC (audio streaming)

---

## Environment Setup

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Fill in required keys:

- EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY  
- EXPO_PUBLIC_APPWRITE_APP_ID  
- EXPO_PUBLIC_APPWRITE_ENDPOINT  
- EXPO_PUBLIC_APPWRITE_DB_ID  
- EXPO_PUBLIC_APPWRITE_COLLECTION_ID  
- ELEVENLABS_API_KEY  
- EXPO_PUBLIC_API_URL  

Never commit secrets. `.env` and `.env.local` are gitignored.

---

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

For native development builds:

```bash
npx expo run:ios
```

---

## Known Limitations

- AI conversations currently send full session context and may hit token limits under extended use.
- Web version supports UI rendering only; voice sessions are native-only.
- Automated tests are not yet implemented.

---

## Roadmap

- Implement rolling context truncation for AI sessions  
- Add session summarization strategy  
- Introduce unit and integration testing  
- Deploy production-ready web build  
