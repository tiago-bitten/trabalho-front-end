import React from 'react';
import SalesTableRow from './SalesTableRow';
import "../styles/SalesTable.css";

const SalesTable = ({ sales, products, users }) => {
    const getProductName = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : 'Produto removido';
    };

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Usuário removido';
    };

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor unitário</th>
                        <th>Total</th>
                        <th>Data</th>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <SalesTableRow 
                            key={sale.id} 
                            sale={sale} 
                            getProductName={getProductName} 
                            getUserName={getUserName} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
