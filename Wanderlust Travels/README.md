# ✈️ Wanderlust Travels - Your Premier Voyage Partner

<br />
<div align="center">
  <a href="https://github.com/Danil/wanderlust-travels">
    <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Logo" width="120" height="120" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1)">
  </a>

  <h3 align="center">Wanderlust Travels</h3>

  <p align="center">
    A state-of-the-art React.js experience for explorers of the digital and physical world.
    <br /><br />
    <a href="https://wanderlust-travels-demo.web.app">View Live Demo</a>
    ·
    <a href="https://github.com/Danil/wanderlust-travels/issues">Report Bug</a>
    ·
    <a href="https://github.com/Danil/wanderlust-travels/issues">Request Feature</a>
  </p>
</div>

---

## 🚀 Live Demo
**Firebase Hosting**: [https://wanderlust-travels-demo.web.app](https://wanderlust-travels-demo.web.app)

---

## 📖 Description

**Wanderlust Travels** is a premium Single Page Application (SPA) built with React.js. It offers an immersive interface for discovering travel destinations, sharing experiences in a real-time community forum, and managing travel inquiries.

### Key Features
- **Immersive Home Page**: Accessible via `/` and `/home`, featuring animated statistics, a vibrant hero section with parallax mouse tracking, and interactive components.
- **Travelers Forum (CRUD)**: Create, Read, Update, and Delete travel experiences in real-time using Firebase Firestore, with search, filter, and sort.
- **Import & Export** (`/import-export`): Import or export Forum opinions in **JSON, CSV, and XML** formats — data is synced with Firebase Firestore.
- **RSS Feed Reader** (`/rss`): Fetches and parses the live Canarias7 RSS feed.
- **Interactive Blog** (`/blog`): Firebase-powered travel blog with individual article pages.
- **Contact Page**: Contact form with success feedback and an embedded Leaflet map.
- **About Page**: Company story with an interactive FAQ accordion.
- **Responsive Footer**: Includes legal information and social media links.

---

## 📤 Import & Export

The `/import-export` page allows importing and exporting Forum opinions in three formats.

### 📁 Sample Import Files

| Format | Download |
|--------|----------|
| JSON   | [datos.json](public/samples/datos.json) |
| CSV    | [datos.csv](public/samples/datos.csv) |
| XML    | [datos.xml](public/samples/datos.xml) |

### Export
Click any Export button on the page to download all Firebase opinions dynamically as `.json`, `.csv`, or `.xml`.

### Import
Select a format, upload a file, and the opinions are sent directly to Firebase Firestore and appear immediately in the Forum.

---

## 📰 RSS Feed Integration

The `/rss` page:
- Fetches the live **Canarias7 RSS feed**: [https://www.canarias7.es/rss/](https://www.canarias7.es/rss/)
- Displays up to 9 news items with title, description, and date
- Links to the original article and to the app''s `/blog` section

---

## 🛠️ Third-Party Components & Tutorials

- [React 19](https://react.dev/) - Core UI framework
- [React Router DOM](https://reactrouter.com/) - Client-side routing
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Firebase](https://firebase.google.com/) - Hosting & Firestore database
- [Canarias7 RSS](https://www.canarias7.es/rss/) - News RSS feed
- [AllOrigins CORS Proxy](https://allorigins.win/) - CORS proxy for RSS
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) - Documentation inspiration
- [Unsplash](https://unsplash.com/) - Travel photography

---

## 🎨 Inspiration & Design

- **Figma Blueprint**: [View Figma Design](https://www.figma.com/community/file/1154516346252988162)
- **Development Strategy**: Flexbox and Media Queries for responsive mobile-first experience
- **Design System**: Custom CSS variables, glassmorphism cards, IntersectionObserver reveal animations

---

## 💻 Technical Standards

### Naming Conventions
- **Folders**: `kebab-case` (e.g., `rss-info/`, `import-export/`, `scroll-to-top/`)
- **Component & Page Files**: `PascalCase` (e.g., `Header.jsx`, `ImportExport.jsx`)
- **Style Files**: `PascalCase` (e.g., `Header.css`, `ImportExport.css`)
- **JavaScript Variables**: `camelCase` (e.g., `feedItems`, `isLoading`)
- **Boolean Variables**: `is/has/should` prefixes (e.g., `isMenuOpen`, `isLoading`)
- **Routes**: `kebab-case` (e.g., `/rss`, `/import-export`)
- **CSS Classes**: `kebab-case` (e.g., `ie-card`, `forum-card`, `glass-card`)

### Project Structure
```
src/
├── components/          # Reusable components (kebab-case folders)
│   ├── footer/
│   ├── header/
│   ├── forum/           # CRUD Forum component
│   └── ...
├── pages/               # Route-level pages
│   ├── home/            # / and /home
│   ├── about/           # /about
│   ├── contact/         # /contact
│   ├── blog/            # /blog
│   ├── rss-info/        # /rss
│   ├── import-export/   # /import-export  ← NEW
│   └── ...
└── services/            # Centralized Firebase access ← ALL Firebase goes here
    ├── config.js        # Firebase init & db export
    ├── dbUtils.js       # Firestore CRUD helpers
    └── importExportService.js  # Import/Export logic (CSV, XML, JSON)
public/
└── samples/             # Sample import files
    ├── datos.json
    ├── datos.csv
    └── datos.xml
```

> **All Firebase access is centralized in `src/services/`**. Components and pages call service functions — never Firebase directly.

---

## 📬 Contact
**Danil** - [GitHub Profile](https://github.com/Danil)
Project Link: [https://github.com/Danil/wanderlust-travels](https://github.com/Danil/wanderlust-travels)
