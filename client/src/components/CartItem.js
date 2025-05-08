
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../actions/cartActions';
import '../assets/styles/Cart.css';

export default function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleDecrease = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity(item.id, item.quantity - 1));
        } else {
            dispatch(removeFromCart(item.id));
        }
    };

    const handleIncrease = () => {
        dispatch(addToCart(item));
    };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                    <button className="qty-btn" onClick={handleDecrease}>–</button>
                    <span className="qty">{item.quantity}</span>
                    <button className="qty-btn" onClick={handleIncrease}>+</button>
                </div>
            </div>
        </div>
    );
}
