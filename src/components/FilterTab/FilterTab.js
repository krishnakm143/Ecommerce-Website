import React from 'react';

const FilterTab = ({ filters, setFilters }) => {
  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  return (
    <div className="filter-tab">
      <h5>Filter By</h5>
      <div className="filter-section">
        <label htmlFor="category">Category</label>
        <select id="category" value={filters.category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="kids">Kids</option>
        </select>
      </div>
  
    </div>
  );
};

export default FilterTab;
