import React from 'react'
import { Grid, MenuItem, Select } from '@mui/material';

export default function SelectEpisode({id, handleIDChange, total}) {
    const menuItems = [];
    for (let i = 1; i <= total; i++) {
        menuItems.push(
            <MenuItem key={i} value={i}>
                Episode - {i}
            </MenuItem>
        );
    }

    return (
        <Grid container alignItems="center" style={{ flexDirection: 'column' }}>
            <Select
                value={id}
                onChange={handleIDChange}
                MenuProps={{
                    MenuListProps: {
                        style: { maxHeight: 300, overflowY: 'auto' }
                    }
                }}
                style={{ width: '80%' }}
            >
                {menuItems}
            </Select>
        </Grid>
    )
}
