import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import RSSInfo from './pages/rss-info/RSSInfo';
import Blog from './pages/blog/Blog';
import { uploadOpinionsInitialData } from './services/dbUtils';
import ImportExport from './pages/import-export/ImportExport';

import DestinationDetails from './pages/destination-details/DestinationDetails';
import BlogDetails from './pages/blog-details/BlogDetails';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ensure scroll starts at top
    window.scrollTo(0, 0);

    const revealOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    const initReveal = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      revealElements.forEach(el => observer.observe(el));
    };

    // Watch for new .reveal elements being added to the DOM (like from Firebase)
    const mutationObserver = new MutationObserver(() => {
      initReveal();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const timeout = setTimeout(initReveal, 500);
    const interval = setInterval(initReveal, 2000);

    // Initial data migration check
    uploadOpinionsInitialData();

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      observer.disconnect();
      mutationObserver.disconnect();
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
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
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
