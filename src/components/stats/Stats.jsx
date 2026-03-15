import React, { useState, useEffect } from 'react';
import './Stats.css';

const StatItem = ({ label, target, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
    }, [target]);

    return (
        <div className="stat-item glass-card reveal">
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
