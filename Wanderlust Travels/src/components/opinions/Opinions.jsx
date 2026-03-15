import { useEffect, useState, useMemo } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import "./Opinions.css";

function Opinions() {
    const [opiniones, setOpiniones] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filtering states
    const [sortBy, setSortBy] = useState('fecha'); // 'fecha', 'estrellas', 'likes'
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc', 'asc'
    const [filterStars, setFilterStars] = useState('Todas'); // 'Todas', '5', '4', '3', '2', '1'

    useEffect(() => {
        const obtenerOpiniones = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "opiniones"));
                const lista = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    isLiked: false // Local state for the current session
                }));
                // Sort by createdAt if available, or just keep as is
                setOpiniones(lista);
            } catch (error) {
                console.error("Error fetching opinions:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerOpiniones();
    }, []);

    const handleLike = async (id) => {
        const opinion = opiniones.find(op => op.id === id);
        if (!opinion) return;

        const newIsLiked = !opinion.isLiked;
        const newLikesCount = newIsLiked ? (opinion.likes || 0) + 1 : Math.max(0, (opinion.likes || 0) - 1);

        // Optimistic UI update
        setOpiniones(prev => prev.map(op =>
            op.id === id ? { ...op, likes: newLikesCount, isLiked: newIsLiked } : op
        ));

        // Firestore update
        try {
            const opinionRef = doc(db, 'opiniones', id);
            await updateDoc(opinionRef, { likes: newLikesCount });
        } catch (error) {
            console.error("Error updating likes in Firestore:", error);
            // Revert optimistic update on error
            setOpiniones(prev => prev.map(op =>
                op.id === id ? { ...op, likes: opinion.likes || 0, isLiked: opinion.isLiked } : op
            ));
        }
    };

    const opinionesFiltradas = useMemo(() => {
        let result = [...opiniones];

        // Apply Stars Filter
        if (filterStars !== 'Todas') {
            result = result.filter(op => Number(op.estrellas) === Number(filterStars));
        }

        // Apply Sorting
        result.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'estrellas') {
                comparison = (Number(b.estrellas) || 0) - (Number(a.estrellas) || 0);
            } else if (sortBy === 'likes') {
                comparison = (Number(b.likes) || 0) - (Number(a.likes) || 0);
            } else {
                // default 'fecha'
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.fecha || 0).getTime();
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.fecha || 0).getTime();
                comparison = dateB - dateA;
            }
            return sortOrder === 'asc' ? comparison * -1 : comparison;
        });

        return result;
    }, [opiniones, filterStars, sortBy, sortOrder]);

    if (loading) {
        return (
            <div className="loading-container container">
                <div className="spinner"></div>
                <p>Cargando experiencias...</p>
            </div>
        );
    }

    if (opiniones.length === 0) {
        return null; // Or a placeholder message
    }

    return (
        <section className="opinions-section container">
            <div className="reveal">
                <h2 className="section-title">Opiniones de Nuestros Viajeros</h2>
                <p className="section-subtitle">Real experiences shared by our community around the globe.</p>

                <div className="opinions-controls glass-card" style={{ marginBottom: '30px', padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="control-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label>Ordenar por:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <option value="fecha" style={{ color: 'black' }}>Más Recientes</option>
                            <option value="estrellas" style={{ color: 'black' }}>Mejor Valoradas</option>
                            <option value="likes" style={{ color: 'black' }}>Más Populares (Likes)</option>
                        </select>
                    </div>
                    <div className="control-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label>Orden:</label>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <option value="desc" style={{ color: 'black' }}>Mayor a menor (Desc)</option>
                            <option value="asc" style={{ color: 'black' }}>Menor a mayor (Asc)</option>
                        </select>
                    </div>
                    <div className="control-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label>Filtrar por Estrellas:</label>
                        <select value={filterStars} onChange={(e) => setFilterStars(e.target.value)} style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <option value="Todas" style={{ color: 'black' }}>Todas las puntuaciones</option>
                            <option value="5" style={{ color: 'black' }}>5 Estrellas</option>
                            <option value="4" style={{ color: 'black' }}>4 Estrellas</option>
                            <option value="3" style={{ color: 'black' }}>3 Estrellas</option>
                            <option value="2" style={{ color: 'black' }}>2 Estrellas</option>
                            <option value="1" style={{ color: 'black' }}>1 Estrella</option>
                        </select>
                    </div>
                </div>
            </div>

            {opinionesFiltradas.length > 0 ? (
                <div className="opinions-grid">
                    {opinionesFiltradas.map((opinion, index) => (
                        <div
                            key={opinion.id}
                            className="opinion-card glass-card reveal"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className="opinion-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <div className="opinion-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="star">
                                            {i < opinion.estrellas ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>
                                <span className="opinion-date" style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{opinion.fecha || new Date(opinion.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}</span>
                            </div>

                            <h3 className="opinion-title">{opinion.titulo}</h3>
                            <p className="opinion-comment">{opinion.comentario}</p>

                            <div className="opinion-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="opinion-author" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <div className="opinion-avatar">
                                        {opinion.nombre?.charAt(0) || 'U'}
                                    </div>
                                    <span className="opinion-author-name">{opinion.nombre}</span>
                                </div>

                                <button
                                    onClick={() => handleLike(opinion.id)}
                                    aria-label="Dar me gusta"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: opinion.isLiked ? 'var(--color-accent)' : 'var(--color-text-light)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill={opinion.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                    <span>{opinion.likes || 0}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="opinions-no-results glass-card" style={{ padding: '40px', textAlign: 'center', marginTop: '20px' }}>
                    <p>No se encontraron opiniones con estos filtros.</p>
                    <button onClick={() => { setFilterStars('Todas'); setSortBy('fecha'); setSortOrder('desc'); }} style={{ marginTop: '15px', padding: '10px 20px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Restablecer Filtros</button>
                </div>
            )}
        </section>
    );
}

export default Opinions;
