export const addFavoriteProduct = async (productID) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/addFavoriteProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productID: productID, userID: '6825f68ecc247bdeaed779b6' }),
        });
        if (!response.ok) {
            throw new Error('Failed to add favorite product');
        }

        return response.ok;
    } catch (error) {
        console.error('Error adding favorite product:', error.message);
    }
};
