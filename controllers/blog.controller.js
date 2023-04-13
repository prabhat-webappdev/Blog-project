const Blog = require('../models/blog.model');
const fs = require('fs')

const getAllBlog = async (req, res) => {
    try {
        const { id: userID } = req.user
        const blogs = await Blog.find({ createdBy: userID })
        res.status(200).json({ success: true, data: blogs })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
const createBlog = async (req, res) => {
    try {
        const { id: userID } = req.user
        const grid = Math.floor(Math.random() * 900 + 1)
        const image = `uploads/${req.file.filename}`
        const blog = await Blog.create({ grid, ...req.body, image, createdBy: userID })
        res.status(201).json({ success: true, data: blog })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
const getBlog = async (req, res) => {
    try {

        const { user: { id: userID }, params: { id } } = req
        const blog = await Blog.findOne({ _id: id, createdBy: userID })
        if (!blog) {
            return res.status(404).json({ success: true, msg: `No blog found with id ${id}` })
        }
        res.status(200).json({ success: true, data: blog })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
const updateBlog = async (req, res) => {
    try {
        const { user: { id: userID }, params: { id } } = req
        let obj
        if (!req.file) {
            obj = { ...req.body }
        } else {
            const { image: oldImage } = await Blog.findById(id)
            fs.unlinkSync(oldImage)
            const image = `uploads/${req.file.filename}`
            obj = { image, ...req.body }
        }
        const blog = await Blog.findOneAndUpdate({ _id: id, createdBy: userID }, obj, { runValidators: true, returnOriginal: false })
        if (!blog) {
            return res.status(404).json({ success: true, msg: `No blog found with id ${id}` })
        }
        res.status(200).json({ success: true, data: blog })
        // res.json({ obj })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
}
const deleteBlog = async (req, res) => {
    try {
        const { user: { id: userID }, params: { id } } = req
        const blog = await Blog.findOneAndDelete({ _id: id, createdBy: userID })
        if (!blog) {
            return res.status(404).json({ success: true, msg: `No blog found with id ${id}` })
        }
        fs.unlinkSync(blog.image)
        res.status(200).json({ success: true, data: blog })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong' })
    }
}

module.exports = { getAllBlog, createBlog, getBlog, updateBlog, deleteBlog }