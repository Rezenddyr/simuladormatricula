import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Grid, Avatar, LinearProgress, Menu, MenuItem, AppBar, Toolbar, IconButton, Link as MuiLink } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importação do Router

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

const IndexPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications] = useState([
    'Você tem uma nova mensagem.',
    'Sua matrícula foi confirmada.',
    'Novo evento adicionado à sua agenda.',
    'Lembre-se de completar seu perfil.',
  ]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (action: string) => {
    alert(`Funcionalidade selecionada: ${action}`);
  };

  // Dados fictícios de exemplo para o mini perfil
  const userData = {
    matricula: '123456',
    curso: 'Engenharia de Computação',
    integralizacoes: {
      chObrigatoriaPendente: 180,
      chOptativaPendente: 90,
      chTotalCurriculo: 2000,
      chComplementarPendente: 120,
      chFlexibilizadaPendente: 150,
    },
    percentualConcluido: 45, // Exemplo de progresso
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: '#2980b9 url("https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png") repeat 0 0', animation: '10s linear 0s normal none infinite animate', '@keyframes animate': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '500px 0' } } }}>

        {/* Navbar */}
        <AppBar position="sticky" sx={{ backgroundColor: '#00213A' }}>
          <Toolbar>
            {/* Logo à esquerda que leva para o index */}
            <MuiLink href="/" sx={{ flexGrow: 1 }}>
              <img
                src="/images/logo.svg"  // Caminho da imagem ajustado para o diretório public/images/logo.jpeg
                alt="Logo"
                style={{ height: 50, cursor: 'pointer' }} // Ajuste o tamanho da logo
              />
            </MuiLink>

            {/* Botões de Login e Cadastro à direita */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MuiLink component="a" href="/login" style={{ textDecoration: 'none' }}>
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
                >
                  Login
                </Button>
              </MuiLink>

              <MuiLink component="a" href="/cadastro" style={{ textDecoration: 'none' }}>
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
                >
                  Cadastro
                </Button>
              </MuiLink>
            </Box>

            {/* Botão de notificação */}
            <IconButton edge="end" color="inherit" onClick={handleClick}>
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Menu de notificações */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {notification}
            </MenuItem>
          ))}
        </Menu>

        {/* Mini Perfil fixo no canto direito com largura aumentada */}
        <Box
          sx={{
            position: 'fixed',
            right: 20,
            top: '20%',
            width: 400,  // Aumentando a largura
            backgroundColor: '#00213A',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 90,  // Ajustando o tamanho do avatar
              height: 90,
              marginBottom: 2,
              backgroundColor: '#0085EA',
            }}
          >
            U
          </Avatar>
          <Typography variant="h6" sx={{ color: '#FFFFFF', marginBottom: 1 }}>
            Usuário Exemplo
          </Typography>
          <Typography sx={{ color: '#94A3B8', marginBottom: 2 }}>
            exemplo@dominio.com
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: '#0085EA',
              borderColor: '#0085EA',
              '&:hover': {
                borderColor: '#006BB3',
                color: '#006BB3',
              },
              fontWeight: 'bold',
            }}
            fullWidth
            onClick={() => alert('Editar perfil')}
          >
            Editar Perfil
          </Button>

          {/* Dados Institucionais */}
          <Box
            sx={{
              marginTop: 4,
              color: '#FFFFFF',
              width: '100%',
            }}
          >
            <Typography variant="subtitle2" sx={{ marginBottom: 1, color: '#94A3B8' }}>
              Dados Institucionais
            </Typography>
            <Typography sx={{ color: '#FFFFFF' }}>Matrícula: {userData.matricula}</Typography>
            <Typography sx={{ color: '#FFFFFF' }}>Curso: {userData.curso}</Typography>

            <Typography variant="subtitle2" sx={{ marginTop: 2, marginBottom: 1, color: '#94A3B8' }}>
              Integralizações:
            </Typography>
            <Typography sx={{ color: '#FFFFFF' }}>
              CH. Obrigatória Pendente: {userData.integralizacoes.chObrigatoriaPendente} horas
            </Typography>
            <Typography sx={{ color: '#FFFFFF' }}>
              CH. Optativa Pendente: {userData.integralizacoes.chOptativaPendente} horas
            </Typography>
            <Typography sx={{ color: '#FFFFFF' }}>
              CH. Total Currículo: {userData.integralizacoes.chTotalCurriculo} horas
            </Typography>
            <Typography sx={{ color: '#FFFFFF' }}>
              CH. Complementar Pendente: {userData.integralizacoes.chComplementarPendente} horas
            </Typography>
            <Typography sx={{ color: '#FFFFFF' }}>
              CH. Flexibilizada Pendente: {userData.integralizacoes.chFlexibilizadaPendente} horas
            </Typography>

            {/* Barra de progresso */}
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ color: '#FFFFFF', marginBottom: 1 }}>
                Progresso do Curso: {userData.percentualConcluido}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={userData.percentualConcluido}
                sx={{ backgroundColor: '#3C3C3C', '& .MuiLinearProgress-bar': { backgroundColor: '#0085EA' } }}
              />
            </Box>
          </Box>
        </Box>

        {/* Caixa de Funcionalidades fixada no centro */}
        <Card
          sx={{
            width: 300,
            padding: 4,
            backgroundColor: '#00213A',
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', marginBottom: 4, color: '#FFFFFF' }}
            >
              Funcionalidades
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MuiLink component="a" href="/minhasmaterias" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#0085EA',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#006BB3',
                    },
                    fontWeight: 'bold',
                  }}
                >
                Matérias Feitas
                </Button>
              </MuiLink>
              <MuiLink component="a" href="/simular" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#0085EA',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#006BB3',
                    },
                    fontWeight: 'bold',
                  }}
                >
                Simular Matrícula
                </Button>
              </MuiLink>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default IndexPage;
