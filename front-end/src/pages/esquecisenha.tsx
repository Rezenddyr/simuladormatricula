import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import * as API from "../utils/api";

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

const EsqueciSenha: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);

  const handleVerifyCredentials = async () => {
    setMessage(null);

    if (!email) {
      setMessage("Por favor, preencha o e-mail.");
      return;
    }

    try {
      const response = await fetch(API.URL + 'src/email/recuperarSenha.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
              }),
        }
      );

      if (response.ok) {
        setMessage("O link de recuperação de senha foi enviado para o seu e-mail.");
      } else {
        const error = await response.json();
        setMessage(error.error || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      setMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      console.error("Erro na conexão:", error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        <Card
          sx={{
            width: 500,
            padding: 2,
            backgroundColor: "#00213A",
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: "center", marginBottom: 2, color: "#FFFFFF" }}
            >
              Recuperar Senha
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: "#94A3B8" } }}
              sx={{
                backgroundColor: "#00111F",
                input: { color: "#FFFFFF" },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#0085EA",
                  },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0085EA",
                },
              }}
            />

            {!showNewPasswordFields && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleVerifyCredentials}
              >
                Enviar Email
              </Button>
            )}

            {message && (
              <Typography
                sx={{
                  color: message.includes("Erro") ? "red" : "#94A3B8",
                  textAlign: "center",
                  marginTop: 2,
                }}
              >
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default EsqueciSenha;
