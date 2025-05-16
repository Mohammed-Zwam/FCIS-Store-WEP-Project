import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
    return (
        <header className="header">
<div className="top-bar">
    <img src={require('../assets/images/logo.png')} alt="Your Logo" style={{ width: '60px', height: '60px' }} />

    {/* 6 Icon Buttons */}
    <div className="mid-icons">
        <button className="icon-button" >
            <img src={require('../assets/images/acer.png')} alt="Icon 1" />
        </button>
        <button className="icon-button" >
            <img src={require('../assets/images/apple.png')} alt="Icon 2" />
        </button>
        <button className="icon-button" >
            <img src={require('../assets/images/asus.png')} alt="Icon 3" />
        </button>
        <button className="icon-button" >
            <img src={require('../assets/images/dell.png')} alt="Icon 4" />
        </button>
        <button className="icon-button" >
            <img src={require('../assets/images/hp.png')} alt="Icon 5" />
        </button>
        <button className="icon-button" >
            <img src={require('../assets/images/lenovo.png')} alt="Icon 6" />
        </button>
    </div>

    {/* Icons to the right */}
    <div className="icons">
        <Link to="/favorites">
            <div className="icon-item">
                <span><FavoriteIcon /></span>
                <p>Favorites</p>
            </div>
        </Link>
        <Link to="/profile">
            <div className="icon-item">
                <span><AccountCircleIcon /></span>
                <p>Account</p>
            </div>
        </Link>
        <Link to="/cart">
            <div className="icon-item">
                <span><ShoppingCartIcon /></span>
                <p>Cart</p>
            </div>
        </Link>
    </div>
</div>

            <nav className="nav-bar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Services">Services</Link></li>
                    <li><Link to="/home#shop">Shop</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;