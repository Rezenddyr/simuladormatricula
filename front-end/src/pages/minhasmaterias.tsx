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
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Modal,
  FormControlLabel,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Header from '@/components/header';

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

const MinhasMaterias: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'feitas' | 'inserir'>('feitas');
  const [notifications] = useState([
    'Você tem uma nova mensagem.',
    'Sua matrícula foi confirmada.',
    'Novo evento adicionado à sua agenda.',
    'Lembre-se de completar seu perfil.',
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [status, setStatus] = useState<{ [key: string]: string }>({});
  const [year, setYear] = useState<{ [key: string]: string }>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (tab: 'feitas' | 'inserir') => {
    setActiveTab(tab);
  };

  const handleOpenModal = (subject: string) => {
    setSelectedSubject(subject);
    setOpenModal(true);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = 2018; year <= currentYear; year++) {
      years.push(`${year}.1`);
      years.push(`${year}.2`);
    }

    return years;
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSubject(null);
  };

  const handleStatusChange = (subject: string, newStatus: string) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [subject]: newStatus,
    }));
  };

  const handleYearChange = (subject: string, newYear: string) => {
    setYear((prevYear) => ({
      ...prevYear,
      [subject]: newYear,
    }));
  };

  const handleDeleteSubject = (subject: string) => {
    console.log(`Matéria ${subject} excluída.`);
    // Aqui você pode adicionar a lógica para excluir a matéria da lista
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
        }}
      >
        {/* Navbar */}
        <Header notifications={notifications} />


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

        {/* Conteúdo Principal */}
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
          {/* Botões de navegação */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
            <Button
              variant={activeTab === 'feitas' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: activeTab === 'feitas' ? '#006BB3' : '#003B56',
                color: '#FFFFFF',
                borderColor: '#006BB3',
                '&:hover': {
                  backgroundColor: activeTab === 'feitas' ? '#00507A' : '#005A81',
                  borderColor: '#00507A',
                },
              }}
              onClick={() => handleTabChange('feitas')}
            >
              Matérias Feitas
            </Button>

            <Button
              variant={activeTab === 'inserir' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: activeTab === 'inserir' ? '#006BB3' : '#003B56',
                color: '#FFFFFF',
                borderColor: '#006BB3',
                '&:hover': {
                  backgroundColor: activeTab === 'inserir' ? '#00507A' : '#005A81',
                  borderColor: '#00507A',
                },
              }}
              onClick={() => handleTabChange('inserir')}
            >
              Inserir Matéria
            </Button>
          </Box>

          {/* Conteúdo das abas */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              minHeight: '300px',
              width: '60%',
              margin: '0 auto',
              backgroundColor: '#00213A',
              color: '#FFFFFF',
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              overflowY: 'auto', // Scrollbar dinâmica
              flexGrow: 1, // Permite que o conteúdo se expanda e use o espaço disponível
            }}
          >
            {activeTab === 'inserir' && (
              <Box sx={{ width: '100%' }}>
                {[...Array(11).keys()].map((index) => (
                  <Accordion
                    key={index}
                    sx={{
                      backgroundColor: '#003B56', // Cor de fundo escura
                      borderRadius: 1,
                      '&:before': {
                        display: 'none', // Remove a linha de borda padrão
                      },
                      boxShadow: 'none', // Retira sombra
                      '&.Mui-expanded': {
                        backgroundColor: '#006BB3', // Cor quando expandido
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        backgroundColor: '#006BB3', // Cor de fundo da summary
                        color: '#FFFFFF', // Texto branco
                        '&.Mui-expanded': {
                          backgroundColor: '#006BB3', // Cor de fundo ao expandir
                        },
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                        {index + 1 === 11 ? 'Optativas' : `Período ${index + 1}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#00213A', color: '#FFFFFF' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[...Array(5).keys()].map((subjectIndex) => (
                          <Box
                            key={subjectIndex}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: 1.7,
                              backgroundColor: '#00111F', // Fundo escuro
                              borderRadius: 1,
                            }}
                          >
                            <Typography sx={{ color: '#FFFFFF' }}>Matéria {subjectIndex + 1}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <FormControl
                                variant="outlined"
                                sx={{
                                  minWidth: 160,
                                  height: 'auto',
                                }}
                              >
                                <InputLabel
                                  id={`status-label-${subjectIndex}`}
                                  sx={{
                                    height: 48,
                                    color: '#0085EA',
                                  }}
                                >
                                  Status
                                </InputLabel>

                                <Select
                                  labelId={`status-label-${subjectIndex}`}
                                  value={status[`Matéria ${subjectIndex + 1}`] || 'Não Feita'}
                                  onChange={(e) => handleStatusChange(`Matéria ${subjectIndex + 1}`, e.target.value)}
                                  label="Status"
                                  sx={{
                                    color: '#0085EA',
                                    height: 48, // Definir a altura do Select
                                    '.MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#0085EA', // Cor padrão da borda
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#0056B3', // Cor da borda no hover
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#003F7D', // Cor da borda ao focar
                                    },
                                    '.MuiSelect-icon': {
                                      color: '#0085EA', // Cor da setinha do dropdown
                                    },
                                  }}
                                  MenuProps={{
                                    PaperProps: {
                                      sx: {
                                        backgroundColor: '#00111F', // Cor de fundo do dropdown
                                        color: '#FFFFFF', // Cor do texto das opções
                                      },
                                    },
                                  }}
                                >
                                  <MuiMenuItem value="Não Feita">Não Feita</MuiMenuItem>
                                  <MuiMenuItem value="Em Andamento">Em Andamento</MuiMenuItem>
                                  <MuiMenuItem value="Feita">Feita</MuiMenuItem>
                                </Select>
                              </FormControl>

                              <FormControl
                                variant="outlined"
                                sx={{
                                  marginLeft: 1,
                                  minWidth: 160,
                                  height: 'auto',
                                }}
                              >
                                <InputLabel
                                  id={`year-label-${subjectIndex}`}
                                  sx={{
                                    height: 48,
                                    color: '#0085EA',
                                  }}
                                >
                                  Ano da Matéria
                                </InputLabel>

                                <Select
                                  labelId={`year-label-${subjectIndex}`}
                                  value={year[`Matéria ${subjectIndex + 1}`] || ''}
                                  onChange={(e) => handleYearChange(`Matéria ${subjectIndex + 1}`, e.target.value)}
                                  label="Ano da Matéria"
                                  sx={{
                                    color: '#0085EA',
                                    height: 48, // Definir a altura do Select
                                    '.MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#0085EA', // Definir a cor da borda
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#0056B3', // Cor da borda no hover
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#003F7D', // Cor da borda ao focar
                                    },
                                    '.MuiSelect-icon': {
                                      color: '#0085EA', // Cor da setinha do dropdown
                                    },
                                  }}
                                  MenuProps={{
                                    PaperProps: {
                                      sx: {
                                        backgroundColor: '#00111F', // Cor de fundo do dropdown
                                        color: '#FFFFFF', // Cor do texto das opções
                                      },
                                    },
                                  }}
                                >
                                  {/* Opção "Selecione" como o valor inicial */}
                                  <MuiMenuItem value="">
                                    Selecione
                                  </MuiMenuItem>

                                  {generateYears().map((year) => (
                                    <MuiMenuItem key={year} value={year}>
                                      {year}
                                    </MuiMenuItem>
                                  ))}
                                </Select>
                              </FormControl>


                              <Button
                                variant="outlined"
                                onClick={() => handleOpenModal(`Matéria ${subjectIndex + 1}`)}
                                sx={{
                                  marginLeft: 2,
                                  borderColor: '#006BB3',
                                  color: '#006BB3',
                                  '&:hover': {
                                    borderColor: '#0085EA',
                                    color: '#0085EA',
                                  },
                                }}
                              >
                                Ver Detalhes
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {activeTab === 'feitas' && (
              <Box sx={{ width: '100%' }}>
                {[...Array(11).keys()].map((index) => (
                  <Accordion
                    key={index}
                    sx={{
                      backgroundColor: '#003B56', // Cor de fundo escura
                      borderRadius: 1,
                      '&:before': {
                        display: 'none', // Remove a linha de borda padrão
                      },
                      boxShadow: 'none', // Retira sombra
                      '&.Mui-expanded': {
                        backgroundColor: '#006BB3', // Cor quando expandido
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        backgroundColor: '#006BB3', // Cor de fundo da summary
                        color: '#FFFFFF', // Texto branco
                        '&.Mui-expanded': {
                          backgroundColor: '#006BB3', // Cor de fundo ao expandir
                        },
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                        {index + 1 === 11 ? 'Optativas' : `Período ${index + 1}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#00213A', color: '#FFFFFF' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[...Array(5).keys()].map((subjectIndex) => (
                          <Box
                            key={subjectIndex}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: 1.5,
                              backgroundColor: '#00111F', // Fundo escuro
                              borderRadius: 1,
                            }}
                          >
                            <Typography sx={{ color: '#FFFFFF' }}>Matéria {subjectIndex + 1}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Button
                                variant="outlined"
                                onClick={() => handleOpenModal(`Matéria ${subjectIndex + 1}`)}
                                sx={{
                                  marginLeft: 2,
                                  borderColor: '#0085EA',
                                  color: '#0085EA',
                                  '&:hover': {
                                    borderColor: '#0085EA',
                                    color: '#0085EA',
                                  },
                                }}
                              >
                                Ver Detalhes
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {/* Modal de informações da matéria */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Box sx={{ backgroundColor: '#00213A', padding: 4, borderRadius: 1, color: '#FFFFFF' }}>
                <Typography variant="h6">Detalhes da {selectedSubject}</Typography>
                <Typography sx={{ marginTop: 2 }}>Informações detalhadas sobre a matéria selecionada.</Typography>
                <Button
                  onClick={handleCloseModal}
                  sx={{
                    marginTop: 3,
                    backgroundColor: '#0085EA',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#006BB3',
                    },
                  }}
                >
                  Fechar
                </Button>
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MinhasMaterias;
