import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Link as MuiLink,
} from "@mui/material";
import * as API from "../utils/api";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#00213A" }}>
      <Toolbar>
        {/* Logo à esquerda */}
        <MuiLink
          href="/"
          sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <img
            src="/images/logo.svg" // Caminho da imagem
            alt="Logo"
            style={{ height: 50, cursor: "pointer" }}
          />
        </MuiLink>

        {/* Textos ao lado da logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            gap: 15,
            marginLeft: 10,
          }}
        >
          <MuiLink
            href="/minhasmaterias"
            sx={{
              color: "#FFFFFF",
              textDecoration: "none",
              "&:hover": { color: "#0085EA" },
              fontWeight: "bold",
            }}
          >
            Inserir Matérias
          </MuiLink>
          <MuiLink
            href="/horario"
            sx={{
              color: "#FFFFFF",
              textDecoration: "none",
              "&:hover": { color: "#0085EA" },
              fontWeight: "bold",
            }}
          >
            Horário
          </MuiLink>
          <MuiLink
            href="/notas"
            sx={{
              color: "#FFFFFF",
              textDecoration: "none",
              "&:hover": { color: "#0085EA" },
              fontWeight: "bold",
            }}
          >
            Notas
          </MuiLink>
        </Box>

        {/* Espaço para empurrar os elementos à direita */}
        <Box sx={{ flexGrow: 1 }} />



      </Toolbar>
    </AppBar>
  );
};

export default Header;
