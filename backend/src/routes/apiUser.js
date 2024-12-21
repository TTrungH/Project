const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  authUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { auth_token } = require("../middleware/auth");

// create new user
router.post("/register/", createUser);

// get user by id
router.get("/:id", getUser);

// get all users
router.get("/", getAllUsers);

//delete user
router.delete("/delete/:id", deleteUser);

// update user
router.put("/update/:id", updateUser);

// auth user
router.post("/auth/login", authUser);

module.exports = router;
