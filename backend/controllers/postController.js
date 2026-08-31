const Post = reqiure("../models/PostModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");

const createPost = async (req, res) => {
  try {
    const { caption, media } = req.body;
    const author_id = req.user.id;
    const post = await Post.create({
      author: author_id,
      caption: caption,
      media: media,
    });
    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPost,
};
