const morgan = require('morgan')

morgan.token('body', function (req) {
  if (req.method !== 'POST') {
    return ' '
  }
  return JSON.stringify(req.body)
})


module.exports = {
  morgan
}