import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../assets/styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const storedUserData = JSON.parse(localStorage.getItem('registeredUser'));
        if (storedUserData) {
            if (storedUserData.email === email && storedUserData.password === password) {
                setMessage('Login successful');
                setMessageType('success');
                setTimeout(() => navigate('/profile'), 2000);
            } else {
                setMessage('Invalid username or password');
                setMessageType('error');
            }
        } else {
            setMessage('No user found. Please register first');
            setMessageType('error');
        }
        setEmail('');
        setPassword('');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <Button variant="contained" style={{ background: "var(--gradient) !important" }} type="submit" fullWidth>
                        Login
                    </Button>
                    <div className="options">
                        <Link to="/register">Create Account</Link>
                    </div>
                </form>

                {message && (
                    <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;

