import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Link from '@mui/material/Link';

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

const Cadastro: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const [matriculaError, setMatriculaError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [confirmSenhaError, setConfirmSenhaError] = useState(false);
  const [nomeError, setNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleCadastro = () => {
    setMatriculaError(matricula.length === 0);
    setSenhaError(senha.length < 6);
    setConfirmSenhaError(confirmSenha !== senha);
    setNomeError(nome.length === 0);
    setEmailError(!email.includes('@'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#2980b9 url("https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png") repeat 0 0',
          animation: '10s linear 0s normal none infinite animate',
          '@keyframes animate': {
            from: { backgroundPosition: '0 0' },
            to: { backgroundPosition: '500px 0' },
          },
        }}
      >
        <Card
          sx={{
            width: 500,
            padding: 2,
            backgroundColor: '#00213A', // Cor de fundo do card de cadastro
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
              Cadastro
            </Typography>
            <Link href="/" sx={{ display: 'block', textAlign: 'center', marginBottom: 2 }}>
              <img
                src="/images/logo.svg"  // Caminho da imagem ajustado para o diretório public/images/logo.jpeg
                alt="Logo"
                style={{
                  height: 250, // Aumenta o tamanho da imagem
                  width: 'auto', // Mantém a proporção
                  display: 'block', // Centraliza a imagem
                  marginLeft: 'auto', // Alinha à esquerda
                  marginRight: 'auto', // Alinha à direita
                  marginBottom: '20px', // Espaçamento inferior
                  cursor: 'pointer', // Cursor em forma de mão para indicar que é clicável
                }}
              />
            </Link>
            <TextField
              label="Matrícula"
              variant="outlined"
              fullWidth
              margin="normal"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              error={matriculaError}
              helperText={matriculaError ? 'A matrícula é obrigatória.' : ''}
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
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={nomeError}
              helperText={nomeError ? 'O nome é obrigatório.' : ''}
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
            <TextField
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={senhaError}
              helperText={
                senhaError ? 'A senha deve ter pelo menos 6 caracteres.' : ''
              }
              InputLabelProps={{ style: { color: '#94A3B8' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff style={{ color: '#94A3B8' }} />
                      ) : (
                        <Visibility style={{ color: '#94A3B8' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            <TextField
              label="Confirmar Senha"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              error={confirmSenhaError}
              helperText={confirmSenhaError ? 'As senhas não coincidem.' : ''}
              InputLabelProps={{ style: { color: '#94A3B8' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff style={{ color: '#94A3B8' }} />
                      ) : (
                        <Visibility style={{ color: '#94A3B8' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              onClick={handleCadastro}
            >
              Criar Conta
            </Button>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography sx={{ color: '#94A3B8' }}>
                Já tem uma conta?{' '}
                <Link
                  href="/login"
                  sx={{ color: '#0085EA', textDecoration: 'none' }}
                >
                  Faça login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Cadastro;
