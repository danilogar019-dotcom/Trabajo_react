import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/config';
import { uploadBlogInitialData } from '../../services/dbUtils';
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
                <Link to={`/blog/${post.id}`} className="read-more">
                    Read Story
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </Link>
            </div>
        </article>
    );
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const blogRef = collection(db, 'blog');
                let snapshot = await getDocs(blogRef);

                // If no data, try to migrate once
                if (snapshot.empty) {
                    console.log("No blog data found, migrating initial data...");
                    await uploadBlogInitialData();
                    snapshot = await getDocs(blogRef);
                }

                const postsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Sort by date (latest first)
                postsList.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPosts(postsList);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="blog-loading">
                <div className="loader"></div>
                <p>Curating stories for you...</p>
            </div>
        );
    }

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
