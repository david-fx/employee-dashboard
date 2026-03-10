import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
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

export default function Demographics({ data }) {
  if (!data || data.length === 0) {
    return <p>Loading demographics...</p>;
  }

  // --- Gender Distribution ---
  const genderCounts = data.reduce((acc, curr) => {
    acc[curr.Gender] = (acc[curr.Gender] || 0) + 1;
    return acc;
  }, {});

  const genderData = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: 'Gender Distribution',
        data: Object.values(genderCounts),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
      }
    ]
  };

  // --- Education Level Distribution ---
  const eduCounts = data.reduce((acc, curr) => {
    acc[curr.Education] = (acc[curr.Education] || 0) + 1;
    return acc;
  }, {});

  const eduData = {
    labels: Object.keys(eduCounts),
    datasets: [
      {
        label: 'Education Level',
        data: Object.values(eduCounts),
        backgroundColor: 'rgba(153,102,255,0.6)'
      }
    ]
  };

  const eduOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Education Level Distribution' }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Demographics</h2>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ width: "300px" }}>
          <h3>Gender</h3>
          <Pie data={genderData} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Education</h3>
          <Bar data={eduData} options={eduOptions} />
        </div>
      </div>
    </div>
  );
}
