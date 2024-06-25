import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { v4 as uuidv4 } from 'uuid';
import "../styles/ProductForm.css";

const URL = 'http://localhost:5000';

const ProductForm = ({ onClose, productId, categories }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                const response = await fetch(`${URL}/products/${productId}`);
                const data = await response.json();
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setCategoryId(data.categoryId);
                setStock(data.stock);
            };

            fetchProduct();
        }
    }, [productId]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };

    const handleStockChange = (e) => {
        setStock(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `${URL}/products/${productId}` : `${URL}/products`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: productId || uuidv4(),
                name,
                description,
                price,
                categoryId,
                stock
            })
        });

        if (response.ok) {
            alert('Produto salvo com sucesso');
            handleCancel();
        } else {
            alert('Erro ao salvar produto');
        }
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
        setStock('');
        onClose();
    }

    return (
        <div className="product-form-container">
            <h1>{productId ? 'Editar Produto' : 'Adicionar Produto'}</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome do Produto"
                    value={name}
                    onChange={handleNameChange}
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <Input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={price}
                    onChange={handlePriceChange}
                />
                <Input
                    type="number"
                    name="stock"
                    placeholder="Estoque"
                    value={stock}
                    onChange={handleStockChange}
                />
                <select onChange={handleCategoryChange} value={categoryId}>
                    <option value="">Escolha uma categoria</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <Button type="submit">{productId ? 'Salvar' : 'Adicionar'}</Button>
            </form>
        </div>
    );
};

export default ProductForm;
