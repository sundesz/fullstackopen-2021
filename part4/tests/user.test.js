const helper = require('./test_helper')
const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
  await User.insertMany(helper.initialUser)
})

describe('User creation', () => {
  test('username must be unique', async () => {
    await api.post('/api/users').send(helper.initialUser[0]).expect(400)
  })

  test('username must be at least 3 characters', async () => {
    const newUser = { ...helper.initialUser[0], username: 'sa' }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('password must be at least 3 characters', async () => {
    const newUser = { ...helper.initialUser[0], password: 'sa' }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user can be created', async () => {
    const newUser = { username: 'luniva', name: 'Luniva', password: 'luniva' }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(helper.initialUser.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
