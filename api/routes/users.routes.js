import express from "express";
const router = express.Router();
import {
  getAllUsers,
  login,
  updateUserById,
} from "../controllers/userControllers.js";

////////////////// Routes  //////////////////////
// Get All Users
router.get("/", getAllUsers);

// Login a user by email and password
router.post("/login", login);

// Update user details
router.put("/:id", updateUserById);

export default router;
