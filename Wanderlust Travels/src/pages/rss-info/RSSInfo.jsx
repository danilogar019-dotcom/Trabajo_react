import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RSSInfo.css';

const RSS_FEED_URL = 'https://www.canarias7.es/rss/';

// Fallback items from Canarias7 – always visible even if fetch fails
const fallbackItems = [
    {
        title: 'Canarias bate un nuevo récord histórico de turistas en enero',
        description: 'Las islas reciben más de tres millones de visitantes en el primer mes del año, consolidando su posición como uno de los destinos más populares de Europa.',
        link: 'https://www.canarias7.es',
        pubDate: '2025-02-10T10:00:00Z',
        category: 'Turismo',
        id: 'fallback-1'
    },
    {
        title: 'El Teide vuelve a brillar entre los volcanes más visitados del mundo',
        description: 'El parque nacional del Teide, en Tenerife, encabeza la lista de volcanes con más visitantes a nivel mundial por séptimo año consecutivo.',
        link: 'https://www.canarias7.es/sociedad/turismo',
        pubDate: '2025-02-08T09:30:00Z',
        category: 'Naturaleza',
        id: 'fallback-2'
    },
    {
        title: 'Nuevas rutas de senderismo habilitadas en Gran Canaria',
        description: 'El cabildo de Gran Canaria presenta diez nuevas rutas de senderismo que recorren el interior de la isla, desde el barranco de Guayadeque hasta la cumbre de Roque Nublo.',
        link: 'https://www.canarias7.es/sociedad',
        pubDate: '2025-02-05T11:00:00Z',
        category: 'Aventura',
        id: 'fallback-3'
    },
    {
        title: 'La gastronomía canaria gana protagonismo en las guías internacionales',
        description: 'El mojo picón, el gofio y el queso majorero figuran en los rankings de productos más auténticos de Europa publicados por las principales revistas gastronómicas.',
        link: 'https://www.canarias7.es/economia',
        pubDate: '2025-02-03T08:00:00Z',
        category: 'Gastronomía',
        id: 'fallback-4'
    },
    {
        title: 'Lanzarote celebra el 50 aniversario de su declaración como Reserva de la Biosfera',
        description: 'La isla celebra medio siglo de conservación medioambiental con una semana de actividades culturales, exposiciones y visitas guiadas por los parques naturales.',
        link: 'https://www.canarias7.es/cultura',
        pubDate: '2025-01-30T10:00:00Z',
        category: 'Cultura',
        id: 'fallback-5'
    },
    {
        title: 'El aeropuerto de Gran Canaria suma tres nuevas rutas europeas para la temporada de verano',
        description: 'Las nuevas conexiones unirán Las Palmas con Varsovia, Budapest y Tallin, ampliando significativamente la conectividad de las islas con Europa del Este.',
        link: 'https://www.canarias7.es/economia/empresas',
        pubDate: '2025-01-28T12:00:00Z',
        category: 'Viajes',
        id: 'fallback-6'
    },
    {
        title: 'El carnaval de Las Palmas de Gran Canaria se consolida como el segundo más importante del mundo',
        description: 'Miles de turistas de todo el planeta llegan cada año para disfrutar de uno de los espectáculos más coloridos y alegres del planeta.',
        link: 'https://www.canarias7.es/cultura/fiestas',
        pubDate: '2025-01-25T09:00:00Z',
        category: 'Cultura',
        id: 'fallback-7'
    },
    {
        title: 'Fuerteventura, elegida mejor destino de kitesurf de Europa por segunda vez',
        description: 'La revista especializada Kite Magazine vuelve a reconocer las playas del sur de Fuerteventura como el lugar ideal para la práctica de este deporte acuático.',
        link: 'https://www.canarias7.es/sociedad/ocio',
        pubDate: '2025-01-22T11:30:00Z',
        category: 'Deportes',
        id: 'fallback-8'
    },
    {
        title: 'Nuevas plantas de energía solar convierten a Canarias en referente de sostenibilidad',
        description: 'Las islas avanzan hacia el objetivo de producir el 100% de su energía a partir de fuentes renovables para el año 2040.',
        link: 'https://www.canarias7.es/economia/medio-ambiente',
        pubDate: '2025-01-18T08:00:00Z',
        category: 'Sostenibilidad',
        id: 'fallback-9'
    }
];

const emptyForm = {
    title: '',
    description: '',
    link: '',
    category: '',
    pubDate: new Date().toISOString().split('T')[0]
};

/* ---------- Sub-components ---------- */

