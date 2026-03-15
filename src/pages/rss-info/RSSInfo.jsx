import React from 'react';
import './RSSInfo.css';

const RSSInfo = () => {
    return (
        <main className="rss-container">
            <div className="rss-header reveal">
                <h1>RSS Feed Information</h1>
                <p>Stay updated with our latest destination guides and travel tips.</p>
            </div>
            <div className="rss-content reveal">
                <p className="rss-description">
                    Follow our RSS feed to get the latest updates directly in your favorite feed reader.
                    We publish weekly articles about hidden gems, travel hacks, and deal alerts.
                </p>
                <div className="rss-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 11a9 9 0 0 1 9 9"></path>
                        <path d="M4 4a16 16 0 0 1 16 16"></path>
                        <circle cx="5" cy="19" r="1"></circle>
                    </svg>
                </div>
                <a
                    href="https://wanderlusttravels.com/feed.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rss-link-box"
                >
                    Subscribe to Workspace RSS
                </a>
            </div>
        </main>
    );
};

export default RSSInfo;
