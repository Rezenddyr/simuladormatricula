import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Autocomplete,
} from "@mui/material";

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

import * as API from "../utils/api";

const MateriasApp: React.FC = () => {
  const [materiasBanco, setMateriasBanco] = useState<string[]>([]); // Armazena as matérias do back-end
  const [novaMateria, setNovaMateria] = useState<string>(""); // Valor selecionado pelo usuário

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch(API.URL + "src/aluno/notas.php"); // Chama o endpoint do back-end
        if (!response.ok) {
          throw new Error(`Erro ao buscar matérias: ${response.status}`);
        }
        const data = await response.json();
        setMateriasBanco(data);
      } catch (error) {
        console.error("Erro ao buscar matérias:", error);
      }
    };

    fetchMaterias();
  }, []);

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
        <Box sx={{ textAlign: "center", padding: 5 }}>
          <Typography variant="h4" sx={{ color: "#FFFFFF", marginBottom: 3 }}>
            Dashboard de Notas
          </Typography>

          {/* Campo Autocomplete para selecionar matéria */}
          <Autocomplete
            options={materiasBanco} // Dados retornados do back-end
            value={novaMateria} // Valor atual selecionado
            onChange={(event, newValue) => setNovaMateria(newValue || "")} // Atualiza o valor ao selecionar
            renderInput={(params) => (
              <TextField
                {...params}
                label="Matéria"
                variant="outlined"
                sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
              />
            )}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MateriasApp;
