import React from "react";

function Card({ card }) {
  const overdue = card.overdue;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "6px",
        padding: "8px",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.12)",
        border: overdue ? "1px solid #e12d39" : "1px solid #d8e2ec",
        fontSize: "13px"
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: "2px" }}>
        #{card.roNumber} – {card.vehicle}
      </div>
      <div style={{ fontSize: "12px", color: "#52606d", marginBottom: "4px" }}>
        {card.customerName}
      </div>
      <div style={{ fontSize: "12px", marginBottom: "4px" }}>
        <strong>Promised:</strong> {card.promisedTime}
      </div>
      <div style={{ fontSize: "12px", marginBottom: "4px" }}>
        <strong>Tech:</strong> {card.tech || "Unassigned"}{" "}
        <span style={{ marginLeft: "6px" }}>
          <strong>Advisor:</strong> {card.advisor || "-"}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "4px"
        }}
      >
        {(card.badges || []).map((badge, idx) => (
          <span
            key={idx}
            style={{
              backgroundColor: "#e1e7ff",
              borderRadius: "999px",
              padding: "2px 6px",
              fontSize: "11px"
            }}
          >
            {badge}
          </span>
        ))}
      </div>
      <div style={{ fontSize: "11px", color: overdue ? "#e12d39" : "#52606d" }}>
        Open: {card.age} {overdue ? "• Overdue" : ""}
      </div>
    </div>
  );
}

export default Card;
