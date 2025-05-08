import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import '../assets/styles/Products.css';

const products = [
    { id: 1, name: 'Product A', price: 30, image: require('../assets/images/imgA.jpg') },
    { id: 2, name: 'Product B', price: 50, image: require('../assets/images/imgB.jpg') },
];

export default function ProductList() {
    const dispatch = useDispatch();

    return (
        <div className="products-container">
            <div className="navbar">
                <h2>Our Products</h2>
            </div>
            <div className="product-list">
                {products.map(p => (
                    <div key={p.id} className="product-card">
                        <img src={p.image} alt={p.name} className="product-image" />
                        <div className="product-info">
                            <h3>{p.name}</h3>
                            <p className="price">${p.price}</p>
                            <button
                                className="add-to-cart-btn"
                                style={{background: "var(--gradient) !important"}}
                                onClick={() => dispatch(addToCart(p))}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
