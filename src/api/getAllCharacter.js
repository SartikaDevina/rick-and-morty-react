export const getAllCharacter = (page, { name, status, species, type, gender }) => {
    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);
    if (status) queryParams.append('status', status);
    if (species) queryParams.append('species', species);
    if (type) queryParams.append('type', type);
    if (gender) queryParams.append('gender', gender);

    const queryString = queryParams.toString();
    return (
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}&${queryString}`)
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
