import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

function Board({ board, setBoard, searchTerm, techFilter, flagFilter }) {
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside any column
    if (!destination) return;

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    // no actual movement
    if (
      sourceColId === destColId &&
      source.index === destination.index
    ) {
      return;
    }

    // work directly on board.columns
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
          {board.columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
