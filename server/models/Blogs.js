const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const BlogModel = mongoose.model('blogs', BlogSchema)
module.exports = BlogModel