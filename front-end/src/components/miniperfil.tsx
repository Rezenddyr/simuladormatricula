import React from 'react';
import { Box, Avatar, Typography, Button, LinearProgress } from '@mui/material';

interface UserData {
  matricula: string;
  curso: string;
  integralizacoes: {
    chObrigatoriaPendente: number;
    chOptativaPendente: number;
    chTotalCurriculo: number;
    chComplementarPendente: number;
    chFlexibilizadaPendente: number;
  };
  percentualConcluido: number;
}

interface MiniPerfilProps {
  userData: UserData;
}

const MiniPerfil: React.FC<MiniPerfilProps> = ({ userData }) => {
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
      <Box sx={{ marginTop: 4, color: '#FFFFFF', width: '100%' }}>
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
  );
};

export default MiniPerfil;
