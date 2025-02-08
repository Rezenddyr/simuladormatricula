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
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
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
            <CircularProgress size={24} />
          </MenuItem>
        ) : notifications.length === 0 ? (
          <MenuItem>
            <ListItemText primary="No notifications" />
          </MenuItem>
        ) : (
          notifications.map(notification => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <ListItemText primary={notification.mensagem} secondary={new Date(notification.criado_em).toLocaleString()} />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationButton;