const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'Test blog 1',
        author: 'Test author 1',
        url: 'Test url 1',
        likes: 1
    },
    {
        title: 'Test blog 2',
        author: 'Test author 2',
        url: 'Test url 2',
        likes: 2
    },
    {
        title: 'Test blog 3',
        author: 'Test author 3',
        url: 'Test url 3',
        likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

describe('blogs get and correct id', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('Id is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('blogs post', () => {
    test('adding blog', async () => {
        const testBlog = {
            title: 'Test blog 4',
            author: 'Test author 4',
            url: 'Test url 4',
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length + 1)
        response.body.forEach(blog => {
            if (blog.title === testBlog.title) {
                expect(blog.likes).toBe(testBlog.likes)
                expect(blog.author).toBe(testBlog.author)
                expect(blog.url).toBe(testBlog.url)
            }
        })
    })

    test('adding blog without title', async () => {
        const testBlog = {
            author: 'Test author 5',
            url: 'Test url 5',
            likes: 5
        }

        api.post('/api/blogs')
            .send(testBlog)
            .expect(400)
    })

    test('adding blog without likes', async () => {
        const testBlog = {
            title: 'Test blog 5',
            author: 'Test author 5',
            url: 'Test url 5'
        }

        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            if (blog.title === testBlog.title) {
                expect(blog.likes).toBe(0)
            }
        })
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})