import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import Modal from "../components/Modal";
import CategoryForm from "../components/CategoryForm";
import "../styles/CategoryList.css";

const URL = 'http://localhost:5000';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${URL}/categories`);
            const data = await response.json();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const handleEdit = (id) => {
        setEditCategoryId(id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        await fetch(`${URL}/categories/${id}`, {
            method: 'DELETE'
        });
        setCategories(categories.filter(category => category.id !== id));
    };

    return (
        <div className="category-list-container">
            <h1>Categorias</h1>
            <Button type="button" onClick={() => { setEditCategoryId(null); setShowModal(true); }}>Nova categoria</Button>
            <div className="category-cards">
                {categories.map(category => (
                    <div key={category.id} className="category-card">
                        <div className="category-info">
                            <h2>{category.name}</h2>
                        </div>
                        <div className="category-actions">
                            <Button type="button" onClick={() => handleEdit(category.id)}>Editar</Button>
                            <Button type="button" onClick={() => handleDelete(category.id)}>Excluir</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <CategoryForm onClose={() => setShowModal(false)} categoryId={editCategoryId} />
            </Modal>
        </div>
    );
};

export default CategoryList;
