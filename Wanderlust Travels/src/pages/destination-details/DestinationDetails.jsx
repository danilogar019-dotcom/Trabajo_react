import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/config';
import './DestinationDetails.css';

const DestinationDetails = () => {
    const { id } = useParams();
    const [dest, setDest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDest = async () => {
            try {
                const docRef = doc(db, 'destinations', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDest(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching destination:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDest();
    }, [id]);

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    if (!dest) return <div className="error-container"><h2>Destination not found</h2><Link to="/">Back Home</Link></div>;

    return (
        <div className="dest-details-page reveal">
            <div className="dest-hero" style={{ backgroundImage: `url(${dest.image})` }}>
                <div className="dest-hero-overlay">
                    <div className="container">
                        <Link to="/" className="back-link">← Back to Explore</Link>
                        <h1>{dest.title}</h1>
                        <p className="location-tag">{dest.location}</p>
                    </div>
                </div>
            </div>

            <div className="container dest-content-grid">
                <div className="dest-main">
                    <section className="dest-section glass-card">
                        <h2>Overview</h2>
                        <p>{dest.description || "Discover the magic of this unique location. From its stunning architecture to its vibrant local culture, there is something for every traveler to fall in love with."}</p>
                    </section>

                    <section className="dest-section glass-card">
                        <h2>Typical Itinerary</h2>
                        <ul className="itinerary-list">
                            <li>
                                <span className="day">Day 1</span>
                                <div>
                                    <h3>Arrival & Settling In</h3>
                                    <p>Meet your local guide and transfer to your boutique accommodation. Enjoy a welcome dinner featuring authentic region flavors.</p>
                                </div>
                            </li>
                            <li>
                                <span className="day">Day 2</span>
                                <div>
                                    <h3>Hidden Gems Tour</h3>
                                    <p>Explore the lesser-known spots with a local expert. Discover secret viewpoints and artisanal workshops.</p>
                                </div>
                            </li>
                            <li>
                                <span className="day">Day 3</span>
                                <div>
                                    <h3>Free Exploration</h3>
                                    <p>A full day to explore at your own pace. Optional activities available upon request.</p>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="dest-sidebar">
                    <div className="booking-card glass-card">
                        <h3>Reserve Your Spot</h3>
                        <div className="price-info">
                            <span className="price">${dest.price}</span>
                            <span className="per-person">/ person</span>
                        </div>
                        <ul className="includes-list">
                            <li>✓ 3 Nights Accomodation</li>
                            <li>✓ Daily Breakfast</li>
                            <li>✓ Local Guide</li>
                            <li>✓ Airport Transfers</li>
                        </ul>
                        <button className="book-btn-large">Book This Experience</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetails;
