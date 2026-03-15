import React, { useState, useEffect, useMemo } from 'react';
import './Forum.css';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const ForumCard = ({ opinion, index, onLike, onDelete, onEdit }) => {
    // Array of fresh travel images
    const freshImages = [
        'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&auto=format&fit=crop&q=80', // Iceland waterfall
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=80', // Venice
        'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80', // Travel
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80', // Mountains
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', // Beach
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80'  // Forest
    ];

    const cardImage = opinion.image || freshImages[index % freshImages.length];

    const handleImgError = (e) => {
        e.target.src = freshImages[index % freshImages.length];
        e.target.onerror = null; // Prevent infinite loops
    };

    return (
        <div className="forum-card glass-card reveal">
            <div className="card-image">
                <img
                    src={cardImage}
                    alt={opinion.titulo}
                    onError={handleImgError}
                />
                <div className="card-image-overlay"></div>
                <div className="card-actions">
                    <button className="action-btn edit" onClick={() => onEdit(opinion)} title="Editar Opinión">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button className="action-btn delete" onClick={() => onDelete(opinion.id)} title="Eliminar Opinión">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
                <button
                    className={`like-btn ${opinion.isLiked ? 'liked' : ''}`}
                    onClick={() => onLike(opinion.id)}
                    aria-label="Dar me gusta"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={opinion.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{opinion.likes || 0}</span>
                </button>
            </div>
            <div className="card-body">
                <div className="card-meta">
                    <span className="category-tag">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: i < opinion.estrellas ? '#ffd700' : '#ccc', fontSize: '1.2em' }}>★</span>
                        ))}
                    </span>
                    <span className="post-date">📅 {opinion.fecha || new Date().toLocaleDateString()}</span>
                </div>
                <h3 className="card-title">{opinion.titulo}</h3>
                <p className="card-content">{opinion.comentario}</p>
                <div className="card-footer">
                    <div className="card-user">
                        <div className="avatar-wrapper">
                            <span style={{ fontSize: '1.5em' }}>👤</span>
                        </div>
                        <span className="user-name">{opinion.nombre}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Forum = () => {
    const [opiniones, setOpiniones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('Featured');
    const [filterRating, setFilterRating] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentOpinion, setCurrentOpinion] = useState(null);
    const [newOpinion, setNewOpinion] = useState({ titulo: '', comentario: '', estrellas: 5, nombre: '', fecha: new Date().toLocaleDateString() });

    useEffect(() => {
        const fetchOpiniones = async () => {
            try {
                const opinionesRef = collection(db, 'opiniones');
                const q = query(opinionesRef, limit(40));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const firestoreData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setOpiniones(firestoreData);
                }
            } catch (error) {
                console.error("Error fetching opinions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOpiniones();
    }, []);

    const handleLike = async (id) => {
        const opinion = opiniones.find(op => op.id === id);
        if (!opinion) return;

        const newIsLiked = !opinion.isLiked;
        const newLikesCount = newIsLiked ? (opinion.likes || 0) + 1 : Math.max(0, (opinion.likes || 0) - 1);

        setOpiniones(prev => prev.map(op =>
            op.id === id ? { ...op, likes: newLikesCount, isLiked: newIsLiked } : op
        ));

        try {
            const opinionRef = doc(db, 'opiniones', id);
            await updateDoc(opinionRef, { likes: newLikesCount });
        } catch (error) {
            console.error("Error updating likes:", error);
            setOpiniones(prev => prev.map(op =>
                op.id === id ? { ...op, likes: opinion.likes || 0, isLiked: opinion.isLiked } : op
            ));
        }
    };

    const handleDeleteOpinion = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta opinión?')) {
            try {
                await deleteDoc(doc(db, 'opiniones', id));
                setOpiniones(prev => prev.filter(op => op.id !== id));
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleOpenEdit = (opinion) => {
        setCurrentOpinion(opinion);
        setIsEditModalOpen(true);
    };

    const handleUpdateOpinion = async (e) => {
        e.preventDefault();
        try {
            const opinionRef = doc(db, 'opiniones', currentOpinion.id);
            await updateDoc(opinionRef, {
                titulo: currentOpinion.titulo,
                comentario: currentOpinion.comentario,
                estrellas: Number(currentOpinion.estrellas),
                nombre: currentOpinion.nombre,
                fecha: currentOpinion.fecha
            });

            setOpiniones(prev => prev.map(op =>
                op.id === currentOpinion.id ? { ...op, ...currentOpinion, estrellas: Number(currentOpinion.estrellas) } : op
            ));
            setIsEditModalOpen(false);
            setCurrentOpinion(null);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleCreateOpinion = async (e) => {
        e.preventDefault();
        try {
            const docData = {
                titulo: newOpinion.titulo,
                comentario: newOpinion.comentario,
                estrellas: Number(newOpinion.estrellas),
                nombre: newOpinion.nombre,
                fecha: newOpinion.fecha || new Date().toLocaleDateString(),
                createdAt: new Date(),
                likes: 0
            };

            const docRef = await addDoc(collection(db, 'opiniones'), docData);

            const addedOpinion = {
                id: docRef.id,
                ...docData,
                isLiked: false
            };

            setOpiniones([addedOpinion, ...opiniones]);
            setIsCreateModalOpen(false);
            setNewOpinion({ titulo: '', comentario: '', estrellas: 5, nombre: '', fecha: new Date().toLocaleDateString() });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const filteredAndSortedOpiniones = useMemo(() => {
        let result = opiniones.filter(op => {
            const search = searchTerm.toLowerCase();
            return (op.titulo?.toLowerCase().includes(search) ||
                op.comentario?.toLowerCase().includes(search) ||
                op.nombre?.toLowerCase().includes(search));
        });

        if (filterRating !== 'All') {
            result = result.filter(op => Number(op.estrellas) === Number(filterRating));
        }

        return result.sort((a, b) => {
            if (sortOrder === 'Rating: High to Low') return b.estrellas - a.estrellas;
            if (sortOrder === 'Rating: Low to High') return a.estrellas - b.estrellas;
            if (sortOrder === 'Popularity') return (b.likes || 0) - (a.likes || 0);
            // Default: Newest first (Featured)
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.fecha || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.fecha || 0);
            return dateB - dateA;
        });
    }, [opiniones, searchTerm, sortOrder, filterRating]);

    if (isLoading) {
        return <div className="forum-loading"><div className="spinner"></div><p>Cargando opiniones...</p></div>;
    }

    return (
        <section className="forum-section">
            <div className="container">
                <div className="forum-header reveal">
                    <h2 className="section-title">Opiniones de Nuestros Viajeros</h2>
                    <p className="section-subtitle">Real experiences shared by our community around the globe.</p>
                </div>

                <div className="forum-toolbar reveal">
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar opiniones..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-controls">
                        <select className="filter-select" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                            <option value="All">Todas las estrellas</option>
                            <option value="5">5 Estrellas ★★★★★</option>
                            <option value="4">4+ Estrellas ★★★★☆</option>
                            <option value="3">3+ Estrellas ★★★☆☆</option>
                        </select>
                        <select className="filter-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="Featured">Más Recientes</option>
                            <option value="Rating: High to Low">Valoración: Alta a Baja</option>
                            <option value="Rating: Low to High">Valoración: Baja a Alta</option>
                            <option value="Popularity">Más Populares (Likes)</option>
                        </select>
                        <button className="create-post-btn" onClick={() => setIsCreateModalOpen(true)}>
                            Nuevo
                        </button>
                    </div>
                </div>

                {filteredAndSortedOpiniones.length > 0 ? (
                    <div className="forum-grid">
                        {filteredAndSortedOpiniones.map((opinion, index) => (
                            <ForumCard
                                key={opinion.id}
                                index={index}
                                opinion={opinion}
                                onLike={handleLike}
                                onDelete={handleDeleteOpinion}
                                onEdit={handleOpenEdit}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results glass-card">
                        <p>No se encontraron opiniones que coincidan con tu búsqueda.</p>
                        <button onClick={() => { setSearchTerm(''); setFilterRating('All'); setSortOrder('Featured'); }} className="reset-btn">Limpiar Filtros</button>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
                    <div className="modal-content glass-card tilt-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Comparte tu Experiencia</h3>
                            <button className="close-btn" onClick={() => setIsCreateModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleCreateOpinion} className="modal-form">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text" required
                                    className="wizard-input"
                                    value={newOpinion.nombre}
                                    onChange={(e) => setNewOpinion({ ...newOpinion, nombre: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Título de la reseña</label>
                                <input
                                    type="text" required
                                    className="wizard-input"
                                    value={newOpinion.titulo}
                                    onChange={(e) => setNewOpinion({ ...newOpinion, titulo: e.target.value })}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Estrellas (1-5)</label>
                                    <input
                                        type="number" min="1" max="5" required
                                        className="wizard-input"
                                        value={newOpinion.estrellas}
                                        onChange={(e) => setNewOpinion({ ...newOpinion, estrellas: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input
                                        type="date" required
                                        className="wizard-input"
                                        value={newOpinion.fecha}
                                        onChange={(e) => setNewOpinion({ ...newOpinion, fecha: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Comentario</label>
                                <textarea required rows="4" className="wizard-input" value={newOpinion.comentario} onChange={(e) => setNewOpinion({ ...newOpinion, comentario: e.target.value })} />
                            </div>
                            <button type="submit" className="next-btn" style={{ width: '100%', marginTop: '1rem' }}>Publicar Opinión</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && currentOpinion && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content glass-card tilt-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Editar tu Experiencia</h3>
                            <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateOpinion} className="modal-form">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text" required
                                    className="wizard-input"
                                    value={currentOpinion.nombre || ''}
                                    onChange={(e) => setCurrentOpinion({ ...currentOpinion, nombre: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Título de la reseña</label>
                                <input
                                    type="text" required
                                    className="wizard-input"
                                    value={currentOpinion.titulo || ''}
                                    onChange={(e) => setCurrentOpinion({ ...currentOpinion, titulo: e.target.value })}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Estrellas (1-5)</label>
                                    <input
                                        type="number" min="1" max="5" required
                                        className="wizard-input"
                                        value={currentOpinion.estrellas || 5}
                                        onChange={(e) => setCurrentOpinion({ ...currentOpinion, estrellas: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input
                                        type="date" required
                                        className="wizard-input"
                                        value={currentOpinion.fecha || ''}
                                        onChange={(e) => setCurrentOpinion({ ...currentOpinion, fecha: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Comentario</label>
                                <textarea required rows="4" className="wizard-input" value={currentOpinion.comentario || ''} onChange={(e) => setCurrentOpinion({ ...currentOpinion, comentario: e.target.value })} />
                            </div>
                            <button type="submit" className="next-btn" style={{ width: '100%', marginTop: '1rem' }}>Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Forum;
