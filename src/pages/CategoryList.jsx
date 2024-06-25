import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import Modal from "../components/Modal";
import CategoryForm from "../components/CategoryForm";
import "../styles/CategoryList.css";

const URL = 'http://localhost:5000';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${URL}/categories`);
            const data = await response.json();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-list-container">
            <h1>Categorias</h1>
            <Button type="button" onClick={() => setShowModal(true)}>Novo</Button>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <CategoryForm onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    );
};

export default CategoryList;
