const Post = reqiure("../models/PostModel");
const User = require("../models/UserModel");
const Comment = require("../models/CommentModel");

const createComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;

        const comment = await Comment.create({
            post: postId,
            author: userId,
            text: req.body,
        })
        res.status(201).json({
            message: "Comment created successfully",
            comment: comment,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = {
    createComment,
}