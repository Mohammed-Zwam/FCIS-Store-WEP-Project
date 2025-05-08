import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { clearCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import '../assets/styles/Cart.css';

export default function Cart() {
    const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    if (!items.length) {
        return (
            <div className="cart-container">
                <h2>Your Cart</h2>
                <p className="empty-cart-message">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            {/* ��� ������� �� ����� */}
            {items.map(item => (
                <CartItem key={item.id} item={item} />
            ))}

            {/* ������ ������� ������� */}
            <div className="cart-summary">
                <p>Total Items: {totalQuantity}</p>
                <p>Total Price: {totalAmount.toFixed(2)} EGP</p>
            </div>

            {/* ��������� */}
            <div className="cart-actions">
                <button onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
                {/* ������� ������ �� Link �� React Router */}
                <Link to="/buy" className="confirm-btn">
                    Buy Now
                </Link>
            </div>
        </div>
    );
}
