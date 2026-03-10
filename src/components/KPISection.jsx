import React from 'react';
import './KPISection.css';

export default function KPISection({ data }) {
  const total = data.length;
  const avgSatisfaction = (data.reduce((a, b) => a + b.JobSatisfaction, 0) / total).toFixed(1);
  const avgSleep = (data.reduce((a, b) => a + b.SleepHours, 0) / total).toFixed(1);
  const fullTime = ((data.filter(d => d.EmpType === "Full-Time").length / total) * 100).toFixed(0);

  return (
    <div className="kpi-container">
      <div className="kpi-card">👥 Total Employees: {total}</div>
      <div className="kpi-card">😊 Avg Satisfaction: {avgSatisfaction}</div>
      <div className="kpi-card">🌙 Avg Sleep: {avgSleep} hrs</div>
      <div className="kpi-card">💼 Full-Time: {fullTime}%</div>
    </div>
  );
}
