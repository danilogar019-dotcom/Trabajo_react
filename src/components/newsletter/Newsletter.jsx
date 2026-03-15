import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setEmail('');
        }, 1200);
    };

    if (isSubmitted) {
        return (
            <section id="newsletter" className="newsletter-section success">
                <div className="container newsletter-container">
                    <div className="newsletter-success-content">
                        <div className="success-icon">✓</div>
                        <h2 className="newsletter-title">You're on the list!</h2>
                        <p className="newsletter-text">Thank you for joining. Exciting travel inspiration is coming your way soon.</p>
                        <button className="reset-btn" onClick={() => setIsSubmitted(false)}>Back to site</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="newsletter" className="newsletter-section">
            <div className="container newsletter-container">
                <div className="newsletter-content">
                    <h2 className="newsletter-title">Join Our Travel Community</h2>
                    <p className="newsletter-text">Get exclusive offers, travel tips, and inspiration delivered to your inbox.</p>
                </div>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="newsletter-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="newsletter-button" disabled={isLoading}>
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
