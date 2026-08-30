const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/middleware");
const { getUserProfile, updateUserProfile, getOtherAccount, followProfile, unfollowProfile } = require("../controllers/profileController");

// protected routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile/update", verifyToken, updateUserProfile);
router.get("/profile/:username", verifyToken, getOtherAccount);
router.put("/profile/follow/:username", verifyToken, followProfile)
router.put("/profile/unfollow/:username", verifyToken, unfollowProfile)


module.exports = router;