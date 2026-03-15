import React, { useState, useEffect } from 'react';
import './Forum.css';
import forumData from '../../assets/forum-data.json';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const ForumCard = ({ post, onLike }) => {
    return (
        <div className="forum-card glass-card reveal">
            <div className="card-image">
                <img src={post.image} alt={post.title} />
                <div className="card-image-overlay"></div>
                <button
                    className={`like-btn ${post.isLiked ? 'liked' : ''}`}
                    onClick={() => onLike(post.id)}
                    aria-label="Like post"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{post.likes || 0}</span>
                </button>
            </div>
            <div className="card-body">
                <div className="card-meta">
                    <span className="category-tag">{post.category}</span>
                    <span className="post-date">📅 {post.date}</span>
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-content">{post.content}</p>
                <div className="card-footer">
                    <div className="card-user">
                        <div className="avatar-wrapper">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user}`} alt={post.user} className="user-avatar" />
                        </div>
                        <span className="user-name">{post.user}</span>
                    </div>
                    <button className="share-btn" title="Share">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Beach' });

    const categories = ['All', 'Beach', 'Mountain', 'City', 'Adventure'];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Try fetching from Firebase Firestore
                const forumRef = collection(db, 'forum');
                const q = query(forumRef, orderBy('date', 'desc'), limit(10));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const firestoreData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setPosts(firestoreData);
                } else {
                    // Fallback to local JSON if collection is empty
                    throw new Error("Empty collection");
                }
            } catch (error) {
                console.log("Firebase not configured or error fetching. Falling back to local data.", error);
                // Fallback implementation
                const enrichedData = forumData.map(post => ({
                    ...post,
                    likes: post.likes || Math.floor(Math.random() * 50),
                    isLiked: false
                }));
                setPosts(enrichedData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = (postId) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked
                };
            }
            return post;
        }));
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        const postToAdd = {
            id: Date.now(),
            user: 'Guest User',
            date: new Date().toLocaleDateString(),
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            likes: 0,
            isLiked: false,
            ...newPost
        };
        setPosts([postToAdd, ...posts]);
        setIsModalOpen(false);
        setNewPost({ title: '', content: '', category: 'Beach' });
    };

    if (isLoading) {
        return <div className="forum-loading">
            <div className="spinner"></div>
            <p>Loading travelers experiences...</p>
        </div>;
    }

    const filteredPosts = posts.filter(post => {
        const matchesCategory = filter === 'All' || post.category === filter;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="forum-section">
            <div className="container">
                <div className="forum-header">
                    <h2 className="section-title">Travelers Forum</h2>
                    <p>Read and share experiences with our worldwide community.</p>
                </div>

                <div className="forum-toolbar">
                    <div className="search-bar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search discussions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Start Discussion
                    </button>
                </div>

                <div className="forum-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="forum-grid">
                        {filteredPosts.map(post => (
                            <ForumCard key={post.id} post={post} onLike={handleLike} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>No discussions found matching your search.</p>
                        <button onClick={() => { setSearchQuery(''); setFilter('All'); }} className="reset-btn">Clear All Filters</button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Share Your Experience</h3>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleCreatePost} className="modal-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    placeholder="Give your trip a catchy title"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={newPost.category}
                                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                >
                                    {categories.filter(c => c !== 'All').map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    placeholder="Tell us about your adventure..."
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-post-btn">Post to Forum</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Forum;
