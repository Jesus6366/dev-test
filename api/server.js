import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/users.routes.js";
import serverless from "serverless-http"

const PORT = process.env.PORT || 8000;

// Express app instance initiated
const app = express();

// Middlewares
// app.use(cors()); // Allow cross-origin requests from frontend
app.use(cors({
  origin: ['https://dev-test-jesus.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or authorization headers
}));
app.use(express.json()); // Middleware for parsing JSON bodies
app.use("/api/users", userRoutes);

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

 
export const handler = serverless(app)
