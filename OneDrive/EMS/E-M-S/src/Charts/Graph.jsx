import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

  datasets: [
    {
      label: 'Performance',
      data: [40, 50, 70, 75, 58, 70, 80],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.4, // This property makes the line curved
    },
    {
      label: 'Target',
      data: [40, 50, 60, 70, 75, 75, 90],
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      tension: 0.4, // This property makes the line curved
    },
  ],
};

const options =  {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#000', // Increase visibility
      },
    },
    title: {
      display: true,
      text: 'Performance Over Time',
      font: {
        size: 24, // Increase font size
        weight: 'bold',
      },
      color: '#000', // Increase visibility
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 14, // Increase font size for x-axis labels
        },
        color: '#000', // Increase visibility
      },
    },
    y: {
      ticks: {
        font: {
          size: 14, // Increase font size for y-axis labels
        },
        color: '#000', // Increase visibility
      },
    },
  },
};

function Graph({className}) {
  return (
    <div className={`bg-white rounded-xl  h-full w-full flex items-end  p-5 shadow-2xl ${className}  `}>

      <div className='bg-white rounded-xl col-span-4 row-span-5 h-full w-full flex items-end '>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Graph;