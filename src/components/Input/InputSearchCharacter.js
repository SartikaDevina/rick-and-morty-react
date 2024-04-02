import { Button, Input } from '@mui/material';
import React from 'react';
import "../../App.css";
import { Grid } from '@mui/material';
import { useIsMobile } from '../../shared/helpers';

export const InputSearchCharacter = ({ value, onChange, onSearch }) => {

    const isMobile = useIsMobile();

    return (
        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Input
                placeholder='Search for characters'
                value={value}
                onChange={onChange}
                className='input-search'
                variant='standard'
                inputProps={{ style: { padding: '10px', width: isMobile ? '250px' : '700px' } }}
                disableUnderline
            />
            <Button variant='contained' className='button-search' onClick={onSearch}>
                Search
            </Button>
        </Grid>
    );
};
