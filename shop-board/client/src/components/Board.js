import React from "react";
import Column from "./Column";

function Board({ columns, searchTerm, techFilter, flagFilter }) {
  // simple in-memory filtering
  const matchesFilters = (card) => {
    const text = (
      card.roNumber +
      " " +
      card.customerName +
      " " +
      card.vehicle +
      " " +
      card.tech +
      " " +
      card.advisor
    )
      .toLowerCase()
      .trim();

    if (searchTerm && !text.includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (techFilter !== "All Techs") {
      if (!card.tech || card.tech !== techFilter) return false;
    }

    if (flagFilter === "Waiters") {
      return card.badges && card.badges.some((b) => b.toUpperCase().includes("WAIT"));
    }
    if (flagFilter === "Comebacks") {
      return card.badges && card.badges.some((b) => b.toUpperCase().includes("COMEBACK"));
    }
    if (flagFilter === "Tows") {
      return card.badges && card.badges.some((b) => b.toUpperCase().includes("TOW"));
    }

    return true;
  };

  const filteredColumns = columns.map((col) => ({
    ...col,
    cards: (col.cards || []).filter(matchesFilters)
  }));

  return (
    <div
      style={{
        flex: 1,
        overflowX: "auto",
        padding: "16px 10px 16px 20px"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          minHeight: "calc(100vh - 120px)"
        }}
      >
        {filteredColumns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}

export default Board;
