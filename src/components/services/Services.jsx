import React from 'react';
import './Services.css';
import useTilt from '../../hooks/use-tilt';

const ServiceCard = ({ service }) => {
    const tiltRef = useTilt(15);
    return (
        <div ref={tiltRef} className="service-card glass-card reveal tilt-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
        </div>
    );
};

const Services = () => {
    const services = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            ),
            title: "Custom Itineraries",
            description: "Tailor-made journeys designed specifically for your interests and travel style."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            ),
            title: "Luxury Stays",
            description: "Hand-picked premium accommodations that offer the best in comfort and style."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            ),
            title: "24/7 Support",
            description: "Round-the-clock assistance to ensure your travels are smooth and worry-free."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            ),
            title: "Sustainable Travel",
            description: "Eco-friendly choices that minimize your footprint and support local communities."
        }
    ];

    return (
        <section className="services-section container">
            <header className="services-header reveal">
                <h2 className="section-title">Our Premium Services</h2>
                <p className="section-subtitle">Elevating your travel experience with curated excellence.</p>
            </header>
            <div className="services-grid perspective-container">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>
        </section>
    );
};

export default Services;
