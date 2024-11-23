import express from "express";
import cors from "cors";
import { JSONFilePreset } from "lowdb/node";

const PORT = 5000 || 8000;

// express app instance initiated
const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Middleware for parsing JSON bodies

// setting up lowDb
const defaultData = { users: [] };
const db = await JSONFilePreset("../data/users.json", defaultData);

console.log(db.data);

app.listen(process.env.PORT, () => {
  `Server running on port  ${PORT}`;
});
