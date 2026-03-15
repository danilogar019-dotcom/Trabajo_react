import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './BlogDetails.css';

const BlogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'blog', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPost(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    if (!post) return <div className="error-container"><h2>Post not found</h2><Link to="/blog">Back to Journal</Link></div>;

    return (
        <article className="blog-details-page reveal">
            <header className="blog-details-header" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="header-overlay">
                    <div className="container">
                        <Link to="/blog" className="back-link">← Back to Journal</Link>
                        <span className="blog-category-badge">{post.category}</span>
                        <h1>{post.title}</h1>
                        <div className="blog-meta-detailed">
                            <span>{post.date}</span>
                            <span className="separator">•</span>
                            <span>{post.author}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container blog-content-wrapper">
                <div className="blog-main-content glass-card">
                    <p className="lead-text">{post.excerpt}</p>
                    <div className="post-body">
                        {post.content || "Full story coming soon. Our travelers are currently experiencing these incredible locations firsthand to bring you the most authentic and up-to-date stories. Stay tuned for the complete digital journal entry."}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;
