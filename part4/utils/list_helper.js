const _ = require('lodash')

const dummy = (blogs) => {
  blogs.length
  return 1
}

const totalLikes = (blogs) => {
  if (blogs && blogs.length) {
    const countLikes = (total, blog) => total + Number(blog.likes)
    return blogs.reduce(countLikes, 0)
  }
  return 0
}

const favoriteBlog = (blogs) => {
  if (blogs && blogs.length) {
    const mostLikes = (prev, curr) => (prev.likes > curr.likes ? prev : curr)
    // eslint-disable-next-line no-unused-vars
    const { _id, url, __v, ...restOfBlog } = blogs.reduce(mostLikes, {})
    return restOfBlog
  }
  return 0
}

const mostBlogs = (blogs) => {
  if (blogs && blogs.length) {
    return _.maxBy(
      _.map(_.countBy(blogs, 'author'), (val, key) => ({
        author: key,
        blogs: val,
      })),
      'blogs'
    )
  }
  return 0
}

const mostLikes = (blogs) => {
  if (blogs && blogs.length) {
    return _.maxBy(
      _.chain(blogs)
        .groupBy('author')
        .map((val, key) => ({
          author: key,
          likes: _.sumBy(val, 'likes'),
        }))
        .value(),
      'likes'
    )
  }

  return 0
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
