export async function clearFavoriteProduct() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/clearFavoriteProduct`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify('6825f68ecc247bdeaed779b6'),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete all favorite products');
            }
            return response.ok;
        })
        .catch((error) => {
            console.error('Error deleting all favorite products:', error.message);
        });
}