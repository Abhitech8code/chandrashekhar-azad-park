# Chandrashekhar Azad Park — Digital Heritage & Visitor Platform

> **Notice:** An independent digital heritage and visitor information platform dedicated to celebrating the history, botanical sanctuary, and monuments of Chandrashekhar Azad Park (Alfred Park), Prayagraj, Uttar Pradesh.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![GitHub License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20PWA-blue.svg)](https://github.com/Abhitech8code/chandrashekhar-azad-park)

---

## 🏛️ Project Overview

**Chandrashekhar Azad Park** (historically Alfred Park and Company Bagh) spans 133 majestic acres in the heart of Prayagraj. This digital portal serves as a comprehensive web experience honoring the sacred ground where revolutionary commander **Chandra Shekhar Azad** made his supreme sacrifice on 27 February 1931.

The platform provides a modern visitor portal equipped with:
- An **Interactive 3D Digital Miniature Map** with touch controls, landmark inspect sheets, radar tracking, and category filters.
- A **Digital Ticketing & Verification Engine** with instant QR pass generation, mock payments, and gate validation.
- An **Audited Historical Archive & Audio Chronicles** in both English and Hindi.
- An **Interactive Heritage Photo Gallery** with high-resolution imagery and fullscreen touch lightbox.
- A **Comprehensive Visitor Guide** with real-time operating hours, transit routes, and nearby Prayagraj landmarks.

---

## ✨ Key Features

### 1. 🗺️ Signature 3D Interactive Park Map
- **Digital Miniature Model**: Built using vector geometry and isometric 3D styling.
- **Adaptive Layout**: 
  - **Mobile Portrait**: 3-state draggable bottom sheet (`peek` → `half` → `expanded`) with landmark tags.
  - **Mobile Landscape**: 70% 3D map canvas / 30% detail inspection panel.
  - **Desktop**: Full interactive canvas with dynamic camera controls, audio tours, and radar overview.
- **Micro-Interactions**: Filter by monuments, museums, botanical zones, libraries, and recreational promenades.

### 2. 📱 Mobile-First Responsive Design
- Rigorously tested across 320px, 375px, 390px, 768px, 1024px, and 1440px viewports with **zero horizontal scrolling**.
- Native touch-optimized targets (minimum 44×44px).
- Fullscreen slide-in navigation drawer with scroll lock, bilingual language switch (**EN | हिन्दी**), and instant search.

### 3. 🎫 Digital Pass Booking & Staff Verification
- Book general entry passes, morning walker monthly cards, museum combined tickets, and camera permits.
- Instant reference generation (`AZP-xxxxxx`) with downloadable printable pass view and QR code.
- Gate Staff Validation Desk modal (`Ctrl+Shift+A` or Header Shield) to verify passes live against the database.

### 4. 🌿 Heritage Gallery & Visitor Guide
- Verified photographs of the Azad Memorial, Thornhill Mayne Library, Allahabad National Museum, Victoria Marble Canopy, and Rose Conservatory.
- Accordion guides for operating timings, gate regulations, photography permissions, wheelchair accessibility, and clay jogging tracks.
- Transit routes from Prayagraj Junction (PRYJ), Civil Lines Bus Stand, Airport (IXD), and Triveni Sangam.

### 5. ⚡ PWA & Offline Support
- Built-in Service Worker (`sw.js`) and Web App Manifest (`manifest.json`).
- Offline fallback banner and cached heritage resources.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, Modern Vanilla CSS (Fluid Typography, Glassmorphism), ES6+ JavaScript |
| **Interactive Map** | SVG / Canvas Isometric 3D Projection, Touch Gestures, Web Audio API |
| **Backend API** | Node.js, Express.js |
| **Data Storage** | JSON File-Store with in-memory caching |
| **Deployment** | Vercel Serverless Functions (`/api`), Vercel Static Hosting (`/Frontend`) |

---

## 📁 Project Structure

```
chandrashekhar-azad-park/
├── Frontend/                     # Client-side web application
│   ├── index.html                # Main heritage & visitor portal page
│   ├── map.html                  # 3D interactive digital miniature map
│   ├── styles.css                # Comprehensive responsive styles
│   ├── app.js                    # Client-side portal interactivity & APIs
│   ├── sw.js                     # Offline Service Worker
│   ├── manifest.json             # Progressive Web App manifest
│   ├── Logo.png                  # Official park emblem
│   └── assets/                   # High-res photography & audio files
│       ├── azad_memorial.jpg
│       ├── thornhill_library.jpg
│       ├── allahabad_museum.jpg
│       ├── victoria_canopy.jpg
│       ├── rose_conservatory.jpg
│       ├── musical_fountain.jpg
│       ├── azad_chronicle_english.mp3
│       └── azad_chronicle_hindi.mp3
├── Backend/                      # Node.js Express backend service
│   ├── server.js                 # REST API endpoints & static server
│   ├── package.json              # Backend dependencies
│   └── data/                     # Persistent JSON stores
│       ├── bookings.json
│       ├── feedback.json
│       └── companion_chats.json
├── api/                          # Vercel Serverless entry point
│   └── index.js
├── package.json                  # Root npm configuration & scripts
├── vercel.json                   # Vercel routing & serverless rewrites
├── .gitignore                    # Git exclusions
├── .env.example                  # Environment configuration template
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhitech8code/chandrashekhar-azad-park.git
   cd chandrashekhar-azad-park
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5000](http://localhost:5000) in your web browser.

---

## 🌐 API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/park/info` | `GET` | Park metadata, opening hours, live weather & AQI |
| `/api/attractions` | `GET` | List of monuments, museums, and botanical points |
| `/api/events` | `GET` | Scheduled community yoga, exhibitions, and walks |
| `/api/reviews` | `GET` / `POST` | Visitor guestbook reviews and rating submissions |
| `/api/feedback` | `GET` / `POST` | Live visitor pulse feedback and suggestions |
| `/api/tickets/book` | `POST` | Create booking and generate digital E-Pass |
| `/api/tickets/verify/:ref` | `GET` | Verify ticket authenticity by pass reference |
| `/api/health` | `GET` | System health check and uptime |

---

## ☁️ Deployment

### Deploy to Vercel

The repository is pre-configured with `vercel.json` for one-click deployment:

1. Import the repository `https://github.com/Abhitech8code/chandrashekhar-azad-park` in your [Vercel Dashboard](https://vercel.com/new).
2. Leave the default settings (Framework Preset: **Other**).
3. Click **Deploy**. Vercel will automatically serve static frontend assets and provision serverless functions for the API routes.

---

## 👨‍💻 Developer & Attribution

- **Developer:** [Abhishek](https://github.com/Abhitech8code)
- **Repository:** [https://github.com/Abhitech8code/chandrashekhar-azad-park](https://github.com/Abhitech8code/chandrashekhar-azad-park)
- **Classification:** Independent digital heritage and visitor information platform.
- **License:** ISC
