import express from "express";

const PORT = 5000 || 8000;

const app = express();

app.listen(process.env.PORT, () => {
  `Server running on port  ${PORT}`;
});
