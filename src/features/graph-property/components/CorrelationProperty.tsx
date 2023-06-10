import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ResponderDegreeCorrelationValueProjection } from '../../api/graphAnalyzerApi';
import Box from '@mui/material/Box';

interface ValueProps {
  content: ResponderDegreeCorrelationValueProjection[];
  xLabel?: string;
  yLabel?: string;
  stepSize?: number;
}

export default function CorrelationProperty({
  content,
  xLabel = '',
  yLabel = '',
  stepSize = 1,
}: ValueProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
        ticks: {
          stepSize: stepSize,
        },
      },
    },
  };

  let chartLabels: number[] = [];
  let chartData: number[] = [];
  content.forEach((element) => {
    chartLabels.push(element.degree);
    chartData.push(element.average);
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: '#1976d2',
      },
    ],
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        marginTop: 5,
        marginBottom: 0,
      }}
      minHeight={200}
      maxHeight={200}
    >
      <Line options={options} data={data} />
    </Box>
  );
}
