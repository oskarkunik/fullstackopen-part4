const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(function(res) {
      res.body.length === helper.initialBlogs.length
    })
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body

  contents.forEach(content => expect(content.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Valid Blog Test Entry',
    author: 'Lo Wang',
    url: 'https://lowang.com/valid-entry',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
        expect.objectContaining(newBlog)
    ])
  )
})

test('if blog is missing "likes", default likes to 0', async () => {
  const newBlog = {
    title: 'Entry with missing likes',
    author: 'Lo Wang',
    url: 'https://lowang.com/missing-likes',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ...newBlog,
        likes: 0
      })
    ])
  )
})

test('backend responds with 400 when missing "author" and "title"', async () => {
  const newBlog = {
    url: 'https://lowang.com/missing-likes',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting succeeds with 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )

  expect(blogsAtEnd).not.toContain(blogToDelete.content)
})

test('updating succeeds if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newContent = {
    title: 'Updated Blog Entry',
    author: 'Lo Wang',
    url: 'https://lowang.com/valid-entry',
    likes: 6
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newContent)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining(newContent)
    ])
  )
})

afterAll(async () => {
  mongoose.connection.close()
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
})