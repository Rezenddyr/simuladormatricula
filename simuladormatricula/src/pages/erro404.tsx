import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  // Função para redirecionar para a página inicial
  const handleGoHome = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#00111F',
        color: '#FFFFFF',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#00213A',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2, color: '#FF4747' }}>
          Oops! Página não encontrada.
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 4 }}>
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#0085EA',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#006BB3',
            },
            fontWeight: 'bold',
          }}
          onClick={handleGoHome}
        >
          Voltar para a página inicial
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
