import React, { useRef, useEffect } from 'react';
import useMagnetic from '../../hooks/use-magnetic';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const ctaRef = useMagnetic(0.2);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;
            hero.style.setProperty('--x', `${x}px`);
            hero.style.setProperty('--y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="hero" className="hero-section" ref={heroRef}>
            <div className="hero-background"></div>
            <div className="hero-overlay"></div>

            {/* Floating Accents */}
            <div className="floating-accents">
                <div className="accent-blob blob-1"></div>
                <div className="accent-blob blob-2"></div>
                <div className="floating-card-ui card-1 reveal">
                    <span className="icon">🌍</span>
                    <div className="text">
                        <strong>500+</strong>
                        <span>Destinations</span>
                    </div>
                </div>
                <div className="floating-card-ui card-2 reveal" style={{ transitionDelay: '0.3s' }}>
                    <span className="icon">⭐</span>
                    <div className="text">
                        <strong>4.9/5</strong>
                        <span>User Rating</span>
                    </div>
                </div>
            </div>

            <div className="container hero-content">
                <h1 className="hero-title reveal">
                    Discover Your Next <br />
                    <span className="hero-title-accent">Great Adventure</span>
                </h1>
                <p className="hero-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
                    Explore the world's most breathtaking destinations.
                    Unforgettable experiences await you.
                </p>
                <div className="hero-cta-wrapper reveal" style={{ transitionDelay: '0.4s' }}>
                    <button ref={ctaRef} className="hero-cta-button">Plan Your Trip</button>
                    <button className="hero-secondary-button">Watch Video</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