const RSSItem = ({ item, index, isCustom, onDelete, onEdit }) => (
    <article className={`rss-item glass-card reveal ${isCustom ? 'rss-item--custom' : ''}`} style={{ animationDelay: `${index * 0.05}s` }}>
        <div className="rss-item-header">
            <span className="rss-item-category">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" />
                    <circle cx="5" cy="19" r="1" />
                </svg>
                {item.category || 'RSS · Noticias'}
            </span>
            <div className="rss-item-meta-group">
                {item.pubDate && (
                    <time className="rss-item-date">
                        {new Date(item.pubDate).toLocaleDateString('es-ES', {
                            day: '2-digit', month: 'short', year: 'numeric'
                        })}
                    </time>
                )}
                {isCustom && (
                    <div className="rss-item-actions">
                        <button
                            className="rss-item-action-btn edit"
                            onClick={() => onEdit(item)}
                            title="Editar noticia"
                            aria-label="Editar noticia"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                        <button
                            className="rss-item-action-btn delete"
                            onClick={() => onDelete(item.id)}
                            title="Eliminar noticia"
                            aria-label="Eliminar noticia"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
        <h3 className="rss-item-title">{item.title}</h3>
        {item.description && (
            <p className="rss-item-description">
                {item.description.replace(/<[^>]*>/g, '').slice(0, 190)}
                {item.description.replace(/<[^>]*>/g, '').length > 190 ? '…' : ''}
            </p>
        )}
        <div className="rss-item-footer">
            <a href={item.link || RSS_FEED_URL} target="_blank" rel="noopener noreferrer" className="rss-item-external">
                {isCustom ? 'Leer Noticia' : 'Ver en Canarias7'}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
            </a>
            <Link to="/blog" className="rss-item-internal">
                Ver relacionados en App
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
            </Link>
        </div>
    </article>
);

const NewsModal = ({ isOpen, onClose, onSubmit, editingItem }) => {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen && editingItem) {
            setFormData({
                ...editingItem,
                pubDate: editingItem.pubDate ? editingItem.pubDate.split('T')[0] : emptyForm.pubDate
            });
        } else if (isOpen) {
            setFormData(emptyForm);
        }
    }, [isOpen, editingItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
        if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Add ID if it's a new item
        const submissionData = {
            ...formData,
            id: editingItem?.id || `custom-${Date.now()}`,
            pubDate: formData.pubDate || new Date().toISOString()
        };

        onSubmit(submissionData);
        initiateClose();
    };

    const initiateClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setFormData(emptyForm);
            setErrors({});
            onClose();
        }, 300); // match animation duration
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className={`rss-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={initiateClose}>
            <div className={`rss-modal ${isClosing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
                <div className="rss-modal-header">
                    <h3>
                        {editingItem ? (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Editar Noticia
                            </>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Añadir Noticia
                            </>
                        )}
                    </h3>
                    <button className="rss-modal-close" onClick={initiateClose} aria-label="Cerrar">×</button>
                </div>

                <form className="rss-modal-form" onSubmit={handleSubmit}>
                    <div className={`rss-form-group ${errors.title ? 'has-error' : ''}`}>
                        <label htmlFor="rss-title">Título <span className="required">*</span></label>
                        <input
                            id="rss-title"
                            name="title"
                            type="text"
                            className="rss-form-input"
                            placeholder="Ej: Nuevos vuelos directos a Canarias"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="rss-form-error">{errors.title}</span>}
                    </div>

                    <div className={`rss-form-group ${errors.description ? 'has-error' : ''}`}>
                        <label htmlFor="rss-description">Descripción <span className="required">*</span></label>
                        <textarea
                            id="rss-description"
                            name="description"
                            className="rss-form-input rss-form-textarea"
                            placeholder="Breve resumen de la noticia…"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <span className="rss-form-error">{errors.description}</span>}
                    </div>

                    <div className="rss-form-row">
                        <div className="rss-form-group">
                            <label htmlFor="rss-category">Categoría</label>
                            <input
                                id="rss-category"
                                name="category"
                                type="text"
                                className="rss-form-input"
                                placeholder="Ej: Turismo, Destinos…"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="rss-form-group">
                            <label htmlFor="rss-date">Fecha</label>
                            <input
                                id="rss-date"
                                name="pubDate"
                                type="date"
                                className="rss-form-input"
                                value={formData.pubDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="rss-form-group">
                        <label htmlFor="rss-link">URL del artículo (opcional)</label>
                        <input
                            id="rss-link"
                            name="link"
                            type="url"
                            className="rss-form-input"
                            placeholder="https://www.ejemplo.com/noticia"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="rss-modal-actions">
                        <button type="button" className="rss-btn-cancel" onClick={initiateClose}>Cancelar</button>
                        <button type="submit" className="rss-btn-submit">
                            {editingItem ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Guardar Cambios
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    Publicar Noticia
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* ---------- Main Component ---------- */

const RSSInfo = () => {
    const [feedItems, setFeedItems] = useState(fallbackItems);
    // Load custom items from local storage if they exist
    const [customItems, setCustomItems] = useState(() => {
        const saved = localStorage.getItem('wanderlust_custom_news');
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Save to local storage whenever custom items change
    useEffect(() => {
        localStorage.setItem('wanderlust_custom_news', JSON.stringify(customItems));
    }, [customItems]);

    useEffect(() => {
        const fetchRssFeed = async () => {
            const proxies = [
                `https://corsproxy.io/?${encodeURIComponent(RSS_FEED_URL)}`,
                `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_FEED_URL)}`,
                `https://thingproxy.freeboard.io/fetch/${RSS_FEED_URL}`
            ];

            for (const proxyUrl of proxies) {
                try {
                    const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });
                    if (!response.ok) continue;

                    const xmlText = await response.text();
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                    if (xmlDoc.querySelector('parsererror')) continue;

                    const items = Array.from(xmlDoc.querySelectorAll('item')).slice(0, 9).map((item, index) => ({
                        id: `live-${index}`,
                        title: item.querySelector('title')?.textContent?.trim() || 'Sin título',
                        description: item.querySelector('description')?.textContent?.trim() || '',
                        link: item.querySelector('link')?.textContent?.trim() || RSS_FEED_URL,
                        pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
                        category: item.querySelector('category')?.textContent?.trim() || 'Canarias7'
                    }));

                    if (items.length > 0) {
                        setFeedItems(items);
                        setIsLive(true);
                        break;
                    }
                } catch {
                    // Try next proxy
                }
            }
            setIsLoading(false);
        };

        fetchRssFeed();
    }, []);

    const handleSaveNews = (savedItem) => {
        if (editingItem) {
            // Update existing
            setCustomItems(prev => prev.map(item => item.id === savedItem.id ? { ...savedItem, isCustom: true } : item));
        } else {
            // Add new
            setCustomItems(prev => [{ ...savedItem, isCustom: true }, ...prev]);
        }
    };

    const handleDeleteCustom = (id) => {
        // Find the element to add a leaving animation class before actually removing it
        const element = document.getElementById(`rss-card-${id}`);
        if (element) {
            element.classList.add('leaving');
            setTimeout(() => {
                setCustomItems(prev => prev.filter(item => item.id !== id));
            }, 300);
        } else {
            setCustomItems(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const allItems = [...customItems, ...feedItems];

    return (
        <main className="rss-container">
            {/* Hero */}
            <div className="rss-hero reveal">
                <div className="rss-icon-wrapper">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" />
                        <circle cx="5" cy="19" r="1" />
                    </svg>
                </div>
                <h1>Portal de Noticias</h1>
                <p>
                    Últimas noticias sobre viajes, destinos y turismo corporativo.
                </p>
                <div className="rss-hero-actions">
                    <button className="rss-add-btn primary-pulse" onClick={handleOpenCreate}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Publicar Noticia Propia
                    </button>
                    <a href={RSS_FEED_URL} target="_blank" rel="noopener noreferrer" className="rss-subscribe-btn secondary-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" />
                            <circle cx="5" cy="19" r="1" />
                        </svg>
                        Feed Oficial
                    </a>
                </div>
            </div>

            {/* Feed section */}
            <div className="rss-feed-section container">
                <div className="rss-feed-header reveal">
                    <div className="rss-header-title-group">
                        <h2>
                            Últimas Entradas
                        </h2>
                        <span className="rss-badge custom-badge" title="Noticias personalizadas guardadas localmente">
                            {customItems.length} Propias
                        </span>
                        <span className="rss-badge live-badge" title={isLive ? "Feed en vivo" : "Feed de muestra estable"}>
                            {feedItems.length} {isLive ? 'Live' : 'Oficiales'}
                        </span>
                    </div>

                    {isLoading ? (
                        <p className="rss-status-text loading-pulse">Sincronizando feed oficial…</p>
                    ) : (
                        <p className="rss-status-text">
                            {isLive
                                ? '✨ Sincronizado en tiempo real.'
                                : '📋 Mostrando selección oficial de turismo.'}
                        </p>
                    )}
                </div>

                {isLoading && (
                    <div className="rss-loading">
                        <div className="rss-spinner"></div>
                        <p>Actualizando canal de noticias…</p>
                    </div>
                )}

                {!isLoading && (
                    <div className="rss-items-grid">
                        {customItems.map((item, i) => (
                            <div key={item.id} id={`rss-card-${item.id}`}>
                                <RSSItem
                                    item={item}
                                    index={i}
                                    isCustom={true}
                                    onDelete={handleDeleteCustom}
                                    onEdit={handleOpenEdit}
                                />
                            </div>
                        ))}
                        {feedItems.map((item, i) => (
                            <div key={item.id}>
                                <RSSItem
                                    item={item}
                                    index={customItems.length + i}
                                    isCustom={false}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit news modal */}
            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveNews}
                editingItem={editingItem}
            />
        </main>
    );
};

export default RSSInfo;
