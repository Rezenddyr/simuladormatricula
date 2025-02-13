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
  TextField,
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
  const [schedule, setSchedule] = useState<{ [key: string]: string }>({});
  const [notas, setNotas] = useState<{ [key: string]: string }>({}); // <-- Aqui
  const [materiasPorPeriodo, setMateriasPorPeriodo] = useState<{
    [key: number]: any[];
  }>({});
  const [materiasFeitas, setMateriasFeitas] = useState<any[]>([]);

  const handleScheduleChange = (materiaNome, valoresSelecionados) => {
    setSchedule((prevState) => ({
      ...prevState,
      [materiaNome]: valoresSelecionados,
    }));
  };

  const [openUpdateNotaModal, setOpenUpdateNotaModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [novaNota, setNovaNota] = useState<string | null>(null);

  const handleOpenDeleteModal = (idMateria) => {
    setSelectedSubject(idMateria);
    setOpenModalDelete(true);
  }

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setSelectedSubject(null);
  }

  const hadleOpenUpdateNotaModal = (idMateria) => {
    setSelectedSubject(idMateria);
    setOpenUpdateNotaModal(true);
  };

  const handleCloseUpdateNotaModal = () => {
    setOpenUpdateNotaModal(false);
    setSelectedSubject(null);
    setNovaNota(null);
  };

  const handleSaveHorarios = async () => {
    try {
      console.log("Horários selecionados:", schedule);

      // Prepara os dados dos horários
      const horariosToSave = Object.keys(schedule).map((materia) => {
        const materiaData = Object.values(materiasPorPeriodo)
          .flat()
          .find((m) => m.nome === materia);

        return {
          codigo: materiaData?.codigo,
          horario: schedule[materia],
        };
      });

      console.log(
        "📤 Dados preparados para envio:",
        JSON.stringify(
          {
            materias: horariosToSave,
          },
          null,
          2
        )
      );

      // Envia para o backend
      const response = await fetch(
        API.URL + "src/materias/horarioMateria.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            materias: horariosToSave,
          }),
        }
      );

      const data = await response.json();

      console.log("📥 Resposta do servidor:", data);

      if (!response.ok || data.error) {
        throw new Error("Erro ao registrar horários.");
      }

      console.log("Horários registrados com sucesso!");
      alert("Horários registrados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar horários:", error);
      alert("Erro ao registrar os horários. Tente novamente.");
    }
  };

  const handleSaveMaterias = async () => {
    try {
      console.log("Valor original de matricula:", matricula);
      console.log("Tipo de matricula:", typeof matricula);
      console.log("Valor enviado para id_aluno (matricula):", matricula);
      console.log("Status atual:", status);
      console.log("Ano atual:", year);
      console.log("Horários selecionados:", schedule);
      console.log("Notas:", notas);
  
      // Prepara os dados das matérias a serem salvas
      const materiasToSave = Object.keys(status).map((materia) => {
        const materiaData = Object.values(materiasPorPeriodo)
          .flat()
          .find((m) => m.nome === materia);
  
        return {
          id_materia: materiaData?.codigo,
          status: status[materia],
          ano: year[materia] || null,
          nota: status[materia] === "Feita" ? notas[materia] : null,
        };
      });
  
      console.log("Dados enviados para o backend:", {
        id_aluno: matricula,
        materias: materiasToSave,
      });
  
      // Faz a requisição para salvar as matérias
      const responseMaterias = await fetch(
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
  
      const dataMaterias = await responseMaterias.json();
  
      // Verifica a resposta do servidor para as matérias
      if (responseMaterias.ok && !dataMaterias.error) {
        console.log("Matérias registradas com sucesso!");
        alert("Matérias registradas com sucesso!");
  
        // Após salvar as matérias, salva os horários
        if (Object.keys(schedule).length > 0) {
          await handleSaveHorarios();
        }
  
        // Após salvar as matérias, salva as notas
        // if (Object.keys(notas).length > 0) {
        //   await handleSaveNotas();
        // } modificado para salvar com 1 requisição

      } else {
        console.error("Erro ao salvar matérias:", dataMaterias.error);
        alert("Erro ao registrar matérias, verifique campos e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao salvar matérias:", error);
      alert("Erro de conexão ao registrar matérias.");
    }
  };

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

      setMateriasFeitas(data.materias || []);
    } catch (error) {
      console.error("Erro ao buscar matérias feitas:", error);
    }
  };

  const handleDeleteMateria = async () => {
    try {
      const response = await fetch(API.URL + "src/materias/MateriasAluno.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          id_aluno: Number(matricula),
          id_materia_feita: Number(selectedSubject),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchMateriasFeitas();
      } else {
        alert(data.error || "Erro ao excluir a matéria.");
      }
    } catch (error) {
      console.error("Erro ao excluir a matéria:", error);
    }
  handleCloseModalDelete();
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
    if(newStatus !== "Não Feita") {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [subject]: newStatus,
    }));
  }
  };

  const handleYearChange = (subject: string, newYear: string) => {
    setYear((prevYear) => ({
      ...prevYear,
      [subject]: newYear,
    }));
  };

  const handleUpdateNota = async () => {
    try {
      if(!selectedSubject || !novaNota) {
        throw new Error("Selecione uma matéria e informe a nova nota.");
        return;
      }
      console.log(selectedSubject, novaNota);
      const responseNotas = await fetch(
        API.URL + "src/matriculas/atualizaNota.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adiciona o token de autenticação
          },
          body: JSON.stringify({
            id_materia_feita: Number(selectedSubject),
            nota: Number(novaNota),
          }),
        });
  
      const dataNota = await responseNotas.json();
      console.log("Resposta do servidor:", dataNota);
  
      // // Verifica a resposta do servidor para as notas
      if (responseNotas.ok && !dataNota.error) {
        alert("Nota atualizada com sucesso!");
      } else {
      //   console.error("Erro ao salvar notas:", dataNotas.error);
        alert("Erro ao atualizar notas: " + dataNota.error);
      }  
    } catch (error) {
      console.error("Erro ao atualizar notas:", error);
      alert("Erro de conexão ao registrar notas.");
    }
    handleCloseUpdateNotaModal();
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
    if(activeTab === 'feitas') {
    const fetchAllMaterias = async () => {
      const materias: { [key: number]: any[] } = {};
      for (let periodo = 0; periodo <= 10; periodo++) {
        materias[periodo] = await fetchMateriasByPeriodo(periodo);
      }
      setMateriasPorPeriodo(materias);

    };

    fetchAllMaterias();
  }
  }, [activeTab]);

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
        <Header />

        <Box sx={{ textAlign: "center", marginTop: 5 }}>
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
              Matérias
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "300px",
              width: "90%",
              margin: "0 auto",
              backgroundColor: "#00213A",
              color: "#FFFFFF",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              overflowY: "auto",
              flexGrow: 1,
            }}
          >
            {activeTab === "inserir" && (
              <Box sx={{ width: "100%" }}>
                {[...Array(11).keys()].map((index) => (
                  <Accordion
                    key={index}
                    sx={{
                      backgroundColor: "#003B56",
                      borderRadius: 1,
                      "&:before": {
                        display: "none",
                      },
                      boxShadow: "none",
                      "&.Mui-expanded": {
                        backgroundColor: "#006BB3",
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        backgroundColor: "#006BB3",
                        color: "#FFFFFF",
                        "&.Mui-expanded": {
                          backgroundColor: "#006BB3",
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
                                backgroundColor: "#00111F",
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
                                      height: 48,
                                      ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#0085EA",
                                      },
                                      "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#0056B3",
                                      },
                                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#003F7D",
                                      },
                                      ".MuiSelect-icon": {
                                        color: "#0085EA",
                                      },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        sx: {
                                          backgroundColor: "#00111F",
                                          color: "#FFFFFF",
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
                                      height: 48,
                                      ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#0085EA",
                                      },
                                      "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#0056B3",
                                      },
                                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#003F7D",
                                      },
                                      ".MuiSelect-icon": {
                                        color: "#0085EA",
                                      },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        sx: {
                                          backgroundColor: "#00111F",
                                          color: "#FFFFFF",
                                        },
                                      },
                                    }}
                                  >
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

                                {status[materia.nome] === "Em Andamento" && (
                                  <FormControl
                                    variant="outlined"
                                    sx={{
                                      marginLeft: 1,
                                      minWidth: 160,
                                      height: "auto",
                                    }}
                                  >
                                    <InputLabel
                                      id={`schedule-label-${subjectIndex}`}
                                      sx={{
                                        height: 48,
                                        color: "#0085EA",
                                      }}
                                    >
                                      Horário
                                    </InputLabel>
                                    <Select
                                      labelId={`schedule-label-${subjectIndex}`}
                                      multiple
                                      value={schedule[materia.nome] || []} // Agora aceita array de valores
                                      onChange={(e) =>
                                        handleScheduleChange(
                                          materia.nome,
                                          e.target.value
                                        )
                                      }
                                      renderValue={(selected) =>
                                        selected.join(", ")
                                      } // Exibe os valores selecionados separados por vírgula
                                      sx={{
                                        color: "#0085EA",
                                        height: 48,
                                        ".MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#0085EA",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "#0056B3",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "#003F7D",
                                        },
                                        ".MuiSelect-icon": {
                                          color: "#0085EA",
                                        },
                                      }}
                                      MenuProps={{
                                        PaperProps: {
                                          sx: {
                                            backgroundColor: "#00111F",
                                            color: "#FFFFFF",
                                          },
                                        },
                                      }}
                                    >
                                      {[
                                        "2M12",
                                        "2M34",
                                        "2M56",
                                        "2T12",
                                        "2T34",
                                        "2T56",
                                        "3M12",
                                        "3M34",
                                        "3M56",
                                        "3T12",
                                        "3T34",
                                        "3T56",
                                        "4M12",
                                        "4M34",
                                        "4M56",
                                        "4T12",
                                        "4T34",
                                        "4T56",
                                        "5M12",
                                        "5M34",
                                        "5M56",
                                        "5T12",
                                        "5T34",
                                        "5T56",
                                        "6M12",
                                        "6M34",
                                        "6M56",
                                        "6T12",
                                        "6T34",
                                        "6T56",
                                      ].map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                )}

                                {status[materia.nome] === "Feita" && (
                                  <TextField
                                    label="Nota"
                                    variant="outlined"
                                    type="number"
                                    value={notas[materia.nome] || ""}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      // Garante que o valor está entre 0 e 100
                                      if (Number(value) > 100) value = "100";
                                      if (Number(value) < 0) value = "0";
                                      
                                      setNotas((prevNotas) => ({
                                        ...prevNotas,
                                        [materia.nome]: value,
                                      }))
                                    }}
                                    inputProps={{
                                      min: 0,
                                      max: 100,
                                      step: 1,
                                    }}
                                    sx={{
                                      marginLeft: 1,
                                      width: 160,
                                      '& .MuiInputBase-root': {
                                        height: 48,
                                        color: "#0085EA",
                                        '& fieldset': {
                                          borderColor: "#0085EA",
                                        },
                                        '&:hover fieldset': {
                                          borderColor: "#0056B3",
                                        },
                                        '&.Mui-focused fieldset': {
                                          borderColor: "#003F7D",
                                        },
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: "#0085EA",
                                        '&.Mui-focused': {
                                          color: "#0085EA",
                                        },
                                      },
                                      '& .MuiOutlinedInput-input': {
                                        '&::-webkit-inner-spin-button': {
                                          WebkitAppearance: 'none',
                                          margin: 0,
                                        },
                                        '&[type=number]': {
                                          MozAppearance: 'textfield',
                                        },
                                      },
                                    }}
                                  />
                                )}

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
                  )
                    .sort(([anoA], [anoB]) => anoA.localeCompare(anoB)) // Ordena os anos
                    .map(([ano, materias]) => (
                      <Accordion
                        key={ano}
                        sx={{
                          backgroundColor: "#003B56",
                          borderRadius: 1,
                          "&:before": { display: "none" },
                        }}
                      >
                        <AccordionSummary
                          sx={{
                            backgroundColor: "#006BB3",
                            color: "#FFFFFF",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                            Ano: {ano}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            backgroundColor: "#00213A",
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
                              {materia.status === "Feita" && (
                                <Typography>
                                  <strong>Nota:</strong> {materia.nota}
                                </Typography>
                              )}
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
                                onClick={() => handleOpenDeleteModal(materia.id)}
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
                              <Button
                                variant="outlined"
                                onClick = {() => hadleOpenUpdateNotaModal(materia.id)}
                                sx={{
                                  marginTop: 1,
                                  marginLeft: 5,
                                  borderColor: "#006BB3",
                                  color: "#006BB3",
                                  "&:hover": {
                                    borderColor: "#0085EA",
                                    color: "#0085EA",
                                  },
                                }}
                              >
                                Atualizar Nota
                              </Button>
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ))
                )}
              </Box>
            )}
            
            <Modal
              open = {openUpdateNotaModal}
              onClose = {handleCloseUpdateNotaModal}
              sx = {{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              >
              <Box
                sx = {{
                  backgroundColor: "#00213A",
                  padding: 4,
                  borderRadius: 1,
                  color: "#FFFFFF",
                }}
                >
                <Typography variant = "h6">
                  Atualizar Nota
                </Typography>
                <Typography sx = {{marginTop: 2}}>
                  Informe a nova nota da matéria.
                </Typography>
                <TextField
                  label = "Nota"
                  variant = "outlined"
                  fullWidth
                  margin = "normal"
                  value = {novaNota}
                  onChange={(e) => setNovaNota(e.target.value)}
                  error = {!novaNota}
                  helperText = {!novaNota ? "Informe a nova nota." : ""}
                  />
                <Button
                  onClick = {handleUpdateNota}
                  sx = {{
                    marginTop: 3,
                    backgroundColor: "#0085EA",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#006BB3",
                    },
                  }}
                  >
                    Atualizar
                  </Button>
                  <Button
                    onClick = {handleCloseUpdateNotaModal}
                    sx = {{
                      marginTop: 3,
                      marginLeft: 3,
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
            <Modal
              open={openModalDelete}
              onClose={handleCloseModalDelete}
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
                  Tem certeza que deseja excluir a matéria?
                </Typography>
                <Button
                  onClick={handleCloseModalDelete}
                  sx = {{
                    marginTop: 3,
                    backgroundColor: "#0085EA",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#006BB3",
                    },
                  }}
                  >
                    Cancelar
                  </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick = {handleDeleteMateria}
                  sx={{
                    marginTop: 3,
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
            </Modal>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MinhasMaterias;
