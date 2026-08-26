const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/middleware");
const { getUserProfile } = require("../controllers/profileController");

// protected route
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
