import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Commute({ data }) {
  if (!data || data.length === 0) {
    return <p>Loading commute charts...</p>;
  }

  // --- Doughnut Chart: Commute Mode ---
  const modeCounts = data.reduce((acc, curr) => {
    acc[curr.CommuteMode] = (acc[curr.CommuteMode] || 0) + 1;
    return acc;
  }, {});

  const modeData = {
    labels: Object.keys(modeCounts),
    datasets: [
      {
        label: 'Commute Mode',
        data: Object.values(modeCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  // --- Horizontal Bar Chart: Commute Distance ---
  const distanceCounts = data.reduce((acc, curr) => {
    acc[curr.CommuteDistance] = (acc[curr.CommuteDistance] || 0) + 1;
    return acc;
  }, {});

  const distanceData = {
    labels: Object.keys(distanceCounts),
    datasets: [
      {
        label: 'Commute Distance',
        data: Object.values(distanceCounts),
        backgroundColor: 'rgba(75,192,192,0.6)'
      }
    ]
  };

  const distanceOptions = {
    indexAxis: 'y', // horizontal bar
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Commute Distance Distribution' }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Commute</h2>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ width: "300px" }}>
          <h3>Commute Mode</h3>
          <Doughnut data={modeData} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Commute Distance</h3>
          <Bar data={distanceData} options={distanceOptions} />
        </div>
      </div>
    </div>
  );
}
