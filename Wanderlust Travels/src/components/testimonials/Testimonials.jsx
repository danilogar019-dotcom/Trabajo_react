import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Jenkins",
            location: "London, UK",
            text: "Wanderlust Travels turned our dream honeymoon into a reality. Every detail was perfectly managed, from the private villas to the local guides. Truly unforgettable!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 2,
            name: "Marcus Rodriguez",
            location: "Barcelona, Spain",
            text: "I've traveled with many agencies, but the personalization here is on another level. They understood exactly what I was looking for in a solo adventure trek.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 3,
            name: "Elena Petrova",
            location: "Vienna, Austria",
            text: "The 24/7 support was a lifesaver when our flight was delayed. They rebooked everything before we even landed. That's what I call peace of mind!",
            rating: 4,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="testimonials-section container">
            <h2 className="section-title">What Our Travelers Say</h2>
            <div className="testimonials-slider">
                <div className="testimonials-track perspective-container" style={{ transform: `translateX(-${current * 100}%)` }}>
                    {testimonials.map((item) => (
                        <div key={item.id} className="testimonial-card">
                            <div className="testimonial-content glass-card tilt-card">
                                <div className="testimonial-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < item.rating ? 'star filled' : 'star'}>★</span>
                                    ))}
                                </div>
                                <p className="testimonial-text">"{item.text}"</p>
                                <div className="testimonial-author">
                                    <img src={item.image} alt={item.name} className="author-image" />
                                    <div className="author-info">
                                        <h4 className="author-name">{item.name}</h4>
                                        <p className="author-location">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="testimonials-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${current === index ? 'active' : ''}`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
