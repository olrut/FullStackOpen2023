const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

// blogsRouter.get('/:id', (request, response, next) => {
//     Blog.findById(request.params.id)
//         .then(note => {
//             if (note) {
//                 response.json(note)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch(error => next(error))
// })

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog(body);

    if (!blog.title || !blog.url) {
        return response.status(400).json({
            error: 'Bad Request. Missing title or url.'
        })
    }

    if (!blog.likes) {
        blog.likes = 0
    }


    blog
        .save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
})

// blogsRouter.delete('/:id', (request, response, next) => {
//     Blog.findByIdAndDelete(request.params.id)
//         .then(() => {
//             response.status(204).end()
//         })
//         .catch(error => next(error))
// })

// blogsRouter.put('/:id', (request, response, next) => {
//     const body = request.body
//
//     const blog = {
//         content: body.content,
//         important: body.important,
//     }
//
//     Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//         .then(updatedNote => {
//             response.json(updatedNote)
//         })
//         .catch(error => next(error))
// })

module.exports = blogsRouter