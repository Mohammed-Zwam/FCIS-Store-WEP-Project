export function deleteFavoriteProduct(productID) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteFavoriteProduct`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productID: productID, userID: '6825f68ecc247bdeaed779b6' }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to delete favorite product');
        }
        return response.ok;
    }).catch((error) => {
        console.error('Error deleting favorite product:', error.message);
    });
}