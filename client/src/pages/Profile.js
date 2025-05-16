import React, { useState, useEffect } from 'react';
import '../assets/styles/Profile.css';
import { Button, Alert, Slide, Snackbar, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Profile() {
    const [userData, setUserData] = useState({ username: '', email: '', dob: '', country: '', password: '' });
    const [isEditable, setIsEditable] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('registeredUser'));
        const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (storedUserData) {
            setUserData({
                username: storedUserData.username,
                email: storedUserData.email,
                dob: storedUserData.dob,
                country: storedUserData.country,
                password: storedUserData.password,
            });
        }
        setOrderHistory(storedOrders);
        setWishlist(storedWishlist);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        setOpenAlert(true);
        setIsEditable(false);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Profile</h2>
            </div>
            <div className="profile-details">
                <h3>User Information</h3>
                <div className="profile-fields">
                    <p><strong>Username:</strong> {isEditable ? <input type="text" name="username" value={userData.username} onChange={handleChange} /> : userData.username}</p>
                    <p><strong>Email:</strong> {isEditable ? <input type="email" name="email" value={userData.email} onChange={handleChange} /> : userData.email}</p>
                    <p><strong>Password:</strong> {isEditable ? <input type="password" name="password" value={userData.password} onChange={handleChange} /> : '••••••••'}</p>
                    <p><strong>Date of Birth:</strong> {isEditable ? <input type="date" name="dob" value={userData.dob} onChange={handleChange} /> : userData.dob}</p>
                    <p><strong>Country:</strong> {isEditable ? <input type="text" name="country" value={userData.country} onChange={handleChange} /> : userData.country}</p>
                </div>
            </div>
            <div className="profile-actions">
                {isEditable ? (
                    <Button 
                        variant="contained" 
                        color="success" 
                        onClick={handleSave}
                        fullWidth={isMobile}
                        sx={{ 
                            minWidth: isMobile ? '100%' : '200px',
                            padding: isMobile ? '12px' : '8px 22px'
                        }}
                    >
                        Save Changes
                    </Button>
                ) : (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setIsEditable(true)}
                        fullWidth={isMobile}
                        sx={{ 
                            minWidth: isMobile ? '100%' : '200px',
                            padding: isMobile ? '12px' : '8px 22px'
                        }}
                    >
                        Edit Profile
                    </Button>
                )}
            </div>
            <hr></hr>
            <br></br>

            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ 
                    vertical: isMobile ? 'bottom' : 'bottom',
                    horizontal: isMobile ? 'center' : 'right'
                }}
                TransitionComponent={Slide}
                sx={{
                    bottom: isMobile ? '16px !important' : '24px'
                }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="success"
                    variant="filled"
                    icon={<CheckCircleOutlineIcon />}
                    sx={{
                        minWidth: isMobile ? '90%' : '300px',
                        backgroundColor: '#10b981',
                        '& .MuiAlert-icon': {
                            fontSize: isMobile ? '20px' : '24px'
                        },
                        '& .MuiAlert-message': {
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            fontWeight: 500
                        },
                        '& .MuiAlert-action': {
                            paddingTop: 0
                        }
                    }}
                >
                    Profile updated successfully!
                </Alert>
            </Snackbar>

            <div className="profile-section profile-orders">
                <h3>Order History</h3>
                <div className="table-responsive">
                    {orderHistory.length > 0 ? (
                        <table>
                            <thead>
                                <tr><th>Order ID</th><th>Laptop</th><th>Price</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                                {orderHistory.map((order, index) => (
                                    <tr key={index}>
                                        <td data-label="Order ID">{order.id}</td>
                                        <td data-label="Laptop">{order.item}</td>
                                        <td data-label="Price">${order.price}</td>
                                        <td data-label="Date">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<p>No orders found.</p>)}
                </div>
            </div>

            <div className="profile-section profile-wishlist">
                <h3>Wishlist</h3>
                {wishlist.length > 0 ? (
                    <ul className="wishlist-items">
                        {wishlist.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (<p>Your wishlist is empty.</p>)}
            </div>
        </div>
    );
}

export default Profile;
