const User = require("../models/UserModel");

const getUserProfile = async (req, res) => {
  try {
    // req.user contains the decoded payload attached automatically by the middleware
    // we use id from payload to extract user details
    const user_Id = req.user.id;
    const user = await User.findById(user_Id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Welcome user to your profile",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// name and username updation only
const updateUserProfile = async (req, res) => {
  try {
    const user_Id = req.user.id;
    const { name, username } = req.body;

    if (!name && !username) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    if (username) {
      const usernameExist = await User.findOne({
        username,
        _id: { $ne: user_Id },
      });
      if (usernameExist) {
        return res.status(409).json({ message: "Username already exists" });
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      user_Id,
      { name, username },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getOtherAccount = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select(
      "-_id -password -email -phone",
    );
    if (!user) {
      return res.status(404).json({
        message: "Username Not Found",
      });
    }
    return res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const followProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const userId = req.user.id;
    const targetUser = await User.findOne({ username });
    if (!targetUser) {
      return res.status(404).json({ message: "Username Not Found" });
    }
    if (targetUser._id.toString() === userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    // Atomic update for target user
    await User.findByIdAndUpdate(targetUser._id, {
      $addToSet: { followers: userId },
    });
    // Atomic update for logged-in user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { followings: targetUser._id },
    });

    return res.status(200).json({
      message: `${username} is being followed by ${req.user.username}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const unfollowProfile = async (req, res)=>{
  try {
    const { username } = req.params;
    const userId = req.user.id;
    const targetUser = await User.findOne({ username });
    if (!targetUser) {
      return res.status(404).json({ message: "Username Not Found" });
    }
    if (targetUser._id.toString() === userId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }
    // Atomic update for target user
    await User.findByIdAndUpdate(targetUser._id, {
      $pull: { followers: userId },
    });
    // Atomic update for logged-in user
    await User.findByIdAndUpdate(userId, {
      $pull: { followings: targetUser._id },
    });

    return res.status(200).json({
      message: `${username} is being not followed by ${req.user.username}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


module.exports = {
  getUserProfile,
  updateUserProfile,
  getOtherAccount,
  followProfile,
  unfollowProfile,
};
