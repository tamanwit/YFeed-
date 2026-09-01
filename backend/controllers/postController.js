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

const likePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user.id;
    const post_details = await Post.findById(post_id);
    if (!post_details) {
      return res.status(400).json({
        message: "Cannot Find Post",
      })
    }
    const check = true;
    if (post_details.likes.includes(user_id)) {
      post_details.likes = post_details.likes.filter(id => id.toString() !== user_id.toString());
      check = false;
    } else {
      post_details.likes.push(user_id);
    }
    await post_details.save();
    res.status(201).json({
      message: check ? "Post Liked" : "Post Unliked",
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createPost,
  likePost,
};
