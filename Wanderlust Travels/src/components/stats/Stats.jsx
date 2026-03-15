import React, { useState, useEffect } from 'react';
import './Stats.css';

const StatItem = ({ label, target, suffix = "" }) => {
    const [count, setCount] = useState(0);

    const [isVisible, setIsVisible] = useState(false);
    const itemRef = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.5 });

        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, isVisible]);

    return (
        <div ref={itemRef} className="stat-item glass-card reveal">
            <h3 className="stat-number">{count.toLocaleString()}{suffix}</h3>
            <p className="stat-label">{label}</p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    <StatItem label="Happy Travelers" target={15000} suffix="+" />
                    <StatItem label="Destinations" target={450} />
                    <StatItem label="Expert Guides" target={120} />
                    <StatItem label="Support" target={24} suffix="/7" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
