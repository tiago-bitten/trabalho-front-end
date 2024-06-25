import React from 'react';
import ProductTableRow from './ProductTableRow';

const ProductTable = ({ products, categories, onEdit, onDelete }) => {
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Sem categoria';
    };

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <ProductTableRow 
                            key={product.id} 
                            product={product} 
                            getCategoryName={getCategoryName} 
                            onEdit={onEdit} 
                            onDelete={onDelete} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
