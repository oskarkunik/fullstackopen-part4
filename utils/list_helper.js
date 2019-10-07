const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((p,c) => p + c.likes, 0)

const favoriteBlog = (blogs) => blogs.length ? blogs
  .sort((a,b) => b.likes - a.likes)
  .map(blog => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  }))[0] : null

const mostBlogs = (blogs) => blogs.length ? blogs
  .reduce((p,c) => {
    if (p.some(entry => entry.author === c.author)) {
      return p.map(entry => entry.author === c.author ? ({
        author: entry.author,
        blogs: entry.blogs + 1,
      }) : entry)
    } else {
      return p.concat([{
        author: c.author,
        blogs: 1,
      }])
    }
  }, []).sort((a, b) => b.blogs - a.blogs)[0] : null

const mostLikes = (blogs) => blogs.length ? blogs
  .reduce((p, c) => {
    if (p.some(entry => entry.author === c.author)) {
      return p.map(entry => entry.author === c.author ? ({
        author: entry.author,
        likes: entry.likes + c.likes,
      }) : entry)
    } else {
      return p.concat([{
        author: c.author,
        likes: c.likes,
      }])
    }
  }, []).sort((a, b) => b.likes - a.likes)[0] : null

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
