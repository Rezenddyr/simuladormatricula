import React from 'react';
import { Card, CardContent, Button, Box, Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';

const Funcionalidades: React.FC = () => {
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
            <CardContent>
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ textAlign: 'center', marginBottom: 4, color: '#FFFFFF' }}
                >
                    Funcionalidades
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <MuiLink component="a" href="/minhasmaterias" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#0085EA',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#006BB3',
                                },
                                fontWeight: 'bold',
                            }}
                        >
                            Matérias Feitas
                        </Button>
                    </MuiLink>
                    <MuiLink component="a" href="/simular" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#0085EA',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#006BB3',
                                },
                                fontWeight: 'bold',
                            }}
                        >
                            Simular Matrícula
                        </Button>
                    </MuiLink>
                    <MuiLink component="a" href="/horario" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#0085EA',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#006BB3',
                                },
                                fontWeight: 'bold',
                            }}
                        >
                            Meu Horário
                        </Button>
                    </MuiLink>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Funcionalidades;
