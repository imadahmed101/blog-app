const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const BlogModel = require('./models/Blogs')

mongoose.connect(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const results = await BlogModel.find({})
        res.send(results)
    }
    catch (error) {
        res.send(error)
    }
})

app.post('/', async (req, res) => {
    try {
        const name = req.body.name
        const blog = await BlogModel.create({ name })
        res.status(200).json(blog)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const blog = await BlogModel.findByIdAndDelete(id)
        res.status(200).json(blog)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
})


app.put('/:id', async (req, res) => {
    try {
        const id = req.body.id
        const newName = req.body.newName
        const blog = await BlogModel.findById(id)
        blog.name = newName
        blog.save()
        res.status(200).json(blog)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
})