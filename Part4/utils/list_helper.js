const _ = require("lodash");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => total += blog.likes)
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let favorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    return _.chain(blogs)
        .countBy('author')
        .toPairs()
        .maxBy(_.last)
        .thru(pair => ({author: pair[0], blogs: pair[1]}))
        .value();
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    return _.chain(blogs)
        .groupBy('author')
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes')
        })).maxBy('likes')
        .value();
}
    

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

