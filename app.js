const config = require('./utils/config')
const express = require('express')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true
}).then(result => {
  console.log('✔️ connected to MongoDB')
})
.catch((error) => {
  console.log('⚠️ error connecting to MongoDB:', error.message)
})

app.use(middleware.morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

module.exports = app