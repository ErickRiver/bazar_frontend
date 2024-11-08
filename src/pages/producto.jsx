import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './producto.css';

function Producto() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`https://bazar-backend-2.onrender.com/api/items/${id}?q=${searchQuery}`);

                if (!response.ok) {
                    throw new Error('Error al obtener el producto');
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, searchQuery]); // Vuelve a ejecutar la solicitud cuando el id o searchQuery cambien

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
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

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const handlePurchase = async (productId) => {
        try {
            const response = await fetch('https://bazar-backend-2.onrender.com/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),  // Enviar también la cantidad seleccionada
            });
    
            if (!response.ok) {
                throw new Error('Error al registrar la compra');
            }
    
            const result = await response.json();
            console.log("Resultado de la compra:", result);
    
            await Toast.fire({
                icon: 'success',
                title: 'Compra registrada',
            });

            window.location.reload();
        } catch (error) {
            console.error("Error al registrar la compra:", error);
            await Toast.fire({
                icon: 'error',
                title: 'Hubo un problema al realizar la compra',
            });
        }
    };    

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div className="product-detail-container">
            <div className="search-container3">
                <div>
                    <i id='bag' className="fas fa-shopping-bag"></i>
                </div>
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="item-img">
                <img src={product.thumbnail} alt={product.title} />
            </div>

            <h2 className="product-title">{product.title}</h2>
            <div className="product-category">
                {product.category}
            </div>
            <p className="product-description">{product.description}</p>
            <p className="product-description">Stock: {product.stock}</p>

            <div className="rating-container">
                <div className="product-price-detail">${product.price}</div>
                <div className="product-rating">
                    {renderStars(product.rating)}
                </div>
            </div>

            <div className="quantity-container">
                <label htmlFor="quantity">Cantidad:</label>
                <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                >
                    {/* Genera las opciones basadas en el stock */}
                    {[...Array(product.stock).keys()].map(i => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            <div className="button-container">
                <button className="buy-button" onClick={() => handlePurchase(product.id)}>
                    Comprar
                </button>
            </div>
        </div>
    );
}

export default Producto;
