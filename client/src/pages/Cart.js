import React from 'react';
import { useContext, useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import '../assets/styles/Cart.css';
import { ProductsContext } from '../context/ProductsContext';
import { clearCart } from '../api/clearCart';
export default function Cart() {
    const { products, setProducts } = useContext(ProductsContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        setCartProducts(products.filter(product => product.cart.isExist));
    }, [products]);

    useEffect(() => {
        let localTotalPrice = 0;
        let localTotalQuantity = 0;
        for (let i = 0; i < cartProducts.length; i++) {
            localTotalPrice += cartProducts[i].price * cartProducts[i].cart.quantity;
            localTotalQuantity += cartProducts[i].cart.quantity;
        }
        setTotalPrice(localTotalPrice);
        setTotalQuantity(localTotalQuantity);
    }, [cartProducts]);

    if (!cartProducts.length) {
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
            {cartProducts.map(item => (
                <CartItem key={item.id} item={item} />
            ))}

            <div className="cart-summary">
                <p>Total Items: {totalQuantity}</p>
                <p>Total Price: {totalPrice} EGP</p>
            </div>

            <div className="cart-actions">
                <button
                    onClick={async () => {
                        try {
                            await clearCart("6825f68ecc247bdeaed779b6"); // userId 

                            setProducts(prevProducts =>
                                prevProducts.map(p => ({
                                    ...p,
                                    cart: { isExist: false, quantity: 0 }
                                }))
                            );

                        } catch (error) {
                            console.error('Failed to clear cart:', error.message);
                            alert('Failed to clear cart. Please try again.');
                        }
                    }}
                >
                    Clear Cart
                </button>



                <Link to="/buy" className="confirm-btn">
                    Buy Now
                </Link>
            </div>
        </div>
    );
}
