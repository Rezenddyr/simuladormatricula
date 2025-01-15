import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Link,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import * as API from "../utils/api";

const theme = createTheme({
  palette: {
    background: {
      default: "#00111F", // Cor de fundo geral
    },
    primary: {
      main: "#0085EA",
    },
  },
  typography: {
    fontFamily: "Archivo, sans-serif",
  },
});

export const Login: React.FC = () => {
  const router = useRouter();
  const { notAuthorized } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setEmailError(!email.includes("@"));
    setPasswordError(password.length < 6);

    if (!emailError && !passwordError) {
      try {
        const response = await fetch(API.URL + "src/Login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha: password,
          }),
        });

        const data = await response.json();
        console.log("Resposta do servidor:", data);

        if (response.ok && !data.error) {
          alert(`Bem-vindo, ${data.user}!`);
          sessionStorage.setItem("token", data.token);
          console.log(data.user);
          router.push({
            pathname: "/inicial",
            
            query: { nome: data.user,
                     email: data.email,
                     matricula: data.matricula,
              
             },
          });
        } else {
          alert(data.error || "Erro ao realizar login.");
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao conectar com o servidor.");
      }
    }
  };

  useEffect(() => {
    // Adiciona o estilo da animação globalmente
    const style = document.createElement("style");
    style.innerHTML = ` 
      body {
        margin: 0;
        padding: 0;
        font-family: "Arial", Helvetica, sans-serif;
        font-size: 12px;
        background: #2980b9 url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0;
        -webkit-animation: 10s linear 0s normal none infinite animate;
        -moz-animation: 10s linear 0s normal none infinite animate;
        -ms-animation: 10s linear 0s normal none infinite animate;
        -o-animation: 10s linear 0s normal none infinite animate;
        animation: 10s linear 0s normal none infinite animate;
      }

      @-webkit-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }

      @-moz-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }

      @-ms-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }

      @-o-keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }

      @keyframes animate {
        from { background-position: 0 0; }
        to { background-position: 500px 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); // Remove o estilo quando o componente for desmontado
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            width: 500,
            padding: 2,
            backgroundColor: "#00213A", // Cor de fundo do card de login
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            {notAuthorized && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                Acesso não autorizado. Faça login para continuar.
              </Alert>
            )}
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: "center", marginBottom: 2, color: "#FFFFFF" }}
            >
              Login
            </Typography>
            <Link
              href="/"
              sx={{ display: "block", textAlign: "center", marginBottom: 2 }}
            >
              <img
                src="/images/logo.svg" // Caminho da imagem ajustado para o diretório public/images/logo.jpeg
                alt="Logo"
                style={{
                  height: 250, // Aumenta o tamanho da imagem
                  width: "auto", // Mantém a proporção
                  display: "block", // Centraliza a imagem
                  marginLeft: "auto", // Alinha à esquerda
                  marginRight: "auto", // Alinha à direita
                  marginBottom: "20px", // Espaçamento inferior
                  cursor: "pointer", // Cursor em forma de mão para indicar que é clicável
                }}
              />
            </Link>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={
                emailError ? 'Inclua um "@" no endereço de e-mail.' : ""
              }
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
              label="Senha"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={
                passwordError ? "A senha deve ter pelo menos 6 caracteres." : ""
              }
              InputLabelProps={{ style: { color: "#94A3B8" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff style={{ color: "#94A3B8" }} />
                      ) : (
                        <Visibility style={{ color: "#94A3B8" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            <FormControlLabel
              control={<Checkbox sx={{ color: "#94A3B8" }} />}
              label={
                <Typography sx={{ color: "#94A3B8" }}>
                  Lembre-se de mim
                </Typography>
              }
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, fontWeight: "bold" }}
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography sx={{ color: "#94A3B8" }}>
                Não tem uma conta?{" "}
                <Link
                  href="/cadastro"
                  sx={{ color: "#0085EA", textDecoration: "none" }}
                >
                  Cadastre-se
                </Link>
              </Typography>
              <Typography sx={{ color: "#94A3B8", marginTop: 1 }}>
                <Link
                  href="/esquecisenha"
                  sx={{ color: "#0085EA", textDecoration: "none" }}
                >
                  Esqueci minha senha
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
