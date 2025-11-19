import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

function Board({ board, setBoard, searchTerm, techFilter, flagFilter }) {
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

  const filteredColumns = board.columns.map((col) => ({
    ...col,
    cards: (col.cards || []).filter(matchesFilters)
  }));

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside any column
    if (!destination) return;

    // NOTE: for now, we only allow drag when filters are cleared
    if (
      searchTerm ||
      techFilter !== "All Techs" ||
      flagFilter !== "All"
    ) {
      return;
    }

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    // no actual movement
    if (
      sourceColId === destColId &&
      source.index === destination.index
    ) {
      return;
    }

    const columns = Array.from(board.columns);
    const sourceColIndex = columns.findIndex((c) => c.id === sourceColId);
    const destColIndex = columns.findIndex((c) => c.id === destColId);

    if (sourceColIndex === -1 || destColIndex === -1) return;

    const sourceCol = {
      ...columns[sourceColIndex],
      cards: Array.from(columns[sourceColIndex].cards || [])
    };

    const destCol =
      sourceColId === destColId
        ? sourceCol
        : {
            ...columns[destColIndex],
            cards: Array.from(columns[destColIndex].cards || [])
          };

    const [moved] = sourceCol.cards.splice(source.index, 1);
    destCol.cards.splice(destination.index, 0, moved);

    const newColumns = Array.from(columns);
    newColumns[sourceColIndex] = sourceCol;
    newColumns[destColIndex] = destCol;

    setBoard({ ...board, columns: newColumns });
  };

  return (
    <div
      style={{
        flex: 1,
        overflowX: "auto",
        padding: "16px 10px 16px 20px"
      }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
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
      </DragDropContext>
    </div>
  );
}

export default Board;
