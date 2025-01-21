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
import NotificationsIcon from "@mui/icons-material/Notifications";

interface HeaderProps {
  notifications: string[];
}

const Header: React.FC<HeaderProps> = ({ notifications }) => {
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
        <MuiLink href="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/images/logo.svg" // Caminho da imagem
            alt="Logo"
            style={{ height: 50, cursor: "pointer" }}
          />
        </MuiLink>

        {/* Textos ao lado da logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, marginLeft: 3 }}>
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
        </Box>

        {/* Espaço para empurrar os elementos à direita */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Botão de Notificação */}
        <IconButton edge="end" color="inherit" onClick={handleClick}>
          <NotificationsIcon />
        </IconButton>

        {/* Menu de Notificações */}
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
