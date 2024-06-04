import React from "react";
import useGet from "../data/hooks/useGet";

const Product = () => {
    const { data, error, loading } = useGet(`${URL}/products`)

    return (
        <div>
            <h1>Product</h1>
        </div>
    );
};

export default Product;