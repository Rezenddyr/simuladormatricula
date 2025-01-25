import React, { useEffect, useState } from "react";
import * as API from '../utils/api';

interface Notificacao {
  id_notificacao: number;
  mensagem: string;
  criado_em: string;
}

const Notificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);  

    const fetchNotificacoes = async () => {
      try {
        const response = await fetch(API.URL + 'back-end\src\notificacoes\notificacoes.php');
        if (!response.ok) {
          throw new Error("Erro ao buscar notificações.");
        }
        const data = await response.json();
        setNotificacoes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacoes();
  }, []);

  if (loading) {
    return <p>Carregando notificações...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f4f8", borderRadius: "8px" }}>
      <h2>Notificações</h2>
      {notificacoes.length > 0 ? (
        <ul>
          {notificacoes.map((notificacao) => (
            <li key={notificacao.id_notificacao} style={{ marginBottom: "1rem" }}>
              <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <p>{notificacao.mensagem}</p>
                <small style={{ color: "#666" }}>
                  {/* Formatação de data somente no cliente */}
                  {isClient ? new Date(notificacao.criado_em).toLocaleString("pt-BR") : null}
                </small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma notificação encontrada.</p>
      )}
    </div>
  );
};

export default Notificacoes;
