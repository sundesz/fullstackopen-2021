const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogHelpers = require('./blog_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(blogHelpers.initialBlogs)
})

describe('when there is initially some blog saved', () => {
  test('there are two blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogHelpers.initialBlogs.length)
  })

  test('blog has a id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('creation of new blog', () => {
  test('new blog can be created', async () => {
    const newBlog = {
      title: 'React fullstack',
      author: 'Sajani',
      url: 'http://sajani.com',
      likes: 15,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogHelpers.initialBlogs.length + 1)

    const content = response.body.map((blog) => blog.author)
    expect(content).toContain('Sajani')
  })

  test('default likes values 0 if no likes provided', async () => {
    const newBlog = {
      title: 'Node js',
      author: 'Mahesh',
      url: 'http://mahesh.com',
    }

    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toEqual(0)
  })

  test('blog without title and url, failed with statuscode 400', async () => {
    const newBlog = {
      author: 'Tika',
      likes: 10,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('deletion of blog', () => {
  test('a blog can be deleted', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id

    await api.delete(`/api/blogs/${id}`).expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogHelpers.initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('blog likes can be updated', async () => {
    const blogs = await api.get('/api/blogs/')
    expect(blogs.body[0].likes).toEqual(blogHelpers.initialBlogs[0].likes)

    await api
      .put(`/api/blogs/${blogs.body[0].id}`)
      .send({ likes: 30 })
      .expect(200)

    const response = await api.get('/api/blogs/')
    expect(response.body[0].likes).toEqual(30)
  }, 10000)
})

afterAll(() => {
  mongoose.connection.close()
})
