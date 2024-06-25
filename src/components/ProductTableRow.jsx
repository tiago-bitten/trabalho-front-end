import React from 'react';
import "../styles/ProductTableRow.css";

const ProductTableRow = ({ product, getCategoryName, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>R${product.price}</td>
            <td>{getCategoryName(product.categoryId)}</td>
            <td>{product.stock}</td>
            <td>
                <button className="edit-button" onClick={() => onEdit(product.id)}>Editar</button>   
                <button className="delete-button" onClick={() => onDelete(product.id)}>Excluir</button>
            </td>
        </tr>
    );
};

export default ProductTableRow;
