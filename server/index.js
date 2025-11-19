const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Hard-coded fake board data for Phase 1
const boardData = {
  id: "board_main",
  name: "Main Shop Board",
  shopName: "Your Shop Name",
  columns: [
    {
      id: "check_in",
      name: "Check-In",
      sortOrder: 1,
      cards: [
        {
          id: "card_1",
          roNumber: "45710",
          customerName: "Mike Smith",
          vehicle: "2020 Ford F-150",
          promisedTime: "10:00 AM",
          tech: "Unassigned",
          advisor: "Kelly",
          badges: ["WAIT"],
          age: "0.1 days",
          overdue: false
        }
      ]
    },
    {
      id: "diagnosis",
      name: "Diagnosis",
      sortOrder: 2,
      cards: [
        {
          id: "card_2",
          roNumber: "45705",
          customerName: "Jane Miller",
          vehicle: "2018 Honda Civic",
          promisedTime: "1:30 PM",
          tech: "Alex T.",
          advisor: "Sarah",
          badges: ["DIAG"],
          age: "0.5 days",
          overdue: false
        }
      ]
    },
    {
      id: "waiting_on_estimate",
      name: "Waiting on Estimate",
      sortOrder: 3,
      cards: []
    },
    {
      id: "waiting_on_parts",
      name: "Waiting on Parts",
      sortOrder: 4,
      cards: [
        {
          id: "card_3",
          roNumber: "45678",
          customerName: "John Doe",
          vehicle: "2016 Toyota Camry",
          promisedTime: "4:30 PM",
          tech: "Alex T.",
          advisor: "Sarah",
          badges: ["WAITING ON PARTS", "COMEBACK", "$980 Approved"],
          age: "1.5 days",
          overdue: true
        }
      ]
    },
    {
      id: "work_in_progress",
      name: "Work in Progress",
      sortOrder: 5,
      cards: []
    },
    {
      id: "qc_test_drive",
      name: "QC / Test Drive",
      sortOrder: 6,
      cards: []
    },
    {
      id: "ready_for_pickup",
      name: "Ready for Pickup",
      sortOrder: 7,
      cards: []
    },
    {
      id: "completed",
      name: "Completed",
      sortOrder: 8,
      cards: []
    }
  ]
};

// Health check
app.get("/", (req, res) => {
  res.send("Shop Board Backend is running.");
});

// Board route
app.get("/board", (req, res) => {
  res.json(boardData);
});

// Use Render's port or fallback
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
