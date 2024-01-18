const listHelper = require('../utils/list_helper')
const {initialBlogs} = require("./testHelper");

describe('totalLikes', () => {
    test('empty list equals zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('sum of blog likes', () => {
        const result = listHelper.totalLikes(initialBlogs)
        expect(result).toBe(36)
    })

    test('when list has only one blog equals the likes of that', () => {
        const oneBlog = initialBlogs.slice(0, 1)
        const result = listHelper.totalLikes(oneBlog)
        console.log(result)
        expect(result).toBe(7)
    })
})

describe('favoriteBlog', () => {
    test('empty list equals null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })

    test('blog with the most likes', () => {
        const result = listHelper.favoriteBlog(initialBlogs)
        expect(result).toEqual(initialBlogs[2])
    })
})

describe('mostBlogs', () => {
    test('empty list equals null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
    })

    test('author with the most blogs', () => {
        const result = listHelper.mostBlogs(initialBlogs)
        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
})

describe('mostLikes', () => {
    test('empty list equals null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(null)
    })

    test('author with the most likes', () => {
        const result = listHelper.mostLikes(initialBlogs)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
    })
})
