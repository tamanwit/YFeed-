const express = require('express')
const router = express.Router()
const { createPost, likePost } = require('../controllers/postController')
const { createComment } = require('../controllers/commentController')
const verifyToken = require('../middlewares/middleware')


router.get('/create', verifyToken, createPost)
router.post('/comment/:postId', verifyToken, createComment)
router.patch('/like/:postId', verifyToken, likePost);

module.exports = router