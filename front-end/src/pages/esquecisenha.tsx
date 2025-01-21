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

    if (!email || !password) {
      setMessage("Por favor, preencha o e-mail e a senha atual.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/src/aluno/alterar_senha.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, currentPassword: password }),
        }
      );

      if (response.ok) {
        setShowNewPasswordFields(true);
        setMessage("Credenciais verificadas. Insira a nova senha.");
      } else {
        const error = await response.json();
        setMessage(error.error || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      setMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      console.error("Erro na conexão:", error);
    }
  };

  const handleChangePassword = async () => {
    setMessage(null);

    if (!newPassword || !confirmPassword) {
      setMessage("Por favor, preencha os campos de nova senha.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/src/aluno/alterar_senha.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            currentPassword: password,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Senha alterada com sucesso!");
        setShowNewPasswordFields(false);
        setEmail("");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const error = await response.json();
        setMessage(error.error || "Erro ao alterar a senha.");
      }
    } catch (error) {
      setMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
      console.error("Erro:", error);
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
              Alterar Senha
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
            <TextField
              label="Senha Atual"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            {showNewPasswordFields && (
              <>
                <TextField
                  label="Nova Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                <TextField
                  label="Confirmar Nova Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={handleChangePassword}
                >
                  Alterar Senha
                </Button>
              </>
            )}

            {!showNewPasswordFields && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleVerifyCredentials}
              >
                Verificar Credenciais
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
