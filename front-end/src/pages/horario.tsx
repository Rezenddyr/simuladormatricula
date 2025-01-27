import React, { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Modal,
  FormControlLabel,
} from '@mui/material';
import Header from '@/components/header';
import Horarios from '@/components/tabelahorarios'

const theme = createTheme({
  palette: {
    background: {
      default: '#00111F',
    },
    primary: {
      main: '#0085EA',
    },
  },
  typography: {
    fontFamily: 'Archivo, sans-serif',
  },
});

const Horario: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#2980b9 url("https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png") repeat 0 0',
          animation: '10s linear 0s normal none infinite animate',
          '@keyframes animate': {
            from: { backgroundPosition: '0 0' },
            to: { backgroundPosition: '500px 0' },
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navbar */}
        <Header/>

        {/* Central Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#00213A',
              color: '#FFFFFF',
              padding: 4,
              borderRadius: 2,
              textAlign: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Horarios/>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Horario;
