import React from 'react';
import Filters from './Filters';
import './HeaderFilters.css';

export default function HeaderFilters({ filters, setFilters, departments }) {
  return (
    <div className="sticky-header">
      <h1>📊 Employee Wellness & Satisfaction Dashboard</h1>
      <Filters filters={filters} setFilters={setFilters} departments={departments} />
    </div>
  );
}
