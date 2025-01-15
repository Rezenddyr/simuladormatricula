import { homedir } from "os";
import * as API from "./api";

// Verifica se o usuário está autenticado com um token JWT válido gerado no login
export const isAuthorized = () => {
    const localToken =
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    if (localToken != null) {
        //Faz a requisição para a API para validação do token
        fetch("https://api.uainergy.com.br/api/Auth/validate.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jwt: localToken,
            }),
        })
            .then(async (response) => response.json())
            .then((responseJSON) => {
                //Se o token não for válido, o usuário não acessará a home
                if (responseJSON == "false") {
                    return false;
                } else {
                    return true;
                }
            });
    } else {
        return false;
    }
};

