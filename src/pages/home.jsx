import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        // Si la consulta está vacía, no redirigir con parámetros
        if (query.trim() === "") {
            navigate('/items'); // Redirige sin parámetros de búsqueda
        } else {
            navigate(`/items?search=${query}`); // Redirige con la búsqueda
        }
    };

    const handleSalesRedirect = () => {
        navigate('/sales');
    };

    return (
        <div className="container">
            <div className="logo-container">
                <i className="fas fa-shopping-bag"></i>
                <h1>Bazar Online</h1>
            </div>

            <div className="search-container">
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <input
                    type="text"
                    className="search-busqueda"
                    placeholder="Search..."

                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button className="search-button" onClick={handleSearch}>
                <i className="fas fa-search"></i> Buscar  
            </button>
            <button className="search-button2" onClick={handleSalesRedirect}>
                <i className="fas fa-chart-line"></i> Sales  
            </button>

        </div>
    );
}

export default Home;
