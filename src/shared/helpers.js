import { useMediaQuery } from '@mui/material';

export const clearFilters = () => {
    window.location.reload();
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'Dead':
            return 'red';
        case 'Alive':
            return 'green';
        default:
            return 'grey';
    }
};

export const useIsMobile = () => {
    return useMediaQuery('(max-width:600px)');
};