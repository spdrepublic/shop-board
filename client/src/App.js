import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import Board from "./components/Board";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:3001";

function App() {
  const [board, setBoard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("All Techs");
  const [flagFilter, setFlagFilter] = useState("All");

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${API_BASE}/board`);
        const data = await response.json();
        setBoard(data);
      } catch (err) {
        console.error("Error fetching board:", err);
      }
    };

    fetchBoard();
  }, []);

  if (!board) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
        Loading board…
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header shopName={board.shopName} />
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        techFilter={techFilter}
        setTechFilter={setTechFilter}
        flagFilter={flagFilter}
        setFlagFilter={setFlagFilter}
      />
      {/* For now, Board ignores filters (we'll re-enable later) */}
      <Board
        board={board}
        setBoard={setBoard}
        searchTerm={searchTerm}
        techFilter={techFilter}
        flagFilter={flagFilter}
      />
    </div>
  );
}

export default App;
