import React, { useState, useEffect } from 'react';
import Input from "./Input";
import Button from "./Button";
import { v4 as uuidv4 } from 'uuid';
import "../styles/CategoryForm.css";

const URL = 'http://localhost:5000';

const CategoryForm = ({ onClose, categoryId }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);

    const fetchCategory = async () => {
        const response = await fetch(`${URL}/categories/${categoryId}`);
        const data = await response.json();
        setName(data.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            id: categoryId || uuidv4(),
            name
        };

        const method = categoryId ? 'PUT' : 'POST';
        const url = categoryId ? `${URL}/categories/${categoryId}` : `${URL}/categories`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });

        if (response.ok) {
            alert('Categoria salva');
            onClose();
        } else {
            alert('Erro ao salvar categoria');
        }
    };

    return (
        <div className="category-form-container">
            <h1>{categoryId ? 'Editar Categoria' : 'Adicionar Categoria'}</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome da Categoria"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Button type="submit">Salvar</Button>
            </form>
        </div>
    );
};

export default CategoryForm;
