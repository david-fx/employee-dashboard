import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function JobSatisfaction({ data }) {
  // Pastikan data ada
  if (!data || data.length === 0) {
    return <p>Loading chart...</p>;
  }

  const departments = [...new Set(data.map(d => d.Dept))];
  const avgSatisfaction = departments.map(dep => {
    const filtered = data.filter(d => d.Dept === dep);
    return (
      filtered.reduce((sum, item) => sum + item.JobSatisfaction, 0) /
      filtered.length
    ).toFixed(2);
  });

  const chartData = {
    labels: departments,
    datasets: [
      {
        label: 'Avg Job Satisfaction',
        data: avgSatisfaction,
        backgroundColor: 'rgba(75,192,192,0.6)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Job Satisfaction per Department' }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Department Satisfaction</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
