﻿/*============ GLOBAL IMPORTS & Dependencies ============*/
require('dotenv').config(); // Load Variables of .env File
const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/User");
const Product = require("./models/Product");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const rootRouter = require('./routes/root');
const path = require('path');


/*============ CONNECT TO DATABASE & START SERVER ============*/
connectDB();

/* once the connection is open, start the server */
mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

/* if there is an error, log it */
mongoose.connection.on("error", (err) => {
    console.log("ERROR CONNECTING TO MONGODB", err);
});




/*============ SPECIFY CLIENTS (REQUESTS) & COOKIE PARSER & JSON ============*/
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());




/*============ ADD ROUTES & MIDDLEWARES ============*/
/* must be handle the static files */
app.use('/', express.static(path.join(__dirname, 'public'))); // For any request (/ OR /--)
app.use('/', rootRouter);













/*============ APIs & END POINTS ============*/
app.get('/api/getProducts', async (req, res) => {
    const products = await Product.find();
    if (!products) {
        return res.status(404).send("No products found");
    }
    res.status(200).json(products);
});



app.post('/api/addProduct', async (req, res) => {
    const product = new Product();
    product.productName = req.body.productName;
    product.category = req.body.category;
    product.productImg = req.body.productImg;
    product.price = req.body.price;
    product.productDetails = req.body.productDetails;
    product.numOfProduct = req.body.numOfProduct;
    await product.save();
    res.status(200).json("Product added successfully");
});


app.delete('/api/deleteProduct', async (req, res) => {
    const _id = req.body._id;
    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct) {
        return res.status(404).json("Product not found");
    }
    res.status(200).json("Product deleted successfully");
});


app.put('/api/updateProduct', async (req, res) => {
    const product = req.body.product;
    const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        {
            productName: product.productName,
            category: product.category,
            productImg: product.productImg,
            price: product.price,
            productDetails: product.productDetails,
            numOfProduct: product.numOfProduct
        },
        { new: true }
    );
    if (updatedProduct === null) {
        return res.status(404).json("Product not found");
    }
    res.status(200).json("Product updated successfully");
});






app.put('/api/addToCart', async (req, res) => {
    const { productId, userId, quantity = 1 } = req.body;

    if (!productId || !userId) {
        return res.status(400).json({ error: 'productId and userId are required' });
    }

    try {
       
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const existingProductIndex = user.cart.findIndex(item =>
            item._id && item._id.toString() === productId
        );

        if (existingProductIndex > -1) {
           
            if (!user.cart[existingProductIndex].quantity) {
                
                user.cart[existingProductIndex].quantity = 1;
            }
         
            user.cart[existingProductIndex].quantity += 1;
        } else {
            
            user.cart.push({
                _id: productId,
                quantity: quantity
            });
        }

        await user.save();

        res.status(200).json({
            message: 'Added to cart successfully',
            cart: user.cart
        });
    } catch (err) {
        console.error('Error in addToCart:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});



app.put('/api/deleteFromCart', async (req, res) => {
    const { productId, userId, quantity = 1, removeAll = false } = req.body;

    if (!productId || !userId) {
        return res.status(400).json({ error: 'productId and userId are required' });
    }

    try {
       
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

       
       

        
        const productIndex = user.cart.findIndex(item =>
            item._id && item._id.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not in cart' });
        }

        
        const currentQuantity = user.cart[productIndex].quantity || 1;

        
        if (removeAll || currentQuantity <= quantity) {
         
            user.cart.splice(productIndex, 1);
        } else {
          
            user.cart[productIndex].quantity -= quantity;
        }

        await user.save();

        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart: user.cart
        });
    } catch (err) {
        console.error('Error in deleteFromCart:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});


app.post('/api/toggleCartItem', async (req, res) => {
    const { productId, userId, quantity = 1 } = req.body;
    if (!productId || !userId) {
        return res.status(400).json({ error: 'productId and userId are required' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const existingProductIndex = user.cart.findIndex(item =>
            item._id && item._id.toString() === productId
        );

        if (existingProductIndex > -1) {
           
            user.cart.splice(existingProductIndex, 1);
            await user.save();
            return res.status(200).json({
                message: 'Removed from cart',
                added: false,
                cart: user.cart
            });
        } else {
           
            user.cart.push({
                _id: productId,
                quantity: quantity
            });
            await user.save();
            return res.status(200).json({
                message: 'Added to cart',
                added: true,
                cart: user.cart
            });
        }
    } catch (err) {
        console.error('Error in toggleCartItem:', err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});


app.post('/api/addFavoriteProduct', async (req, res) => {
    const { productID, userID } = req.body;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.favorites.push(productID);
        await user.save();
        res.status(200).json('Product added to favorites');

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/deleteFavoriteProduct', async (req, res) => {
    const { productID, userID } = req.body;
    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.favorites.pull(productID);

        await user.save();
        res.status(200).json('Product removed from favorites');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/clearFavoriteProduct', async (req, res) => {
    const { userID } = req.body;
    console.log(userID);

    try {
        const user = await User.findById(userID);
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.favorites = [];
        await user.save();
        res.status(200).json('All favorite products removed');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/clearCart', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
       
        user.cart = [];
        user.cart.total = 0;

        await user.save();
        res.status(200).json('All products removed from cart');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
// });
/* app.post(route, callback function [Middleware]) */
// app.get('/register', (req, res) => {
//     res.send("Register Route");
// });


// app.post("/addUser", async (req, res) => {
//     const user = new User();
//     user.email = req.body.email;
//     user.username = req.body.username;
//     user.password = req.body.password;
//     user.DOB = req.body.DOB;
//     user.country = req.body.country;
//     user.favorites.push(500);
//     user.cart.push(500);
//     await user.save();
//     res.send("User Saved Successfully");
// });

app.get("/getUser", async (req, res) => {
    const user = await User.findById("6825f68ecc247bdeaed779b6");
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).json(user);
});