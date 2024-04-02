export const getLocationByID = (id) => {
    return (
        fetch(`https://rickandmortyapi.com/api/location/${id}`)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            })
    )
}
