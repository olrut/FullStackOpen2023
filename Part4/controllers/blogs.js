const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})


blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    });

    if (!blog.title || !blog.url) {
        return response.status(400).json({
            error: 'Bad Request. Missing title or url.'
        })
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    const updatedNote = await Blog.findById(request.params.id)
    response.json(updatedNote)
})

module.exports = blogsRouter