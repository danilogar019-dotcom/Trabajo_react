import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Contact.css';

const Contact = () => {
    const position = [40.4168, -3.7038]; // Madrid, Spain
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <main className="contact-container">
            <div className="contact-header reveal">
                <h1>Get in Touch</h1>
                <p>Have questions about your next adventure? We're here to help.</p>
            </div>

            <div className="contact-grid reveal">
                {isSubmitted ? (
                    <div className="contact-success-card">
                        <div className="success-lottie">✈️</div>
                        <h2>Message Sent Successfully!</h2>
                        <p>Our travel experts will review your request and get back to you within 24 hours.</p>
                        <button className="back-btn" onClick={() => setIsSubmitted(false)}>Send another message</button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h2>Send us a Message</h2>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" className="form-input" placeholder="Your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" className="form-input" placeholder="Your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" className="form-textarea" placeholder="How can we help?" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Send Message'}
                        </button>
                    </form>
                )}

                <div className="contact-info">
                    <div className="map-wrapper">
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    Wanderlust Travels Headquarters <br /> Madrid, Spain.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="info-details">
                        <div className="info-item">
                            <h3>Our Office</h3>
                            <p>Calle Gran Vía, 28, 28013 Madrid, Spain</p>
                        </div>
                        <div className="info-item">
                            <h3>Email Us</h3>
                            <p>hello@wanderlusttravels.com</p>
                        </div>
                        <div className="info-item">
                            <h3>Call Us</h3>
                            <p>+34 912 345 678</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
