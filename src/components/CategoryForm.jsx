import React, { useState } from 'react';
import Input from "./Input";
import Button from "./Button";
import { v4 as uuidv4 } from 'uuid';
import "../styles/CategoryForm.css";

const URL = 'http://localhost:5000';

const CategoryForm = ({ onClose }) => {
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uuidv4(),
                name
            })
        });

        if (response.ok) {
            alert('Category added');
            onClose();
        } else {
            alert('Error');
        }
    };

    return (
        <div className="category-form-container">
            <h1>Adicionar Categoria</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    onChange={handleNameChange}
                />
                <Button type="submit">Adicionar</Button>
            </form>
        </div>
    );
};

export default CategoryForm;
