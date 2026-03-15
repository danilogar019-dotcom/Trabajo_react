# ✈️ Wanderlust Travels - Your Premier Voyage Partner

<br />
<div align="center">
  <a href="https://github.com/Danil/wanderlust-travels">
    <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Logo" width="120" height="120" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1)">
  </a>

  <h3 align="center">Wanderlust Travels</h3>

  <p align="center">
    A state-of-the-art React.js experience designed for explorers of the digital and physical world.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the Methodology »</strong></a>
    <br />
    <br />
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
*   **Immersive Home Page**: Accessible via `/` and `/home`, featuring animated statistics, a vibrant hero section with parallax mouse tracking, and multiple interactive components.
*   **Travelers Forum (CRUD)**: A community hub where users can **Create, Read, Update, and Delete** travel experiences in real-time using Firebase Firestore. Includes search, filter by rating, and sort options.
*   **RSS Feed Reader**: A dedicated page (`/rss`) that fetches and parses the live Canarias7 RSS feed, displaying news items with links both to the original articles and to the app's `/blog` section.
*   **Interactive Blog**: Firebase-powered travel blog at `/blog` with individual article pages.
*   **Contact Page**: Interactive contact form with success feedback and an embedded Leaflet map.
*   **About Page**: Company story with an interactive FAQ accordion.
*   **Responsive Footer**: Includes legal information (Privacy Policy, Cookies, Sales Terms) expandable in-page and social media links.

---

## 📰 RSS Feed Integration

The project includes an RSS reader page at `/rss` that:
- Fetches the live **Canarias7 RSS feed**: [https://www.canarias7.es/rss/](https://www.canarias7.es/rss/)
- Parses and displays up to 9 news items with title, description, and date
- Each item provides a link to the original article **and** a link to the app's `/blog` news section (pointing to the Firebase-hosted app)

> **RSS Feed Reader Preview**: The `/rss` page displays a responsive grid of news cards fetched live from Canarias7. Each card has an "Ver en Canarias7" button linking to the original article and a "Ver noticias en la App" button linking to `https://wanderlust-travels-demo.web.app/blog`.

---

## 🛠️ Third-Party Components & Tutorials

*   [React 19](https://react.dev/) - Core UI framework.
*   [React Router DOM](https://reactrouter.com/) - Client-side routing.
*   [Leaflet](https://leafletjs.com/) - Interactive maps on the Contact page.
*   [Firebase](https://firebase.google.com/) - Hosting & Firestore database for Forum and Blog.
*   [Canarias7 RSS](https://www.canarias7.es/rss/) - News RSS feed source.
*   [AllOrigins CORS Proxy](https://allorigins.win/) - CORS proxy to fetch RSS feed in the browser.
*   [Best-README-Template](https://github.com/othneildrew/Best-README-Template) - Documentation structure inspiration.
*   [Creativos Online: Footers](https://www.creativosonline.org/25-ejemplos-fantasticos-de-footers-en-diseno-web.html) - Footer design inspiration.
*   [Unsplash](https://unsplash.com/) - High-quality travel photography.

---

## 🎨 Inspiration & Design

*   **Figma Blueprint**: [View Figma Design](https://www.figma.com/community/file/1154516346252988162)
*   **Development Strategy**: Built using Flexbox and Media Queries for a fully responsive mobile-first experience.
*   **Design System**: Custom CSS variables for theming, glassmorphism cards, and smooth reveal animations using IntersectionObserver.

---

## 💻 Technical Standards

### Naming Conventions
*   **Folders**: `kebab-case` (e.g., `rss-info/`, `blog-details/`, `scroll-to-top/`)
*   **Component & Page Files**: `PascalCase` (e.g., `Header.jsx`, `BlogDetails.jsx`)
*   **Style Files**: `PascalCase` (e.g., `Header.css`, `Footer.css`)
*   **JavaScript Variables**: `camelCase` (e.g., `feedItems`, `isLoading`)
*   **Boolean Variables**: `is/has/should` prefixes (e.g., `isMenuOpen`, `isLoading`, `hasError`)
*   **Routes**: `kebab-case` (e.g., `/rss`, `/blog-details`, `/destination/:id`)
*   **CSS Classes**: `kebab-case` (e.g., `rss-item-title`, `forum-card`, `glass-card`)

### Project Structure
```
src/
├── components/          # Reusable components (kebab-case folders)
│   ├── footer/          # Footer component
│   ├── header/          # Header with mobile nav
│   ├── forum/           # CRUD Forum component
│   └── ...
├── pages/               # Route-level pages (kebab-case folders)
│   ├── home/            # / and /home
│   ├── about/           # /about
│   ├── contact/         # /contact
│   ├── blog/            # /blog
│   ├── rss-info/        # /rss
│   └── ...
└── firebase/            # Firebase config and utilities
```

---

## 📬 Contact
**Danil** - [GitHub Profile](https://github.com/Danil)  
Project Link: [https://github.com/Danil/wanderlust-travels](https://github.com/Danil/wanderlust-travels)
