const express = require('express')
const router = express.Router()
const {createPost} = require('../controllers/postController')
const {createComment} = require('../controllers/commentController')
const verifyToken = require('../middlewares/middleware')


router.get('/create', verifyToken, createPost)
router.post('/comment/:postId', verifyToken, createComment)

module.exports = router