import React from 'react';

export default function Filters({ filters, setFilters, departments }) {
  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <h2>Filters</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* Department Dropdown */}
        <div>
          <label>Department: </label>
          <select
            value={filters.dept}
            onChange={e => setFilters({ ...filters, dept: e.target.value })}
          >
            <option value="">All</option>
            {departments.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
        </div>

        {/* Gender Dropdown */}
        <div>
          <label>Gender: </label>
          <select
            value={filters.gender}
            onChange={e => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age Slider */}
        <div>
          <label>Max Age: {filters.age}</label>
          <input
            type="range"
            min="20"
            max="60"
            value={filters.age}
            onChange={e => setFilters({ ...filters, age: parseInt(e.target.value) })}
          />
        </div>

        {/* Sleep Hours Slider */}
        <div>
          <label>Min Sleep Hours: {filters.sleep}</label>
          <input
            type="range"
            min="4"
            max="10"
            value={filters.sleep}
            onChange={e => setFilters({ ...filters, sleep: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}
