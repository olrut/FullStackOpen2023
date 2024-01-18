const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const {initialBlogs} = require("./testHelper");
const Blog = require('../models/blog')
const User = require("../models/user");

let token = null
beforeAll(async () => {
    await User.deleteMany({})

    const newUser = {
        username: 'tester',
        name: 'Testi Teppo',
        password: 'tester',
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const sign =
        await api
            .post("/api/login")
            .send(
                {
                    username: "tester",
                    password: "tester"
                }
            );
    token = sign.body.token
})

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
        expect(response.body.length).toBe(3)
    })

    test('Id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('blogs post', () => {
    test('adding blog', async () => {
        const testBlog = initialBlogs[3]

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(4)
        response.body.forEach(blog => {
            if (blog.title === testBlog.title) {
                expect(blog.likes).toBe(testBlog.likes)
                expect(blog.author).toBe(testBlog.author)
                expect(blog.url).toBe(testBlog.url)
            }
        })
    })

    test('adding blog without authorization', async () => {
        const testBlog = initialBlogs[3]

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer `)
            .send(testBlog)
            .expect(401)
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
            title: 'Test title 5',
            author: 'Test author 5',
            url: 'Test url 5',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(4)
        response.body.forEach(blog => {
            if (blog.title === testBlog.title) {
                expect(blog.likes).toBe(0)
                expect(blog.author).toBe(testBlog.author)
                expect(blog.url).toBe(testBlog.url)
            }
        })
    })
})

describe('deleting blog', () => {
    test('deleting blog without authorization', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .expect(401)
        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd.length).toBe(3)
    })
})

afterAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
})
