import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#00111F', // Cor de fundo geral
    },
    primary: {
      main: '#0085EA',
    },
  },
  typography: {
    fontFamily: 'Archivo, sans-serif',
  },
});

const NotFound: React.FC = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        margin: 0;
        padding: 0;
        font-family: "Arial", Helvetica, sans-serif;
        font-size: 12px;
        background: #2980b9 url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0;
        -webkit-animation: 10s linear 0s normal none infinite animate;
        -moz-animation: 10s linear 0s normal none infinite animate;
        -ms-animation: 10s linear 0s normal none infinite animate;
        -o-animation: 10s linear 0s normal none infinite animate;
        animation: 10s linear 0s normal none infinite animate;
      }

      @keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card
          sx={{
            width: 500,
            padding: 2,
            backgroundColor: '#00213A',
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              component="h1"
              sx={{ marginBottom: 2, color: '#FFFFFF', fontWeight: 'bold' }}
            >
              404
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ marginBottom: 2, color: '#94A3B8' }}
            >
              A página que você está procurando não existe.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/"
              sx={{ fontWeight: 'bold', marginBottom: 2 }}
            >
              Voltar para a Página Inicial
            </Button>
            <Typography sx={{ color: '#94A3B8' }}>
              Se você acha que isso é um erro, entre em contato com o suporte.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default NotFound;
