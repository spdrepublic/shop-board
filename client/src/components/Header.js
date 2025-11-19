import React from "react";

function Header({ shopName }) {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#1f2933",
        color: "white"
      }}
    >
      <div>
        <div style={{ fontSize: "20px", fontWeight: "600" }}>Shop Board</div>
        <div style={{ fontSize: "13px", opacity: 0.8 }}>{shopName}</div>
      </div>
      <div style={{ fontSize: "13px", opacity: 0.9 }}>Today: {today}</div>
    </div>
  );
}

export default Header;
