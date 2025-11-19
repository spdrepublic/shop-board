import React from "react";

function FilterBar({
  searchTerm,
  setSearchTerm,
  techFilter,
  setTechFilter,
  flagFilter,
  setFlagFilter
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "10px 20px",
        borderBottom: "1px solid #d0d7de",
        backgroundColor: "#ffffff"
      }}
    >
      <input
        type="text"
        placeholder="Search by RO, customer, vehicle…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          flex: 1,
          padding: "6px 8px",
          borderRadius: "4px",
          border: "1px solid #cbd2d9",
          fontSize: "14px"
        }}
      />
      <select
        value={techFilter}
        onChange={(e) => setTechFilter(e.target.value)}
        style={{
          padding: "6px 8px",
          borderRadius: "4px",
          border: "1px solid #cbd2d9",
          fontSize: "14px"
        }}
      >
        <option>All Techs</option>
        <option>Alex T.</option>
        <option>Unassigned</option>
      </select>
      <select
        value={flagFilter}
        onChange={(e) => setFlagFilter(e.target.value)}
        style={{
          padding: "6px 8px",
          borderRadius: "4px",
          border: "1px solid #cbd2d9",
          fontSize: "14px"
        }}
      >
        <option>All</option>
        <option>Waiters</option>
        <option>Comebacks</option>
        <option>Tows</option>
      </select>
    </div>
  );
}

export default FilterBar;
