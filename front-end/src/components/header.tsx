import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0085EA',
    },
    background: {
      default: '#00111F', // Cor de fundo do AppBar
    },
  },
  typography: {
    fontFamily: 'Archivo, sans-serif',
  },
});

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#00213A',
          boxShadow: 'none', // Removendo a sombra do AppBar
          borderBottom: 'none', // Garantindo que não haja borda
          margin: 0, // Removendo qualquer margem
          padding: 0, // Removendo qualquer padding
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
