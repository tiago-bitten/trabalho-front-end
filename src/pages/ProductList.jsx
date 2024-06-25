import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import ProductTable from '../components/ProductTable';
import "../styles/ProductList.css";

const URL = 'http://localhost:5000';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${URL}/products`);
            const data = await response.json();
            setProducts(data);
        };

        const fetchCategories = async () => {
            const response = await fetch(`${URL}/categories`);
            const data = await response.json();
            setCategories(data);
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const handleEdit = (id) => {
        setEditProductId(id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setDeleteProductId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        await fetch(`${URL}/products/${deleteProductId}`, {
            method: 'DELETE'
        });

        setProducts(products.filter(product => product.id !== deleteProductId));
        setShowDeleteModal(false);
    };

    return (
        <div className="product-list-container">
            <h1>Produtos</h1>
            <Button type="button" onClick={() => setShowModal(true)}>Novo</Button>
            <ProductTable 
                products={products} 
                categories={categories} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ProductForm 
                    onClose={() => setShowModal(false)} 
                    productId={editProductId} 
                    categories={categories} 
                />
            </Modal>
            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <div>
                    <h2>Você tem certeza que deseja excluir?</h2>
                    <Button type="button" onClick={handleDeleteConfirm}>Sim</Button>
                    <Button type="button" onClick={() => setShowDeleteModal(false)}>Não</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductList;
