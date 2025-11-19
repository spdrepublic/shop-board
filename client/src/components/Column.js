import React from "react";
import Card from "./Card";
import { Droppable, Draggable } from "react-beautiful-dnd";

function Column({ column }) {
  const cards = column.cards || [];

  return (
    <div
      style={{
        backgroundColor: "#e4e7eb",
        borderRadius: "8px",
        padding: "8px",
        minWidth: "260px",
        maxWidth: "280px",
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 140px)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px"
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "14px" }}>
          {column.name}
        </div>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>
          {cards.length} job(s)
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto"
        }}
      >
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              }}
            >
              {cards.length === 0 && (
                <div
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#616e7c"
                  }}
                >
                  No jobs in this stage.
                </div>
              )}

              {cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={card.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card card={card} />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default Column;
