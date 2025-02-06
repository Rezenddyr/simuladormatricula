import React, { useState } from "react";
import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#00111F",
    },
    primary: {
      main: "#0085EA",
    },
  },
  typography: {
    fontFamily: "Archivo, sans-serif",
  },
});

interface ScheduleSlot {
  time: string;
  interval: boolean;
}

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
          {schedule.map((slot, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  borderRight: slot.interval ? "none" : "1px solid #CCCCCC",
                  textAlign: "center",
                  fontWeight: slot.interval ? "bold" : "normal",
                }}
                colSpan={slot.interval ? daysOfWeek.length + 1 : 1}
              >
                {slot.interval ? "Intervalo" : slot.time}
              </TableCell>
              {!slot.interval &&
                daysOfWeek.map((_, dayIndex) => (
                  <TableCell
                    key={dayIndex}
                    sx={{
                      borderLeft: "1px solid #CCCCCC",
                      borderRight: "1px solid #CCCCCC",
                      textAlign: "center",
                    }}
                  />
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const Horario: React.FC = () => {
  const morningSchedule: ScheduleSlot[] = [
    { time: "07:00 - 08:40", interval: false },
    { time: "08:40 - 09:00", interval: true },
    { time: "09:00 - 10:40", interval: false },
    { time: "10:40 - 12:20", interval: false },
  ];
  const afternoonSchedule: ScheduleSlot[] = [
    { time: "13:20 - 15:00", interval: false },
    { time: "15:00 - 15:20", interval: true },
    { time: "15:20 - 17:00", interval: false },
    { time: "17:00 - 18:40", interval: false },
  ];

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
