import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AppBar.css';
import { useAuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(['margin', 'padding'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0,
    paddingLeft: open ? drawerWidth : theme.spacing(3),
}));

const AppBars: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };



    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Citas
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{ mt: 9, mb: 2, textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                        GESTOR DE CITAS
                    </Typography>
                    <div className="separator"></div> {/* Separador */}
                </Box>
                <List>
                    <Box >
                        <ListItem>
                            <Link to="/dashboard" className="btn btn-outline-primary link-button">
                                Visualizar Citas
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to="crateAppointment" className="btn btn-outline-primary link-button">
                                Crear Cita
                            </Link>
                        </ListItem>
                        <div className="separator"></div>
                        <ListItem>
                            <Button
                                variant="outlined"
                                color="primary"
                                className="link-button"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </Button>
                        </ListItem>
                        {/* Agrega más items aquí */}
                    </Box>
                </List>
            </Drawer>
            <Main className="" open={drawerOpen}>
                <Toolbar />
                {/* Contenido principal de la aplicación */}
                <Typography paragraph>
                    <Outlet />
                </Typography>
            </Main>
        </>
    );
};

export default AppBars;
