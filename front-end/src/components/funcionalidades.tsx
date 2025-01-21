import React from 'react';
import { Card, CardContent, Button, Box, Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Card
            sx={{
                width: 300,
                padding: 4,
                backgroundColor: '#00213A',
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            }}
        >
            
        </Card>
    );
};

export default Dashboard;
