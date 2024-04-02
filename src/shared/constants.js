export const characterFilterData = [
    {
        id: 'status',
        name: 'Status',
        children: [
            { id: 'alive', name: 'Alive' },
            { id: 'dead', name: 'Dead' },
            { id: 'unknown', name: 'Unknown' },
        ],
    },
    {
        id: 'species',
        name: 'Species',
        children: [
            { id: 'human', name: 'Human' },
            { id: 'alien', name: 'Alien' },
            { id: 'humanoid', name: 'Humanoid' },
            { id: 'poopybutthole', name: 'Poopybutthole' },
            { id: 'mythological', name: 'Mythological' },
            { id: 'unknown', name: 'Unknown' },
            { id: 'animal', name: 'Animal' },
            { id: 'disease', name: 'Disease' },
            { id: 'robot', name: 'Robot' },
            { id: 'cronenberg', name: 'Cronenberg' },
            { id: 'planet', name: 'Planet' },
        ],
    },
    {
        id: 'gender',
        name: 'Gender',
        children: [
            { id: 'male', name: 'Male' },
            { id: 'female', name: 'Female' },
            { id: 'genderless', name: 'Genderless' },
            { id: 'unknown', name: 'Unknown' },
        ],
    },
];

export const headerRoutes = [
    { name: 'Character', path: '/character' },
    { name: 'Episode', path: '/episode' },
    { name: 'Location', path: '/location' }
];