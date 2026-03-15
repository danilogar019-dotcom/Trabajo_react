import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedExperience.css';

const FeaturedExperience = () => {
    return (
        <section className="featured-section reveal">
            <div className="container">
                <div className="featured-card glass-card">
                    <div className="featured-image">
                        <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Kyoto Kiyomizu-dera" />
                        <div className="floating-badge">Experience of the Month</div>
                    </div>
                    <div className="featured-info">
                        <span className="featured-tag">Cultural Heritage</span>
                        <h2>Kyoto: The Heart of Old Japan</h2>
                        <p>Immerse yourself in centuries-old traditions. From the serene bamboo forests of Arashiyama to the golden shimmer of Kinkaku-ji, discover why Kyoto remains Japan's cultural capital.</p>
                        <ul className="featured-perks">
                            <li>✨ Private Tea Ceremony</li>
                            <li>🍱 Kaiseki Dining Experience</li>
                            <li>🏮 Gion Night Walk</li>
                        </ul>
                        <Link to="/destination/2" className="featured-cta">Explore Kyoto Journey</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedExperience;
