import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
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
        <MuiLink href="/" sx={{ flexGrow: 1 }}>
          <img
            src="/images/logo.svg" // Caminho da imagem
            alt="Logo"
            style={{ height: 50, cursor: "pointer" }}
          />
        </MuiLink>

        {/* Botões de Login e Cadastro
        <Box sx={{ display: "flex", gap: 2 }}>
          <MuiLink
            component="a"
            href="/login"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0085EA",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#006BB3",
                },
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </MuiLink>

          <MuiLink
            component="a"
            href="/cadastro"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0085EA",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#006BB3",
                },
                fontWeight: "bold",
              }}
            >
              Cadastro
            </Button>
          </MuiLink>
        </Box> */}

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
