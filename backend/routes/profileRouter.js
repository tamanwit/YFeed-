const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/middleware");
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");

// protected route
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile/update", verifyToken, updateUserProfile);

module.exports = router;
