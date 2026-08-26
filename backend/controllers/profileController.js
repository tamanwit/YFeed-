const User = require("../models/model");

const getUserProfile = async (req, res) => {
  try {
    // req.user contains the decoded payload attached automatically by the middleware
    // return res.status(200).json({
    //   message: "Welcome to your protected profile!",
    //   user: req.user,
    // });

    // we use id from payload to extract user details
    const user_Id = req.user.id;
    const user = await User.findById(user_Id).select("-password")
    if(!user){
        return res.status(404).json({
            message : "User not found"
        })
    }
    res.status(200).json({
        message : "Welcome user to your profile",
        user : user,
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUserProfile,
};
