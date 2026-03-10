import React from 'react';
import { Radar, Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

export default function WorkLifestyle({ data }) {
  if (!data || data.length === 0) {
    return <p>Loading work lifestyle charts...</p>;
  }

  // --- Radar Chart: Average Work-Life Balance, Stress, Sleep ---
  const avgWorkLife = (
    data.reduce((sum, d) => sum + d.WorkLifeBalance, 0) / data.length
  ).toFixed(2);

  const avgStress = (
    data.reduce((sum, d) => sum + d.StressLevel, 0) / data.length
  ).toFixed(2);

  const avgSleep = (
    data.reduce((sum, d) => sum + d.SleepHours, 0) / data.length
  ).toFixed(2);

  const radarData = {
    labels: ['Work-Life Balance', 'Stress Level', 'Sleep Hours'],
    datasets: [
      {
        label: 'Average Scores',
        data: [avgWorkLife, avgStress, avgSleep],
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        pointBackgroundColor: 'rgba(54,162,235,1)'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Average Work Lifestyle Indicators' }
    }
  };

  // --- Bubble Chart: Physical Activity vs Sleep Hours ---
  const bubbleData = {
    datasets: [
      {
        label: 'Employees',
        data: data.map(d => ({
          x: d.PhysicalActivity, // e.g. hours per week
          y: d.SleepHours,
          r: 5 // bubble size
        })),
        backgroundColor: 'rgba(255,99,132,0.5)'
      }
    ]
  };

  const bubbleOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Physical Activity vs Sleep Hours' }
    },
    scales: {
      x: { title: { display: true, text: 'Physical Activity (hrs/week)' } },
      y: { title: { display: true, text: 'Sleep Hours (per day)' } }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Work Lifestyle</h2>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ width: "400px" }}>
          <Radar data={radarData} options={radarOptions} />
        </div>
        <div style={{ flex: 1 }}>
          <Bubble data={bubbleData} options={bubbleOptions} />
        </div>
      </div>
    </div>
  );
}
