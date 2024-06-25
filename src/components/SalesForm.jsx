import React, { useState, useEffect, useContext } from 'react';
import Input from './Input';
import Button from './Button';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/SalesForm.css";

const URL = 'http://localhost:5000';

const SalesForm = ({ onClose }) => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const { isAuthenticated, userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${URL}/products`);
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = products.find(p => p.id === productId);

        if (product && Number(product.stock) >= Number(quantity)) {
            const response = await fetch(`${URL}/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: uuidv4(),
                    productId,
                    quantity,
                    price: product.price * quantity,
                    dateSale: new Date().toISOString(),
                    userId
                })
            });

            if (response.ok) {
                product.stock -= quantity;
                await fetch(`${URL}/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                alert('Venda registrada e estoque atualizado');
                onClose();
            } else {
                alert('Erro ao registrar a venda');
            }
        } else {
            alert(`Quantidade indisponível em estoque. Estoque atual: ${product.stock}, quantidade solicitada: ${quantity}`);
        }
    };

    return (
        <div className="sales-form-container">
            <h1>Registrar Venda</h1>
            <form onSubmit={handleSubmit}>
                <select onChange={handleProductChange} value={productId}>
                    <option value="">Escolha um produto</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name} - Estoque: {product.stock}
                        </option>
                    ))}
                </select>
                <Input
                    type="number"
                    name="quantity"
                    placeholder="Quantidade"
                    onChange={handleQuantityChange}
                />
                <Button type="submit">Registrar Venda</Button>
            </form>
        </div>
    );
};

export default SalesForm;
