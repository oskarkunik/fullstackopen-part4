const testData = require('../utils/test_data')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testData.listWithMultipleBlogs)
    expect(result).toBe(37)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('for list with one item is itself', () => {
    const result = listHelper.favoriteBlog(testData.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: "Edsger W. Dijkstra",
      likes: 5,
    })
  })

  test('of multiple is the one with most likes', () => {
    const result = listHelper.favoriteBlog(testData.listWithMultipleBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('for list with one item', () => {
    const result = listHelper.mostBlogs(testData.listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    })
  })

  test('for list with multiple items', () => {
    const result = listHelper.mostBlogs(testData.listWithMultipleBlogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 4,
    })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('for list with one item', () => {
    const result = listHelper.mostLikes(testData.listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    })
  })

  test('for list with multiple items', () => {
    const result = listHelper.mostLikes(testData.listWithMultipleBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})
