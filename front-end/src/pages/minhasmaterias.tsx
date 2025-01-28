import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  CircularProgress,
} from "@mui/material";
import Header from "@/components/header";
import * as API from "@/utils/api";

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

const MinhasMaterias: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"feitas" | "inserir">("feitas");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [status, setStatus] = useState<{ [key: string]: string }>({});
  const [year, setYear] = useState<{ [key: string]: string }>({});
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const currentDate = new Date();
  const [matricula, setMatricula] = useState<string | null>(null);
  const [anoIngresso, setAnoIngresso] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [materiasPorPeriodo, setMateriasPorPeriodo] = useState<{
    [key: number]: any[];
  }>({});
  const [materiasFeitas, setMateriasFeitas] = useState<any[]>([]);

  const fetchMatricula = async () => {
    try {
      const response = await fetch(API.URL + "src/aluno/getMatricula.php", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log("Matrícula recebida do backend:", data);
      if (response.ok && !data.error) {
        setMatricula(data.matricula);
      }
    } catch (error) {
      alert("Erro ao buscar matricula: " + error);
    }
  };

  const fetchMateriasByPeriodo = async (periodo: number) => {
    try {
      const response = await fetch(
        API.URL + "src/materias/getMateriasByPeriodo.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ periodo }),
        }
      );
      const data = await response.json();
      if (response.ok && !data.error) {
        return data.materias;
      } else {
        console.error("Erro ao buscar matérias:", data.error);
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar matérias:", error);
      return [];
    }
  };

  const handleSaveMaterias = async () => {
    try {
      console.log("Valor original de matricula:", matricula);
      console.log("Tipo de matricula:", typeof matricula);
      console.log("Valor enviado para id_aluno (matricula):", matricula);
      console.log("Status atual:", status);
      console.log("Ano atual:", year);

      // Prepara os dados das matérias a serem salvas
      const materiasToSave = Object.keys(status).map((materia) => {
        const materiaData = Object.values(materiasPorPeriodo)
          .flat() // Junta todas as matérias de diferentes períodos
          .find((m) => m.nome === materia); // Busca pelo nome da matéria

        return {
          id_materia: materiaData?.codigo,
          status: status[materia],
          ano: year[materia] || null,
        };
      });

      console.log("Dados enviados para o backend:", {
        id_aluno: matricula,
        materias: materiasToSave,
        status: status,
        year: year,
      });

      // Faz a requisição para salvar no backend
      const response = await fetch(
        API.URL + "src/materias/saveMateriasFeitas.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_aluno: Number(matricula),
            materias: materiasToSave,
          }),
        }
      );

      const data = await response.json();

      // Verifica a resposta do servidor
      if (response.ok && !data.error) {
        alert("Matérias registradas com sucesso!");
      } else {
        console.error("Erro ao salvar matérias:", data.error);
        alert(
          "Erro ao registrar matérias, verifique campos e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao salvar matérias:", error);
      alert("Erro de conexão ao registrar matérias.");
    }
  };

  const fetchMateriasFeitas = async () => {
    try {
      console.log("Iniciando a busca de matérias feitas...");
      console.log("Enviando ID do aluno:", Number(matricula));

      const response = await fetch(API.URL + "src/materias/MateriasAluno.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_aluno: Number(matricula),
        }),
      });

      console.log("Resposta do servidor:", response);

      if (!response.ok) {
        console.error(
          "Erro na resposta do servidor. Status:",
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      console.log("Matérias feitas recebidas:", data.materias);

      // Exemplo: Atualizar o estado das matérias feitas (se necessário)
      setMateriasFeitas(data.materias || []);
    } catch (error) {
      console.error("Erro ao buscar matérias feitas:", error);
    }
  };

  const handleDeleteMateria = async (idMateria) => {
    try {
      const response = await fetch(API.URL + "src/materias/MateriasAluno.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete", // Define que é uma exclusão
          id_aluno: Number(matricula), // ID do aluno
          id_materia: idMateria, // ID da matéria
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Atualize a lista de matérias após a exclusão
        fetchMateriasFeitas();
      } else {
        alert(data.error || "Erro ao excluir a matéria.");
      }
    } catch (error) {
      console.error("Erro ao excluir a matéria:", error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (tab: "feitas" | "inserir") => {
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

  useEffect(() => {
    fetchMatricula();
  }, []);

  useEffect(() => {
    if (matricula !== null) {
      setAnoIngresso(matricula ? matricula.substring(0, 4) : null);
      setLoading(false);
    } else {
      setAnoIngresso(null);
    }
  }, [matricula]);

  useEffect(() => {
    const fetchAllMaterias = async () => {
      const materias: { [key: number]: any[] } = {};
      for (let periodo = 0; periodo <= 10; periodo++) {
        materias[periodo] = await fetchMateriasByPeriodo(periodo);
      }
      setMateriasPorPeriodo(materias);
    };

    fetchAllMaterias();
  }, []);

  useEffect(() => {
    if (matricula) {
      fetchMateriasFeitas();
    }
  }, [matricula]);

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
        {/* Navbar */}
        <Header />

        {/* Conteúdo Principal */}
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          {/* Botões de navegação */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginBottom: 4,
            }}
          >
            <Button
              variant={activeTab === "feitas" ? "contained" : "outlined"}
              sx={{
                backgroundColor: activeTab === "feitas" ? "#006BB3" : "#003B56",
                color: "#FFFFFF",
                borderColor: "#006BB3",
                "&:hover": {
                  backgroundColor:
                    activeTab === "feitas" ? "#00507A" : "#005A81",
                  borderColor: "#00507A",
                },
              }}
              onClick={() => handleTabChange("feitas")}
            >
              Matérias Feitas
            </Button>

            <Button
              variant={activeTab === "inserir" ? "contained" : "outlined"}
              sx={{
                backgroundColor:
                  activeTab === "inserir" ? "#006BB3" : "#003B56",
                color: "#FFFFFF",
                borderColor: "#006BB3",
                "&:hover": {
                  backgroundColor:
                    activeTab === "inserir" ? "#00507A" : "#005A81",
                  borderColor: "#00507A",
                },
              }}
              onClick={() => handleTabChange("inserir")}
            >
              Inserir Matéria
            </Button>
          </Box>

          {/* Conteúdo das abas */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "300px",
              width: "90%", // Aumente a largura para 90%
              margin: "0 auto",
              backgroundColor: "#00213A",
              color: "#FFFFFF",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              overflowY: "auto", // Scrollbar dinâmica
              flexGrow: 1, // Permite que o conteúdo se expanda e use o espaço disponível
            }}
          >
            {activeTab === "inserir" && (
              <Box sx={{ width: "100%" }}>
                {[...Array(11).keys()].map((index) => (
                  <Accordion
                    key={index}
                    sx={{
                      backgroundColor: "#003B56", // Cor de fundo escura
                      borderRadius: 1,
                      "&:before": {
                        display: "none", // Remove a linha de borda padrão
                      },
                      boxShadow: "none", // Retira sombra
                      "&.Mui-expanded": {
                        backgroundColor: "#006BB3", // Cor quando expandido
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        backgroundColor: "#006BB3", // Cor de fundo da summary
                        color: "#FFFFFF", // Texto branco
                        "&.Mui-expanded": {
                          backgroundColor: "#006BB3", // Cor de fundo ao expandir
                        },
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                        {index === 0 ? "Optativas" : `Período ${index}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ backgroundColor: "#00213A", color: "#FFFFFF" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        {materiasPorPeriodo[index]?.map(
                          (materia, subjectIndex) => (
                            <Box
                              key={subjectIndex}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 1.7,
                                backgroundColor: "#00111F", // Fundo escuro
                                borderRadius: 1,
                              }}
                            >
                              <Typography sx={{ color: "#FFFFFF" }}>
                                {materia.nome}
                              </Typography>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <FormControl
                                  variant="outlined"
                                  sx={{
                                    minWidth: 160,
                                    height: "auto",
                                  }}
                                >
                                  <InputLabel
                                    id={`status-label-${subjectIndex}`}
                                    sx={{
                                      height: 48,
                                      color: "#0085EA",
                                    }}
                                  >
                                    Status
                                  </InputLabel>

                                  <Select
                                    labelId={`status-label-${subjectIndex}`}
                                    value={status[materia.nome] || "Não Feita"}
                                    onChange={(e) =>
                                      handleStatusChange(
                                        materia.nome,
                                        e.target.value
                                      )
                                    }
                                    label="Status"
                                    sx={{
                                      color: "#0085EA",
                                      height: 48, // Definir a altura do Select
                                      ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#0085EA", // Cor padrão da borda
                                      },
                                      "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "#0056B3", // Cor da borda no hover
                                        },
                                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "#003F7D", // Cor da borda ao focar
                                        },
                                      ".MuiSelect-icon": {
                                        color: "#0085EA", // Cor da setinha do dropdown
                                      },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        sx: {
                                          backgroundColor: "#00111F", // Cor de fundo do dropdown
                                          color: "#FFFFFF", // Cor do texto das opções
                                        },
                                      },
                                    }}
                                  >
                                    <MuiMenuItem value="Não Feita">
                                      Não Feita
                                    </MuiMenuItem>
                                    <MuiMenuItem value="Em Andamento">
                                      Em Andamento
                                    </MuiMenuItem>
                                    <MuiMenuItem value="Feita">
                                      Feita
                                    </MuiMenuItem>
                                  </Select>
                                </FormControl>

                                <FormControl
                                  variant="outlined"
                                  sx={{
                                    marginLeft: 1,
                                    minWidth: 160,
                                    height: "auto",
                                  }}
                                >
                                  <InputLabel
                                    id={`year-label-${subjectIndex}`}
                                    sx={{
                                      height: 48,
                                      color: "#0085EA",
                                    }}
                                  >
                                    Ano da Matéria
                                  </InputLabel>

                                  <Select
                                    labelId={`year-label-${subjectIndex}`}
                                    value={year[materia.nome] || ""}
                                    onChange={(e) =>
                                      handleYearChange(
                                        materia.nome,
                                        e.target.value
                                      )
                                    }
                                    label="Ano da Matéria"
                                    sx={{
                                      color: "#0085EA",
                                      height: 48, // Definir a altura do Select
                                      ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#0085EA", // Definir a cor da borda
                                      },
                                      "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "#0056B3", // Cor da borda no hover
                                        },
                                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "#003F7D", // Cor da borda ao focar
                                        },
                                      ".MuiSelect-icon": {
                                        color: "#0085EA", // Cor da setinha do dropdown
                                      },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        sx: {
                                          backgroundColor: "#00111F", // Cor de fundo do dropdown
                                          color: "#FFFFFF", // Cor do texto das opções
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
                                  onClick={() => handleOpenModal(materia.nome)}
                                  sx={{
                                    marginLeft: 2,
                                    borderColor: "#006BB3",
                                    color: "#006BB3",
                                    "&:hover": {
                                      borderColor: "#0085EA",
                                      color: "#0085EA",
                                    },
                                  }}
                                >
                                  Ver Detalhes
                                </Button>
                              </Box>
                            </Box>
                          )
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Button
                  variant="contained"
                  onClick={handleSaveMaterias}
                  sx={{
                    backgroundColor: "#00111F",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#00111F",
                    },
                    width: 300,
                    height: 50,
                    marginTop: 5,
                    marginLeft: 0,
                    marginBottom: 2,
                  }}
                >
                  Registrar Matérias
                </Button>
              </Box>
            )}

            {activeTab === "feitas" && (
              <Box sx={{ width: "100%" }}>
                {loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  Object.entries(
                    materiasFeitas.reduce((acc, materia) => {
                      const ano = materia.ano;
                      if (!acc[ano]) acc[ano] = [];
                      acc[ano].push(materia);
                      return acc;
                    }, {})
                  ).map(([ano, materias]) => (
                    <Accordion
                      key={ano}
                      sx={{
                        backgroundColor: "#003B56", // Cor de fundo
                        borderRadius: 1,
                        "&:before": { display: "none" }, // Remove borda padrão
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          backgroundColor: "#006BB3", // Cor de fundo ao expandir
                          color: "#FFFFFF",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                          Ano: {ano}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          backgroundColor: "#00213A", // Cor do conteúdo expandido
                          color: "#FFFFFF",
                        }}
                      >
                        {materias.map((materia) => (
                          <Box
                            key={materia.id}
                            sx={{
                              padding: 1.5,
                              marginBottom: 1,
                              border: "1px solid #006BB3",
                              borderRadius: 1,
                            }}
                          >
                            <Typography>
                              <strong>Código:</strong> {materia.id_materia}
                            </Typography>
                            <Typography>
                              <strong>Nome:</strong>{" "}
                              {materia.nome_materia || "Nome da Matéria"}
                            </Typography>
                            <Typography>
                              <strong>Status:</strong> {materia.status}
                            </Typography>
                            <Button
                              variant="outlined"
                              sx={{
                                marginTop: 1,
                                borderColor: "#006BB3",
                                color: "#006BB3",
                                "&:hover": {
                                  borderColor: "#0085EA",
                                  color: "#0085EA",
                                },
                              }}
                            >
                              Ver Detalhes
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleDeleteMateria(materia.id_materia)
                              }
                              sx={{
                                marginTop: 1,
                                marginLeft: 5,
                                borderColor: "#FF0000",
                                color: "#FF0000",
                                "&:hover": {
                                  borderColor: "#FF3333",
                                  color: "#FF3333",
                                },
                              }}
                            >
                              Excluir
                            </Button>
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </Box>
            )}

            {/* Modal de informações da matéria */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#00213A",
                  padding: 4,
                  borderRadius: 1,
                  color: "#FFFFFF",
                }}
              >
                <Typography variant="h6">
                  Detalhes da {selectedSubject}
                </Typography>
                <Typography sx={{ marginTop: 2 }}>
                  Informações detalhadas sobre a matéria selecionada.
                </Typography>
                <Button
                  onClick={handleCloseModal}
                  sx={{
                    marginTop: 3,
                    backgroundColor: "#0085EA",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#006BB3",
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
