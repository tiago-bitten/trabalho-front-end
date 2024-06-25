import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import SalesForm from '../components/SalesForm';
import Button from '../components/Button';
import "../styles/SalesList.css";

const URL = 'http://localhost:5000';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchSales = async () => {
            const response = await fetch(`${URL}/sales`);
            const data = await response.json();
            setSales(data);
        };

        const fetchProducts = async () => {
            const response = await fetch(`${URL}/products`);
            const data = await response.json();
            setProducts(data);
        };

        const fetchUsers = async () => {
            const response = await fetch(`${URL}/users`);
            const data = await response.json();
            setUsers(data);
        };

        fetchSales();
        fetchProducts();
        fetchUsers();
    }, []);

    const getProductName = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : 'Produto removido';
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.email : 'Usuário removido';
    };

    return (
        <div className="sales-list-container">
            <h1>Vendas</h1>
            <Button type="button" onClick={() => setShowModal(true)}>Adicionar Venda</Button>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                        <th>Data</th>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{getProductName(sale.productId)}</td>
                            <td>{sale.quantity}</td>
                            <td>R${sale.price}</td>
                            <td>{new Date(sale.dateSale).toLocaleString()}</td>
                            <td>{getUserName(sale.userId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <SalesForm onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    );
};

export default SalesList;
