import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Collapse, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useIsMobile } from '../../shared/helpers';

export default function PageHeader({ routes, currentPagePath }) {
    const [openMenu, setOpenMenu] = useState(false);

    const parts = currentPagePath.split('/');
    const pageDetailPath = '/' + parts[1];

    const handleRouteChange = (path) => {
        window.location.href = path;
    };

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
    };

    const isMobile = useIsMobile();

    return (
        <AppBar position="static" style={{ backgroundColor: '#f2f2f2' }}>
            <Container>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <h1 style={{ color: 'black' }}>
                            Rick & Morty <span style={{ color: '#1976d2' }}>Wiki</span>
                        </h1>
                        {isMobile && (
                            <IconButton
                                onClick={handleMenuToggle}
                                style={{ color: 'black', marginLeft: '50px' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </div>
                    {!isMobile && (
                        <div>
                            {routes.map((route) => (
                                <Button
                                    key={route.name}
                                    style={{
                                        color: route.path === currentPagePath || route.path === pageDetailPath ? '#1976d2' : '#b6b6b8'
                                    }}
                                    onClick={() => handleRouteChange(route.path)}
                                >
                                    {route.name}
                                </Button>
                            ))}
                        </div>
                    )}
                </Toolbar>
                {isMobile && (
                    <Collapse in={openMenu} timeout="auto" unmountOnExit>
                        <div>
                            {routes.map((route) => (
                                <Button
                                    key={route.name}
                                    fullWidth
                                    style={{
                                        color: route.path === currentPagePath || route.path === pageDetailPath ? '#1976d2' : '#b6b6b8'
                                    }}
                                    onClick={() => handleRouteChange(route.path)}
                                >
                                    {route.name}
                                </Button>
                            ))}
                        </div>
                    </Collapse>
                )}
            </Container>
        </AppBar>
    );
};
