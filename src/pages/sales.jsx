import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sales.css';

function Sales() {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener los detalles del producto usando su ID
    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`https://bazar-backend-2.onrender.com/api/items/${productId}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener los detalles del producto');
            }
            const productData = await response.json();
            console.log(productData);
            return productData; // Devuelve los datos del producto
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };

    useEffect(() => {
        // Llamada a la API para obtener las ventas
        fetch('https://bazar-backend-2.onrender.com/api/sales')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('No se pudo obtener las ventas');
                }
                return res.json();
            })
            .then(async (data) => {
                const salesWithProductDetails = await Promise.all(
                    data.map(async (sale) => {
                        const product = await fetchProductDetails(sale.productId);
                        return {
                            ...sale,
                            product,
                        };
                    })
                );
                setSales(salesWithProductDetails); // Asigna las ventas con los productos al estado
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Cargando ventas...</div>;
    }

    if (error) {
        return <div className="error">{`Error: ${error}`}</div>;
    }

    const handleSalir = () => {
        navigate('/'); 
    };

    return (
        <div className="sales-list-container">
            <h2>Registered Purchases</h2>

            {sales.length === 0 ? (
                <div className="no-sales">No hay ventas registradas</div>
            ) : (
                sales.map((sale) => (
                    <div key={sale._id} className="sale-card">
                        <h3 className="sale-product-title">Compra: {sale._id}</h3>
                        <h3 className="sale-product-title">
                            Producto: {sale.product ? sale.product.title : 'Producto no encontrado'}
                        </h3>
                        {sale.product && sale.product.thumbnail && (
                            <div className="container-thumbnail">
                                <img
                                    src={sale.product.thumbnail}
                                    alt={sale.product.name}
                                    className="product-thumbnail"
                                />
                            </div>
                        )}

                        <div className="sale-price">Precio: ${sale.product ? sale.product.price : 'N/A'}</div>
                        <div className="sale-date">Fecha de venta: {new Date(sale.date).toLocaleDateString()} {new Date(sale.date).toLocaleTimeString()}</div>
                        <div className="sale-quantity">Cantidad: {sale.quantity}</div>
                        <div className="sale-total">Total: ${sale.total}</div>
                    </div>
                ))
            )}

            <button className="salir-button" onClick={handleSalir}>
                Salir
            </button>
        </div>
    );
}

export default Sales;
