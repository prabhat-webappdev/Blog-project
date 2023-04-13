const mongoose = require('mongoose');
require('../config/connectDB')

const BlogSchema = new mongoose.Schema({
    grid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    course: {
        type: Array,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('blog', BlogSchema)