import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem, ListItemText, CircularProgress } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import * as API from '../utils/api';

interface Notification {
  id: number;
  mensagem: string;
  criado_em: string;
}

const NotificationButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(API.URL + 'src/notificacoes/mostra_notificacoes.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched notifications:', data); // Log para depuração

        // Verifica se a resposta contém a propriedade 'notificacoes' e se é um array
        if (data && Array.isArray(data.notificacoes)) {
          setNotifications(data.notificacoes);
        } else {
          console.error('Fetched data does not contain an array:', data);
          setNotifications([]); // Define como array vazio se os dados não forem válidos
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]); // Define como array vazio em caso de erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loading ? (
          <MenuItem>
            <CircularProgress size={24} /> {/* Exibe um spinner enquanto carrega */}
          </MenuItem>
        ) : notifications.length === 0 ? (
          <MenuItem>
            <ListItemText primary="No notifications" /> {/* Mensagem para lista vazia */}
          </MenuItem>
        ) : (
          notifications.map(notification => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <ListItemText
                primary={notification.mensagem}
                secondary={new Date(notification.criado_em).toLocaleString()} // Formata a data
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationButton;