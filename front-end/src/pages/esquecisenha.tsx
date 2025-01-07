import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
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

const EsqueciSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleResetPassword = () => {
    setEmailError(!email.includes('@'));
    // Aqui você pode adicionar a lógica para enviar um e-mail de recuperação de senha
  };

  useEffect(() => {
    // Adiciona o estilo da animação globalmente
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
      
      @-webkit-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
      
      @-moz-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
      
      @-ms-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
      
      @-o-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
      
      @keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); // Remove o estilo quando o componente for desmontado
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
            width: 400,
            padding: 4,
            backgroundColor: '#00213A', // Cor de fundo do card
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', marginBottom: 2, color: '#FFFFFF' }}
            >
              Esqueci minha senha
            </Typography>
            <Typography
              sx={{
                color: '#94A3B8',
                textAlign: 'center',
                marginBottom: 3,
              }}
            >
              Digite seu e-mail para receber instruções de recuperação.
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? 'Inclua um "@" no endereço de e-mail.' : ''}
              InputLabelProps={{ style: { color: '#94A3B8' } }}
              sx={{
                backgroundColor: '#00111F',
                input: { color: '#FFFFFF' },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0085EA',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0085EA',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, fontWeight: 'bold' }}
              onClick={handleResetPassword}
            >
              Enviar instruções
            </Button>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography sx={{ color: '#94A3B8' }}>
                Lembrou sua senha?{' '}
                <Link href="/login" sx={{ color: '#0085EA', textDecoration: 'none' }}>
                  Voltar para login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default EsqueciSenha;
