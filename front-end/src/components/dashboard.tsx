import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Select,
  MenuItem,
  Grid,
  useTheme,
  SelectChangeEvent // Importação corrigida aqui
} from '@mui/material';


const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('2023.1');

  // Dados principais do curso
  const totalHours = 3600;
  const completedHours = totalHours - (3060 + 540);
  const progressPercentage = (completedHours / totalHours) * 100;
  const mainChartData = [
    { name: 'Obrigatória Pendente', value: 3060, color: theme.palette.primary.main },
    { name: 'Optativa Pendente', value: 540, color: theme.palette.secondary.main },
  ];

  // Dados por período
  const periodData = {
    '2023.1': [
      { name: 'Cálculo I', hours: 120, color: '#FF6B6B' },
      { name: 'Física I', hours: 90, color: '#4ECDC4' },
      { name: 'Programação', hours: 60, color: '#45B7D1' }
    ],
    '2023.2': [
      { name: 'Álgebra Linear', hours: 80, color: '#FFD93D' },
      { name: 'Química Geral', hours: 70, color: '#6C5CE7' },
      { name: 'Estatística', hours: 50, color: '#00B894' }
    ]
  };

  const handleChangePeriod = (event: SelectChangeEvent) => { // Tipo corrigido aqui
    setSelectedPeriod(event.target.value);
  };

  const totalPeriodHours = periodData[selectedPeriod as keyof typeof periodData]
    .reduce((sum, subject) => sum + subject.hours, 0);

  return (
    <Card
      sx={{
        width: 1000,
        padding: 4,
        backgroundColor: '#00213A',
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', mb: 4, textAlign: 'center' }}>
          Dashboard do Progresso Acadêmico
        </Typography>

        <Grid container spacing={4}>
          {/* Coluna Esquerda - Gráficos Principais */}
          <Grid item xs={12} md={6}>
            {/* Progresso Total */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                Progresso Total do Curso
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  height: 25,
                  borderRadius: 2,
                  backgroundColor: theme.palette.grey[800],
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                    backgroundColor: theme.palette.success.main
                  }
                }}
              />
              <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                {completedHours}h concluídas de {totalHours}h ({progressPercentage.toFixed(1)}%)
              </Typography>
            </Box>


            {/* Gráfico de Barras Simulado */}
            <Box sx={{ height: 150, mb: 4 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Distribuição de Horas
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'flex-end' }}>
                {mainChartData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '50%',
                      height: `${(item.value / totalHours) * 100}%`,
                      backgroundColor: item.color,
                      borderRadius: '4px 4px 0 0',
                      position: 'relative'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        bottom: '-25px',
                        width: '100%',
                        textAlign: 'center',
                        color: 'white'
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Coluna Direita - Gráfico por Período */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Matérias por Período
                </Typography>
                <Select
                  value={selectedPeriod}
                  onChange={handleChangePeriod}
                  sx={{
                    color: 'white',
                    '& .MuiSelect-icon': { color: 'white' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                  }}
                >
                  <MenuItem value="2023.1">2023.1</MenuItem>
                  <MenuItem value="2023.2">2023.2</MenuItem>
                </Select>
              </Box>

              {/* Gráfico de Pizza por Período */}
              <Box sx={{ 
                position: 'relative', 
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2
              }}>
                <Box sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: `conic-gradient(${periodData[selectedPeriod as keyof typeof periodData]
                    .map((subject, index, arr) => {
                      const prevPercent = arr.slice(0, index).reduce((sum, s) => 
                        sum + (s.hours / totalPeriodHours) * 100, 0);
                      const percent = (subject.hours / totalPeriodHours) * 100;
                      return `${subject.color} ${prevPercent}% ${prevPercent + percent}%`;
                    }).join(', ')
                  })`,
                  position: 'relative',
                  boxShadow: theme.shadows[4]
                }}>
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    backgroundColor: '#00213A',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {totalPeriodHours}h
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'white' }}>
                      {selectedPeriod}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Legenda do Período */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 1.5,
                color: 'white'
              }}>
                {periodData[selectedPeriod as keyof typeof periodData].map((subject, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <Box sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '2px',
                      backgroundColor: subject.color
                    }} />
                    <Typography variant="body2">
                      {subject.name} ({subject.hours}h)
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Rodapé com Informações Gerais */}
        <Box sx={{
          mt: 4,
          pt: 2,
          borderTop: `1px solid ${theme.palette.grey[700]}`,
          color: 'white'
        }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                CH Total do Currículo: 3600 horas
              </Typography>
              <Typography variant="body2">
                CH Obrigatória Pendente: 3060 horas
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                CH Optativa Pendente: 540 horas
              </Typography>
              <Typography variant="body2">
                CH Concluída: {completedHours} horas
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Dashboard;