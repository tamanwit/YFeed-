const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/middleware");
const { getUserProfile, updateUserProfile, getOtherAccount, followProfile } = require("../controllers/profileController");

// protected route
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile/update", verifyToken, updateUserProfile);
router.get("/profile/:username", verifyToken, getOtherAccount);
router.put("/profile/follow/:username", verifyToken, followProfile)


module.exports = router;