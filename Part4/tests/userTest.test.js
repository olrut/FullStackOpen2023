const User = require('../models/user')
const {usersInDb} = require("./testHelper");
const supertest = require('supertest')
const app = require('../app')
const mongoose = require("mongoose");
const api = supertest(app)


describe('Add users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'testUser',
            name: 'Testi Teppo',
            password: 'secretpw',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        expect(usersAtEnd.map(u => u.username)).toContain(newUser.username)
    })

    test('adding user fails with message if username already taken', async () => {
        const newUser = {
            username: 'testUser',
            name: 'Testi Teppo',
            password: 'secretpw',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfterAdd = await usersInDb()

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect('Content-Type', /application\/json/)
            .expect(400)
        expect(result.body.error).toContain('Error, expected `username` to be unique.')

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAfterAdd.length)
    })

    afterAll(async () => {
        User.deleteMany({})
        await mongoose.connection.close()
    })
})