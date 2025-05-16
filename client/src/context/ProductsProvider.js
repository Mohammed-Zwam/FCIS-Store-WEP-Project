import { ProductsContext } from "./ProductsContext";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/fetchProducts";
export default function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const products = await fetchProducts();
    
        // Check if the product in cart of user is exist or not & favorite or no
        products.forEach(product => {
            product.cart = {
                isExist: false,
                quantity: 0
            }
            product.isFavorite = false;
        });
        setProducts(products);
    }
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
}