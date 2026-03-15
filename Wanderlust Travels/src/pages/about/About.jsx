import React, { useState } from 'react';
import './About.css';
import useTilt from '../../hooks/use-tilt';

const About = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const tiltRef = useTilt(10);

    const faqs = [
        {
            question: "How do I book a customized tour?",
            answer: "You can use our 'Quick View' booking wizard on any destination card, or contact our team directly for a fully tailored itinerary."
        },
        {
            question: "What is your cancellation policy?",
            answer: "We offer free cancellation up to 30 days before departure for most packages. Premium memberships enjoy even more flexibility."
        },
        {
            question: "Do you offer travel insurance?",
            answer: "Yes, every Wanderlust Travels package includes basic emergency medical insurance. Optional comprehensive coverage is available."
        },
        {
            question: "Can I join as a solo traveler?",
            answer: "Absolutely! Many of our travelers go solo. We can even pair you with a same-sex roommate to help you save on single supplements."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main className="about-container">
            <div className="about-header reveal">
                <h1 className="section-title">Our Story</h1>
                <p className="section-subtitle">Connecting curious travelers with extraordinary journeys since 2010.</p>
            </div>

            <div className="about-content">
                <div className="about-text reveal">
                    <h2>Who We Are</h2>
                    <p>
                        Wanderlust Travels is a premier travel agency dedicated to helping you discover
                        the world's most breathtaking destinations. Our mission is to provide unforgettable
                        experiences that will leave you with memories to last a lifetime.
                    </p>
                    <p>
                        Whether you're looking for a relaxing beach getaway, an adventurous mountain trek,
                        or a cultural city tour, we have the perfect package for you. We take pride in our
                        attention to detail and our commitment to sustainable travel.
                    </p>
                </div>
                <div ref={tiltRef} className="about-image reveal tilt-card">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Travel" />
                </div>
            </div>

            <section className="faq-section">
                <h2 className="faq-title reveal">Frequently Asked Questions</h2>
                <div className="faq-accordion">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item reveal ${activeIndex === index ? 'active' : ''}`}>
                            <button
                                type="button"
                                className="faq-question"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleFAQ(index);
                                }}
                                aria-expanded={activeIndex === index}
                            >
                                {faq.question}
                                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                            </button>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default About;
