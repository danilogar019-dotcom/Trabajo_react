import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <h3 className="footer-logo">Wanderlust<span className="accent">Travels</span></h3>
                    <p className="footer-tagline">Your journey begins here. Explore the world with confidence and comfort.</p>
                </div>
                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>Platform</h4>
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/blog">Travel Blog</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <a href="https://github.com/Danil/wanderlust-travels" target="_blank" rel="noopener noreferrer">Project GitHub</a>
                        <a href="https://www.figma.com/community/file/1154516346252988162" target="_blank" rel="noopener noreferrer">Figma Inspiration</a>
                        <Link to="/rss">RSS Feed</Link>
                    </div>
                    <div className="footer-column">
                        <h4>Connect</h4>
                        <div className="social-icons">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p className="legal-text">
                        &copy; {new Date().getFullYear()} Wanderlust Travels. All rights reserved.
                        <span className="separator">|</span>
                        <a href="#">Privacy Policy</a> & <a href="#">Cookies</a>
                        <span className="separator">|</span>
                        <a href="#">Sales Conditions</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
