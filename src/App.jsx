import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import RSSInfo from './pages/rss-info/RSSInfo';
import Blog from './pages/blog/Blog';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ensure scroll starts at top
    window.scrollTo(0, 0);

    const checkReveals = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
          el.classList.add('active');
        }
      });
    };

    const revealOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    // Initial check and start observing
    const initReveal = () => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));
      checkReveals(); // Immediate check for above-the-fold
    };

    // Small delay to ensure all React components have mounted their DOM nodes
    const timeout = setTimeout(initReveal, 200);
    const interval = setInterval(checkReveals, 1000); // Polling fallback

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      observer.disconnect();
    };
  }, [location.pathname]);

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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
