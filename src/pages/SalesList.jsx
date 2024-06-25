import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import SalesForm from '../components/SalesForm';
import SalesTable from '../components/SalesTable';
import SalesFilters from '../components/SalesFilters';
import SalesCharts from '../components/SalesCharts';
import "../styles/SalesList.css";

const URL = 'http://localhost:5000';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().substring(0, 10));
    const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().substring(0, 10));
    const [totalSales, setTotalSales] = useState(0);
    const [salesByCategory, setSalesByCategory] = useState([]);

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const fetchData = async () => {
        await fetchProducts();
        await fetchCategories();
        await fetchUsers();
        await fetchSales();
    };

    const fetchSales = async () => {
        const response = await fetch(`${URL}/sales`);
        const data = await response.json();
        const filteredData = data.filter(sale => {
            const saleDate = new Date(sale.dateSale);
            const filterStartDate = new Date(new Date(startDate).setHours(0, 0, 0, 0));
            const filterEndDate = new Date(new Date(endDate).setHours(23, 59, 59, 999));
            return saleDate >= filterStartDate && saleDate <= filterEndDate;
        });
        setSales(filteredData);
        calculateTotalSales(filteredData);
        calculateSalesByCategory(filteredData);
    };

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

    const fetchUsers = async () => {
        const response = await fetch(`${URL}/users`);
        const data = await response.json();
        setUsers(data);
    };

    const calculateTotalSales = (salesData) => {
        const total = salesData.reduce((sum, sale) => sum + (sale.price || 0), 0);
        setTotalSales(total);
    };

    const calculateSalesByCategory = (salesData) => {
        if (products.length === 0 || categories.length === 0) return;

        const salesByCategory = categories.map(category => {
            const productsInCategory = products.filter(product => product.categoryId === category.id);
            const totalQuantity = salesData.filter(sale => productsInCategory.some(product => product.id === sale.productId))
                .reduce((sum, sale) => sum + Number(sale.quantity), 0);
            const totalValue = salesData.filter(sale => productsInCategory.some(product => product.id === sale.productId))
                .reduce((sum, sale) => sum + (sale.price || 0), 0);
            return {
                category: category.name,
                totalQuantity,
                totalValue
            };
        });
        setSalesByCategory(salesByCategory);
    };

    return (
        <div className="sales-list-container">
            <h1>Vendas</h1>
            <SalesFilters 
                startDate={startDate} 
                endDate={endDate} 
                setStartDate={setStartDate} 
                setEndDate={setEndDate} 
                onAddSale={() => setShowModal(true)}
            />
            <SalesTable sales={sales} products={products} users={users} />
            <div className="total-sales">
                <h2>Total Vendido: R${totalSales.toFixed(2)}</h2>
            </div>
            <SalesCharts salesByCategory={salesByCategory} />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <SalesForm onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    );
};

export default SalesList;
