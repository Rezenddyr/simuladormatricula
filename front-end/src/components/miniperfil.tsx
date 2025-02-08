import React, { useState } from 'react';
import { Box, Avatar, Typography, Button, LinearProgress, Modal, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, ExitToApp } from '@mui/icons-material'; // Importando o ícone ExitToApp
import { useRouter } from "next/router";
import * as API from '../utils/api';

interface UserData {
  id: string,
  nome: string,
  email: string,
  matricula: string;
  curso: string;
  integralizacoes: {
    chObrigatoriaPendente: number;
    chOptativaPendente: number;
    chTotalCurriculo: number;
  };
  percentualConcluido: number;
}

interface MiniPerfilProps {
  userData: UserData;
}

const MiniPerfil: React.FC<MiniPerfilProps> = ({ userData }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Estado para o modal de exclusão
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState(userData.id);
  const [matricula, setMatricula] = useState(userData.matricula);
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState(userData.nome);
  const [email, setEmail] = useState(userData.email);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleEditProfile = async () => {
    try {
      const response = await fetch(API.URL + 'src/aluno/editaPerfil.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          email,
          matricula,
          nome,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok && !data.error) {
        alert('Perfil editado com sucesso!');
        handleCloseModal();
      }
    } catch (error) {
      console.error('Erro ao editar perfil:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(API.URL + 'src/aluno/excluirAluno.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        alert('Conta excluida com sucesso!');
        router.push({
          pathname: '/',
        });
        sessionStorage.clear() // Limpa o token do sessionStorage
      } else {
        alert('Erro ao excluir conta.');
      }
    }
     catch (error) {
      console.error('Erro ao excluir conta:', error);
    }
  };


  const handleLogout = () => {
    // Lógica de logout (exemplo com alert)
    alert('Você foi deslogado!');
    sessionStorage.clear() // Limpa o token do sessionStorage
    router.push({
      pathname: '/',
    });

    // Aqui você pode adicionar sua lógica de logout, como limpar o token, redirecionar, etc.
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 20,
        top: '20%',
        width: 400,
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
          width: 90,
          height: 90,
          marginBottom: 2,
          backgroundColor: '#0085EA',
        }}
      >
        U
      </Avatar>
      <Typography variant="h6" sx={{ color: '#FFFFFF', marginBottom: 1 }}>
        {userData.nome}
      </Typography>
      <Typography sx={{ color: '#94A3B8', marginBottom: 2 }}>
        {userData.email}
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
        onClick={handleOpenModal}
      >
        Configurações Perfil
      </Button>

      {/* Dados Institucionais */}
      <Box sx={{ marginTop: 4, color: '#FFFFFF', width: '100%' }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1, color: '#94A3B8' }}>
          Dados Institucionais
        </Typography>
        <Typography sx={{ color: '#FFFFFF' }}>Matrícula: {userData.matricula}</Typography>
        <Typography sx={{ color: '#FFFFFF' }}>Curso: {userData.curso}</Typography>

      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#00213A',
            padding: 3,
            borderRadius: 2,
            width: 400,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h6" sx={{ color: '#FFFFFF', marginBottom: 2, textAlign: 'center' }}>
            Editar Perfil
          </Typography>

          <TextField
            label="Matrícula"
            variant="outlined"
            fullWidth
            margin="normal"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
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
            InputLabelProps={{ style: { color: '#94A3B8' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff style={{ color: '#94A3B8' }} /> : <Visibility style={{ color: '#94A3B8' }} />}
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
            onClick={handleEditProfile}
            sx={{
              marginTop: 2,
              padding: 1.5,
              backgroundColor: '#0085EA',
              '&:hover': { backgroundColor: '#006BB3' },
            }}
          >
            Salvar Alterações
          </Button>


          <Typography
            variant="body2"
            sx={{
              marginTop: 2,
              textAlign: 'center',
              color: 'red',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => setOpenDeleteModal(true)}
          >
            Excluir Conta
          </Typography>


          <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#00213A',
                padding: 3,
                borderRadius: 2,
                width: 400,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFFFFF', marginBottom: 2 }}>
                Tem certeza que deseja excluir sua conta?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'red',
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#B22222' },
                  }}
                  onClick={handleDeleteAccount}
                >
                  Sim
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#FFFFFF',
                    borderColor: '#94A3B8',
                    '&:hover': { borderColor: '#FFFFFF' },
                  }}
                  onClick={() => setOpenDeleteModal(false)}
                >
                  Não
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Modal>

      {/* Botão de Sair */}
      <IconButton
        onClick={handleLogout}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#0085EA',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#006BB3',
          },
        }}
      >
        <ExitToApp />
      </IconButton>
    </Box>
  );
};

export default MiniPerfil;
