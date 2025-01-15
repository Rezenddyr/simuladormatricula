import React, { useState } from "react";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Login from "./index";
import Header from "@/components/header";
import MiniPerfil from "@/components/miniperfil";
import Funcionalidades from "@/components/funcionalidades";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { isAuthorized } from "../utils/auth";

const theme = createTheme({
  palette: {
    background: {
      default: "#00111F",
    },
    primary: {
      main: "#0085EA",
    },
  },
  typography: {
    fontFamily: "Archivo, sans-serif",
  },
});

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { nome, email, matricula, notAuthorized } = router.query; // Captura 'nome' da navegação

  const notifications = [
    "Você tem uma nova mensagem.",
    "Sua matrícula foi confirmada.",
    "Novo evento adicionado à sua agenda.",
    "Lembre-se de completar seu perfil.",
  ];

  const userData = {
    nome: nome as string, // Adiciona o nome
    email: email as string, // Adiciona o email
    matricula: matricula as string,
    curso: "Engenharia de Computação",
    integralizacoes: {
      chObrigatoriaPendente: 3060,
      chOptativaPendente: 540,
      chTotalCurriculo: 3600,
    },
    percentualConcluido: 0, // Atualize para exibir progresso
  };

  if (isAuthorized() == false) {
    return <Login />
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            '#2980b9 url("https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png") repeat 0 0',
          animation: "10s linear 0s normal none infinite animate",
          "@keyframes animate": {
            from: { backgroundPosition: "0 0" },
            to: { backgroundPosition: "500px 0" },
          },
        }}
      >
        {/* Header */}
        <Header notifications={notifications} />
        <Typography
          variant="h5"
          sx={{ color: "#FFFFFF", textAlign: "center", marginTop: 2 }}
        >
          Bem-vindo, {nome || "Usuário"}!
        </Typography>

        {/* Mini Perfil */}
        <MiniPerfil userData={userData} />

        {/* Funcionalidades */}
        <Funcionalidades />
      </Box>
    </ThemeProvider>
  );
};

export default IndexPage;
