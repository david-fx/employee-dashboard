import React, { useEffect, useState } from 'react';
import KPISection from './components/KPISection';
import JobSatisfaction from './components/JobSatisfaction';
import Demographics from './components/Demographics';
import WorkLifestyle from './components/WorkLifestyle';
import Commute from './components/Commute';
import HeaderFilters from './components/HeaderFilters';

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ dept: "", gender: "", age: 60, sleep: 4 });

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/david-fx/json/main/employee_survey.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error loading data:", err));
  }, []);

  // --- Apply filters ---
  const filteredData = data.filter(d => {
    return (
      (filters.dept === "" || d.Dept === filters.dept) &&
      (filters.gender === "" || d.Gender === filters.gender) &&
      d.Age <= filters.age &&
      d.SleepHours >= filters.sleep
    );
  });

  const departments = [...new Set(data.map(d => d.Dept))];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📊 Employee Wellness & Satisfaction Dashboard</h1>
      {data.length > 0 ? (
        <>
          <HeaderFilters filters={filters} setFilters={setFilters} departments={departments} />
          <KPISection data={filteredData} />
          <JobSatisfaction data={filteredData} />
          <Demographics data={filteredData} />
          <WorkLifestyle data={filteredData} />
          <Commute data={filteredData} />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
