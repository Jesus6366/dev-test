import express from "express";
import cors from "cors";
import { JSONFilePreset } from "lowdb/node";

const PORT = 5000;

// express app instance initiated
const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Middleware for parsing JSON bodies

// setting up lowDb
const defaultData = { users: [] };
const db = await JSONFilePreset("../data/users.json", defaultData);

// Routes

// Get All Users
app.get("/api/users", async (req, res) => {
  const users = db.data.users;
  if (!users) {
    res.status(404).json({ message: "users not found" });
  }
  res.status(200).json(users);
  //   console.log(users);
});

// Login a user by email and password
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const foundUser = db.data.users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    res.status(200).json(foundUser); // returning the users data
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// update user details
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, age, eyeColor, password, company } =
    req.body;

  await db.update(({ users }) => {
    const userIndex = users.findIndex((u) => u._id === id);
    if (userIndex !== -1) {
      const user = users[userIndex];

      // Update user properties
      if (name) {
        user.name.first = name.first || user.name.first;
        user.name.last = name.last || user.name.last;
      }
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.age = age || user.age;
      user.eyeColor = eyeColor || user.eyeColor;
      user.password = password || user.password;
      user.company = company || user.company;

      // Update the user in the array
      users[userIndex] = user;
    }
  });

  const updatedUser = db.data.users.find((u) => u._id === id);
  res.status(200).json({ message: "User updated", user: updatedUser });
});

app.listen(PORT, () => {
  `Server running on port  ${PORT}`;
});