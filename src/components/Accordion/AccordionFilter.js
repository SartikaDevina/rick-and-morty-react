import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { characterFilterData } from '../../shared/constants';

export const AccordionFilter = ({ onFilterChange, clearFilters, filters }) => {
    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    const handleChildSelect = (parent, child) => {
        onFilterChange({ id: parent, value: child });
    };

    const getButtonColor = (filterId, value) => {
        if (filters[filterId] === value) {
            return { backgroundColor: '#1976d2', color: 'white' };
        }
        return {};
    };

    return (
        <Grid container alignItems="center" style={{ flexDirection: 'column' }}>
            <b>Filters</b>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Button variant='text' color='primary' onClick={() => clearFilters()}>Clear Filters</Button>
            </div>
            {characterFilterData.map((category) => (
                <Accordion key={category.id} expanded={expanded === category.id} onChange={handleAccordionChange(category.id)} style={{ width: '400px'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{category.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            {category.children.map((child) => (
                                <Grid item xs={6} lg={6}>
                                    <Button
                                        key={child.id}
                                        variant="outlined"
                                        onClick={() => handleChildSelect(category.id, child.id)}
                                        style={{ marginTop: '8px', width: '150px', ...getButtonColor(category.id, child.id) }}
                                    >
                                        {child.name}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Grid>
    );
};

export default AccordionFilter;