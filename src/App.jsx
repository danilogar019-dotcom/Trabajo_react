import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import RSSInfo from './pages/rss-info/RSSInfo';
import Blog from './pages/blog/Blog';
import ImportExport from './pages/import-export/ImportExport';
import { uploadOpinionsInitialData } from './services/dbUtils';

function App() {

  useEffect(() => {
    const checkReveals = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', checkReveals);
    // Initial check
    checkReveals();
    
    // Polling fallback for dynamic content
    const interval = setInterval(checkReveals, 1000);

    // Initial data migration check
    uploadOpinionsInitialData();

    return () => {
      window.removeEventListener('scroll', checkReveals);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="mesh-background"></div>
      <Header />
      <ScrollToTop />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/rss" element={<RSSInfo />} />
          <Route path="/import-export" element={<ImportExport />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
