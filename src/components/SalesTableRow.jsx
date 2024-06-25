import React from 'react';

const SalesTableRow = ({ sale, getProductName, getUserName }) => {
    return (
        <tr>
            <td>{getProductName(sale.productId)}</td>
            <td>{sale.quantity}</td>
            <td>R${Number(sale.price || 0).toFixed(2)}</td>
            <td>R${Number(sale.price || 0 * sale.quantity).toFixed(2)}</td>
            <td>{new Date(sale.dateSale).toLocaleString()}</td>
            <td>{getUserName(sale.userId)}</td>
        </tr>
    );
};

export default SalesTableRow;
