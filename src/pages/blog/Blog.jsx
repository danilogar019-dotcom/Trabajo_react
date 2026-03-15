import React from 'react';
import './Blog.css';
import useTilt from '../../hooks/use-tilt';

const BlogCard = ({ post }) => {
    const tiltRef = useTilt(10);
    return (
        <article ref={tiltRef} className="blog-card glass-card reveal tilt-card">
            <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">{post.category}</span>
            </div>
            <div className="blog-content">
                <div className="blog-meta">
                    <span>{post.date}</span>
                    <span className="meta-separator">•</span>
                    <span>By {post.author}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <button className="read-more">
                    Read Story
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </article>
    );
};

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "10 Hidden Gems in South East Asia",
            excerpt: "Discover the untouched beaches and mystical temples that most tourists miss on their journey through Asia.",
            author: "Sarah J.",
            date: "May 12, 2024",
            image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Adventures"
        },
        {
            id: 2,
            title: "The Ultimate Guide to Sustainable Travel",
            excerpt: "How to minimize your environmental footprint while experiencing the world's most beautiful destinations.",
            author: "Marcus R.",
            date: "May 10, 2024",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Eco-Travel"
        },
        {
            id: 3,
            title: "Solo Travel: Facing Your Fears",
            excerpt: "Why traveling alone might be the most rewarding experience of your life, and how to stay safe.",
            author: "Elena P.",
            date: "May 5, 2024",
            image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Tips"
        },
        {
            id: 4,
            title: "Gourmet Europe: A Foodie's Itinerary",
            excerpt: "From hidden bistros in Paris to family-run trattorias in Tuscany, discover the true taste of Europe.",
            author: "David L.",
            date: "April 28, 2024",
            image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Culinary"
        }
    ];

    return (
        <main className="blog-container">
            <header className="container blog-header reveal">
                <h1 className="section-title">Travel Journal</h1>
                <p className="section-subtitle">Stories, tips, and inspiration from the Wanderlust community.</p>
            </header>

            <div className="blog-grid container perspective-container">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </main>
    );
};

export default Blog;
