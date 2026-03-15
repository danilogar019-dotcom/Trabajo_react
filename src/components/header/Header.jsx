import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useMagnetic from '../../hooks/use-magnetic';
import './Header.css';

const Logo = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        let frame = 0;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Outer Ring (Glow)
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 12, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.3)';
            ctx.lineWidth = 4;
            ctx.stroke();

            // The Globe
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 10, 0, Math.PI * 2);
            ctx.strokeStyle = '#4f46e5';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Latitude lines
            ctx.beginPath();
            ctx.ellipse(width / 2, height / 2, 10, 4, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.4)';
            ctx.stroke();

            // Rotating Compass Needle
            ctx.save();
            ctx.translate(width / 2, height / 2);
            ctx.rotate((frame * 0.02) % (Math.PI * 2));

            ctx.beginPath();
            ctx.moveTo(0, -9);
            ctx.lineTo(4, 0);
            ctx.lineTo(-4, 0);
            ctx.fillStyle = '#f43f5e';
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, 9);
            ctx.lineTo(4, 0);
            ctx.lineTo(-4, 0);
            ctx.fillStyle = '#64748b';
            ctx.fill();

            ctx.restore();

            frame++;
            requestAnimationFrame(render);
        };

        render();
    }, []);

    return <canvas ref={canvasRef} width="32" height="32" style={{ marginRight: '10px' }} />;
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const themeBtnRef = useMagnetic(0.2);
    const bookBtnRef = useMagnetic(0.2);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return (
        <nav className={`header-nav ${isScrolled ? 'glass-header scrolled' : 'transparent'}`}>
            <div className="container header-container">
                <Link to="/" className="header-link-logo">
                    <Logo />
                    <span className="logo-text">Wanderlust<span className="accent">Travels</span></span>
                </Link>

                <ul className={`header-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" className={`header-link ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/about" className={`header-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>About</Link></li>
                    <li><Link to="/contact" className={`header-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                    <li><Link to="/blog" className={`header-link ${location.pathname === '/blog' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                    <li><Link to="/rss" className={`header-link ${location.pathname === '/rss' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>RSS Feed</Link></li>
                </ul>

                <div className="header-actions">
                    <button ref={themeBtnRef} className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isDarkMode ? (
                                <circle cx="12" cy="12" r="5"></circle>
                            ) : (
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            )}
                            {isDarkMode && (
                                <>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </>
                            )}
                        </svg>
                    </button>
                    <button ref={bookBtnRef} className="header-button">Book Now</button>
                    <button className="mobile-menu-toggle" onClick={toggleMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isMenuOpen ? <line x1="18" y1="6" x2="6" y2="18"></line> : <line x1="3" y1="12" x2="21" y2="12"></line>}
                            {isMenuOpen ? <line x1="6" y1="6" x2="18" y2="18"></line> : <line x1="3" y1="6" x2="21" y2="6"></line>}
                            {!isMenuOpen && <line x1="3" y1="18" x2="21" y2="18"></line>}
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
