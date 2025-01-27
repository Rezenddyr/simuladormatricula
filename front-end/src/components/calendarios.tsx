import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    IconButton,
    Button,
    Grid,
    Tooltip,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

const Calendarios: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const markedDates = [
        { date: dayjs().date(5), description: 'Reunião importante' },
        { date: dayjs().date(12), description: 'Apresentação de projeto' },
        { date: dayjs().date(25), description: 'Feriado nacional' },
    ];

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');

    const handlePreviousMonth = () => {
        setCurrentDate((prev) => prev.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => prev.add(1, 'month'));
    };

    const renderCalendarDays = () => {
        const days = [];
        const startDay = startOfMonth.day();
        const totalDays = endOfMonth.date();

        // Empty slots for days before the 1st of the current month
        for (let i = 0; i < startDay; i++) {
            days.push(<Box key={`empty-${i}`} sx={{ flex: 1 }} />);
        }

        // Days of the current month
        for (let day = 1; day <= totalDays; day++) {
            const date = currentDate.date(day);
            const isMarked = markedDates.some((d) => d.date.isSame(date, 'day'));
            const mark = markedDates.find((d) => d.date.isSame(date, 'day'));

            days.push(
                <Tooltip
                    key={day}
                    title={isMarked ? mark?.description : ''}
                    placement="top"
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ccc',
                            backgroundColor: isMarked ? '#0085EA' : '#fff',
                            color: isMarked ? '#fff' : '#000',
                            borderRadius: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: isMarked ? '#006BB3' : '#f0f0f0',
                            },
                        }}
                    >
                        {day}
                    </Box>
                </Tooltip>
            );
        }

        return days;
    };

    return (
        <Card
            sx={{
                width: 500,
                backgroundColor: '#00213A',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                padding: 3,
                color: '#fff',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}
                >
                    <IconButton onClick={handlePreviousMonth} sx={{ color: '#fff' }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6">
                        {currentDate.format('MMMM YYYY')}
                    </Typography>
                    <IconButton onClick={handleNextMonth} sx={{ color: '#fff' }}>
                        <ArrowForward />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: 1,
                    }}
                >
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(
                        (day, index) => (
                            <Typography
                                key={index}
                                variant="subtitle1"
                                sx={{ textAlign: 'center', fontWeight: 'bold' }}
                            >
                                {day}
                            </Typography>
                        )
                    )}
                    {renderCalendarDays()}
                </Box>

                <Box mt={3}>
                    <Typography variant="h6">Datas Marcadas:</Typography>
                    {markedDates.map((mark, index) => (
                        <Typography key={index} sx={{ marginTop: 1 }}>
                            {mark.date.format('DD/MM/YYYY')}: {mark.description}
                        </Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Calendarios;