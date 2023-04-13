const express = require('express')
const router = express.Router()
const imageUpload = require('../middleware/fileUpload')

const { getAllBlog, createBlog, getBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');

router.get('/', getAllBlog)
router.post('/', imageUpload ,createBlog)
router.get('/:id', getBlog)
router.delete('/:id', deleteBlog)
router.patch('/:id', imageUpload, updateBlog)

module.exports = router