const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/controller')
const verifyToken = require("../middlewares/middleware");

router.post('/register', registerUser)
router.post('/login', loginUser)

// protected route
router.get("/profile", verifyToken, (req, res) => {
  // req.user contains the decoded payload (id, email) attached in the middleware
  res.status(200).json({
    message: "Welcome to your protected profile!",
    user: req.user,
  });
});

module.exports = router