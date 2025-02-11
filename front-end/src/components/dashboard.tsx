import React, { useEffect, useState } from 'react';
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
import * as API from '../utils/api';
import { unique } from 'next/dist/build/utils';
import { transform } from 'next/dist/build/swc/generated-native';



// Definindo como o objeto Materia deve chegar no front-end (tem um console log mostrando a resposta do servidor)
interface Materia {
  codigo: string,
  horas: number,
  cor: string,
  ano: string,
}

type periodData = Record<string, Materia[]>; // definindo o tipo dados do periodo para o useState


const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  // Dados principais do curso
  const totalHours = 3600;[]
  const colorArray = ["#FF6B6B",
  "#4ECDC4",
  "#45B7D1", 
  "#FFD93D", 
  "#6C5CE7",
  "#00B894", 
  "#FF7675",
  "#74B9FF", 
  "#FDCB6E", 
  "#A29BFE", 
  "#55EFC4", 
  "#D63031"  
];
  const [completedHours, setCompletedHours] = useState(0);
  const [completedOpHours, setCompletedOpHours] = useState(0);
  const progressPercentage = (completedHours / totalHours) * 100;
  const mainChartData = [
    { name: 'Obrigatória Pendente', value: 3060, color: theme.palette.primary.main },
    { name: 'Optativa Pendente', value: 540, color: theme.palette.secondary.main },
  ];
  const [loadingGraph, setLoadingGraph] = useState(true);
  const [loading, setLoading] = useState(true);
  const [totalPeriodHours, setTotalPeriodHours] = useState(0);
  const [periodData, setPeriodData] = useState<periodData>({});
  const [periods, setPeriods] = useState<string[]>([]);

  // Dados por período hardcoded para testes (antigo)



  // const periodData = {
  //   '2023.1': [
  //     { name: 'Cálculo I', hours: 120, color: '#FF6B6B' },
  //     { name: 'Física I', hours: 90, color: '#4ECDC4' },
  //     { name: 'Programação', hours: 60, color: '#45B7D1' }
  //   ],
  //   '2023.2': [
  //     { name: 'Álgebra Linear', hours: 80, color: '#FFD93D' },
  //     { name: 'Química Geral', hours: 70, color: '#6C5CE7' },
  //     { name: 'Estatística', hours: 50, color: '#00B894' }
  //   ]
  // };

  // faz a requisição pra buscar o progresso geral do aluno 
  // quantas horas de obrigatorias e de optativas, quantos periodos com materias feitas
  // e os demais dados para o dashboard
  const fetchProgresso = async () => {
    try {
      const response = await fetch(API.URL + 'src/aluno/getProgresso.php',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      // console.log("📥 Resposta do servidor:", data);
      if (!response.ok || data.error) {
        throw new Error("Erro ao buscar progresso.");
      } else {
        setCompletedHours(data.chRealizada);
        setCompletedOpHours(data.chOp);
        const uniquePeriods = Array.from(
          new Set(data.materias_feitas.map((materia: Materia) => materia.ano))
        );
        if (uniquePeriods.length > 0){
        setPeriods((uniquePeriods as Array<string>).sort());
        setSelectedPeriod((uniquePeriods[0] as string));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // requisição que pede o progresso específico de cada periodo para montar o gráfico de pizza
  const transformaDados = (respostaApi: any[]) : periodData => {
    const transformado: periodData = {};
    
    respostaApi.forEach((item: any, index: number) => {
      const materia: Materia = {
        codigo: item.id_materia,
        horas: parseInt(item.carga_horaria),
        cor: item.cor || '#000000',
        ano: item.ano
      };
      if (!transformado[item.ano]) {
        transformado[item.ano] = [];
    }

    transformado[item.ano].push(materia);
    });
    return transformado;
  }


  const fetchProgressoByPeriodo = async () => {
    try {
      const response = await fetch(
        API.URL + 'src/aluno/getProgressoByPeriodo.php',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedPeriod })
        });
      const data = await response.json();
      // console.log("📥 Resposta do servidor:", data);
      if (!response.ok || data.error) {
        throw new Error("Erro ao buscar progresso.");
      }
      setTotalPeriodHours(data.chPeriodo);
      data['materias_feitas'].forEach((materia: Materia, index: number) => {
        materia.cor = colorArray[index];
      });
      // console.log(transformaDados(data.materias_feitas));
      setPeriodData(transformaDados(data.materias_feitas));
      // console.log(periodData);
    } catch (error) {
      console.error('Erro ao buscar dados do período:', error);
    }
  }

  // carregamento dos dados no rodapé do dashboard
  useEffect(() => {
    fetchProgresso();
    setLoading(false);
  }, []);

  // carregamento dos dados do gráfico de pizza
  // recarrega sempre que o periodo selecionado muda
  useEffect(() => {
    fetchProgressoByPeriodo();
    setLoadingGraph(false);
  }, [selectedPeriod]);

  const handleChangePeriod = (event: SelectChangeEvent) => { // Tipo corrigido aqui
    setSelectedPeriod(event.target.value);
    //volta o carregamento do grafico de pizza para true
    //enquanto a API não respondeu com os dados do novo periodo
    setLoadingGraph(true);
  };

  // const totalPeriodHours = periodData[selectedPeriod as keyof typeof periodData]
  //   .reduce((sum, subject) => sum + subject.hours, 0);

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
          {loadingGraph ? (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <CircularProgress />
              </Box>
            </Grid>
          ) : (
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
                  {periods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
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
                    background: `conic-gradient(${(periodData[selectedPeriod] || [])
                      .map((subject, index, arr) => {
                        const prevPercent = arr.slice(0, index).reduce((sum, s) =>
                          sum + (s.horas / totalPeriodHours) * 100, 0);
                        const percent = (subject.horas / totalPeriodHours) * 100;
                        return `${subject.cor} ${prevPercent}% ${prevPercent + percent}%`;
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
                  {(periodData[selectedPeriod] || []).map((subject, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1}>
                      <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '2px',
                        backgroundColor: subject.cor
                      }} />
                      <Typography variant="body2">
                        {subject.codigo} ({subject.horas}h)
                      </Typography>
                    </Box>
                  ))}
                </Box>
            </Box>
          </Grid>
          )}
        </Grid>
        

        {/* Rodapé com Informações Gerais */}
        <Box sx={{
          mt: 4,
          pt: 2,
          borderTop: `1px solid ${theme.palette.grey[700]}`,
          color: 'white'
        }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  CH Total do Currículo: 3600 horas
                </Typography>
                <Typography variant="body2">
                  CH Obrigatória Pendente: {totalHours - completedHours} horas
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  CH Optativa Pendente: 540 horas
                </Typography>
                <Typography variant="body2">
                  CH Concluída: {completedOpHours} horas
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Dashboard;