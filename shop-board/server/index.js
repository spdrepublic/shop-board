import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());

// Serve the fake board data
app.get("/board", (req, res) => {
  const filePath = path.join(process.cwd(), "server", "data", "boardData.json");
  const raw = fs.readFileSync(filePath);
  const data = JSON.parse(raw);
  res.json(data);
});

// Health check
app.get("/", (req, res) => {
  res.send("Shop Board Backend is running.");
});

// Use Render's port or fallback for local
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
