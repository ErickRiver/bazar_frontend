import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import './productos.css';

function Productos({ results }) {
    const [items, setItems] = useState([]);
    const [numItems, setNumItems] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate(); // Usamos useNavigate

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';

    useEffect(() => {
        // Hacer la solicitud HTTP para obtener los items de la API
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`https://bazar-backend-2.onrender.com/api/items?q=${searchQuery}`);

                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }

                const data = await response.json();
                setItems(data);
                setNumItems(data.length);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [searchQuery]); // Vuelve a ejecutar la solicitud cuando el searchQuery cambie

    const handleSearchChange = (event) => {
        const query = event.target.value;
        // Actualiza la URL con el nuevo valor de búsqueda sin recargar la página
        navigate(`?search=${query}`);
    };

    const handleCardClick = (id) => {
        // Navega a la página de detalle del producto usando el id
        navigate(`/item/${id}`);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className="star full">★</span>
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="star empty">★</span>
                ))}
            </>
        );
    };

    return (
        <div className="productos-container">
            <div className="search-container2">
                <div>
                    <i id='bag' className="fas fa-shopping-bag"></i>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}

            <h3>Resultados de busqueda de "{searchQuery}": {numItems}</h3>
            <div className="items-list">
                {items.length > 0 ? (
                    items.map(item => (
                        <div 
                            key={item.id} 
                            className="item-card"
                            onClick={() => handleCardClick(item.id)} // Añadido el evento de clic
                        >
                            <div className="item-image">
                                <img src={item.thumbnail} alt={item.title} />
                            </div>
                            <div className="item-details">
                                <div className="title-container">
                                    <h3>{item.title}</h3>
                                    <p>{item.category}</p>
                                </div>
                                <p>{item.description}</p>
                                <p>Stock: {item.stock}</p>
                                <div className="title-container">
                                    <p><strong>${item.price}</strong></p>
                                    <div className="item-rating">
                                        {renderStars(item.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
}

export default Productos;
