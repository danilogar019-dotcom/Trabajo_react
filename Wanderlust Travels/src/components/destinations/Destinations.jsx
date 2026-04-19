import React, { useState } from 'react';
import './Destinations.css';
import useTilt from '../../hooks/use-tilt';

import { Link } from 'react-router-dom';

const DestinationCard = ({ dest, index, onBook }) => {
    const tiltRef = useTilt(10);
    return (
        <div
            className="destination-card reveal"
            ref={tiltRef}
            style={{ transitionDelay: `${index * 0.1}s` }}
        >
            <Link to={`/destination/${dest.id}`} className="destination-image-container">
                <div className="destination-badge">{dest.category}</div>
                <img src={dest.image} alt={dest.title} className="destination-image" />
            </Link>
            <div className="destination-content">
                <div className="destination-header-row">
                    <Link to={`/destination/${dest.id}`} className="destination-title-link">
                        <h3 className="destination-title">{dest.title}</h3>
                    </Link>
                    <div className="destination-rating">⭐ {dest.rating}</div>
                </div>
                <p className="destination-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {dest.location}
                </p>
                <div className="destination-info">
                    <div className="price-tag">
                        <span className="label">Starts from</span>
                        <div className="destination-price">${dest.price}</div>
                    </div>
                    <button className="destination-button" onClick={onBook}>Book Now</button>
                </div>
            </div>
        </div>
    );
};

import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/config';
import { uploadDestinationsInitialData } from '../../services/dbUtils';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('Featured');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDest, setSelectedDest] = useState(null);
    const [bookingStep, setBookingStep] = useState(1);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const destRef = collection(db, 'destinations');
                let snapshot = await getDocs(destRef);

                // If no data, migrate once
                if (snapshot.empty) {
                    console.log("No destinations found, migrating...");
                    await uploadDestinationsInitialData();
                    snapshot = await getDocs(destRef);
                }

                const destList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDestinations(destList);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    const filteredDestinations = destinations
        .filter(dest => {
            const matchesSearch = dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'All' || dest.category === category;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOrder === 'Price: Low to High') return a.price - b.price;
            if (sortOrder === 'Price: High to Low') return b.price - a.price;
            if (sortOrder === 'Rating') return b.rating - a.rating;
            return 0;
        });

    const handleBookNow = (dest) => {
        setSelectedDest(dest);
        setIsModalOpen(true);
        setBookingStep(1);
    };

    const closeModal = () => setIsModalOpen(false);
    const nextStep = () => setBookingStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setBookingStep(prev => Math.max(prev - 1, 1));

    if (loading) {
        return (
            <div className="destinations-loading">
                <div className="loader"></div>
                <p>Loading dream destinations...</p>
            </div>
        );
    }

    return (
        <section id="destinations" className="destinations-section">
            <div className="container">
                <div className="destinations-header reveal">
                    <h2 className="section-title">Popular Destinations</h2>
                    <p className="section-subtitle">Choose your next dream vacation from our curated list</p>
                </div>

                <div className="destinations-toolbar reveal">
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search destinations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-controls">
                        <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="Beach">Beach</option>
                            <option value="Mountain">Mountain</option>
                            <option value="City">City</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                        <select className="filter-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="Featured">Featured</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: High to Low">Price: High to Low</option>
                            <option value="Rating">Rating</option>
                        </select>
                    </div>
                </div>

                <div className="destinations-grid">
                    {filteredDestinations.map((dest, index) => (
                        <DestinationCard
                            key={dest.id}
                            dest={dest}
                            index={index}
                            onBook={() => handleBookNow(dest)}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                        {selectedDest && (
                            <div className="booking-wizard">
                                <h3>Book trip to {selectedDest.title}</h3>
                                <div className="wizard-steps-indicator">
                                    <div className={`step ${bookingStep >= 1 ? 'active' : ''}`}>1</div>
                                    <div className="line"></div>
                                    <div className={`step ${bookingStep >= 2 ? 'active' : ''}`}>2</div>
                                    <div className="line"></div>
                                    <div className={`step ${bookingStep >= 3 ? 'active' : ''}`}>3</div>
                                </div>

                                <div className="wizard-step-content animation-fade-in">
                                    {bookingStep === 1 && (
                                        <div className="step-content">
                                            <h4>Select Dates & Travelers</h4>
                                            <div className="form-group">
                                                <label>Date</label>
                                                <input type="date" className="wizard-input" />
                                            </div>
                                            <div className="form-group">
                                                <label>Travelers</label>
                                                <input type="number" placeholder="Number of travelers" className="wizard-input" />
                                            </div>
                                        </div>
                                    )}
                                    {bookingStep === 2 && (
                                        <div className="step-content">
                                            <h4>Personal Details</h4>
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" placeholder="Full Name" className="wizard-input" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" placeholder="Email Address" className="wizard-input" />
                                            </div>
                                        </div>
                                    )}
                                    {bookingStep === 3 && (
                                        <div className="booking-success-step">
                                            <div className="success-badge">🎊</div>
                                            <h4>Registration Complete!</h4>
                                            <p>Total Estimate: ${selectedDest.price}/person</p>
                                            <p className="success-msg">Our team will contact you shortly to confirm your booking for {selectedDest.title}.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="wizard-navigation">
                                    {bookingStep < 3 ? (
                                        <>
                                            {bookingStep > 1 && <button onClick={prevStep} className="prev-btn">Back</button>}
                                            <button onClick={nextStep} className="next-btn">
                                                {bookingStep === 2 ? 'Confirm Booking' : 'Continue'}
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={closeModal} className="next-btn">Great!</button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Destinations;
