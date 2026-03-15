import React from 'react';
import './Gallery.css';
import useTilt from '../../hooks/use-tilt';

const GalleryItem = ({ img }) => {
    const tiltRef = useTilt(15);
    return (
        <div ref={tiltRef} className="gallery-item glass-card tilt-card reveal">
            <img src={img.url} alt={img.title} />
            <div className="gallery-overlay">
                <h3 className="gallery-item-title">{img.title}</h3>
                <p className="gallery-item-location">{img.location}</p>
            </div>
        </div>
    );
};

const Gallery = () => {
    const images = [
        {
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Mountain Serenity",
            location: "Swiss Alps"
        },
        {
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Azure Shores",
            location: "Maldives"
        },
        {
            url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Hidden Temples",
            location: "Kyoto, Japan"
        },
        {
            url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Golden Deserts",
            location: "Dubai, UAE"
        },
        {
            url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Urban Nights",
            location: "New York, USA"
        },
        {
            url: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Emerald Lakes",
            location: "Vietnam"
        }
    ];

    return (
        <section className="gallery-section container">
            <header className="gallery-header reveal">
                <h2 className="section-title">Wanderlust Moments</h2>
                <p className="section-subtitle">A visual journey through our travelers' favorite snapshots.</p>
            </header>
            <div className="gallery-grid perspective-container">
                {images.map((img, index) => (
                    <GalleryItem key={index} img={img} />
                ))}
            </div>
        </section>
    );
};

export default Gallery;
