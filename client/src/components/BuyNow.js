import React from 'react';
import { useSelector } from 'react-redux';
import '../assets/styles/BuyNow.css';

const BuyNow = () => {
    const cartState = useSelector((state) => state.cart);
    console.log("Cart State:", cartState); 

    const total = cartState.totalAmount;
    const deliveryFee = 30;
    const grandTotal = total + deliveryFee;

    return (
        <div className="buy-now-container">
            <h2>Buy Now</h2>

            <div className="payment-methods">
                <h4>Select a payment method:</h4>
                <label><input type="radio" name="payment" defaultChecked /> Cash on Delivery</label>
                <label><input type="radio" name="payment" /> Visa / Mastercard</label>
                <label><input type="radio" name="payment" /> Vodafone Cash</label>
            </div>

            <div className="summary">
                <p>Total products: {total} EGP</p>
                <p>Delivery fee: {deliveryFee} EGP</p>
                <h3>Grand total: {grandTotal} EGP</h3>
            </div>

            <button className="confirm-btn">Confirm Order</button>
        </div>
    );
};

export default BuyNow;
