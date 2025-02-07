import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import * as API from "@/utils/api";

interface ScheduleSlot {
  time: string;
  interval: boolean;
  day?: string; // Dia traduzido
  period?: string; // Período traduzido
  materia?: string; // Matéria associada ao horário
}

const translateSchedule = (code: string) => {
  const dayMapping: Record<string, string> = {
    "2": "Segunda-feira",
    "3": "Terça-feira",
    "4": "Quarta-feira",
    "5": "Quinta-feira",
    "6": "Sexta-feira",
  };

  const timeMapping: Record<string, string> = {
    M12: "07:00 - 08:40",
    M34: "09:00 - 10:40",
    M56: "10:40 - 12:20",
    T12: "13:20 - 15:00",
    T34: "15:20 - 17:00",
    T56: "17:00 - 18:40",
  };

  const day = dayMapping[code.charAt(0)] || "Dia inválido";
  const period = timeMapping[code.substring(1)] || "Horário inválido";

  return { day, period };
};

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const RenderTable: React.FC<{ title: string; schedule: ScheduleSlot[] }> = ({
  title,
  schedule,
}) => (
  <Box sx={{ mb: 4, flex: 1, display: "flex", flexDirection: "column", mx: 1 }}>
    <Typography
      variant="h5"
      sx={{ mb: 2, textAlign: "center", color: "#FFFFFF" }}
    >
      {title}
    </Typography>
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "#0085EA",
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              Horários
            </TableCell>
            {daysOfWeek.map((day) => (
              <TableCell
                key={day}
                sx={{
                  backgroundColor: "#0085EA",
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Cria uma lista de períodos únicos */}
          {(() => {
            const uniquePeriods = Array.from(
              new Set(schedule.map((s) => s.period))
            );
            return uniquePeriods.map((period) => (
              <TableRow key={period}>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {period}
                </TableCell>
                {daysOfWeek.map((day) => {
                  const dayFeira = `${day}-feira`;
                  const materiasNoDia = schedule
                    .filter(
                      (slot) => slot.period === period && slot.day === dayFeira
                    )
                    .map((slot) => slot.materia);

                  const cellContent = materiasNoDia.join(" / ");
                  return (
                    <TableCell key={day} sx={{ textAlign: "center" }}>
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const Horario: React.FC = () => {
  const [morningSchedule, setMorningSchedule] = useState<ScheduleSlot[]>([]);
  const [afternoonSchedule, setAfternoonSchedule] = useState<ScheduleSlot[]>(
    []
  );

  // Função para buscar os horários da API
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        console.log(
          "Fazendo requisição para:",
          API.URL + "src/materias/tabelahorarios"
        );
        const response = await fetch(
          API.URL + "src/materias/tabelahorarios.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        if (data.success) {
          // Converte os horários para o formato correto
          const horariosConvertidos: ScheduleSlot[] = data.horarios.map(
            (horario: { horario: string; materia: string }) => {
              const { day, period } = translateSchedule(horario.horario);
              console.log("Horário recebido:", horario.horario);
              console.log("Matéria recebida:", horario.materia);
              console.log("Dia traduzido:", day);
              console.log("Período traduzido:", period);
              return {
                time: horario.horario,
                interval: false,
                day,
                period,
                materia: horario.materia,
              };
            }
          );

          console.log("Horários convertidos:", horariosConvertidos);

          horariosConvertidos.sort((a, b) => a.time.localeCompare(b.time));

          // Divide entre manhã e tarde baseado no código (Ex: 2M12 -> Manhã, 2T12 -> Tarde)
          setMorningSchedule(
            horariosConvertidos.filter((h) => h.time.includes("M"))
          );
          setAfternoonSchedule(
            horariosConvertidos.filter((h) => h.time.includes("T"))
          );
        } else {
          console.error("Erro na resposta da API:", data.error);
        }
      } catch (error) {
        console.error("Erro ao carregar horários:", error);
      }
    };

    fetchHorarios();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      <RenderTable title="Horários da Manhã" schedule={morningSchedule} />
      <RenderTable title="Horários da Tarde" schedule={afternoonSchedule} />
    </Box>
  );
};

export default Horario;
